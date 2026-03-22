'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
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

function formatPrice(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n)
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default function CustomerDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [customer, setCustomer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/customers/${id}`)
      .then(r => r.json())
      .then(d => { setCustomer(d); setLoading(false) })
  }, [id])

  if (loading) {
    return (
      <AdminLayout title="Müşteri Detayı">
        <div className="flex items-center justify-center h-64 text-zinc-500 text-sm">Yükleniyor...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={customer.name || customer.email}>
      <div className="mb-4">
        <button onClick={() => router.push('/customers')} className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
          ← Müşterilere Dön
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol — Bilgiler */}
        <div className="space-y-5">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="font-medium text-zinc-100 text-sm">Müşteri Bilgileri</h2>

            <div className="w-12 h-12 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <span className="text-lg font-semibold text-zinc-300 uppercase">
                {(customer.name || customer.email).charAt(0)}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-0.5">Ad Soyad</p>
                <p className="text-zinc-200">{customer.name || '—'}</p>
              </div>
              <div>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-0.5">E-posta</p>
                <p className="text-zinc-200">{customer.email}</p>
              </div>
              <div>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-0.5">Telefon</p>
                <p className="text-zinc-200">{customer.phone || '—'}</p>
              </div>
              <div>
                <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-0.5">Kayıt Tarihi</p>
                <p className="text-zinc-200">{formatDate(customer.createdAt)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
              <p className="text-2xl font-semibold text-zinc-100">{customer.orders.length}</p>
              <p className="text-[11px] text-zinc-500 mt-1">Sipariş</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
              <p className="text-lg font-semibold text-zinc-100">{formatPrice(customer.totalSpent)}</p>
              <p className="text-[11px] text-zinc-500 mt-1">Toplam Harcama</p>
            </div>
          </div>
        </div>

        {/* Sağ — Siparişler */}
        <div className="lg:col-span-2">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="font-medium text-zinc-100 text-sm">Sipariş Geçmişi</h2>
            </div>

            {customer.orders.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-zinc-500 text-sm">
                Henüz sipariş yok.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-800/40">
                    <th className="text-left px-6 py-3 font-medium">Sipariş No</th>
                    <th className="text-left px-6 py-3 font-medium">Ürünler</th>
                    <th className="text-left px-6 py-3 font-medium">Tutar</th>
                    <th className="text-left px-6 py-3 font-medium">Durum</th>
                    <th className="text-left px-6 py-3 font-medium">Tarih</th>
                    <th className="px-6 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {customer.orders.map((o: any) => {
                    const s = ORDER_STATUS[o.status] || { label: o.status, color: 'bg-zinc-800 text-zinc-400' }
                    return (
                      <tr key={o.id} className="hover:bg-zinc-800/40 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-zinc-400">#{o.orderNumber}</td>
                        <td className="px-6 py-4 text-zinc-400 text-xs max-w-[200px] truncate">
                          {o.items.map((i: any) => `${i.name} x${i.quantity}`).join(', ')}
                        </td>
                        <td className="px-6 py-4 font-medium text-zinc-100">{formatPrice(o.total)}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.color}`}>{s.label}</span>
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
        </div>
      </div>
    </AdminLayout>
  )
}
