'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Variant {
  id?: string
  name: string
  sku: string
  price: string
  stock: string
}

interface Image {
  id?: string
  url: string
  alt: string
  order: number
}

interface ProductFormProps {
  initialData?: any
  isEdit?: boolean
  onSuccess?: () => void
}

export function ProductForm({ initialData, isEdit, onSuccess }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null)

  const [form, setForm] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    price: initialData?.price?.toString() || '',
    comparePrice: initialData?.comparePrice?.toString() || '',
    sku: initialData?.sku || '',
    status: initialData?.status || 'ACTIVE',
    featured: initialData?.featured || false,
    categoryId: initialData?.categoryId || '',
  })

  const [variants, setVariants] = useState<Variant[]>(
    initialData?.variants?.map((v: any) => ({
      id: v.id, name: v.name, sku: v.sku || '', price: v.price?.toString() || '', stock: v.stock?.toString() || '0',
    })) || [{ name: '50ml', sku: '', price: '', stock: '0' }]
  )

  const [images, setImages] = useState<Image[]>(
    initialData?.images?.map((img: any) => ({ id: img.id, url: img.url, alt: img.alt || '', order: img.order })) || []
  )

  useEffect(() => {
    fetch('/api/categories').then(r => r.json()).then(d => setCategories(d.categories || []))
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  function autoSlug(name: string) {
    return name.toLowerCase().trim()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value
    setForm(prev => ({ ...prev, name, slug: isEdit ? prev.slug : autoSlug(name) }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    for (const file of files) {
      const idx = images.length
      setUploadingIdx(idx)
      const fd = new FormData()
      fd.append('file', file)
      fd.append('dir', 'products')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) setImages(prev => [...prev, { url: data.url, alt: form.name, order: prev.length }])
      setUploadingIdx(null)
    }
    e.target.value = ''
  }

  function removeImage(idx: number) {
    setImages(prev => prev.filter((_, i) => i !== idx).map((img, i) => ({ ...img, order: i })))
  }

  function addVariant() { setVariants(prev => [...prev, { name: '', sku: '', price: '', stock: '0' }]) }
  function removeVariant(idx: number) { setVariants(prev => prev.filter((_, i) => i !== idx)) }
  function updateVariant(idx: number, field: keyof Variant, value: string) {
    setVariants(prev => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const payload = {
      ...form,
      images: images.map((img, i) => ({ url: img.url, alt: img.alt, order: i })),
      variants: variants.map(v => ({ name: v.name, sku: v.sku || null, price: v.price ? parseFloat(v.price) : null, stock: parseInt(v.stock) || 0 })),
    }

    const url = isEdit ? `/api/products/${initialData.id}` : '/api/products'
    const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    setLoading(false)

    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Bir hata oluştu.')
      return
    }

    if (onSuccess) { onSuccess(); return }
    router.push('/products')
    router.refresh()
  }

  const inputCls = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
  const labelCls = "block text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol — Ana Bilgiler */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="font-medium text-zinc-300 text-xs uppercase tracking-wider">Ürün Bilgileri</h2>

            <div>
              <label className={labelCls}>Ürün Adı *</label>
              <input name="name" value={form.name} onChange={handleNameChange} required className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Slug *</label>
              <input name="slug" value={form.slug} onChange={handleChange} required className={`${inputCls} font-mono`} />
            </div>
            <div>
              <label className={labelCls}>Açıklama</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                className={`${inputCls} resize-none`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Fiyat (TRY) *</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required min="0" step="0.01" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Karşılaştırma Fiyatı</label>
                <input name="comparePrice" type="number" value={form.comparePrice} onChange={handleChange} min="0" step="0.01" className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>SKU</label>
              <input name="sku" value={form.sku} onChange={handleChange} className={`${inputCls} font-mono`} />
            </div>
          </div>

          {/* Varyantlar */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-zinc-300 text-xs uppercase tracking-wider">Varyantlar & Stok</h2>
              <button type="button" onClick={addVariant}
                className="text-xs text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-lg hover:border-zinc-500 hover:text-zinc-200 transition-colors">
                + Varyant Ekle
              </button>
            </div>
            <div className="space-y-3">
              {variants.map((v, i) => (
                <div key={i} className="grid grid-cols-4 gap-3 items-end">
                  <div>
                    <label className="block text-[11px] text-zinc-600 mb-1">Ad</label>
                    <input value={v.name} onChange={e => updateVariant(i, 'name', e.target.value)} placeholder="50ml"
                      className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-600 mb-1">Fiyat</label>
                    <input value={v.price} onChange={e => updateVariant(i, 'price', e.target.value)} type="number" placeholder="0"
                      className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                  </div>
                  <div>
                    <label className="block text-[11px] text-zinc-600 mb-1">Stok</label>
                    <input value={v.stock} onChange={e => updateVariant(i, 'stock', e.target.value)} type="number" min="0"
                      className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zinc-500" />
                  </div>
                  <button type="button" onClick={() => removeVariant(i)}
                    className="text-red-500 hover:text-red-400 text-xs pb-0.5 transition-colors">
                    Sil
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Görseller */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="font-medium text-zinc-300 text-xs uppercase tracking-wider">Görseller</h2>
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-xl p-8 cursor-pointer hover:border-zinc-500 transition-colors">
              <svg className="w-8 h-8 text-zinc-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm text-zinc-500">Görsel yükle</span>
              <span className="text-xs text-zinc-600 mt-1">PNG, JPG, WebP — maks. 10MB</span>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {uploadingIdx !== null && <p className="text-xs text-zinc-500 text-center">Yükleniyor...</p>}
            {images.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, i) => (
                  <div key={i} className="relative group aspect-square">
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover rounded-lg border border-zinc-700" />
                    {i === 0 && (
                      <span className="absolute top-1 left-1 bg-zinc-100 text-zinc-900 text-[10px] px-1.5 py-0.5 rounded font-medium">Ana</span>
                    )}
                    <button type="button" onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sağ — Ayarlar */}
        <div className="space-y-5">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="font-medium text-zinc-300 text-xs uppercase tracking-wider">Ayarlar</h2>
            <div>
              <label className={labelCls}>Durum</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors">
                <option value="ACTIVE">Aktif</option>
                <option value="INACTIVE">Pasif</option>
                <option value="OUT_OF_STOCK">Stok Yok</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Kategori</label>
              <select name="categoryId" value={form.categoryId} onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors">
                <option value="">Kategori seç</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <input type="checkbox" id="featured" name="featured" checked={form.featured}
                onChange={e => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                className="w-4 h-4 rounded border-zinc-600 bg-zinc-800" />
              <label htmlFor="featured" className="text-sm text-zinc-300">Öne çıkan ürün</label>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button type="submit" disabled={loading}
              className="w-full bg-zinc-100 text-zinc-900 py-3 rounded-xl text-sm font-medium hover:bg-white transition-colors disabled:opacity-50">
              {loading ? 'Kaydediliyor...' : isEdit ? 'Güncelle' : 'Ürün Oluştur'}
            </button>
            <button type="button" onClick={() => router.push('/products')}
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-300 py-3 rounded-xl text-sm hover:border-zinc-500 transition-colors">
              İptal
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
