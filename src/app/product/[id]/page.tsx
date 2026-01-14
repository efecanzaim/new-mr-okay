import { Metadata } from "next";
import Script from "next/script";
import ProductClient from "./ProductClient";
import { getProductById, products } from "@/data/products";

// Product JSON-LD generator
function generateProductJsonLd(product: ReturnType<typeof getProductById>) {
  if (!product) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Mr. Okay ${product.name}`,
    "image": `https://mrokay.com${product.image}`,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Mr. Okay Beauty"
    },
    "sku": product.id.toUpperCase(),
    "category": "Parfüm",
    "offers": {
      "@type": "Offer",
      "url": `https://mrokay.com/product/${product.id}`,
      "priceCurrency": "TRY",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Mr. Okay Beauty"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "50"
    }
  };
}

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

  // Ürün bazlı açıklamalar
  const productDescriptions: Record<string, string> = {
    classic: "Classic, disiplinli ve özgüvenli erkekler için tasarlanmış zamansız bir koku imzasıdır. Dengeli yapısıyla klasik şıklığın gücünü yansıtır.",
    weekend: "Weekend, şehirli ve modern erkeğin haftasonu ritüelleri için tasarlanmış enerjik bir parfümdür. Ferah ve canlı karakteriyle özgürlük hissi uyandırır.",
    elegant: "Elegant, sofistike ve entelektüel erkekler için yaratılmış rafine bir parfümdür. Derin ve kontrollü karakteriyle elit anlara eşlik eder.",
    avantgarde: "Avant-garde, yaratıcı, vizyoner ve cesur erkekler için tasarlanmış karakteristik bir koku imzasıdır. Sınırları zorlayan yapısıyla güçlü bir ifade sunar.",
    holiday: "Holiday, özgür ruhlu ve enerjik erkekler için tasarlanmış ferah bir parfümdür. Deniz esintisi ve canlı notalarıyla yaşam dolu anları yansıtır.",
  };

  const seoDescription = productDescriptions[product.id.toLowerCase()] || product.description;
  const genderKeyword = product.collection === "Businessman" ? "erkek parfümü" : "kadın parfümü";
  const siteUrl = "https://mrokay.com";
  const productUrl = `${siteUrl}/product/${product.id}`;
  const imageUrl = `${siteUrl}${product.image}`;

  return {
    metadataBase: new URL(siteUrl),
    title: `${product.name} | ${product.collection} Koleksiyonu – Mr. Okay Beauty`,
    description: seoDescription,
    keywords: [
      `${product.name} parfüm`,
      `${product.collection} parfüm`,
      "Niş parfüm",
      `Koku ailesi ${product.family}`,
      genderKeyword,
      ...product.scent.top.map(note => `${note} ${product.name}`),
      ...product.scent.middle.map(note => `${note} ${product.name}`),
      ...product.scent.base.map(note => `${note} ${product.name}`),
      "Cabin size",
    ],
    openGraph: {
      title: `Mr. Okay ${product.name} | ${product.collection} Koleksiyonu`,
      description: seoDescription,
      url: productUrl,
      siteName: "Mr. Okay Beauty",
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 1000,
          alt: `Mr. Okay ${product.name} - ${product.collection} Parfüm`,
        },
      ],
      locale: "tr_TR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@mrokay",
      creator: "@mrokay",
      title: `Mr. Okay ${product.name} | ${product.collection}`,
      description: seoDescription,
      images: [imageUrl],
    },
    alternates: {
      canonical: productUrl,
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

  const productJsonLd = generateProductJsonLd(product);

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <ProductClient product={product} productId={params.id} />
    </>
  );
}
