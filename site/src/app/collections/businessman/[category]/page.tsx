import CategoryClient from "./CategoryClient";
import { getProductsBySubcategory } from "@/data/products";

// Statik export için gerekli - build zamanında hangi category'ler için sayfa oluşturulacağını belirtir
export function generateStaticParams() {
  return [
    { category: "classic" },
    { category: "avantgarde" },
    { category: "elegant" },
    { category: "holiday" },
    { category: "weekend" },
  ];
}

const categoryInfo: Record<string, { title: string; description: string }> = {
  "avantgarde": {
    title: "Avangard",
    description: "Yaratıcı, özgün, cesur",
  },
  classic: {
    title: "Klasik",
    description: "Klasik, disiplinli, özgüvenli",
  },
  elegant: {
    title: "Zarif",
    description: "Sofistike, zarif ve entelektüel",
  },
  holiday: {
    title: "Tatil",
    description: "Hayatı dolu dolu yaşayan",
  },
  weekend: {
    title: "Hafta Sonu",
    description: "Rahat, modern ve hafif",
  },
};

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = params.category;
  const info = categoryInfo[category] || { title: "Koleksiyon", description: "" };
  const products = getProductsBySubcategory("businessman", category as any) || [];

  return <CategoryClient category={category} info={info} products={products} />;
}
