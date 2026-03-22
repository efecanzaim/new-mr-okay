'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Drawer } from '@/components/ui/Drawer'
import { CouponForm } from '@/components/coupons/CouponForm'

function formatDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function couponStatus(c: any) {
  if (!c.isActive) return { label: 'Pasif', color: 'bg-zinc-800 text-zinc-400' }
  const now = new Date()
  if (c.expiresAt && new Date(c.expiresAt) < now) return { label: 'Süresi Dolmuş', color: 'bg-red-900/30 text-red-400' }
  if (c.startsAt && new Date(c.startsAt) > now) return { label: 'Henüz Başlamadı', color: 'bg-amber-900/30 text-amber-400' }
  if (c.maxUses && c.usedCount >= c.maxUses) return { label: 'Limit Doldu', color: 'bg-orange-900/30 text-orange-400' }
  return { label: 'Aktif', color: 'bg-green-900/30 text-green-400' }
}

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editCoupon, setEditCoupon] = useState<any>(null)

  const fetchCoupons = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    const res = await fetch(`/api/coupons?${params}`)
    const data = await res.json()
    setCoupons(data.coupons || [])
    setLoading(false)
  }, [search])

  useEffect(() => { fetchCoupons() }, [fetchCoupons])

  function openNew() {
    setEditCoupon(null)
    setDrawerOpen(true)
  }

  async function openEdit(id: string) {
    const res = await fetch(`/api/coupons/${id}`)
    const data = await res.json()
    setEditCoupon(data)
    setDrawerOpen(true)
  }

  function handleSuccess() {
    setDrawerOpen(false)
    setEditCoupon(null)
    fetchCoupons()
  }

  async function handleDelete(id: string, code: string) {
    if (!confirm(`"${code}" kuponu silinecek. Devam et?`)) return
    await fetch(`/api/coupons/${id}`, { method: 'DELETE' })
    fetchCoupons()
  }

  return (
    <AdminLayout title="Kuponlar">
      <div className="flex gap-3 mb-6">
        <input value={search} onChange={e => setSearch(e.target.value)}
          placeholder="Kupon kodu ara..."
          className="bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-4 py-2.5 text-sm flex-1 focus:outline-none focus:border-zinc-500 transition-colors" />
        <button onClick={openNew}
          className="bg-zinc-100 text-zinc-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition-colors whitespace-nowrap">
          + Yeni Kupon
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Yükleniyor...</div>
        ) : coupons.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Kupon bulunamadı.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-800/40">
                <th className="text-left px-6 py-3 font-medium">Kod</th>
                <th className="text-left px-6 py-3 font-medium">İndirim</th>
                <th className="text-left px-6 py-3 font-medium">Kullanım</th>
                <th className="text-left px-6 py-3 font-medium">Bitiş</th>
                <th className="text-left px-6 py-3 font-medium">Durum</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {coupons.map((c: any) => {
                const s = couponStatus(c)
                return (
                  <tr key={c.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-mono font-medium text-zinc-200">{c.code}</p>
                      {c.description && <p className="text-xs text-zinc-500 mt-0.5">{c.description}</p>}
                    </td>
                    <td className="px-6 py-4 text-zinc-200 font-medium">
                      {c.type === 'PERCENTAGE' ? `%${c.value}` : `₺${c.value}`}
                      {c.minOrderAmount && <span className="text-xs text-zinc-500 ml-1">(min. ₺{c.minOrderAmount})</span>}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {c.usedCount} / {c.maxUses ?? '∞'}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-xs">{formatDate(c.expiresAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.color}`}>{s.label}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 justify-end">
                        <button onClick={() => openEdit(c.id)} className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors">Düzenle</button>
                        <button onClick={() => handleDelete(c.id, c.code)} className="text-xs text-red-500 hover:text-red-400 transition-colors">Sil</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={editCoupon ? 'Kuponu Düzenle' : 'Yeni Kupon'}>
        <CouponForm initialData={editCoupon} isEdit={!!editCoupon} onSuccess={handleSuccess} />
      </Drawer>
    </AdminLayout>
  )
}
