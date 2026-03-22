'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Drawer } from '@/components/ui/Drawer'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState('')

  const [editId, setEditId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: '', slug: '', description: '' })
  const [drawerOpen, setDrawerOpen] = useState(false)

  const fetchCategories = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/categories')
    const data = await res.json()
    setCategories(data.categories || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchCategories() }, [fetchCategories])

  function autoSlug(name: string) {
    return name.toLowerCase().trim()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function openNew() {
    setEditId(null)
    setForm({ name: '', slug: '', description: '' })
    setError('')
    setDrawerOpen(true)
  }

  function openEdit(c: any) {
    setEditId(c.id)
    setForm({ name: c.name, slug: c.slug, description: c.description || '' })
    setError('')
    setDrawerOpen(true)
  }

  function closeDrawer() {
    setDrawerOpen(false)
    setEditId(null)
    setForm({ name: '', slug: '', description: '' })
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSaving(true)

    const url = editId ? `/api/categories/${editId}` : '/api/categories'
    const method = editId ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    setSaving(false)

    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Bir hata oluştu.')
      return
    }

    closeDrawer()
    fetchCategories()
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" kategorisi silinecek. Devam et?`)) return
    setDeleting(id)
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' })
    setDeleting(null)

    if (!res.ok) {
      const d = await res.json()
      alert(d.error || 'Silme başarısız.')
      return
    }

    fetchCategories()
  }

  const inputCls = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
  const labelCls = "block text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5"

  return (
    <AdminLayout title="Kategoriler">
      <div className="flex justify-end mb-6">
        <button onClick={openNew}
          className="bg-zinc-100 text-zinc-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition-colors">
          + Yeni Kategori
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Yükleniyor...</div>
        ) : categories.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Kategori bulunamadı.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-800/40">
                <th className="text-left px-6 py-3 font-medium">Kategori Adı</th>
                <th className="text-left px-6 py-3 font-medium">Slug</th>
                <th className="text-left px-6 py-3 font-medium">Açıklama</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {categories.map((c: any) => (
                <tr key={c.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="px-6 py-4 font-medium text-zinc-200">{c.name}</td>
                  <td className="px-6 py-4 font-mono text-xs text-zinc-500">{c.slug}</td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">{c.description || '—'}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 justify-end">
                      <button onClick={() => openEdit(c)}
                        className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors">
                        Düzenle
                      </button>
                      <button
                        onClick={() => handleDelete(c.id, c.name)}
                        disabled={deleting === c.id}
                        className="text-xs text-red-500 hover:text-red-400 transition-colors disabled:opacity-40">
                        {deleting === c.id ? 'Siliniyor...' : 'Sil'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Drawer open={drawerOpen} onClose={closeDrawer} title={editId ? 'Kategori Düzenle' : 'Yeni Kategori'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg">{error}</div>
          )}
          <div>
            <label className={labelCls}>Kategori Adı *</label>
            <input
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value, slug: editId ? prev.slug : autoSlug(e.target.value) }))}
              required
              placeholder="Businessman"
              className={inputCls}
            />
          </div>
          <div>
            <label className={labelCls}>Slug *</label>
            <input
              value={form.slug}
              onChange={e => setForm(prev => ({ ...prev, slug: e.target.value }))}
              required
              placeholder="businessman"
              className={`${inputCls} font-mono`}
            />
          </div>
          <div>
            <label className={labelCls}>Açıklama</label>
            <input
              value={form.description}
              onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Kategori açıklaması"
              className={inputCls}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving}
              className="bg-zinc-100 text-zinc-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition-colors disabled:opacity-50">
              {saving ? 'Kaydediliyor...' : editId ? 'Güncelle' : 'Oluştur'}
            </button>
            <button type="button" onClick={closeDrawer}
              className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-5 py-2.5 rounded-lg text-sm hover:border-zinc-500 transition-colors">
              İptal
            </button>
          </div>
        </form>
      </Drawer>
    </AdminLayout>
  )
}
