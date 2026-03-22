import { AdminLayout } from '@/components/layout/AdminLayout'
import { CampaignForm } from '@/components/campaigns/CampaignForm'

export default function NewCampaignPage() {
  return (
    <AdminLayout title="Yeni Kampanya">
      <CampaignForm />
    </AdminLayout>
  )
}
