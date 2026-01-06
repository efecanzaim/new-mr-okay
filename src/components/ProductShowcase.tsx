"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

const featuredProducts = getFeaturedProducts(5);

export default function ProductShowcase() {
  const { language } = useLanguage();
  const t = allTranslations[language];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white">
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="text-center mb-16 lg:mb-24"
        >
          <p className="text-[10px] tracking-ultrawide uppercase font-semibold mb-4" style={{ color: '#686868' }}>
            {t["showcase.subtitle"]}
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl" style={{ color: '#000000' }}>
            {t["showcase.title"]}
          </h2>
          <p className="text-sm font-semibold mt-4 max-w-lg mx-auto" style={{ color: '#686868' }}>
            {t["showcase.desc"]}
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16 lg:mt-24"
        >
          <Link href="/collections/businessman">
            <button
              className="px-12 py-4 bg-white text-black border border-black text-xs tracking-ultrawide uppercase font-semibold transition-colors duration-300 hover:bg-black hover:text-white"
            >
              {t["showcase.viewAll"]}
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
