'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/layout/AdminLayout'

const TYPE_LABELS: Record<string, string> = {
  HERO: 'Hero', BANNER: 'Banner', SLIDER: 'Slider', SECTION: 'Section',
}

export default function EditContentPage() {
  const { id } = useParams()
  const router = useRouter()
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '', subtitle: '', image: '', link: '', isActive: true, order: '0',
  })

  useEffect(() => {
    fetch(`/api/content/${id}`)
      .then(r => r.json())
      .then(d => {
        setContent(d)
        setForm({ title: d.title || '', subtitle: d.subtitle || '', image: d.image || '', link: d.link || '', isActive: d.isActive, order: d.order?.toString() || '0' })
        setLoading(false)
      })
  }, [id])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    fd.append('dir', 'content')
    const res = await fetch('/api/upload', { method: 'POST', body: fd })
    const data = await res.json()
    if (data.url) setForm(prev => ({ ...prev, image: data.url }))
    setUploading(false)
    e.target.value = ''
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)
    const res = await fetch(`/api/content/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    setSaving(false)
    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Bir hata oluştu.')
      return
    }
    router.push('/content')
    router.refresh()
  }

  if (loading) {
    return (
      <AdminLayout title="İçerik Düzenle">
        <div className="flex items-center justify-center h-64 text-zinc-500 text-sm">Yükleniyor...</div>
      </AdminLayout>
    )
  }

  const inputCls = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
  const labelCls = "block text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5"

  return (
    <AdminLayout title={`İçerik Düzenle — ${content?.key}`}>
      <div className="mb-4">
        <button onClick={() => router.push('/content')} className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
          ← İçeriklere Dön
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-4xl">
        {/* Sol — Önizleme */}
        <div className="space-y-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-zinc-800">
              <p className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Mevcut Görsel</p>
            </div>
            <div className="aspect-video bg-zinc-800">
              {form.image ? (
                <img src={form.image} alt="Önizleme" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="p-4">
              <label className="flex items-center justify-center gap-2 border border-dashed border-zinc-700 rounded-lg px-4 py-3 cursor-pointer hover:border-zinc-500 transition-colors">
                <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span className="text-sm text-zinc-500">{uploading ? 'Yükleniyor...' : 'Görsel Değiştir'}</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2 text-xs text-zinc-500">
            <p><span className="font-medium text-zinc-400">Key:</span> {content?.key}</p>
            <p><span className="font-medium text-zinc-400">Tip:</span> {TYPE_LABELS[content?.type] || content?.type}</p>
          </div>
        </div>

        {/* Sağ — Form */}
        <div className="lg:col-span-2 space-y-5">
          {error && (
            <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg">{error}</div>
          )}

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <div>
              <label className={labelCls}>Başlık</label>
              <input name="title" value={form.title} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Alt Başlık</label>
              <input name="subtitle" value={form.subtitle} onChange={handleChange} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Yönlendirme Linki</label>
              <input name="link" value={form.link} onChange={handleChange}
                placeholder="/collections/businessman" className={inputCls} />
              <p className="text-xs text-zinc-600 mt-1">Görsele tıklandığında bu sayfaya yönlendirir.</p>
            </div>
            <div>
              <label className={labelCls}>Sıra</label>
              <input name="order" type="number" value={form.order} onChange={handleChange} min="0"
                className="w-24 bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500" />
            </div>
            <div className="flex items-center gap-3 pt-1">
              <input type="checkbox" id="isActive" name="isActive" checked={form.isActive}
                onChange={e => setForm(prev => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4 rounded border-zinc-600 bg-zinc-800" />
              <label htmlFor="isActive" className="text-sm text-zinc-300">Aktif (sitede göster)</label>
            </div>
          </div>

          <div className="flex gap-3">
            <button type="submit" disabled={saving}
              className="bg-zinc-100 text-zinc-900 px-6 py-3 rounded-xl text-sm font-medium hover:bg-white transition-colors disabled:opacity-50">
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button type="button" onClick={() => router.push('/content')}
              className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-6 py-3 rounded-xl text-sm hover:border-zinc-500 transition-colors">
              İptal
            </button>
          </div>
        </div>
      </form>
    </AdminLayout>
  )
}
