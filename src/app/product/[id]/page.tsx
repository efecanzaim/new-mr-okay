import { Metadata } from "next";
import ProductClient from "./ProductClient";
import { getProductById, products } from "@/data/products";

// Statik export için gerekli - build zamanında hangi product id'leri için sayfa oluşturulacağını belirtir
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

// Dinamik metadata
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: "Ürün Bulunamadı",
    };
  }

  return {
    title: `${product.name} - ${product.collection} Koleksiyonu`,
    description: `${product.name} parfümü. ${product.description}. Üst notalar: ${product.scent.top.join(", ")}. ${product.ml}ml - ${product.price}₺`,
    keywords: [
      product.name,
      product.collection,
      product.family,
      "erkek parfümü",
      "lüks parfüm",
      ...product.scent.top,
      ...product.scent.middle,
      ...product.scent.base,
    ],
    openGraph: {
      title: `${product.name} | Mr Okay ${product.collection}`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 1000,
          alt: `${product.name} - Mr Okay Parfüm`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Mr Okay`,
      description: product.description,
      images: [product.image],
    },
  };
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    return (
      <div className="bg-white min-h-screen pt-24 flex items-center justify-center">
        <p className="text-silver-dark">Ürün bulunamadı</p>
      </div>
    );
  }

  return <ProductClient product={product} productId={params.id} />;
}
