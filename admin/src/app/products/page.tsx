'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Drawer } from '@/components/ui/Drawer'
import { ProductForm } from '@/components/products/ProductForm'

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  ACTIVE:       { label: 'Aktif',     color: 'bg-green-900/30 text-green-400' },
  INACTIVE:     { label: 'Pasif',     color: 'bg-zinc-800 text-zinc-400' },
  OUT_OF_STOCK: { label: 'Stok Yok', color: 'bg-red-900/30 text-red-400' },
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    if (status) params.set('status', status)
    const res = await fetch(`/api/products?${params}`)
    const data = await res.json()
    setProducts(data.products || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [search, status, page])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" ürünü pasife alınacak. Devam et?`)) return
    await fetch(`/api/products/${id}`, { method: 'DELETE' })
    fetchProducts()
  }

  function handleSuccess() {
    setDrawerOpen(false)
    fetchProducts()
  }

  return (
    <AdminLayout title="Ürünler">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Ürün ara..."
          className="bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm flex-1 focus:outline-none focus:border-zinc-500 transition-colors"
        />
        <select
          value={status}
          onChange={e => { setStatus(e.target.value); setPage(1) }}
          className="bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
        >
          <option value="">Tüm Durumlar</option>
          <option value="ACTIVE">Aktif</option>
          <option value="INACTIVE">Pasif</option>
          <option value="OUT_OF_STOCK">Stok Yok</option>
        </select>
        <button
          onClick={() => setDrawerOpen(true)}
          className="bg-zinc-100 text-zinc-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition-colors whitespace-nowrap"
        >
          + Yeni Ürün
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Yükleniyor...</div>
        ) : products.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Ürün bulunamadı.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-800/40">
                <th className="text-left px-6 py-3 font-medium">Ürün</th>
                <th className="text-left px-6 py-3 font-medium">Kategori</th>
                <th className="text-left px-6 py-3 font-medium">Fiyat</th>
                <th className="text-left px-6 py-3 font-medium">Stok</th>
                <th className="text-left px-6 py-3 font-medium">Durum</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {products.map((p: any) => {
                const totalStock = p.variants?.reduce((s: number, v: any) => s + v.stock, 0) ?? 0
                const s = STATUS_MAP[p.status] || { label: p.status, color: 'bg-zinc-800 text-zinc-400' }
                return (
                  <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {p.images?.[0] ? (
                          <img src={p.images[0].url} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-zinc-700" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg border border-zinc-700 bg-zinc-800 flex items-center justify-center">
                            <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-zinc-200">{p.name}</p>
                          <p className="text-xs text-zinc-500 font-mono">{p.sku || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{p.category?.name || '—'}</td>
                    <td className="px-6 py-4 text-zinc-200 font-medium">
                      {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(p.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${totalStock === 0 ? 'text-red-400' : totalStock < 10 ? 'text-amber-400' : 'text-zinc-200'}`}>
                        {totalStock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.color}`}>{s.label}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 justify-end">
                        <Link href={`/products/${p.id}`} className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors">Düzenle</Link>
                        <button onClick={() => handleDelete(p.id, p.name)} className="text-xs text-red-500 hover:text-red-400 transition-colors">Pasife Al</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      {total > 20 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-zinc-500">{total} ürün</p>
          <div className="flex gap-2">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="px-3 py-1.5 text-sm border border-zinc-700 text-zinc-400 rounded-lg disabled:opacity-40 hover:border-zinc-500 hover:text-zinc-200 transition-colors">
              ← Önceki
            </button>
            <span className="px-3 py-1.5 text-sm text-zinc-500">Sayfa {page}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={page * 20 >= total}
              className="px-3 py-1.5 text-sm border border-zinc-700 text-zinc-400 rounded-lg disabled:opacity-40 hover:border-zinc-500 hover:text-zinc-200 transition-colors">
              Sonraki →
            </button>
          </div>
        </div>
      )}

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Yeni Ürün" width="max-w-3xl">
        <ProductForm onSuccess={handleSuccess} />
      </Drawer>
    </AdminLayout>
  )
}
