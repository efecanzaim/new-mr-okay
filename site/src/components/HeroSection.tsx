"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

export default function HeroSection() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const { language } = useLanguage();
  const t = allTranslations[language];

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden">
      {/* ── Background image ── */}
      <div className="absolute inset-0">
        <Image
          src={`${basePath}/images/slider3.png`}
          alt="Mr. Okay Hero"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </div>

      {/* ── Gradient overlay (Guerlain: r_gradient-overlay) ── */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, transparent 65%)' }}
      />

      {/* ── Text container — bottom center (Guerlain: r_inside-bottom + r_text-center) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-20 lg:pb-14 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Ontitle — 12px / bold / 2px tracking / uppercase */}
          <p
            className="text-white"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', lineHeight: '13.7px' }}
          >
            {t["collection.smartwoman.desc"] || "Nouvelle Collection"}
          </p>

          {/* Title h2 — 24px / bold / 2px tracking / uppercase / mt 4px */}
          <h2
            className="text-white"
            style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '24px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', lineHeight: '27.4px', marginTop: '4px' }}
          >
            SMARTWOMAN
          </h2>

          {/* CTA button — r_btn-primary-reverse: solid white bg + black text */}
          <div style={{ marginTop: '20px' }}>
            <Link href="/collections/smartwoman">
              <span
                className="inline-block bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
                style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', padding: '11px 36px' }}
              >
                {t["home.hero.discover"] || "Discover"}
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
