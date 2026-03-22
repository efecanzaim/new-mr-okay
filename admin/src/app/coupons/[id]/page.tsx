'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { CouponForm } from '@/components/coupons/CouponForm'

export default function EditCouponPage() {
  const { id } = useParams()
  const [coupon, setCoupon] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/coupons/${id}`)
      .then(r => r.json())
      .then(d => { setCoupon(d); setLoading(false) })
  }, [id])

  if (loading) {
    return (
      <AdminLayout title="Kupon Düzenle">
        <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Yükleniyor...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={`Düzenle — ${coupon?.code}`}>
      <CouponForm initialData={coupon} isEdit />
    </AdminLayout>
  )
}
