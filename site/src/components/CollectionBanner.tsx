"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";
import {
  bannerHeadlineStyle,
  bannerPretitleStyle,
  bannerSubtitleStyle,
  navLinkStyle,
} from "@/styles/typography";

const allTranslations = { tr, en, de, fr, ar };

const ctaStyle = {
  ...navLinkStyle,
  padding: "11px 36px",
  fontWeight: 500,
};

type CollectionTile = {
  href: string;
  image: string;
  pretitleKey: string;
  pretitleFallback: string;
  title: string;
  subtitleKey: string;
  subtitleFallback: string;
  altKey: string;
  altFallback: string;
};

const TILES: CollectionTile[] = [
  {
    href: "/collections/businessman",
    image: "/images/businessman_banner.jpg",
    pretitleKey: "collection.forMen",
    pretitleFallback: "Erkekler İçin",
    title: "BUSINESSMAN",
    subtitleKey: "collection.businessman.desc",
    subtitleFallback: "Erkekliğin cesur ifadesi.",
    altKey: "banner.businessman.alt",
    altFallback: "Businessman koleksiyonu editorial görseli",
  },
  {
    href: "/collections/smartwoman",
    image: "/images/smartwoman_banner.jpg",
    pretitleKey: "collection.forWomen",
    pretitleFallback: "Kadınlar İçin",
    title: "SMARTWOMAN",
    subtitleKey: "collection.smartwoman.desc",
    subtitleFallback: "Her notada zarif güven.",
    altKey: "banner.smartwoman.alt",
    altFallback: "Smartwoman koleksiyonu editorial görseli",
  },
];

export default function CollectionBanner() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const { language } = useLanguage();
  const t = allTranslations[language];
  const cta = t["home.hero.discover"] || "Koleksiyonu Keşfet";

  return (
    <section className="bg-[#faf9f6] w-full" style={{ paddingTop: "40px", paddingBottom: "56px", paddingLeft: "24px", paddingRight: "24px" }}>
      <div className="flex flex-col lg:flex-row gap-3">
        {TILES.map(tile => {
          const pretitle = t[tile.pretitleKey as keyof typeof t] || tile.pretitleFallback;
          const subtitle = t[tile.subtitleKey as keyof typeof t] || tile.subtitleFallback;
          const imageAlt = t[tile.altKey as keyof typeof t] || tile.altFallback;
          return (
            <Link
              key={tile.href}
              href={tile.href}
              className="flex-1 relative overflow-hidden block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              style={{ aspectRatio: "16/9" }}
              aria-label={`${tile.title} koleksiyonu`}
            >
              <Image
                src={`${basePath}${tile.image}`}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 35%, transparent 65%)" }}
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 pb-10 text-center px-6">
                <p className="text-white" style={bannerPretitleStyle}>
                  {pretitle}
                </p>
                <h3 className="text-white mt-1" style={bannerHeadlineStyle}>
                  {tile.title}
                </h3>
                <p className="text-white mt-2" style={{ ...bannerSubtitleStyle, opacity: 0.9 }}>
                  {subtitle}
                </p>
                <span
                  className="inline-block bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 mt-4"
                  style={ctaStyle}
                >
                  {cta.toLocaleUpperCase("tr-TR")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
