"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";
import {
  editorialDisplayStyle,
  editorialSubtitleStyle,
  editorialCtaStyle,
  editorialEyebrowStyle,
} from "@/styles/typography";

const allTranslations = { tr, en, de, fr, ar };

export default function SmartWomanBanner() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const { language } = useLanguage();
  const t = allTranslations[language];

  const eyebrow = t["banner.new"] || "YENİ";
  const subtitle = t["collection.smartwoman.desc"] || "Her notada zarif güven. Güçlendiren kokular.";
  const cta = t["home.hero.discover"] || "Koleksiyonu Keşfet";
  const imageAlt = t["banner.smartwoman.alt"] || "Smartwoman koleksiyonu editorial görseli";

  return (
    <section className="relative w-full overflow-hidden" style={{ aspectRatio: "21/9" }} aria-label="Smartwoman koleksiyon banner">
      <div className="absolute inset-0">
        <Image
          src={`${basePath}/images/slider1.jpeg`}
          alt={imageAlt}
          fill
          className="object-cover"
          quality={90}
          sizes="100vw"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 55%, transparent 80%)" }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col justify-center px-6 lg:pl-[160px] lg:pr-6" style={{ gap: "8px" }}>
        <p className="text-white" style={editorialEyebrowStyle}>
          {eyebrow}
        </p>

        <h2 className="text-white" style={editorialDisplayStyle}>
          SMARTWOMAN
        </h2>

        <p className="text-white" style={editorialSubtitleStyle}>
          {subtitle}
        </p>

        <Link
          href="/collections/smartwoman"
          className="text-white inline-block self-start mt-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          style={editorialCtaStyle}
        >
          {cta.toLocaleUpperCase("tr-TR")}
        </Link>
      </div>
    </section>
  );
}
