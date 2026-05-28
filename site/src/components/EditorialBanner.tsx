"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

export default function EditorialBanner() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const { language } = useLanguage();
  const t = allTranslations[language];

  return (
    /* Tom Ford: aspect-ratio 21/9 desktop, 4/5 mobile, full-width */
    <section
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '21/9' }}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={`${basePath}/images/slider2.jpeg`}
          alt="Businessman Collection"
          fill
          className="object-cover"
          quality={100}
        />
      </div>

      {/* Overlay — Tom Ford uses a subtle dark overlay on left side */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 55%, transparent 80%)' }}
      />

      {/* Content — Tom Ford: flex-col, vertically centered, left-aligned, left padding ~160px */}
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: '160px', gap: '8px' }}
      >
        {/* "NEW" tag — Tom Ford h5 style */}
        <p
          className="text-white"
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          {t["home.hero.discover"] ? "NEW" : "NEW"}
        </p>

        {/* H1 — Tom Ford: 40px / weight 500 / letter-spacing -2px / uppercase */}
        <h2
          className="text-white"
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '40px',
            fontWeight: 500,
            letterSpacing: '-2px',
            textTransform: 'uppercase',
            lineHeight: '40px',
          }}
        >
          BUSINESSMAN
        </h2>

        {/* Subtitle — Tom Ford: 13px / weight 400 / letter-spacing -0.4px */}
        <p
          className="text-white"
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: '13px',
            fontWeight: 400,
            letterSpacing: '-0.4px',
            lineHeight: '16px',
          }}
        >
          {t["collection.businessman.desc"] || "The bold expression of masculinity."}
        </p>

        {/* CTA — Tom Ford: plain text link, no button, 13px / weight 500 / letter-spacing 0.65px */}
        <Link href="/collections/businessman">
          <span
            className="text-white inline-block"
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.65px',
              textTransform: 'uppercase',
              marginTop: '14px',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            {t["home.hero.discover"] || "DISCOVER"}
          </span>
        </Link>
      </div>
    </section>
  );
}
