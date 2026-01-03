"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { getProductsByCategory } from "@/data/products";

const businessmanProducts = getProductsByCategory("businessman");

export default function BusinessmanCollectionPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-silver-light/30 via-white to-white" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-6"
        >
          <p className="text-[10px] tracking-ultrawide uppercase text-black font-semibold mb-4">
            Koleksiyon
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-black">
            BUSINESSMAN
          </h1>
          <p className="text-lg text-black font-medium mt-4 max-w-xl mx-auto">
            Erkekliğin cesur ifadeleri. Dikkat çeken ve kalıcı izlenimler
            bırakan kokular.
          </p>
        </motion.div>
      </section>

      {/* Product Showcase - Alternating Layout */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {businessmanProducts.map((product, index) => {
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
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-8"
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
                    <p className="text-[10px] tracking-ultrawide uppercase text-black font-semibold mb-3">
                      {product.family}
                    </p>
                    <h2 className="font-serif text-3xl lg:text-4xl text-black mb-4">
                      {product.name}
                    </h2>
                    <p className="text-black font-medium leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Scent Notes */}
                    <div className="mb-8 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] tracking-ultrawide uppercase text-black font-semibold w-16">Üst</span>
                        <span className="text-sm text-black font-medium">{product.scent.top.join(", ")}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] tracking-ultrawide uppercase text-black font-semibold w-16">Orta</span>
                        <span className="text-sm text-black font-medium">{product.scent.middle.join(", ")}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] tracking-ultrawide uppercase text-black font-semibold w-16">Alt</span>
                        <span className="text-sm text-black font-medium">{product.scent.base.join(", ")}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <p className="text-2xl text-black mb-8">
                      {product.price.toLocaleString("tr-TR")} ₺
                    </p>

                    {/* Discover Button */}
                    <Link
                      href={`/product/${product.id}`}
                      className="inline-block border border-black px-8 py-4 text-xs tracking-ultrawide uppercase text-black hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Keşfet
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
              BUSINESSMAN Felsefesi
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-black mb-8 leading-tight">
              &ldquo;Başarının bir kokusu var. Tek kelime etmeden önce
              giydiğiniz özgüven o.&rdquo;
            </h2>
            <p className="text-black font-medium leading-relaxed">
              BUSINESSMAN koleksiyonu, ilk izlenimlerin önemini anlayan erkekler
              için tasarlandı. Bu koleksiyondaki her koku, otorite,
              sofistike ve unutulmaz bir varlık yansıtmak için tasarlandı.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
