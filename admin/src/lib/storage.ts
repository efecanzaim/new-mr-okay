import path from 'path'
import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), '..', 'site', 'public', 'uploads')

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
const MAX_SIZE = 10 * 1024 * 1024 // 10MB

export async function ensureUploadDir(subDir = '') {
  const dir = path.join(UPLOAD_DIR, subDir)
  await fs.mkdir(dir, { recursive: true })
  return dir
}

export async function saveFile(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
  subDir = ''
): Promise<string> {
  if (!ALLOWED_TYPES.includes(mimeType)) {
    throw new Error('Desteklenmeyen dosya tipi')
  }
  if (buffer.length > MAX_SIZE) {
    throw new Error('Dosya boyutu 10MB\'ı geçemez')
  }

  const ext = path.extname(originalName) || '.jpg'
  const fileName = `${uuidv4()}${ext}`
  const dir = await ensureUploadDir(subDir)
  const filePath = path.join(dir, fileName)

  await fs.writeFile(filePath, buffer)

  return `/uploads/${subDir ? subDir + '/' : ''}${fileName}`
}

export async function deleteFile(filePath: string): Promise<void> {
  const fullPath = path.join(UPLOAD_DIR, '..', filePath)
  try {
    await fs.unlink(fullPath)
  } catch {
    // Dosya zaten silinmiş olabilir
  }
}
