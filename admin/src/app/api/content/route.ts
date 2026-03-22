import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const contents = await db.content.findMany({ orderBy: [{ type: 'asc' }, { order: 'asc' }] })
  return NextResponse.json({ contents })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { key, type, title, subtitle, image, link, isActive, order } = body

  if (!key || !type) return NextResponse.json({ error: 'Key ve tip zorunludur.' }, { status: 400 })

  const existing = await db.content.findUnique({ where: { key } })
  if (existing) return NextResponse.json({ error: 'Bu key zaten kullanılıyor.' }, { status: 400 })

  const content = await db.content.create({
    data: { key, type, title, subtitle, image, link, isActive: isActive ?? true, order: order ?? 0 },
  })

  return NextResponse.json(content, { status: 201 })
}
