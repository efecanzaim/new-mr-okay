'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/layout/AdminLayout'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n)
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchCustomers = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    const res = await fetch(`/api/customers?${params}`)
    const data = await res.json()
    setCustomers(data.customers || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [search, page])

  useEffect(() => { fetchCustomers() }, [fetchCustomers])

  return (
    <AdminLayout title="Müşteriler">
      <div className="flex gap-3 mb-6">
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="İsim, e-posta veya telefon ara..."
          className="bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm flex-1 focus:outline-none focus:border-zinc-500 transition-colors"
        />
        <div className="flex items-center px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-500">
          {total} müşteri
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Yükleniyor...</div>
        ) : customers.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Müşteri bulunamadı.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-800/40">
                <th className="text-left px-6 py-3 font-medium">Müşteri</th>
                <th className="text-left px-6 py-3 font-medium">Telefon</th>
                <th className="text-left px-6 py-3 font-medium">Sipariş</th>
                <th className="text-left px-6 py-3 font-medium">Toplam Harcama</th>
                <th className="text-left px-6 py-3 font-medium">Kayıt Tarihi</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {customers.map((c: any) => (
                <tr key={c.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-zinc-200">{c.name || '—'}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{c.email}</p>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 text-sm">{c.phone || '—'}</td>
                  <td className="px-6 py-4">
                    <span className="text-zinc-200 font-medium">{c.orderCount}</span>
                    <span className="text-zinc-600 text-xs ml-1">sipariş</span>
                  </td>
                  <td className="px-6 py-4 text-zinc-100 font-medium">
                    {c.totalSpent > 0 ? formatPrice(c.totalSpent) : <span className="text-zinc-600">—</span>}
                  </td>
                  <td className="px-6 py-4 text-zinc-500 text-xs">{formatDate(c.createdAt)}</td>
                  <td className="px-6 py-4">
                    <Link href={`/customers/${c.id}`} className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors">
                      Detay →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {total > 20 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-zinc-500">{total} müşteri</p>
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
    </AdminLayout>
  )
}
