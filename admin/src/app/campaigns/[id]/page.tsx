'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { CampaignForm } from '@/components/campaigns/CampaignForm'

export default function EditCampaignPage() {
  const { id } = useParams()
  const [campaign, setCampaign] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/campaigns/${id}`)
      .then(r => r.json())
      .then(d => { setCampaign(d); setLoading(false) })
  }, [id])

  if (loading) {
    return (
      <AdminLayout title="Kampanya Düzenle">
        <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Yükleniyor...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={`Düzenle — ${campaign?.name}`}>
      <CampaignForm initialData={campaign} isEdit />
    </AdminLayout>
  )
}
