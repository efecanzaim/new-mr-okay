"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { language } = useLanguage();
  const t = allTranslations[language];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-white" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-6"
        >
          <p className="text-[10px] tracking-ultrawide uppercase text-silver-dark mb-4">
            {t["about.story"]}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-black">
            Mr Okay
          </h1>
          <p className="text-lg text-silver-dark font-light mt-4 max-w-xl mx-auto">
            {t["about.legacy"]}
          </p>
        </motion.div>
      </section>

      {/* Origin Story */}
      <section ref={ref} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-[3/4] lg:aspect-[3/5] bg-gray-100">
                <Image
                  src="/images/hakan_okay.jpg"
                  alt="Hakan Okay"
                  fill
                  className="object-cover"
                />
                <div className="absolute -inset-4 border border-black/10 -z-10" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <h2 className="font-serif text-4xl lg:text-5xl text-black mb-8">
                Hakan Okay
              </h2>
              <div className="space-y-6 text-silver-dark font-semibold leading-relaxed">
                <p>{t["about.hakan.bio1"]}</p>
                <p>{t["about.hakan.bio2"]}</p>
                <p>{t["about.hakan.bio3"]}</p>
                <p>{t["about.hakan.bio4"]}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p className="text-[10px] tracking-ultrawide uppercase text-silver-dark mb-6">
              {t["about.philosophy"]}
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-black mb-8 leading-tight">
              &ldquo;{t["about.philosophy.quote"]}&rdquo;
            </h2>
            <p className="text-silver-dark font-light leading-relaxed max-w-2xl mx-auto">
              {t["about.philosophy.text"]}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif text-4xl text-black">{t["about.values"]}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: t["about.values.quality"],
                description: t["about.values.quality.desc"],
              },
              {
                title: t["about.values.elegance"],
                description: t["about.values.elegance.desc"],
              },
              {
                title: t["about.values.sustainability"],
                description: t["about.values.sustainability.desc"],
              },
            ].map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-px h-12 bg-silver-dark mx-auto mb-6" />
                  <h3 className="font-serif text-xl text-black mb-4">
                    {value.title}
                  </h3>
                  <p className="text-silver-dark font-light text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
