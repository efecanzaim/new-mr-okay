/**
 * Asset path helper - development ve production ortamları için doğru yolu döndürür
 */
export function getAssetPath(path: string): string {
  // Path zaten / ile başlıyorsa, / olmadan devam et
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Production ortamında basePath ekle, development'ta ekleme
  const basePath = process.env.NODE_ENV === 'production' ? '/mr-okay' : '';

  return `${basePath}/${cleanPath}`;
}
