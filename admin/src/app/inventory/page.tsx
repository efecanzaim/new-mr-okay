'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/layout/AdminLayout'

export default function InventoryPage() {
  const [variants, setVariants] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // all | low | out
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [stockEdits, setStockEdits] = useState<Record<string, string>>({})

  const fetchInventory = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), inventory: '1' })
    if (search) params.set('search', search)
    if (filter !== 'all') params.set('stockFilter', filter)
    const res = await fetch(`/api/products?${params}`)
    const data = await res.json()

    // Flatten variants from all products
    const allVariants: any[] = []
    for (const product of data.products || []) {
      for (const variant of product.variants || []) {
        allVariants.push({
          variantId: variant.id,
          variantName: variant.name,
          stock: variant.stock,
          sku: variant.sku,
          productId: product.id,
          productName: product.name,
          productImage: product.images?.[0]?.url || null,
          category: product.category?.name || '—',
        })
      }
    }

    // Client-side filter by stock
    const filtered = allVariants.filter(v => {
      if (filter === 'low') return v.stock > 0 && v.stock <= 5
      if (filter === 'out') return v.stock === 0
      return true
    })

    setVariants(filtered)
    setTotal(data.total || 0)
    setLoading(false)
  }, [search, filter, page])

  useEffect(() => { fetchInventory() }, [fetchInventory])

  async function updateStock(variantId: string, productId: string) {
    const newStock = parseInt(stockEdits[variantId])
    if (isNaN(newStock) || newStock < 0) return
    setUpdating(variantId)

    // Get current product data first
    const res = await fetch(`/api/products/${productId}`)
    const product = await res.json()

    const updatedVariants = product.variants.map((v: any) =>
      v.id === variantId ? { ...v, stock: newStock } : v
    )

    await fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...product, variants: updatedVariants }),
    })

    setUpdating(null)
    setStockEdits(prev => { const n = { ...prev }; delete n[variantId]; return n })
    fetchInventory()
  }

  const outOfStock = variants.filter(v => v.stock === 0).length
  const lowStock = variants.filter(v => v.stock > 0 && v.stock <= 5).length

  return (
    <AdminLayout title="Stok Yönetimi">
      {/* Özet */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">Toplam Varyant</p>
          <p className="text-2xl font-semibold text-zinc-100">{variants.length}</p>
        </div>
        <div className="bg-zinc-900 border border-amber-900/40 rounded-xl p-4">
          <p className="text-[11px] text-amber-500 uppercase tracking-wider mb-1">Düşük Stok (≤5)</p>
          <p className="text-2xl font-semibold text-amber-400">{lowStock}</p>
        </div>
        <div className="bg-zinc-900 border border-red-900/40 rounded-xl p-4">
          <p className="text-[11px] text-red-500 uppercase tracking-wider mb-1">Tükendi</p>
          <p className="text-2xl font-semibold text-red-400">{outOfStock}</p>
        </div>
      </div>

      {/* Filtreler */}
      <div className="flex gap-3 mb-6">
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Ürün adı veya SKU ara..."
          className="bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm flex-1 focus:outline-none focus:border-zinc-500 transition-colors"
        />
        <div className="flex gap-0.5 bg-zinc-800 p-1 rounded-lg">
          {[
            { value: 'all', label: 'Tümü' },
            { value: 'low', label: 'Düşük Stok' },
            { value: 'out', label: 'Tükendi' },
          ].map(opt => (
            <button key={opt.value} onClick={() => { setFilter(opt.value); setPage(1) }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${filter === opt.value ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-500 hover:text-zinc-300'}`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tablo */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Yükleniyor...</div>
        ) : variants.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Sonuç bulunamadı.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-800/40">
                <th className="text-left px-6 py-3 font-medium">Ürün</th>
                <th className="text-left px-6 py-3 font-medium">Varyant</th>
                <th className="text-left px-6 py-3 font-medium">SKU</th>
                <th className="text-left px-6 py-3 font-medium">Kategori</th>
                <th className="text-left px-6 py-3 font-medium">Stok</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {variants.map((v: any) => {
                const stockVal = stockEdits[v.variantId] !== undefined ? stockEdits[v.variantId] : String(v.stock)
                const isEditing = stockEdits[v.variantId] !== undefined
                return (
                  <tr key={v.variantId} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {v.productImage ? (
                          <img src={v.productImage} alt={v.productName} className="w-9 h-9 object-cover rounded border border-zinc-700" />
                        ) : (
                          <div className="w-9 h-9 rounded border border-zinc-700 bg-zinc-800" />
                        )}
                        <Link href={`/products/${v.productId}`} className="font-medium text-zinc-200 hover:text-zinc-100 transition-colors">
                          {v.productName}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{v.variantName}</td>
                    <td className="px-6 py-4 font-mono text-xs text-zinc-500">{v.sku || '—'}</td>
                    <td className="px-6 py-4 text-zinc-400">{v.category}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          value={stockVal}
                          onChange={e => setStockEdits(prev => ({ ...prev, [v.variantId]: e.target.value }))}
                          className="w-20 bg-zinc-800 border border-zinc-700 text-zinc-100 rounded px-2 py-1 text-sm focus:outline-none focus:border-zinc-500"
                        />
                        <span className={`text-xs font-medium ${v.stock === 0 ? 'text-red-400' : v.stock <= 5 ? 'text-amber-400' : 'text-zinc-600'}`}>
                          {v.stock === 0 ? 'Tükendi' : v.stock <= 5 ? 'Düşük' : ''}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {isEditing && (
                        <button
                          onClick={() => updateStock(v.variantId, v.productId)}
                          disabled={updating === v.variantId}
                          className="text-xs bg-zinc-100 text-zinc-900 px-3 py-1.5 rounded-lg font-medium hover:bg-white transition-colors disabled:opacity-50">
                          {updating === v.variantId ? 'Kaydediliyor...' : 'Kaydet'}
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  )
}
