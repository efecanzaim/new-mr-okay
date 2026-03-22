"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { getProductsByCategory } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

const smartwomanProducts = getProductsByCategory("smartwoman");

export default function SmartwomanCollectionPage() {
  const { language } = useLanguage();
  const t = allTranslations[language];

  return (
    <div className="bg-white min-h-screen overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[100vh] flex flex-col justify-between overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/smartwoman_banner.jpg"
            alt="Smartwoman Collection"
            fill
            className="object-cover"
            style={{ objectPosition: '50% 30%' }}
            priority
            quality={100}
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Top Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-6 pt-32"
        >
          <p className="text-[10px] tracking-ultrawide uppercase text-white font-semibold mb-4">
            {t["businessman.collection"] || "Koleksiyon"}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-white">
            SMARTWOMAN
          </h1>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center px-6 pb-16"
        >
          <p className="text-lg md:text-3xl text-white font-normal max-w-6xl mx-auto">
            Her notada zarif özgüven. Kendi kaderini şekillendiren kadınlar için tasarlanmış kokular.
          </p>
        </motion.div>
      </section>

      {/* Product Showcase - Alternating Layout */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {smartwomanProducts.map((product, index) => {
            const isEven = index % 2 === 0;

            return (
              <ScrollReveal key={product.id}>
                <div
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16 py-16 lg:py-24 ${index !== 0 ? 'border-t border-black/5' : ''}`}
                >
                  {/* Product Image */}
                  <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative aspect-square overflow-hidden" style={{ background: 'linear-gradient(107deg, rgba(89, 89, 89, 0.20) 0%, rgba(89, 89, 89, 0.03) 100%)' }}>
                      <Image
                        src={`/images/smartwoman_${product.id}.png`}
                        alt={product.name}
                        fill
                        className="object-cover"
                        quality={100}
                      />
                    </div>
                  </motion.div>

                  {/* Product Info */}
                  <motion.div
                    className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="font-serif text-3xl lg:text-4xl text-black mb-6">
                      {product.name}
                    </h2>

                    <div className="text-black font-medium leading-relaxed mb-8 space-y-4">
                      <p>{product.description}</p>
                    </div>

                    {/* Discover Button */}
                    <Link
                      href={`/product/${product.id}`}
                      className="inline-block bg-black text-white font-bold border border-black px-8 py-4 text-xs tracking-ultrawide uppercase hover:bg-white hover:text-black transition-all duration-300"
                    >
                      {t["businessman.discover"] || "Keşfet"}
                    </Link>
                  </motion.div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Collection Story */}
      <section className="py-24 lg:py-32 bg-white border-t border-black/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p className="text-[10px] tracking-ultrawide uppercase text-black font-semibold mb-6">
              SMARTWOMAN Felsefesi
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-black mb-8 leading-tight">
              &ldquo;Güç gürültülü değildir. Odadan ayrıldıktan çok sonra
              bile kalıcı olan sessiz özgüventir.&rdquo;
            </h2>
            <p className="text-black font-medium leading-relaxed">
              SMARTWOMAN koleksiyonu, modern kadınlığın çok yönlü doğasını
              kutlar. Toplantı odalarından gala gecelerine, bu kokular
              güçlendirmek ve ilham vermek için tasarlandı.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
