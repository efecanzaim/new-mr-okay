import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { saveFile } from '@/lib/storage'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const subDir = (formData.get('dir') as string) || 'products'

  if (!file) return NextResponse.json({ error: 'Dosya bulunamadı.' }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const url = await saveFile(buffer, file.name, file.type, subDir)

  return NextResponse.json({ url })
}
