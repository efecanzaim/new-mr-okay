import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const campaigns = await db.campaign.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json({ campaigns })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { name, type, image, link, title, description, isActive, countries, startsAt, expiresAt } = body

  if (!name || !type) {
    return NextResponse.json({ error: 'Ad ve tip zorunludur.' }, { status: 400 })
  }

  const campaign = await db.campaign.create({
    data: {
      name,
      type,
      image: image || null,
      link: link || null,
      title: title || null,
      description: description || null,
      isActive: isActive ?? true,
      countries: countries || [],
      startsAt: startsAt ? new Date(startsAt) : null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    },
  })

  return NextResponse.json(campaign, { status: 201 })
}
