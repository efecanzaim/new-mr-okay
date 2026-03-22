import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProductForm } from '@/components/products/ProductForm'

export default function NewProductPage() {
  return (
    <AdminLayout title="Yeni Ürün">
      <ProductForm />
    </AdminLayout>
  )
}
