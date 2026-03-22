"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import { Product } from "@/data/products";

interface CategoryClientProps {
  category: string;
  info: { title: string; description: string };
  products: Product[];
}

export default function CategoryClient({ category, info, products }: CategoryClientProps) {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-silver-light/30 via-white to-white" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-6"
        >
          <p className="text-[10px] tracking-ultrawide uppercase text-silver-dark mb-4">
            BUSINESSMAN
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-black">
            {info.title}
          </h1>
          <p className="text-lg text-silver-dark font-light mt-4 max-w-xl mx-auto">
            {info.description}
          </p>
        </motion.div>
      </section>

      {/* Product Grid */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal className="mb-12">
            <p className="text-xs text-silver-dark">
              {products.length} {products.length === 1 ? "Ürün" : "Ürün"}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

