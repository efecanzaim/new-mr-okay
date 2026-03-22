import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''

  const where: any = {}
  if (search) where.code = { contains: search, mode: 'insensitive' }

  const coupons = await db.coupon.findMany({
    where,
    include: { _count: { select: { orders: true } } },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ coupons })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { code, description, type, value, minOrderAmount, maxUses, isActive, startsAt, expiresAt } = body

  if (!code || !type || value === undefined) {
    return NextResponse.json({ error: 'Kod, tip ve değer zorunludur.' }, { status: 400 })
  }

  const existing = await db.coupon.findUnique({ where: { code: code.toUpperCase() } })
  if (existing) return NextResponse.json({ error: 'Bu kupon kodu zaten kullanılıyor.' }, { status: 400 })

  const coupon = await db.coupon.create({
    data: {
      code: code.toUpperCase(),
      description,
      type,
      value: parseFloat(value),
      minOrderAmount: minOrderAmount ? parseFloat(minOrderAmount) : null,
      maxUses: maxUses ? parseInt(maxUses) : null,
      isActive: isActive ?? true,
      startsAt: startsAt ? new Date(startsAt) : null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  })

  return NextResponse.json(coupon, { status: 201 })
}
