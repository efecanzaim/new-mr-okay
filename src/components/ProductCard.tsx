"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  collection: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

// Helper function to get hover image path
const getHoverImagePath = (imagePath: string): string => {
  const lastDotIndex = imagePath.lastIndexOf('.');
  if (lastDotIndex === -1) return imagePath;
  return imagePath.slice(0, lastDotIndex) + '_hover' + imagePath.slice(lastDotIndex);
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);

  const hoverImage = getHoverImagePath(product.image);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <Link href={`/product/${product.id}`}>
        <div
          className="group relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative aspect-[3/4] bg-silver-light overflow-hidden mb-6">
            <div className="w-full h-full relative">
              {/* Default Image */}
              <AnimatePresence>
                <motion.div
                  key="default"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isHovered ? 0 : 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Hover Image */}
              <motion.div
                key="hover"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={hoverImage}
                  alt={`${product.name} hover`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
              </motion.div>
            </div>

            {/* Hover Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-black/10"
            />

            {/* Quick Add Button */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{
                y: isHovered ? "0%" : "100%",
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="absolute bottom-0 left-0 right-0 p-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-black text-white text-xs tracking-ultrawide uppercase font-medium flex items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
              >
                <span>Keşfet</span>
              </motion.div>
            </motion.div>

            {/* Category Tag */}
            <div className="absolute top-4 left-4">
              <span className="text-[10px] tracking-ultrawide text-white bg-black/60 px-3 py-1 backdrop-blur-sm">
                {product.category === 'businessman' ? 'YENİ' : product.category.toLocaleUpperCase('en-US')}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <p className="text-[10px] tracking-ultrawide uppercase text-silver-dark">
              {product.collection}
            </p>
            <h3 className="font-serif text-lg text-black group-hover:text-silver-dark transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-xs text-silver-dark font-light leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
