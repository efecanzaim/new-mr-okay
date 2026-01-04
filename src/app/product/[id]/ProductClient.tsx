"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Heart, Share2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import ProductCard from "@/components/ProductCard";
import { Product, products } from "@/data/products";

interface ProductClientProps {
  product: Product;
  productId: string;
}

export default function ProductClient({ product, productId }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Galeri görselleri - images varsa onu kullan, yoksa sadece ana görseli kullan
  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  // Get related products (exclude current product)
  const relatedProducts = products
    .filter((p) => p.id !== productId)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      collection: p.collection,
      price: p.price,
      image: p.image,
      category: p.category,
      description: p.description,
    }));

  return (
    <div className="bg-white min-h-screen pt-24">
      {/* Product Detail */}
      <section className="py-12 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Side - Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ background: 'linear-gradient(107deg, rgba(89, 89, 89, 0.20) 0%, rgba(89, 89, 89, 0.03) 100%)' }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={galleryImages[selectedImageIndex]}
                      alt={`${product.name} - Görsel ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      quality={100}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Thumbnail Gallery */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2 pb-4">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className="relative group"
                    >
                      {/* Thumbnail Image */}
                      <div
                        className="relative aspect-[3/4] overflow-hidden"
                        style={{ background: 'linear-gradient(107deg, rgba(89, 89, 89, 0.20) 0%, rgba(89, 89, 89, 0.03) 100%)' }}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} - Thumbnail ${index + 1}`}
                          fill
                          className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                          sizes="25vw"
                          quality={80}
                        />
                      </div>
                      {/* Sliding Indicator Line */}
                      <motion.div
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-black"
                        initial={false}
                        animate={{
                          scaleX: selectedImageIndex === index ? 1 : 0,
                          opacity: selectedImageIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right Side - Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:sticky lg:top-32 lg:self-start space-y-6"
            >
              {/* Collection & Name */}
              <div>
                <span className="inline-block bg-black text-white text-[10px] tracking-ultrawide uppercase px-3 py-1.5 mb-3 font-semibold">
                  {product.collection}
                </span>
                <h1 className="font-serif text-4xl lg:text-5xl text-black mb-2">
                  {product.name}
                </h1>
                <p className="text-black font-semibold leading-relaxed mb-4">
                  {product.description}
                </p>
                <p className="text-xs tracking-ultrawide uppercase text-black mb-2 font-semibold">
                  Koku Ailesi
                </p>
                <p className="text-black font-semibold">{product.family}</p>
              </div>

              {/* Price & ML */}
              <div>
                <p className="text-2xl text-black font-semibold">
                  ₺{product.price.toLocaleString('tr-TR')}
                </p>
                <p className="text-sm text-black mt-1 font-semibold">{product.ml}ml</p>
              </div>

              {/* Quantity Selector */}
              <div>
                <p className="text-xs tracking-ultrawide uppercase text-black mb-3 font-semibold">
                  Adet
                </p>
                <div className="flex items-center border border-black w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 bg-white text-black hover:bg-gray-100 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-black font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 bg-white text-black hover:bg-gray-100 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 pt-2">
                <MagneticButton variant="primary" size="lg" className="w-full">
                  Sepete Ekle
                </MagneticButton>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 border border-black hover:bg-black transition-colors flex items-center justify-center gap-2 group"
                  >
                    <Heart size={18} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors" />
                    <span className="text-xs tracking-wide uppercase text-black font-bold group-hover:text-white transition-colors">Favorilere Ekle</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 border border-black hover:bg-black transition-colors group"
                  >
                    <Share2 size={18} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors" />
                  </motion.button>
                </div>
              </div>

              {/* Fragrance Notes */}
              <div className="pt-6 border-t border-black/10">
                <p className="text-xs tracking-ultrawide uppercase text-black mb-6 font-semibold">
                  Koku Notaları
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-ultrawide uppercase text-silver-dark font-semibold w-12 pt-0.5">
                      Üst
                    </span>
                    <div className="flex-1 flex flex-wrap gap-2">
                      {product.scent.top.map((note) => (
                        <span
                          key={note}
                          className="px-3 py-1 bg-black/5 text-sm text-black"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-ultrawide uppercase text-silver-dark font-semibold w-12 pt-0.5">
                      Kalp
                    </span>
                    <div className="flex-1 flex flex-wrap gap-2">
                      {product.scent.middle.map((note) => (
                        <span
                          key={note}
                          className="px-3 py-1 bg-black/5 text-sm text-black"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-ultrawide uppercase text-silver-dark font-semibold w-12 pt-0.5">
                      Taban
                    </span>
                    <div className="flex-1 flex flex-wrap gap-2">
                      {product.scent.base.map((note) => (
                        <span
                          key={note}
                          className="px-3 py-1 bg-black/5 text-sm text-black"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[10px] tracking-ultrawide font-semibold uppercase text-black mb-4">
              Koleksiyonunuzu Tamamlayın
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-black">
              Bunları da Beğenebilirsiniz
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
