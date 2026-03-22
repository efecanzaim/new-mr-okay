'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/layout/AdminLayout'

const ORDER_STATUS: Record<string, { label: string; color: string }> = {
  PENDING:    { label: 'Beklemede',    color: 'bg-amber-900/30 text-amber-400' },
  CONFIRMED:  { label: 'Onaylandı',   color: 'bg-blue-900/30 text-blue-400' },
  PROCESSING: { label: 'Hazırlanıyor',color: 'bg-purple-900/30 text-purple-400' },
  SHIPPED:    { label: 'Kargoda',     color: 'bg-indigo-900/30 text-indigo-400' },
  DELIVERED:  { label: 'Teslim',      color: 'bg-green-900/30 text-green-400' },
  CANCELLED:  { label: 'İptal',       color: 'bg-red-900/30 text-red-400' },
  REFUNDED:   { label: 'İade',        color: 'bg-zinc-800 text-zinc-400' },
}

const PAYMENT_STATUS: Record<string, { label: string; color: string }> = {
  PENDING:  { label: 'Ödeme Bekliyor', color: 'bg-amber-900/30 text-amber-400' },
  PAID:     { label: 'Ödendi',         color: 'bg-green-900/30 text-green-400' },
  FAILED:   { label: 'Başarısız',      color: 'bg-red-900/30 text-red-400' },
  REFUNDED: { label: 'İade Edildi',    color: 'bg-zinc-800 text-zinc-400' },
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n)
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([])
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    if (status) params.set('status', status)
    if (paymentStatus) params.set('paymentStatus', paymentStatus)
    const res = await fetch(`/api/orders?${params}`)
    const data = await res.json()
    setOrders(data.orders || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [search, status, paymentStatus, page])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  return (
    <AdminLayout title="Siparişler">
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1) }}
          placeholder="Sipariş no veya müşteri ara..."
          className="bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm flex-1 focus:outline-none focus:border-zinc-500 transition-colors"
        />
        <select value={status} onChange={e => { setStatus(e.target.value); setPage(1) }}
          className="bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors">
          <option value="">Tüm Durumlar</option>
          {Object.entries(ORDER_STATUS).map(([v, s]) => <option key={v} value={v}>{s.label}</option>)}
        </select>
        <select value={paymentStatus} onChange={e => { setPaymentStatus(e.target.value); setPage(1) }}
          className="bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors">
          <option value="">Tüm Ödemeler</option>
          {Object.entries(PAYMENT_STATUS).map(([v, s]) => <option key={v} value={v}>{s.label}</option>)}
        </select>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Yükleniyor...</div>
        ) : orders.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Sipariş bulunamadı.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-800/40">
                <th className="text-left px-6 py-3 font-medium">Sipariş No</th>
                <th className="text-left px-6 py-3 font-medium">Müşteri</th>
                <th className="text-left px-6 py-3 font-medium">Ürünler</th>
                <th className="text-left px-6 py-3 font-medium">Tutar</th>
                <th className="text-left px-6 py-3 font-medium">Sipariş Durumu</th>
                <th className="text-left px-6 py-3 font-medium">Ödeme</th>
                <th className="text-left px-6 py-3 font-medium">Tarih</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {orders.map((o: any) => {
                const os = ORDER_STATUS[o.status] || { label: o.status, color: 'bg-zinc-800 text-zinc-400' }
                const ps = PAYMENT_STATUS[o.paymentStatus] || { label: o.paymentStatus, color: 'bg-zinc-800 text-zinc-400' }
                return (
                  <tr key={o.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-zinc-400">#{o.orderNumber}</td>
                    <td className="px-6 py-4">
                      <p className="text-zinc-200">{o.user?.name || '—'}</p>
                      <p className="text-xs text-zinc-500">{o.user?.email || o.guestEmail || '—'}</p>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-xs">
                      {o.items.map((item: any) => item.product?.name).join(', ')}
                    </td>
                    <td className="px-6 py-4 font-medium text-zinc-100">{formatPrice(o.total)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${os.color}`}>{os.label}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ps.color}`}>{ps.label}</span>
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-xs">{formatDate(o.createdAt)}</td>
                    <td className="px-6 py-4">
                      <Link href={`/orders/${o.id}`} className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors">
                        Detay →
                      </Link>
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
          <p className="text-sm text-zinc-500">{total} sipariş</p>
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
