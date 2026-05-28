"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";
import { navLinkStyle, microLabelStyle } from "@/styles/typography";
import type { CSSProperties } from "react";

const allTranslations = { tr, en, de, fr, ar };

const titleStyle: CSSProperties = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "24px",
  fontWeight: 500,
  letterSpacing: "0.092em",
  textTransform: "uppercase",
  lineHeight: "27.4px",
  marginTop: "4px",
};

const ctaStyle: CSSProperties = {
  ...navLinkStyle,
  padding: "11px 36px",
  fontWeight: 500,
};

export default function HeroSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const { language } = useLanguage();
  const t = allTranslations[language];
  const reduceMotion = useReducedMotion();

  const ontitle = t["home.hero.ontitle"] || "Yeni Koleksiyon";
  const discover = t["home.hero.discover"] || "Koleksiyonu Keşfet";
  const imageAlt = t["home.hero.alt"] || "Smartwoman koleksiyonu için sahnelenmiş parfüm fotoğrafı";

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden" aria-label="Anasayfa hero">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={`${basePath}/images/slider3.jpeg`}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay — ensures AAA contrast for white text at bottom */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, transparent 65%)" }}
        aria-hidden="true"
      />

      {/* Text container — bottom center */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-20 lg:pb-14 text-center px-6">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Ontitle micro-label */}
          <p className="text-white" style={{ ...microLabelStyle, fontSize: "12px", letterSpacing: "0.167em", textTransform: "uppercase", lineHeight: "13.7px" }}>
            {ontitle}
          </p>

          {/* H2 collection name */}
          <h2 className="text-white" style={titleStyle}>
            SMARTWOMAN
          </h2>

          {/* CTA */}
          <div style={{ marginTop: "20px" }}>
            <Link
              href="/collections/smartwoman"
              className="inline-block bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              style={ctaStyle}
            >
              {discover.toLocaleUpperCase("tr-TR")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
