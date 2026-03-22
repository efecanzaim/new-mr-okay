'use client'

import { useEffect, useState, useCallback } from 'react'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { Drawer } from '@/components/ui/Drawer'
import { CampaignForm } from '@/components/campaigns/CampaignForm'

const TYPE_LABELS: Record<string, string> = {
  BANNER: 'Banner', POPUP: 'Popup', DISCOUNT: 'İndirim',
}

function campaignStatus(c: any) {
  if (!c.isActive) return { label: 'Pasif', color: 'bg-zinc-800 text-zinc-400' }
  const now = new Date()
  if (c.expiresAt && new Date(c.expiresAt) < now) return { label: 'Süresi Dolmuş', color: 'bg-red-900/30 text-red-400' }
  if (c.startsAt && new Date(c.startsAt) > now) return { label: 'Henüz Başlamadı', color: 'bg-amber-900/30 text-amber-400' }
  return { label: 'Aktif', color: 'bg-green-900/30 text-green-400' }
}

function formatDate(d: string | null) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editCampaign, setEditCampaign] = useState<any>(null)

  const fetchCampaigns = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/campaigns')
    const data = await res.json()
    setCampaigns(data.campaigns || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchCampaigns() }, [fetchCampaigns])

  function openNew() {
    setEditCampaign(null)
    setDrawerOpen(true)
  }

  async function openEdit(id: string) {
    const res = await fetch(`/api/campaigns/${id}`)
    const data = await res.json()
    setEditCampaign(data)
    setDrawerOpen(true)
  }

  function handleSuccess() {
    setDrawerOpen(false)
    setEditCampaign(null)
    fetchCampaigns()
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`"${name}" kampanyası silinecek. Devam et?`)) return
    await fetch(`/api/campaigns/${id}`, { method: 'DELETE' })
    fetchCampaigns()
  }

  return (
    <AdminLayout title="Kampanyalar">
      <div className="flex justify-end mb-6">
        <button onClick={openNew}
          className="bg-zinc-100 text-zinc-900 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white transition-colors">
          + Yeni Kampanya
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Yükleniyor...</div>
        ) : campaigns.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-zinc-500 text-sm">Kampanya bulunamadı.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-zinc-500 uppercase tracking-wider border-b border-zinc-800 bg-zinc-800/40">
                <th className="text-left px-6 py-3 font-medium">Kampanya</th>
                <th className="text-left px-6 py-3 font-medium">Tip</th>
                <th className="text-left px-6 py-3 font-medium">Ülkeler</th>
                <th className="text-left px-6 py-3 font-medium">Bitiş</th>
                <th className="text-left px-6 py-3 font-medium">Durum</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {campaigns.map((c: any) => {
                const s = campaignStatus(c)
                return (
                  <tr key={c.id} className="hover:bg-zinc-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {c.image && (
                          <img src={c.image} alt={c.name} className="w-12 h-8 object-cover rounded border border-zinc-700" />
                        )}
                        <div>
                          <p className="font-medium text-zinc-200">{c.name}</p>
                          {c.title && <p className="text-xs text-zinc-500 mt-0.5">{c.title}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded text-xs font-medium">
                        {TYPE_LABELS[c.type] || c.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-xs">
                      {c.countries?.length > 0 ? c.countries.join(', ') : 'Herkese'}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-xs">{formatDate(c.expiresAt)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${s.color}`}>{s.label}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 justify-end">
                        <button onClick={() => openEdit(c.id)} className="text-xs text-zinc-400 hover:text-zinc-100 transition-colors">Düzenle</button>
                        <button onClick={() => handleDelete(c.id, c.name)} className="text-xs text-red-500 hover:text-red-400 transition-colors">Sil</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title={editCampaign ? 'Kampanyayı Düzenle' : 'Yeni Kampanya'} width="max-w-2xl">
        <CampaignForm initialData={editCampaign} isEdit={!!editCampaign} onSuccess={handleSuccess} />
      </Drawer>
    </AdminLayout>
  )
}
