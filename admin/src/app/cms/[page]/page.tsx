'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { AdminLayout } from '@/components/layout/AdminLayout'

const PAGE_META: Record<string, { title: string; prefixes: string[] }> = {
  home:        { title: 'Ana Sayfa',    prefixes: ['home', 'anasayfa', 'hero', 'slider'] },
  products:    { title: 'Ürünler',      prefixes: ['product', 'urun'] },
  collections: { title: 'Koleksiyonlar',prefixes: ['collection', 'koleksiyon'] },
  about:       { title: 'Hakkımızda',   prefixes: ['about', 'hakkimizda'] },
  contact:     { title: 'İletişim',     prefixes: ['contact', 'iletisim'] },
}

const TYPE_META: Record<string, { label: string; color: string }> = {
  HERO:    { label: 'Hero',    color: 'text-purple-400 bg-purple-900/30 border-purple-800/50' },
  SLIDER:  { label: 'Slider', color: 'text-indigo-400 bg-indigo-900/30 border-indigo-800/50' },
  BANNER:  { label: 'Banner', color: 'text-blue-400 bg-blue-900/30 border-blue-800/50' },
  SECTION: { label: 'Bölüm',  color: 'text-zinc-400 bg-zinc-800 border-zinc-700' },
}

export default function CMSPageEditor() {
  const { page } = useParams<{ page: string }>()
  const meta = PAGE_META[page] || { title: page, prefixes: [page] }

  const [contents, setContents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', subtitle: '', image: '', link: '', isActive: true, order: '0' })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [saveError, setSaveError] = useState('')

  const fetchContents = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/content')
    const data = await res.json()
    const all: any[] = data.contents || []
    const filtered = all.filter(c =>
      meta.prefixes.some(prefix => c.key.toLowerCase().startsWith(prefix))
    )
    // If no prefix match, show all (fallback for pages without convention)
    setContents(filtered.length > 0 ? filtered : all)
    setLoading(false)
  }, [page])

  useEffect(() => {
    fetchContents()
    setExpandedId(null)
  }, [fetchContents])

  function toggleBlock(c: any) {
    if (expandedId === c.id) { setExpandedId(null); return }
    setExpandedId(c.id)
    setForm({
      title: c.title || '',
      subtitle: c.subtitle || '',
      image: c.image || '',
      link: c.link || '',
      isActive: c.isActive,
      order: c.order?.toString() || '0',
    })
    setSaveError('')
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

  async function handleSave(id: string) {
    setSaveError('')
    setSaving(true)
    const res = await fetch(`/api/content/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    if (!res.ok) {
      const d = await res.json()
      setSaveError(d.error || 'Bir hata oluştu.')
      return
    }
    fetchContents()
    setExpandedId(null)
  }

  const grouped = (['HERO', 'SLIDER', 'BANNER', 'SECTION'] as const)
    .map(type => ({ type, items: contents.filter(c => c.type === type) }))
    .filter(g => g.items.length > 0)

  const inputCls = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
  const labelCls = "block text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5"

  return (
    <AdminLayout title={`CMS — ${meta.title}`}>
      {loading ? (
        <div className="flex items-center justify-center h-64 text-zinc-500 text-sm">Yükleniyor...</div>
      ) : contents.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 gap-3">
          <svg className="w-12 h-12 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-zinc-500 text-sm">Bu sayfa için henüz içerik eklenmemiş.</p>
          <p className="text-zinc-600 text-xs">
            İçerik key'lerini <span className="font-mono text-zinc-500">"{meta.prefixes[0]}-..."</span> ile başlatın.
          </p>
        </div>
      ) : (
        <div className="space-y-6 max-w-2xl">
          {grouped.map(({ type, items }) => {
            const tm = TYPE_META[type] || { label: type, color: 'text-zinc-400 bg-zinc-800 border-zinc-700' }
            return (
              <div key={type} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-zinc-800 flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wider ${tm.color}`}>
                    {tm.label}
                  </span>
                  <span className="text-xs text-zinc-600">{items.length} blok</span>
                </div>

                <div className="divide-y divide-zinc-800">
                  {items.map(c => (
                    <div key={c.id}>
                      {/* Block header */}
                      <button
                        onClick={() => toggleBlock(c)}
                        className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${
                          expandedId === c.id ? 'bg-zinc-800/50' : 'hover:bg-zinc-800/30'
                        }`}
                      >
                        {c.image ? (
                          <img src={c.image} alt="" className="w-16 h-10 object-cover rounded-lg border border-zinc-700 shrink-0" />
                        ) : (
                          <div className="w-16 h-10 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-zinc-200 truncate">{c.title || c.key}</p>
                          <p className="text-[11px] text-zinc-600 font-mono mt-0.5">{c.key}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {!c.isActive && (
                            <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded border border-zinc-700">Pasif</span>
                          )}
                          <svg
                            className={`w-4 h-4 text-zinc-600 transition-transform ${expandedId === c.id ? 'rotate-180' : ''}`}
                            fill="none" stroke="currentColor" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      {/* Edit form */}
                      {expandedId === c.id && (
                        <div className="px-5 pb-5 pt-3 border-t border-zinc-800/60 bg-zinc-950/30 space-y-4">
                          {saveError && (
                            <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg">{saveError}</div>
                          )}

                          {/* Image */}
                          <div>
                            <label className={labelCls}>Görsel</label>
                            {form.image && (
                              <div className="w-full aspect-video bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 mb-3">
                                <img src={form.image} alt="" className="w-full h-full object-cover" />
                              </div>
                            )}
                            <label className="flex items-center gap-2 border border-dashed border-zinc-700 rounded-lg px-4 py-3 cursor-pointer hover:border-zinc-500 transition-colors">
                              <svg className="w-4 h-4 text-zinc-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                              </svg>
                              <span className="text-sm text-zinc-500">{uploading ? 'Yükleniyor...' : 'Görsel Değiştir'}</span>
                              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                          </div>

                          <div>
                            <label className={labelCls}>Başlık</label>
                            <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className={inputCls} />
                          </div>

                          <div>
                            <label className={labelCls}>Alt Başlık</label>
                            <input value={form.subtitle} onChange={e => setForm(p => ({ ...p, subtitle: e.target.value }))} className={inputCls} />
                          </div>

                          <div>
                            <label className={labelCls}>Yönlendirme Linki</label>
                            <input
                              value={form.link}
                              onChange={e => setForm(p => ({ ...p, link: e.target.value }))}
                              placeholder="/collections/businessman"
                              className={inputCls}
                            />
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-2.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={form.isActive}
                                onChange={e => setForm(p => ({ ...p, isActive: e.target.checked }))}
                                className="w-4 h-4 rounded border-zinc-600 bg-zinc-800"
                              />
                              <span className="text-sm text-zinc-300">Aktif</span>
                            </label>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] text-zinc-500">Sıra</span>
                              <input
                                type="number"
                                value={form.order}
                                onChange={e => setForm(p => ({ ...p, order: e.target.value }))}
                                min="0"
                                className="w-16 bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-2.5 py-1.5 text-sm focus:outline-none focus:border-zinc-500"
                              />
                            </div>
                          </div>

                          <div className="flex gap-3 pt-1">
                            <button
                              onClick={() => handleSave(c.id)}
                              disabled={saving || uploading}
                              className="bg-zinc-100 text-zinc-900 px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition-colors disabled:opacity-50"
                            >
                              {saving ? 'Kaydediliyor...' : 'Kaydet'}
                            </button>
                            <button
                              onClick={() => setExpandedId(null)}
                              className="bg-zinc-800 border border-zinc-700 text-zinc-400 px-4 py-2.5 rounded-lg text-sm hover:border-zinc-600 transition-colors"
                            >
                              Vazgeç
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </AdminLayout>
  )
}
