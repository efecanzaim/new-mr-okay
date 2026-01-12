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

  return {
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
      title: `${product.name} | ${product.collection} Koleksiyonu – Mr. Okay Beauty`,
      description: seoDescription,
      images: [
        {
          url: product.image,
          width: 800,
          height: 1000,
          alt: `${product.name} - Mr. Okay Beauty Parfüm`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Mr. Okay Beauty`,
      description: seoDescription,
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
