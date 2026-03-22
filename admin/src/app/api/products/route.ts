import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

// GET — ürün listesi
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const search = searchParams.get('search') || ''
  const category = searchParams.get('category') || ''
  const status = searchParams.get('status') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20

  const where: any = {}
  if (search) where.name = { contains: search, mode: 'insensitive' }
  if (category) where.categoryId = category
  if (status) where.status = status

  const [products, total] = await Promise.all([
    db.product.findMany({
      where,
      include: {
        category: { select: { name: true } },
        images: { orderBy: { order: 'asc' }, take: 1 },
        variants: true,
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.product.count({ where }),
  ])

  return NextResponse.json({ products, total, page, limit })
}

// POST — yeni ürün
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, slug, description, price, comparePrice, sku, status, featured, categoryId, images, variants } = body

  if (!name || !slug || !price) {
    return NextResponse.json({ error: 'Ad, slug ve fiyat zorunludur.' }, { status: 400 })
  }

  const product = await db.product.create({
    data: {
      name,
      slug,
      description,
      price: parseFloat(price),
      comparePrice: comparePrice ? parseFloat(comparePrice) : null,
      sku: sku || null,
      status: status || 'ACTIVE',
      featured: featured || false,
      categoryId: categoryId || null,
      images: images?.length ? { create: images } : undefined,
      variants: variants?.length ? { create: variants } : undefined,
    },
    include: { images: true, variants: true },
  })

  return NextResponse.json(product, { status: 201 })
}
