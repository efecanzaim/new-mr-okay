'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CouponFormProps {
  initialData?: any
  isEdit?: boolean
  onSuccess?: () => void
}

function toInputDate(d: string | null | undefined) {
  if (!d) return ''
  return new Date(d).toISOString().slice(0, 16)
}

export function CouponForm({ initialData, isEdit, onSuccess }: CouponFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    code: initialData?.code || '',
    description: initialData?.description || '',
    type: initialData?.type || 'PERCENTAGE',
    value: initialData?.value?.toString() || '',
    minOrderAmount: initialData?.minOrderAmount?.toString() || '',
    maxUses: initialData?.maxUses?.toString() || '',
    isActive: initialData?.isActive ?? true,
    startsAt: toInputDate(initialData?.startsAt),
    expiresAt: toInputDate(initialData?.expiresAt),
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const url = isEdit ? `/api/coupons/${initialData.id}` : '/api/coupons'
    const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    setLoading(false)

    if (!res.ok) {
      const d = await res.json()
      setError(d.error || 'Bir hata oluştu.')
      return
    }

    if (onSuccess) { onSuccess(); return }
    router.push('/coupons')
    router.refresh()
  }

  const inputCls = "w-full bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors"
  const labelCls = "block text-[11px] text-zinc-500 uppercase tracking-wider mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="bg-red-950/50 border border-red-800 text-red-400 text-sm px-4 py-3 rounded-lg">{error}</div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div>
          <label className={labelCls}>Kupon Kodu *</label>
          <input name="code" value={form.code} onChange={handleChange} required disabled={isEdit}
            placeholder="YILBASI20"
            className={`${inputCls} font-mono uppercase disabled:opacity-50 disabled:cursor-not-allowed`} />
          {isEdit && <p className="text-xs text-zinc-600 mt-1">Kupon kodu değiştirilemez.</p>}
        </div>

        <div>
          <label className={labelCls}>Açıklama</label>
          <input name="description" value={form.description} onChange={handleChange}
            placeholder="Yılbaşı indirimi" className={inputCls} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>İndirim Tipi *</label>
            <select name="type" value={form.type} onChange={handleChange}
              className="w-full bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-zinc-500 transition-colors">
              <option value="PERCENTAGE">Yüzde (%)</option>
              <option value="FIXED">Sabit Tutar (₺)</option>
            </select>
          </div>
          <div>
            <label className={labelCls}>Değer * {form.type === 'PERCENTAGE' ? '(%)' : '(₺)'}</label>
            <input name="value" type="number" value={form.value} onChange={handleChange} required
              min="0" max={form.type === 'PERCENTAGE' ? '100' : undefined} step="0.01"
              placeholder={form.type === 'PERCENTAGE' ? '20' : '100'} className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Min. Sipariş Tutarı (₺)</label>
            <input name="minOrderAmount" type="number" value={form.minOrderAmount} onChange={handleChange}
              min="0" placeholder="500" className={inputCls} />
          </div>
          <div>
            <label className={labelCls}>Maks. Kullanım</label>
            <input name="maxUses" type="number" value={form.maxUses} onChange={handleChange}
              min="1" placeholder="Sınırsız" className={inputCls} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Başlangıç Tarihi</label>
            <input name="startsAt" type="datetime-local" value={form.startsAt} onChange={handleChange}
              className={`${inputCls} [color-scheme:dark]`} />
          </div>
          <div>
            <label className={labelCls}>Bitiş Tarihi</label>
            <input name="expiresAt" type="datetime-local" value={form.expiresAt} onChange={handleChange}
              className={`${inputCls} [color-scheme:dark]`} />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <input type="checkbox" id="isActive" name="isActive" checked={form.isActive}
            onChange={e => setForm(prev => ({ ...prev, isActive: e.target.checked }))}
            className="w-4 h-4 rounded border-zinc-600 bg-zinc-800" />
          <label htmlFor="isActive" className="text-sm text-zinc-300">Aktif</label>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={loading}
          className="bg-zinc-100 text-zinc-900 px-6 py-3 rounded-xl text-sm font-medium hover:bg-white transition-colors disabled:opacity-50">
          {loading ? 'Kaydediliyor...' : isEdit ? 'Güncelle' : 'Kupon Oluştur'}
        </button>
        <button type="button" onClick={() => router.push('/coupons')}
          className="bg-zinc-800 border border-zinc-700 text-zinc-300 px-6 py-3 rounded-xl text-sm hover:border-zinc-500 transition-colors">
          İptal
        </button>
      </div>
    </form>
  )
}
