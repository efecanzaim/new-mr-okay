import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const [
    totalOrders,
    monthOrders,
    todayOrders,
    totalRevenue,
    monthRevenue,
    todayRevenue,
    pendingOrders,
    recentOrders,
    topProducts,
  ] = await Promise.all([
    db.order.count(),
    db.order.count({ where: { createdAt: { gte: startOfMonth } } }),
    db.order.count({ where: { createdAt: { gte: startOfToday } } }),
    db.order.aggregate({ where: { paymentStatus: 'PAID' }, _sum: { total: true } }),
    db.order.aggregate({ where: { paymentStatus: 'PAID', createdAt: { gte: startOfMonth } }, _sum: { total: true } }),
    db.order.aggregate({ where: { paymentStatus: 'PAID', createdAt: { gte: startOfToday } }, _sum: { total: true } }),
    db.order.count({ where: { status: 'PENDING' } }),
    db.order.findMany({
      take: 8,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        orderNumber: true,
        total: true,
        status: true,
        paymentStatus: true,
        createdAt: true,
        guestEmail: true,
        user: { select: { name: true, email: true } },
      },
    }),
    db.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    }),
  ])

  // Top ürün isimlerini çek
  const topProductIds = topProducts.map((p) => p.productId)
  const topProductDetails = await db.product.findMany({
    where: { id: { in: topProductIds } },
    select: { id: true, name: true, images: { take: 1, orderBy: { order: 'asc' } } },
  })

  const topProductsWithDetails = topProducts.map((p) => {
    const detail = topProductDetails.find((d) => d.id === p.productId)
    return {
      productId: p.productId,
      name: detail?.name || 'Bilinmiyor',
      image: detail?.images[0]?.url || null,
      totalSold: p._sum.quantity || 0,
    }
  })

  return NextResponse.json({
    stats: {
      totalOrders,
      monthOrders,
      todayOrders,
      totalRevenue: totalRevenue._sum.total || 0,
      monthRevenue: monthRevenue._sum.total || 0,
      todayRevenue: todayRevenue._sum.total || 0,
      pendingOrders,
    },
    recentOrders,
    topProducts: topProductsWithDetails,
  })
}
