'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Drawer } from '@/components/ui/Drawer'

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  HERO:    { label: 'Hero',    color: 'bg-purple-900/30 text-purple-400' },
  BANNER:  { label: 'Banner', color: 'bg-blue-900/30 text-blue-400' },
  SLIDER:  { label: 'Slider', color: 'bg-indigo-900/30 text-indigo-400' },
  SECTION: { label: 'Section',color: 'bg-zinc-800 text-zinc-400' },
}

export default function ContentPage() {
  const [contents, setContents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editContent, setEditContent] = useState<any>(null)
  const [form, setForm] = useState({ title: '', subtitle: '', image: '', link: '', isActive: true, order: '0' })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formError, setFormError] = useState('')

  const fetchContents = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/content')
    const data = await res.json()
    setContents(data.contents || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchContents() }, [fetchContents])

  async function openEdit(id: string) {
    const res = await fetch(`/api/content/${id}`)
    const d = await res.json()
    setEditContent(d)
    setForm({ title: d.title || '', subtitle: d.subtitle || '', image: d.image || '', link: d.link || '', isActive: d.isActive, order: d.order?.toString() || '0' })
    setFormError('')
    setDrawerOpen(true)
  }

  function closeDrawer() {
    setDrawerOpen(false)
    setEditContent(null)
    setFormError('')
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
    setFormError('')
    setSaving(true)
    const res = await fetch(`/api/content/${editContent.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
    })
    setSaving(false)
    if (!res.ok) {
      const d = await res.json()
      setFormError(d.error || 'Bir hata oluştu.')
      return
    }
    closeDrawer()
    fetchContents()
  }

  const grouped = contents.reduce((acc: Record<string, any[]>, c: any) => {
    if (!acc[c.type]) acc[c.type] = []
    acc[c.type].push(c)
    return acc
  }, {})

  const inputCls = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
  const labelCls = "block text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5"

  return (
    <AdminLayout title="İçerik Yönetimi (CMS)">
      <p className="text-sm text-zinc-500 mb-6">
        Sitedeki hero, banner ve slider görsellerini, başlıklarını ve yönlendirme linklerini buradan düzenleyebilirsiniz.
      </p>

      {loading ? (
        <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Yükleniyor...</div>
      ) : (
        <div className="space-y-8">
          {['HERO', 'SLIDER', 'BANNER', 'SECTION'].map(type => {
            const items = grouped[type]
            if (!items?.length) return null
            const t = TYPE_LABELS[type]
            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${t.color}`}>{t.label}</span>
                  <span className="text-xs text-zinc-600">{items.length} içerik</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {items.map((c: any) => (
                    <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group hover:border-zinc-700 transition-colors">
                      <div className="relative aspect-video bg-zinc-800">
                        {c.image ? (
                          <img src={c.image} alt={c.title || c.key} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        {!c.isActive && (
                          <div className="absolute inset-0 bg-zinc-950/70 flex items-center justify-center">
                            <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded border border-zinc-700">Pasif</span>
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-medium text-zinc-200 text-sm truncate">{c.title || c.key}</p>
                            <p className="text-xs text-zinc-600 font-mono mt-0.5">{c.key}</p>
                            {c.link && (
                              <p className="text-xs text-blue-400 mt-1 truncate">{c.link}</p>
                            )}
                          </div>
                          <button onClick={() => openEdit(c.id)}
                            className="shrink-0 text-xs text-zinc-400 border border-zinc-700 px-3 py-1.5 rounded-lg hover:border-zinc-500 hover:text-zinc-200 transition-colors">
                            Düzenle
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Drawer open={drawerOpen} onClose={closeDrawer} title={`İçerik Düzenle — ${editContent?.key || ''}`}>
        <form onSubmit={handleSave} className="space-y-5">
          {formError && (
            <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg">{formError}</div>
          )}

          {/* Görsel */}
          <div>
            <label className={labelCls}>Görsel</label>
            <div className="aspect-video bg-zinc-800 rounded-xl overflow-hidden mb-3">
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
            <label className="flex items-center justify-center gap-2 border border-dashed border-zinc-700 rounded-lg px-4 py-3 cursor-pointer hover:border-zinc-500 transition-colors">
              <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="text-sm text-zinc-500">{uploading ? 'Yükleniyor...' : 'Görsel Değiştir'}</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>

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
          <div className="flex items-center gap-3">
            <input type="checkbox" id="isActive" name="isActive" checked={form.isActive}
              onChange={e => setForm(prev => ({ ...prev, isActive: e.target.checked }))}
              className="w-4 h-4 rounded border-zinc-600 bg-zinc-800" />
            <label htmlFor="isActive" className="text-sm text-zinc-300">Aktif (sitede göster)</label>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="bg-zinc-100 text-zinc-900 px-6 py-3 rounded-xl text-sm font-medium hover:bg-white transition-colors disabled:opacity-50">
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
            <button type="button" onClick={closeDrawer}
              className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-6 py-3 rounded-xl text-sm hover:border-zinc-500 transition-colors">
              İptal
            </button>
          </div>
        </form>
      </Drawer>
    </AdminLayout>
  )
}
