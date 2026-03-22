'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProductForm } from '@/components/products/ProductForm'

export default function EditProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(r => r.json())
      .then(d => { setProduct(d); setLoading(false) })
  }, [id])

  if (loading) {
    return (
      <AdminLayout title="Ürün Düzenle">
        <div className="flex items-center justify-center h-64 text-gray-400 text-sm">Yükleniyor...</div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title={`Düzenle — ${product?.name}`}>
      <ProductForm initialData={product} isEdit />
    </AdminLayout>
  )
}
