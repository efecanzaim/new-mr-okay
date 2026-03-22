'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CampaignFormProps {
  initialData?: any
  isEdit?: boolean
  onSuccess?: () => void
}

const COUNTRIES = [
  { code: 'TR', label: 'Türkiye' },
  { code: 'DE', label: 'Almanya' },
  { code: 'FR', label: 'Fransa' },
  { code: 'SA', label: 'Suudi Arabistan' },
  { code: 'AE', label: 'BAE' },
  { code: 'EG', label: 'Mısır' },
  { code: 'US', label: 'ABD' },
  { code: 'GB', label: 'İngiltere' },
]

function toInputDate(d: string | null | undefined) {
  if (!d) return ''
  return new Date(d).toISOString().slice(0, 16)
}

export function CampaignForm({ initialData, isEdit, onSuccess }: CampaignFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    name: initialData?.name || '',
    type: initialData?.type || 'BANNER',
    image: initialData?.image || '',
    link: initialData?.link || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    isActive: initialData?.isActive ?? true,
    countries: (initialData?.countries as string[]) || [],
    startsAt: toInputDate(initialData?.startsAt),
    expiresAt: toInputDate(initialData?.expiresAt),
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  function toggleCountry(code: string) {
    setForm(prev => ({
      ...prev,
      countries: prev.countries.includes(code) ? prev.countries.filter(c => c !== code) : [...prev.countries, code],
    }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('dir', 'campaigns')
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.url) setForm(prev => ({ ...prev, image: data.url }))
    setUploading(false)
    e.target.value = ''
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const url = isEdit ? `/api/campaigns/${initialData.id}` : '/api/campaigns'
    const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setLoading(false)
    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Bir hata oluştu.')
      return
    }
    if (onSuccess) { onSuccess(); return }
    router.push('/campaigns')
    router.refresh()
  }

  const inputCls = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
  const labelCls = "block text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg">{error}</div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Kampanya Adı *</label>
            <input name="name" value={form.name} onChange={handleChange} required
              placeholder="Yılbaşı Kampanyası" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Tip *</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors">
              <option value="BANNER">Banner</option>
              <option value="POPUP">Popup</option>
              <option value="DISCOUNT">İndirim</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelCls}>Başlık</label>
          <input name="title" value={form.title} onChange={handleChange}
            placeholder="Yılbaşına Özel %20 İndirim" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Açıklama</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows={2}
            placeholder="Kampanya açıklaması..." className={`${inputCls} resize-none`} />
        </div>

        <div>
          <label className={labelCls}>Görsel</label>
          <div className="flex items-center gap-3">
            <label className="flex-1 flex items-center gap-2 border border-dashed border-zinc-700 rounded-lg px-4 py-3 cursor-pointer hover:border-zinc-500 transition-colors">
              <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-zinc-500">{uploading ? 'Yükleniyor...' : 'Görsel seç'}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {form.image && (
              <img src={form.image} alt="Önizleme" className="w-16 h-16 object-cover rounded-lg border border-zinc-700" />
            )}
          </div>
        </div>

        <div>
          <label className={labelCls}>Yönlendirme Linki</label>
          <input name="link" value={form.link} onChange={handleChange}
            placeholder="/collections/businessman" className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>
            Hedef Ülkeler <span className="normal-case text-zinc-600 font-normal">(boşsa herkese göster)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES.map(c => (
              <button key={c.code} type="button" onClick={() => toggleCountry(c.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  form.countries.includes(c.code)
                    ? 'bg-zinc-200 text-zinc-900 border-zinc-200'
                    : 'bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-200'
                }`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Başlangıç</label>
            <input name="startsAt" type="datetime-local" value={form.startsAt} onChange={handleChange}
              className={`${inputCls} [color-scheme:dark]`} />
          </div>
          <div>
            <label className={labelCls}>Bitiş</label>
            <input name="expiresAt" type="datetime-local" value={form.expiresAt} onChange={handleChange}
              className={`${inputCls} [color-scheme:dark]`} />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <input type="checkbox" id="isActive" checked={form.isActive}
            onChange={e => setForm(prev => ({ ...prev, isActive: e.target.checked }))}
            className="w-4 h-4 rounded border-zinc-600 bg-zinc-800" />
          <label htmlFor="isActive" className="text-sm text-zinc-300">Aktif</label>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="bg-zinc-100 text-zinc-900 px-6 py-3 rounded-xl text-sm font-medium hover:bg-white transition-colors disabled:opacity-50">
          {loading ? 'Kaydediliyor...' : isEdit ? 'Güncelle' : 'Kampanya Oluştur'}
        </button>
        <button type="button" onClick={() => router.push('/campaigns')}
          className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-6 py-3 rounded-xl text-sm hover:border-zinc-500 transition-colors">
          İptal
        </button>
      </div>
    </form>
  )
}
