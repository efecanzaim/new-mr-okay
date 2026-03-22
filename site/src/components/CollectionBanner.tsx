"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

export default function CollectionBanner() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const { language } = useLanguage();
  const t = allTranslations[language];

  return (
    <section
      className="bg-[#faf9f6] w-full"
      style={{ paddingTop: '40px', paddingBottom: '56px', paddingLeft: '24px', paddingRight: '24px' }}
    >
      <div className="flex gap-3">
        {/* Businessman */}
        <Link href="/collections/businessman" className="flex-1 relative overflow-hidden block" style={{ aspectRatio: '16/9' }}>
          <Image
            src={`${basePath}/images/businessman_banner.jpg`}
            alt="Businessman Collection"
            fill
            className="object-cover"
            sizes="50vw"
            quality={100}
          />
          {/* Gradient — r_gradient-overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, transparent 65%)' }}
          />
          {/* Content — r_inside-bottom r_text-center */}
          <div className="absolute bottom-0 left-0 right-0 pb-10 text-center px-6">
            <p
              className="text-white"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' }}
            >
              {t["collection.forMen"] || "Erkekler İçin"}
            </p>
            <h3
              className="text-white"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '24px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}
            >
              BUSINESSMAN
            </h3>
            <p
              className="text-white"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '0.5px', marginTop: '6px', opacity: 0.85 }}
            >
              {t["collection.businessman.desc"] || "Erkekliğin cesur ifadesi."}
            </p>
            <span
              className="inline-block bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '16px', padding: '11px 36px' }}
            >
              {t["home.hero.discover"] || "Discover"}
            </span>
          </div>
        </Link>

        {/* Smartwoman */}
        <Link href="/collections/smartwoman" className="flex-1 relative overflow-hidden block" style={{ aspectRatio: '16/9' }}>
          <Image
            src={`${basePath}/images/smartwoman_banner.jpg`}
            alt="Smartwoman Collection"
            fill
            className="object-cover"
            sizes="50vw"
            quality={100}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, transparent 65%)' }}
          />
          <div className="absolute bottom-0 left-0 right-0 pb-10 text-center px-6">
            <p
              className="text-white"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '12px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase' }}
            >
              {t["collection.forWomen"] || "Kadınlar İçin"}
            </p>
            <h3
              className="text-white"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '24px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '4px' }}
            >
              SMARTWOMAN
            </h3>
            <p
              className="text-white"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '0.5px', marginTop: '6px', opacity: 0.85 }}
            >
              {t["collection.smartwoman.desc"] || "Her notada zarif güven."}
            </p>
            <span
              className="inline-block bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
              style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: '13px', fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', marginTop: '16px', padding: '11px 36px' }}
            >
              {t["home.hero.discover"] || "Discover"}
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
