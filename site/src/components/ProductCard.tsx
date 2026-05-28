"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";
import { microLabelStyle, ultraLabelStyle } from "@/styles/typography";

const allTranslations = { tr, en, de, fr, ar };

const SIGNATURE_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

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

const getHoverImagePath = (imagePath: string): string => {
  const lastDotIndex = imagePath.lastIndexOf(".");
  if (lastDotIndex === -1) return imagePath;
  return imagePath.slice(0, lastDotIndex) + "_hover" + imagePath.slice(lastDotIndex);
};

export default function ProductCard({ product, index }: ProductCardProps) {
  const { language } = useLanguage();
  const t = allTranslations[language];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasHover, setHasHover] = useState(true);

  // Touch devices: keep overlay always visible (no hover state to rely on)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none)");
    const update = () => setHasHover(!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const showOverlay = isInteracting || !hasHover;
  const hoverImage = getHoverImagePath(product.image);
  const categoryLabel = product.category === "businessman" ? "BUSINESSMAN" : t["productCard.new"];
  const descriptionText = t[`product.${product.id}.desc`] || product.description;

  const fadeDuration = reduceMotion ? 0 : 0.5;
  const entranceInitial = reduceMotion ? false : { opacity: 0, y: 60 };
  const entranceAnimate = reduceMotion ? { opacity: 1, y: 0 } : (isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 });

  return (
    <motion.div
      ref={ref}
      initial={entranceInitial}
      animate={entranceAnimate}
      transition={{
        duration: reduceMotion ? 0 : 0.8,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: SIGNATURE_EASE,
      }}
    >
      <Link
        href={`/product/${product.id}`}
        aria-label={`${product.name} — ${product.collection}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        onFocus={() => setIsInteracting(true)}
        onBlur={() => setIsInteracting(false)}
      >
        <div
          className="group relative"
          onMouseEnter={() => setIsInteracting(true)}
          onMouseLeave={() => setIsInteracting(false)}
        >
          {/* Image frame */}
          <div
            className="relative aspect-[3/4] overflow-hidden mb-6"
            style={{ background: "linear-gradient(107deg, rgba(89, 89, 89, 0.20) 0%, rgba(89, 89, 89, 0.03) 100%)" }}
          >
            <div className="w-full h-full relative">
              {/* Default image */}
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: showOverlay ? 0 : 1 }}
                transition={{ duration: fadeDuration, ease: SIGNATURE_EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={product.image}
                  alt={`${product.name} parfümü`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                />
              </motion.div>

              {/* Hover image (decorative — same product, alternate angle) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showOverlay ? 1 : 0 }}
                transition={{ duration: fadeDuration, ease: SIGNATURE_EASE }}
                className="absolute inset-0"
                aria-hidden="true"
              >
                <Image
                  src={hoverImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={90}
                />
              </motion.div>
            </div>

            {/* Subtle scrim under Quick Add */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showOverlay ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: SIGNATURE_EASE }}
              className="absolute inset-0 bg-black/10"
              aria-hidden="true"
            />

            {/* Quick Add — visible on hover, focus, or touch devices */}
            <motion.div
              initial={{ y: reduceMotion ? "0%" : "100%", opacity: reduceMotion ? 1 : 0 }}
              animate={{
                y: showOverlay ? "0%" : (reduceMotion ? "0%" : "100%"),
                opacity: showOverlay ? 1 : (reduceMotion ? 1 : 0),
              }}
              transition={{ duration: fadeDuration, ease: SIGNATURE_EASE }}
              className="absolute bottom-0 left-0 right-0 p-4 pointer-events-none"
              aria-hidden="true"
            >
              <div
                className="w-full py-3 bg-black text-white flex items-center justify-center"
                style={ultraLabelStyle}
              >
                <span>{t["productCard.discover"]}</span>
              </div>
            </motion.div>

            {/* Category Tag */}
            <div className="absolute top-4 left-4">
              <span
                className="text-white bg-black px-3 py-1"
                style={ultraLabelStyle}
              >
                {categoryLabel}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-2">
            <p className="text-black/80 uppercase" style={ultraLabelStyle}>
              {product.collection}
            </p>
            <h3
              className="font-serif text-lg text-black group-hover:text-black/60 transition-colors duration-300"
              style={{ fontWeight: 500 }}
            >
              {product.name}
            </h3>
            <p className="text-black/80" style={{ ...microLabelStyle, fontSize: "12px", lineHeight: "1.5", letterSpacing: "0.04em" }}>
              {descriptionText}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
