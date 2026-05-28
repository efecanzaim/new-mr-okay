"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { getProductsByCategory } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";
import {
  sectionHeadlineStyle,
  ultraLabelStyle,
  microLabelStyle,
  navLinkStyle,
  HELVETICA_STACK,
} from "@/styles/typography";

const allTranslations = { tr, en, de, fr, ar };

const SIGNATURE_EASE = "cubic-bezier(0.23, 1, 0.32, 1)";
const FRAME_GRADIENT = "linear-gradient(107deg, rgba(89, 89, 89, 0.20) 0%, rgba(89, 89, 89, 0.03) 100%)";

/* ──────────────────────────────────────────────────────────────
   ExpandButton — collapsed circle with icon, label slides in on
   hover/focus via transform (no layout animation).
   ────────────────────────────────────────────────────────────── */
function ExpandButton({
  icon,
  label,
  ariaLabel,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  ariaLabel: string;
  onClick?: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const transition = reduceMotion ? "none" : `transform 0.5s ${SIGNATURE_EASE}, opacity 0.4s ${SIGNATURE_EASE}`;

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      aria-label={ariaLabel}
      className="relative inline-flex items-center bg-white text-black h-11 px-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black overflow-hidden"
      style={{ gap: "7px" }}
    >
      <span className="shrink-0" aria-hidden="true">{icon}</span>
      <span
        className="whitespace-nowrap"
        aria-hidden="true"
        style={{
          ...ultraLabelStyle,
          fontSize: "10px",
          letterSpacing: "0.08em",
          maxWidth: open ? "200px" : "0px",
          opacity: open ? 1 : 0,
          transform: open ? "translateX(0)" : "translateX(-8px)",
          transition,
          marginLeft: open ? "0" : "-7px",
        }}
      >
        {label}
      </span>
    </button>
  );
}

const CARD_GAP = 12;

export default function ProductShowcase({
  category,
  titleKey,
}: {
  category: "businessman" | "smartwoman";
  titleKey: string;
}) {
  const { language } = useLanguage();
  const t = allTranslations[language];
  const reduceMotion = useReducedMotion();
  const products = getProductsByCategory(category);

  const [visible, setVisible] = useState(4);
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxIndex = Math.max(0, products.length - visible);

  // Responsive: 4 cards desktop, 2 tablet, 1.2 mobile (peek)
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const w = window.innerWidth;
      const v = w >= 1024 ? 4 : w >= 640 ? 2 : 1.2;
      setVisible(v);
      const width = (containerRef.current.offsetWidth - CARD_GAP * (Math.ceil(v) - 1)) / v;
      setCardWidth(width);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const prev = () => setIndex(i => Math.max(i - 1, 0));
  const next = () => setIndex(i => Math.min(i + 1, maxIndex));

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
    else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
  };

  const title = t[titleKey as keyof typeof t] || titleKey;
  const prevLabel = t["showcase.previous"] || "Önceki ürünler";
  const nextLabel = t["showcase.next"] || "Sonraki ürünler";
  const addFavoriteLabel = t["showcase.addFavorite"] || "Favorilere Ekle";
  const quickBuyLabel = t["showcase.quickBuy"] || "Hemen Satın Al";
  const newLabel = t["productCard.new"] || "YENİ";

  return (
    <section
      className="bg-[#faf9f6] w-full"
      style={{ paddingTop: "40px", paddingBottom: "56px", paddingLeft: "24px", paddingRight: "24px" }}
      aria-label={title}
    >
      <h2 className="text-black mb-8" style={sectionHeadlineStyle}>
        {title}
      </h2>

      <div
        ref={containerRef}
        className="overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        role="region"
        aria-roledescription="carousel"
        aria-label={title}
        tabIndex={0}
        onKeyDown={onKey}
      >
        <div
          className="flex"
          style={{
            gap: `${CARD_GAP}px`,
            transform: `translateX(-${index * (cardWidth + CARD_GAP)}px)`,
            transition: reduceMotion ? "none" : `transform 0.5s ${SIGNATURE_EASE}`,
          }}
        >
          {products.map((product, i) => {
            const isActive = i >= index && i < index + Math.ceil(visible);
            return (
              <div
                key={product.id}
                className="shrink-0"
                style={{ width: `${cardWidth}px` }}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${products.length}: ${product.name}`}
                aria-hidden={!isActive}
              >
                {/* Image frame 3:4 (DESIGN.md product card spec) */}
                <div
                  className="relative overflow-hidden group"
                  style={{
                    width: `${cardWidth}px`,
                    aspectRatio: "3/4",
                    background: FRAME_GRADIENT,
                  }}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="block w-full h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    aria-label={`${product.name} — ${product.collection}`}
                    tabIndex={isActive ? 0 : -1}
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} parfümü`}
                      fill
                      className={reduceMotion ? "object-cover" : "object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"}
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
                      quality={90}
                    />
                    {product.images?.[1] && (
                      <Image
                        src={product.images[1]}
                        alt=""
                        fill
                        className={reduceMotion ? "object-cover absolute inset-0 opacity-0" : "object-cover absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"}
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 25vw"
                        quality={90}
                        aria-hidden="true"
                      />
                    )}
                  </Link>

                  {/* Top-left tag — ink-primary token */}
                  <span
                    className="absolute pointer-events-none"
                    style={{
                      top: "8px",
                      left: "8px",
                      background: "#050505",
                      color: "#ffffff",
                      ...ultraLabelStyle,
                      fontSize: "10px",
                      padding: "4px 8px",
                    }}
                  >
                    {newLabel}
                  </span>

                  {/* Action buttons — bottom right column */}
                  <div className="absolute flex flex-col gap-2" style={{ bottom: "10px", right: "10px" }}>
                    <ExpandButton
                      icon={<Heart size={18} strokeWidth={1.5} />}
                      label={addFavoriteLabel}
                      ariaLabel={`${addFavoriteLabel}: ${product.name}`}
                    />
                    <ExpandButton
                      icon={<ShoppingBag size={18} strokeWidth={1.5} />}
                      label={quickBuyLabel}
                      ariaLabel={`${quickBuyLabel}: ${product.name}`}
                    />
                  </div>
                </div>

                {/* Product info */}
                <div className="mt-3">
                  <p className="text-black/80" style={{ ...microLabelStyle, fontSize: "13px", lineHeight: "18px" }}>
                    {product.collection}
                  </p>
                  <Link
                    href={`/product/${product.id}`}
                    tabIndex={isActive ? 0 : -1}
                    className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <h3
                      className="text-black hover:text-black/60 transition-colors duration-300 mt-0.5"
                      style={{ fontFamily: HELVETICA_STACK, fontSize: "16px", fontWeight: 500, letterSpacing: "0.02em", lineHeight: "20px", textTransform: "uppercase" }}
                    >
                      {product.name}
                    </h3>
                  </Link>
                  {product.price && (
                    <p
                      className="text-black/80"
                      style={{ fontFamily: HELVETICA_STACK, fontSize: "14px", fontWeight: 400, marginTop: "4px" }}
                    >
                      {product.price} TL
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Carousel controls */}
      <div className="flex items-center justify-center mt-8" style={{ gap: "16px" }}>
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          aria-label={prevLabel}
          className="flex items-center justify-center border border-black hover:border-black/60 hover:text-black/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          style={{ width: "44px", height: "44px" }}
        >
          <ChevronLeft size={20} strokeWidth={1.5} aria-hidden="true" />
        </button>

        <span
          aria-live="polite"
          aria-atomic="true"
          style={{
            ...navLinkStyle,
            fontWeight: 500,
            color: "#050505",
            minWidth: "44px",
            textAlign: "center",
            padding: 0,
          }}
        >
          {index + 1}/{maxIndex + 1}
        </span>

        <button
          type="button"
          onClick={next}
          disabled={index >= maxIndex}
          aria-label={nextLabel}
          className="flex items-center justify-center border border-black hover:border-black/60 hover:text-black/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          style={{ width: "44px", height: "44px" }}
        >
          <ChevronRight size={20} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
