"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { getProductsByCategory } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

function ExpandButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center overflow-hidden"
      style={{
        height: '44px',
        width: 'max-content',
        maxWidth: hovered ? '300px' : '44px',
        backgroundColor: '#fff',
        color: '#000',
        transition: 'max-width 1.2s cubic-bezier(0.23, 1, 0.32, 1)',
        paddingLeft: '11px',
        paddingRight: '11px',
        gap: '7px',
      }}
    >
      <span className="shrink-0">{icon}</span>
      <span
        className="whitespace-nowrap overflow-hidden"
        style={{
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          maxWidth: hovered ? '160px' : '0px',
          opacity: hovered ? 1 : 0,
          transition: 'max-width 1.2s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.6s ease 0.15s',
        }}
      >
        {label}
      </span>
    </button>
  );
}

const CARD_GAP = 12;
const VISIBLE = 4;

export default function ProductShowcase({ category, title }: { category: "businessman" | "smartwoman"; title: string }) {
  const { language } = useLanguage();
  const t = allTranslations[language];
  const products = getProductsByCategory(category);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxIndex = products.length - VISIBLE;

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        setCardWidth((containerRef.current.offsetWidth - CARD_GAP * (VISIBLE - 1)) / VISIBLE);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const prev = () => setIndex(i => Math.max(i - 1, 0));
  const next = () => setIndex(i => Math.min(i + 1, maxIndex));

  return (
    <section
      className="bg-[#faf9f6] w-full"
      style={{ paddingTop: '40px', paddingBottom: '56px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      {/* Section label */}
      <p
        className="mb-8"
        style={{ fontSize: '32px', fontWeight: 500, letterSpacing: 'normal', textTransform: 'uppercase', color: '#212529', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
      >
        {title}
      </p>

      {/* Carousel viewport */}
      <div className="overflow-hidden" ref={containerRef}>
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ gap: `${CARD_GAP}px`, transform: `translateX(-${index * (cardWidth + CARD_GAP)}px)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="shrink-0" style={{ width: `${cardWidth}px` }}>

              {/* Image container — 1:1 square, beige bg */}
              <div
                className="relative overflow-hidden group"
                style={{ width: `${cardWidth}px`, height: `${cardWidth}px`, backgroundColor: 'rgba(89, 89, 89, 0.12)' }}
              >
                <Link href={`/product/${product.id}`}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:opacity-0"
                    sizes="25vw"
                    quality={90}
                  />
                  {product.images?.[1] && (
                    <Image
                      src={product.images[1]}
                      alt={product.name}
                      fill
                      className="object-cover opacity-0 group-hover:opacity-100"
                      sizes="25vw"
                      quality={90}
                    />
                  )}
                </Link>

                {/* product-tag tag_color_black — top left */}
                <div
                  className="absolute"
                  style={{
                    top: '8px', left: '8px',
                    backgroundColor: '#020202', color: '#fff',
                    fontSize: '12px', fontWeight: 700,
                    letterSpacing: '0.48px', textTransform: 'uppercase',
                    padding: '4px 8px', pointerEvents: 'none',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}
                >
                  {t["productCard.new"] || "New"}
                </div>

                {/* Favorilere Ekle — absolute, independent positioning */}
                <div className="absolute" style={{ bottom: '62px', right: '10px' }}>
                  <ExpandButton icon={<Heart size={18} strokeWidth={1.5} />} label="Favorilere Ekle" />
                </div>
                {/* Hemen Satın Al — absolute, independent positioning */}
                <div className="absolute" style={{ bottom: '10px', right: '10px' }}>
                  <ExpandButton icon={<ShoppingBag size={18} strokeWidth={1.5} />} label="Hemen Satın Al" />
                </div>
              </div>

              {/* Product info */}
              <div className="mt-3">
                <p
                  className="text-black/50"
                  style={{ fontSize: '14px', fontWeight: 400, lineHeight: '18px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                >
                  {product.collection}
                </p>
                <Link href={`/product/${product.id}`}>
                  <h3
                    className="text-black hover:text-black/60 transition-colors duration-200 mt-0.5"
                    style={{ fontSize: '16px', fontWeight: 500, letterSpacing: '0.3px', lineHeight: '20px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', textTransform: 'uppercase' }}
                  >
                    {product.name}
                  </h3>
                </Link>
                {product.price && (
                  <p style={{ fontSize: '14px', fontWeight: 400, color: '#545454', marginTop: '4px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                    {product.price} TL
                  </p>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Arrows — centered below carousel (Guerlain style) */}
      <div className="flex items-center justify-center gap-3 mt-8" style={{ gap: '16px' }}>
        <button
          onClick={prev}
          disabled={index === 0}
          className="flex items-center justify-center border border-black hover:border-black/40 hover:text-black/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
          style={{ width: '44px', height: '44px' }}
        >
          <ChevronLeft size={20} strokeWidth={1.5} />
        </button>

        <span
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            color: '#545454',
            letterSpacing: '0.5px',
            minWidth: '32px',
            textAlign: 'center',
          }}
        >
          {index + 1}/{maxIndex + 1}
        </span>

        <button
          onClick={next}
          disabled={index >= maxIndex}
          className="flex items-center justify-center border border-black hover:border-black/40 hover:text-black/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
          style={{ width: '44px', height: '44px' }}
        >
          <ChevronRight size={20} strokeWidth={1.5} />
        </button>
      </div>

    </section>
  );
}
