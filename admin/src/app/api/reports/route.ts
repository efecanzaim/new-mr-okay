import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const range = searchParams.get('range') || '30d'
  const groupBy = searchParams.get('groupBy') || 'day'

  const now = new Date()
  let startDate: Date
  if (range === '7d') startDate = new Date(now.getTime() - 7 * 86400000)
  else if (range === '90d') startDate = new Date(now.getTime() - 90 * 86400000)
  else if (range === '1y') startDate = new Date(now.getTime() - 365 * 86400000)
  else startDate = new Date(now.getTime() - 30 * 86400000) // 30d default

  // Paid orders in range
  const orders = await db.order.findMany({
    where: {
      createdAt: { gte: startDate },
      paymentStatus: 'PAID',
    },
    include: {
      items: {
        include: { product: { select: { name: true } } },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  // --- Revenue over time ---
  const revenueMap = new Map<string, number>()
  for (const order of orders) {
    let key: string
    const d = order.createdAt
    if (groupBy === 'week') {
      const weekStart = new Date(d)
      weekStart.setDate(d.getDate() - d.getDay())
      key = weekStart.toISOString().slice(0, 10)
    } else if (groupBy === 'month') {
      key = d.toISOString().slice(0, 7)
    } else {
      key = d.toISOString().slice(0, 10)
    }
    revenueMap.set(key, (revenueMap.get(key) || 0) + Number(order.total))
  }
  const revenueChart = Array.from(revenueMap.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([date, revenue]) => ({ date, revenue: Math.round(revenue * 100) / 100 }))

  // --- Top products ---
  const productMap = new Map<string, { name: string; qty: number; revenue: number }>()
  for (const order of orders) {
    for (const item of order.items) {
      const name = item.product?.name || item.productId
      const existing = productMap.get(item.productId) || { name, qty: 0, revenue: 0 }
      existing.qty += item.quantity
      existing.revenue += Number(item.price) * item.quantity
      productMap.set(item.productId, existing)
    }
  }
  const topProducts = Array.from(productMap.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10)
    .map(p => ({ ...p, revenue: Math.round(p.revenue * 100) / 100 }))

  // --- All orders (any status) for status distribution ---
  const allOrders = await db.order.findMany({
    where: { createdAt: { gte: startDate } },
    select: { status: true, shippingAddress: true },
  })

  // --- Order status distribution ---
  const statusMap = new Map<string, number>()
  for (const o of allOrders) {
    statusMap.set(o.status, (statusMap.get(o.status) || 0) + 1)
  }
  const orderStatusChart = Array.from(statusMap.entries()).map(([status, count]) => ({ status, count }))

  // --- Country distribution (from shippingAddress JSON) ---
  const countryMap = new Map<string, number>()
  for (const o of allOrders) {
    try {
      const addr = o.shippingAddress as any
      const country = addr?.country || 'Bilinmiyor'
      countryMap.set(country, (countryMap.get(country) || 0) + 1)
    } catch {
      countryMap.set('Bilinmiyor', (countryMap.get('Bilinmiyor') || 0) + 1)
    }
  }
  const countryChart = Array.from(countryMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([country, count]) => ({ country, count }))

  // --- Coupon usage stats ---
  const couponOrders = await db.order.findMany({
    where: {
      createdAt: { gte: startDate },
      couponId: { not: null },
    },
    select: { couponId: true, total: true, coupon: { select: { code: true } } },
  })
  const couponMap = new Map<string, { uses: number; totalRevenue: number }>()
  for (const o of couponOrders) {
    const code = o.coupon?.code || o.couponId!
    const existing = couponMap.get(code) || { uses: 0, totalRevenue: 0 }
    existing.uses += 1
    existing.totalRevenue += Number(o.total)
    couponMap.set(code, existing)
  }
  const couponStats = Array.from(couponMap.entries())
    .sort((a, b) => b[1].uses - a[1].uses)
    .map(([code, stats]) => ({
      code,
      uses: stats.uses,
      totalRevenue: Math.round(stats.totalRevenue * 100) / 100,
    }))

  // --- Summary ---
  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0)
  const totalOrders = allOrders.length

  return NextResponse.json({
    summary: {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalOrders,
      paidOrders: orders.length,
    },
    revenueChart,
    topProducts,
    orderStatusChart,
    countryChart,
    couponStats,
  })
}
