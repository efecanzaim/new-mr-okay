import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const category = await db.category.findUnique({ where: { id } })
  if (!category) return NextResponse.json({ error: 'Kategori bulunamadı.' }, { status: 404 })
  return NextResponse.json(category)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { name, slug, description } = await req.json()
  if (!name || !slug) return NextResponse.json({ error: 'Ad ve slug zorunludur.' }, { status: 400 })

  const existing = await db.category.findFirst({ where: { slug, NOT: { id } } })
  if (existing) return NextResponse.json({ error: 'Bu slug zaten kullanılıyor.' }, { status: 400 })

  const category = await db.category.update({
    where: { id },
    data: { name, slug, description: description || null },
  })
  return NextResponse.json(category)
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const productCount = await db.product.count({ where: { categoryId: id } })
  if (productCount > 0) {
    return NextResponse.json({ error: `Bu kategoride ${productCount} ürün var. Önce ürünleri başka kategoriye taşıyın.` }, { status: 400 })
  }

  await db.category.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
