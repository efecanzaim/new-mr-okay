import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const order = await db.order.findUnique({
    where: { id },
    include: {
      user: { select: { name: true, email: true, phone: true } },
      items: {
        include: {
          product: { select: { name: true, images: { take: 1, orderBy: { order: 'asc' } } } },
          variant: { select: { name: true } },
        },
      },
      coupon: { select: { code: true, type: true, value: true } },
    },
  })

  if (!order) return NextResponse.json({ error: 'Sipariş bulunamadı.' }, { status: 404 })
  return NextResponse.json(order)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { status, paymentStatus, notes } = await req.json()

  const data: any = {}
  if (status) data.status = status
  if (paymentStatus) data.paymentStatus = paymentStatus
  if (notes !== undefined) data.notes = notes

  const order = await db.order.update({ where: { id }, data })
  return NextResponse.json(order)
}
