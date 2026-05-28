"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";
import { ultraLabelStyle, microLabelStyle, navLinkStyle, HELVETICA_STACK } from "@/styles/typography";

const allTranslations = { tr, en, de, fr, ar };
const SIGNATURE_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function BrandStory() {
  const { language } = useLanguage();
  const t = allTranslations[language];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const reduceMotion = useReducedMotion();

  const fade = (animate: object) => ({
    initial: reduceMotion ? false : { opacity: 0, ...animate } as object,
    animate: isInView ? { opacity: 1, x: 0, y: 0, scale: 1 } : (reduceMotion ? { opacity: 1 } : { opacity: 0, ...animate }),
  });

  return (
    <section ref={ref} className="py-24 lg:py-40 bg-[#faf9f6] relative overflow-hidden" aria-label="Marka hikayesi">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            {...fade({ scale: 0.95 })}
            transition={{ duration: reduceMotion ? 0 : 1, ease: SIGNATURE_EASE }}
            className="order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/hakan_okay.jpg"
                alt="Hakan Okay portresi"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
              {/* Decorative inset hairline — DESIGN.md tonal layering */}
              <div className="absolute -inset-4 border border-black/10 -z-10" aria-hidden="true" />
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            {...fade({ x: 40 })}
            transition={{ duration: reduceMotion ? 0 : 1, ease: SIGNATURE_EASE, delay: reduceMotion ? 0 : 0.2 }}
            className="order-1 lg:order-2"
          >
            <p className="text-black mb-6" style={ultraLabelStyle}>
              {t["brandStory.subtitle"]}
            </p>

            <h2
              className="text-black mb-8"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: "0",
              }}
            >
              <span className="block text-xl lg:text-2xl xl:text-3xl">{t["brandStory.title1"]}</span>
              <span className="block text-3xl lg:text-4xl xl:text-5xl pb-2">{t["brandStory.title2"]}</span>
              <span className="block text-xl lg:text-2xl xl:text-3xl">{t["brandStory.title3"]}</span>
            </h2>

            <div className="space-y-6 text-black" style={{ ...microLabelStyle, fontSize: "15px", fontWeight: 400, lineHeight: 1.7 }}>
              <p>{t["brandStory.bio1"]}</p>
              <p>{t["brandStory.bio2"]}</p>
            </div>

            <motion.div
              {...fade({ y: 20 })}
              transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.6 }}
              className="mt-10"
            >
              <Link
                href="/about"
                className="text-black inline-block border-b border-black/30 hover:border-black transition-colors duration-300 pb-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
                style={{ ...navLinkStyle, padding: 0, fontWeight: 500 }}
              >
                {t["brandStory.discoverStory"]}
              </Link>
            </motion.div>

            {/* Stats */}
            <dl className="grid grid-cols-3 gap-8 mt-16 pt-12 border-t border-black/10">
              {[
                { number: t["brandStory.stat1.number"], label: t["brandStory.stat1.label"] },
                { number: t["brandStory.stat2.number"], label: t["brandStory.stat2.label"] },
                { number: t["brandStory.stat3.number"], label: t["brandStory.stat3.label"] },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  {...fade({ y: 20 })}
                  transition={{ duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : 0.8 + index * 0.1 }}
                >
                  <dt
                    className="text-black mb-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "36px", lineHeight: 1, fontWeight: 500 }}
                  >
                    {stat.number}
                  </dt>
                  <dd className="text-black" style={ultraLabelStyle}>
                    {stat.label}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
