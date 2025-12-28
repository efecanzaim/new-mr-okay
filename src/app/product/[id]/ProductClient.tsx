"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Minus, Plus, Heart, Share2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import ProductCard from "@/components/ProductCard";
import { Product, products } from "@/data/products";

// Helper function to get hover image path
const getHoverImagePath = (imagePath: string): string => {
  const lastDotIndex = imagePath.lastIndexOf('.');
  if (lastDotIndex === -1) return imagePath;
  return imagePath.slice(0, lastDotIndex) + '_hover' + imagePath.slice(lastDotIndex);
};

interface ProductClientProps {
  product: Product;
  productId: string;
}

export default function ProductClient({ product, productId }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [isImageHovered, setIsImageHovered] = useState(false);

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div
                className="sticky top-32 aspect-[3/4] bg-gray-100 overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsImageHovered(true)}
                onMouseLeave={() => setIsImageHovered(false)}
              >
                {/* Default Image */}
                <motion.div
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isImageHovered ? 0 : 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </motion.div>

                {/* Hover Image */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isImageHovered ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={getHoverImagePath(product.image)}
                    alt={`${product.name} hover`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <p className="text-[10px] tracking-ultrawide uppercase text-silver-dark mb-2">
                  {product.collection}
                </p>
                <h1 className="font-serif text-4xl lg:text-5xl text-black mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl text-black font-light">
                  ₺{product.price.toLocaleString('tr-TR')}
                </p>
                <p className="text-sm text-black mt-1">{product.ml}ml</p>
              </div>

              <p className="text-black font-light leading-relaxed">
                {product.description}
              </p>

              {/* Family */}
              <div>
                <p className="text-xs tracking-ultrawide uppercase text-black mb-2">
                  Koku Ailesi
                </p>
                <p className="text-black font-light">{product.family}</p>
              </div>

              {/* Quantity */}
              <div>
                <p className="text-xs tracking-ultrawide uppercase text-black mb-4">
                  Adet
                </p>
                <div className="flex items-center border border-black/20 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-silver hover:text-black transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-black">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-silver hover:text-black transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <MagneticButton variant="primary" size="lg" className="flex-1">
                  Sepete Ekle
                </MagneticButton>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border border-black/20 hover:border-black/40 transition-colors"
                >
                  <Heart size={20} strokeWidth={1} className="text-silver" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border border-black/20 hover:border-black/40 transition-colors"
                >
                  <Share2 size={20} strokeWidth={1} className="text-silver" />
                </motion.button>
              </div>

              {/* Fragrance Notes */}
              <div className="pt-8 border-t border-black/10">
                <p className="text-xs tracking-ultrawide uppercase text-silver mb-6">
                  Koku Notaları
                </p>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-[10px] tracking-ultrawide uppercase text-silver-dark mb-3">
                      Üst
                    </p>
                    <div className="space-y-2">
                      {product.scent.top.map((note) => (
                        <p key={note} className="text-sm text-black font-light">
                          {note}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-ultrawide uppercase text-silver-dark mb-3">
                      Kalp
                    </p>
                    <div className="space-y-2">
                      {product.scent.middle.map((note) => (
                        <p key={note} className="text-sm text-black font-light">
                          {note}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-ultrawide uppercase text-silver-dark mb-3">
                      Taban
                    </p>
                    <div className="space-y-2">
                      {product.scent.base.map((note) => (
                        <p key={note} className="text-sm text-black font-light">
                          {note}
                        </p>
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
            <p className="text-[10px] tracking-ultrawide uppercase text-silver-dark mb-4">
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

