'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/layout/AdminLayout'

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  PENDING:    { label: 'Beklemede',    color: 'bg-amber-900/30 text-amber-400' },
  CONFIRMED:  { label: 'Onaylandı',   color: 'bg-blue-900/30 text-blue-400' },
  PROCESSING: { label: 'Hazırlanıyor',color: 'bg-purple-900/30 text-purple-400' },
  SHIPPED:    { label: 'Kargoda',     color: 'bg-indigo-900/30 text-indigo-400' },
  DELIVERED:  { label: 'Teslim',      color: 'bg-green-900/30 text-green-400' },
  CANCELLED:  { label: 'İptal',       color: 'bg-red-900/30 text-red-400' },
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <p className="text-[11px] text-zinc-500 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-semibold text-zinc-100">{value}</p>
      {sub && <p className="text-xs text-zinc-500 mt-1">{sub}</p>}
    </div>
  )
}

function formatPrice(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n)
}

export default function DashboardPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/dashboard')
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center h-64">
          <div className="text-zinc-500 text-sm">Yükleniyor...</div>
        </div>
      </AdminLayout>
    )
  }

  const { stats, recentOrders, topProducts } = data

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Bugünkü Gelir"       value={formatPrice(stats.todayRevenue)}  sub={`${stats.todayOrders} sipariş`} />
        <StatCard label="Bu Ay Gelir"         value={formatPrice(stats.monthRevenue)}  sub={`${stats.monthOrders} sipariş`} />
        <StatCard label="Toplam Gelir"        value={formatPrice(stats.totalRevenue)}  sub={`${stats.totalOrders} sipariş`} />
        <StatCard label="Bekleyen Siparişler" value={String(stats.pendingOrders)}      sub="ödeme bekleniyor" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Son Siparişler */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2 className="font-medium text-zinc-100 text-sm">Son Siparişler</h2>
          </div>
          {recentOrders.length === 0 ? (
            <div className="px-6 py-10 text-center text-zinc-500 text-sm">Henüz sipariş yok.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-800/40">
                  <th className="text-left px-6 py-3 font-medium">Sipariş No</th>
                  <th className="text-left px-6 py-3 font-medium">Müşteri</th>
                  <th className="text-left px-6 py-3 font-medium">Tutar</th>
                  <th className="text-left px-6 py-3 font-medium">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {recentOrders.map((order: any) => {
                  const status = STATUS_LABELS[order.status] || { label: order.status, color: 'bg-zinc-800 text-zinc-400' }
                  return (
                    <tr key={order.id} className="hover:bg-zinc-800/40 transition-colors">
                      <td className="px-6 py-3 font-mono text-xs text-zinc-400">#{order.orderNumber}</td>
                      <td className="px-6 py-3 text-zinc-300">{order.user?.name || order.guestEmail || '—'}</td>
                      <td className="px-6 py-3 text-zinc-100 font-medium">{formatPrice(order.total)}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* En Çok Satılanlar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800">
            <h2 className="font-medium text-zinc-100 text-sm">En Çok Satılan Ürünler</h2>
          </div>
          {topProducts.length === 0 ? (
            <div className="px-6 py-10 text-center text-zinc-500 text-sm">Henüz satış yok.</div>
          ) : (
            <ul className="divide-y divide-zinc-800">
              {topProducts.map((p: any, i: number) => (
                <li key={p.productId} className="flex items-center gap-3 px-6 py-3">
                  <span className="text-xs font-medium text-zinc-600 w-4">{i + 1}</span>
                  {p.image && (
                    <img src={p.image} alt={p.name} className="w-8 h-8 object-cover rounded border border-zinc-700" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-200 truncate">{p.name}</p>
                    <p className="text-xs text-zinc-500">{p.totalSold} adet</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
