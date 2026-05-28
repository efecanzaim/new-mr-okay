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

export default function SmartWomanBanner() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const { language } = useLanguage();
  const t = allTranslations[language];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: '21/9' }}
    >
      <div className="absolute inset-0">
        <Image
          src={`${basePath}/images/slider1.jpeg`}
          alt="Smartwoman Collection"
          fill
          className="object-cover"
          quality={100}
        />
      </div>

      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 55%, transparent 80%)' }}
      />

      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: '160px', gap: '8px' }}
      >
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
          NEW
        </p>

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
          SMARTWOMAN
        </h2>

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
          {t["collection.smartwoman.desc"] || "Her notada zarif güven. Güçlendiren kokular."}
        </p>

        <Link href="/collections/smartwoman">
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
