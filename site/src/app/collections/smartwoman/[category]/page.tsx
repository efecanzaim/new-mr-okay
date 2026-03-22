import CategoryClient from "./CategoryClient";
import { getProductsBySubcategory } from "@/data/products";

export function generateStaticParams() {
  return [
    { category: "mystery" },
    { category: "celebrity" },
    { category: "majesty" },
    { category: "dreamy" },
    { category: "shiny" },
  ];
}

const categoryInfo: Record<string, { title: string; description: string }> = {
  mystery: {
    title: "Mystery",
    description: "Gecenin gizemini taşıyan, sofistike ve büyüleyici",
  },
  celebrity: {
    title: "Celebrity",
    description: "Işıltılı, karizmatik ve göz alıcı",
  },
  majesty: {
    title: "Majesty",
    description: "Asil, güçlü ve etkileyici",
  },
  dreamy: {
    title: "Dreamy",
    description: "Hayalperest, romantik ve zarif",
  },
  shiny: {
    title: "Shiny",
    description: "Enerjik, parlak ve canlı",
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
  const products = getProductsBySubcategory("smartwoman", category as any) || [];

  return <CategoryClient category={category} info={info} products={products} />;
}
