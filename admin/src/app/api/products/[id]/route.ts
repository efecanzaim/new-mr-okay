import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// GET — tek ürün
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const product = await db.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: { orderBy: { order: 'asc' } },
      variants: true,
    },
  })

  if (!product) return NextResponse.json({ error: 'Ürün bulunamadı.' }, { status: 404 })
  return NextResponse.json(product)
}

// PUT — ürün güncelle
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { name, slug, description, price, comparePrice, sku, status, featured, categoryId, images, variants } = body

  // Mevcut görselleri ve varyantları sil, yenilerini ekle
  await db.productImage.deleteMany({ where: { productId: id } })
  await db.productVariant.deleteMany({ where: { productId: id } })

  const product = await db.product.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      price: parseFloat(price),
      comparePrice: comparePrice ? parseFloat(comparePrice) : null,
      sku: sku || null,
      status,
      featured,
      categoryId: categoryId || null,
      images: images?.length ? { create: images } : undefined,
      variants: variants?.length ? { create: variants } : undefined,
    },
    include: { images: true, variants: true },
  })

  return NextResponse.json(product)
}

// DELETE — ürün sil
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  await db.product.update({
    where: { id },
    data: { status: 'INACTIVE' },
  })

  return NextResponse.json({ success: true })
}
