'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/layout/AdminLayout'

const ORDER_STATUSES = [
  { value: 'PENDING',    label: 'Beklemede' },
  { value: 'CONFIRMED',  label: 'Onaylandı' },
  { value: 'PROCESSING', label: 'Hazırlanıyor' },
  { value: 'SHIPPED',    label: 'Kargoya Verildi' },
  { value: 'DELIVERED',  label: 'Teslim Edildi' },
  { value: 'CANCELLED',  label: 'İptal Edildi' },
  { value: 'REFUNDED',   label: 'İade Edildi' },
]

const PAYMENT_STATUSES = [
  { value: 'PENDING',  label: 'Ödeme Bekliyor' },
  { value: 'PAID',     label: 'Ödendi' },
  { value: 'FAILED',   label: 'Başarısız' },
  { value: 'REFUNDED', label: 'İade Edildi' },
]

function formatPrice(n: number) {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n)
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function OrderDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(r => r.json())
      .then(d => {
        setOrder(d)
        setStatus(d.status)
        setPaymentStatus(d.paymentStatus)
        setNotes(d.notes || '')
        setLoading(false)
      })
  }, [id])

  async function handleSave() {
    setSaving(true)
    await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, paymentStatus, notes }),
    })
    setSaving(false)
  }

  if (loading) {
    return (
      <AdminLayout title="Sipariş Detayı">
        <div className="flex items-center justify-center h-64 text-zinc-500 text-sm">Yükleniyor...</div>
      </AdminLayout>
    )
  }

  const addr = order.shippingAddress as any

  return (
    <AdminLayout title={`Sipariş #${order.orderNumber}`}>
      <div className="mb-4">
        <button onClick={() => router.push('/orders')} className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors">
          ← Siparişlere Dön
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Ürünler */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-zinc-800">
              <h2 className="font-medium text-zinc-100 text-sm">Sipariş Ürünleri</h2>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-800/40">
                  <th className="text-left px-6 py-3 font-medium">Ürün</th>
                  <th className="text-left px-6 py-3 font-medium">Varyant</th>
                  <th className="text-right px-6 py-3 font-medium">Adet</th>
                  <th className="text-right px-6 py-3 font-medium">Fiyat</th>
                  <th className="text-right px-6 py-3 font-medium">Toplam</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {order.items.map((item: any) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {item.product?.images?.[0] && (
                          <img src={item.product.images[0].url} alt={item.name} className="w-10 h-10 object-cover rounded-lg border border-zinc-700" />
                        )}
                        <span className="text-zinc-200">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{item.variant?.name || '—'}</td>
                    <td className="px-6 py-4 text-right text-zinc-300">{item.quantity}</td>
                    <td className="px-6 py-4 text-right text-zinc-300">{formatPrice(item.price)}</td>
                    <td className="px-6 py-4 text-right font-medium text-zinc-100">{formatPrice(item.price * item.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 border-t border-zinc-800 space-y-1.5 text-sm">
              <div className="flex justify-between text-zinc-400">
                <span>Ara Toplam</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>İndirim {order.coupon ? `(${order.coupon.code})` : ''}</span>
                  <span>−{formatPrice(order.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-400">
                <span>Kargo</span>
                <span>{order.shippingAmount > 0 ? formatPrice(order.shippingAmount) : 'Ücretsiz'}</span>
              </div>
              <div className="flex justify-between font-semibold text-zinc-100 text-base pt-2 border-t border-zinc-800">
                <span>Toplam</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          {/* Teslimat Adresi */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h2 className="font-medium text-zinc-100 text-sm mb-4">Teslimat Adresi</h2>
            {addr ? (
              <div className="text-sm text-zinc-400 space-y-1">
                <p className="font-medium text-zinc-200">{addr.fullName}</p>
                <p>{addr.address}</p>
                <p>{addr.district}, {addr.city} {addr.postalCode}</p>
                <p>{addr.country}</p>
                {addr.phone && <p className="text-zinc-500">{addr.phone}</p>}
              </div>
            ) : <p className="text-sm text-zinc-500">Adres bilgisi yok.</p>}
          </div>
        </div>

        {/* Sağ */}
        <div className="space-y-5">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="font-medium text-zinc-100 text-sm">Müşteri</h2>
            <div className="text-sm text-zinc-400 space-y-1">
              <p className="font-medium text-zinc-200">{order.user?.name || 'Misafir'}</p>
              <p>{order.user?.email || order.guestEmail || '—'}</p>
              {order.user?.phone && <p>{order.user.phone}</p>}
            </div>
            <div className="text-xs text-zinc-500 pt-2 border-t border-zinc-800">
              <p>Sipariş Tarihi</p>
              <p className="text-zinc-400 mt-0.5">{formatDate(order.createdAt)}</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
            <h2 className="font-medium text-zinc-100 text-sm">Durum Güncelle</h2>

            <div>
              <label className="block text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5">Sipariş Durumu</label>
              <select value={status} onChange={e => setStatus(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors">
                {ORDER_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5">Ödeme Durumu</label>
              <select value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors">
                {PAYMENT_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5">Notlar</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                placeholder="Dahili not ekle..."
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 placeholder-zinc-600 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 resize-none transition-colors" />
            </div>

            <button onClick={handleSave} disabled={saving}
              className="w-full bg-zinc-100 text-zinc-900 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition-colors disabled:opacity-50">
              {saving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
