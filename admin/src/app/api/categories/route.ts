import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const categories = await db.category.findMany({ orderBy: { name: 'asc' } })
  return NextResponse.json({ categories })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { name, slug, description } = await req.json()
  if (!name || !slug) return NextResponse.json({ error: 'Ad ve slug zorunludur.' }, { status: 400 })

  const category = await db.category.create({ data: { name, slug, description } })
  return NextResponse.json(category, { status: 201 })
}
