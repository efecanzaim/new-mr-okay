import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const content = await db.content.findUnique({ where: { id } })
  if (!content) return NextResponse.json({ error: 'İçerik bulunamadı.' }, { status: 404 })
  return NextResponse.json(content)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { title, subtitle, image, link, isActive, order } = await req.json()

  const content = await db.content.update({
    where: { id },
    data: {
      title: title || null,
      subtitle: subtitle || null,
      image: image || null,
      link: link || null,
      isActive,
      order: parseInt(order) || 0,
    },
  })

  return NextResponse.json(content)
}
