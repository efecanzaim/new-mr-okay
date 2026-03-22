import { AdminLayout } from '@/components/layout/AdminLayout'
import { CouponForm } from '@/components/coupons/CouponForm'

export default function NewCouponPage() {
  return (
    <AdminLayout title="Yeni Kupon">
      <CouponForm />
    </AdminLayout>
  )
}
