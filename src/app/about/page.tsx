"use client";

import { motion } from "framer-motion";
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
  const { language } = useLanguage();
  const t = allTranslations[language];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-end justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/mrokay_banner.png"
            alt="Mr. Okay"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 80%' }}
            priority
            quality={100}
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-6 pb-16"
        >
          <h1 
            className="text-5xl md:text-7xl text-white"
            style={{ fontFamily: 'Blacksword, serif', fontStyle: 'normal', letterSpacing: '0' }}
          >
            Mr. Okay
          </h1>
          <p className="text-2xl text-white/90 font-regular mt-4 max-w-xl mx-auto">
            Bilimin hassasiyeti, sanatın ruhuyla buluştu!
          </p>
        </motion.div>
      </section>

      {/* Section 1 - Kozmetik Dünyasında Bir Ömür */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-[3/4] lg:aspect-[4/5] bg-gray-100">
                <Image
                  src="/images/mr-okay-1.png"
                  alt="Hakan Okay - Kozmetik Dünyasında Bir Ömür"
                  fill
                  className="object-cover"
                />
                <div className="absolute -inset-4 border border-black/10 -z-10" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <h2 className="font-serif text-3xl lg:text-4xl text-black mb-8">
                {t["about.section1.title"]}
              </h2>
              <div className="space-y-5 text-black font-semibold leading-relaxed text-[15px]">
                <p dangerouslySetInnerHTML={{ __html: t["about.section1.p1"] }} />
                <p>{t["about.section1.p2"]}</p>
                <p>{t["about.section1.p3"]}</p>
                <p dangerouslySetInnerHTML={{ __html: t["about.section1.p4"] }} />
                <p>{t["about.section1.p5"]}</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 2 - Uluslararası Deneyim ve Marka İnşası */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left" className="order-2 lg:order-1">
              <h2 className="font-serif text-3xl lg:text-4xl text-black mb-4">
                {t["about.section2.title"]}
              </h2>
              <p className="text-lg text-black font-medium mb-8 italic">
                {t["about.section2.subtitle"]}
              </p>
              <div className="space-y-5 text-black font-semibold leading-relaxed text-[15px]">
                <p dangerouslySetInnerHTML={{ __html: t["about.section2.p1"] }} />
                <p dangerouslySetInnerHTML={{ __html: t["about.section2.p2"] }} />
                <p dangerouslySetInnerHTML={{ __html: t["about.section2.p3"] }} />
                <p dangerouslySetInnerHTML={{ __html: t["about.section2.p4"] }} />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2} className="order-1 lg:order-2">
              <div className="relative aspect-[3/4] lg:aspect-[4/5] bg-gray-100">
                <Image
                  src="/images/mr-okay-2.png"
                  alt="Hakan Okay - Uluslararası Deneyim"
                  fill
                  className="object-cover"
                />
                <div className="absolute -inset-4 border border-black/10 -z-10" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Section 3 - Akademik Derinlik ve Mr. Okay */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal direction="left">
              <div className="relative aspect-[3/4] lg:aspect-[4/5] bg-gray-100">
                <Image
                  src="/images/mr-okay-3.png"
                  alt="Hakan Okay - Akademik Derinlik"
                  fill
                  className="object-cover"
                />
                <div className="absolute -inset-4 border border-black/10 -z-10" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.2}>
              <h2 className="font-serif text-3xl lg:text-4xl text-black mb-4">
                {t["about.section3.title"]}
              </h2>
              <p className="text-lg text-black font-medium mb-8 italic">
                {t["about.section3.subtitle"]}
              </p>
              <div className="space-y-5 text-black font-semibold leading-relaxed text-[15px]">
                <p>{t["about.section3.p1"]}</p>
                <p>{t["about.section3.p2"]}</p>
                <p className="font-bold text-black">{t["about.section3.p3"]}</p>
                <p dangerouslySetInnerHTML={{ __html: t["about.section3.p4"] }} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Hakan Okay Quote */}
      <section className="py-12 lg:py-16 bg-black">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <div className="w-px h-10 bg-white/30 mx-auto mb-5" />
            <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-white leading-relaxed mb-5">
              <p className="mb-3">{t["about.quote.line1"]}</p>
              <p>{t["about.quote.line2"]}</p>
            </blockquote>
            <div className="w-px h-10 bg-white/30 mx-auto mb-4" />
            <p className="text-white/60 text-sm tracking-widest uppercase">
              Hakan Okay
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif text-4xl text-black">{t["about.values"]}</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: t["about.values.quality"],
                description: t["about.values.quality.desc"],
                icon: "/icons/kalite.png",
                iconClass: "w-20 h-20",
              },
              {
                title: t["about.values.elegance"],
                description: t["about.values.elegance.desc"],
                icon: "/icons/zarafet.png",
                iconClass: "w-28 h-28",
              },
              {
                title: t["about.values.sustainability"],
                description: t["about.values.sustainability.desc"],
                icon: "/icons/luks.png",
                iconClass: "w-20 h-20",
              },
            ].map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="text-center">
                  <div className="h-28 flex items-center justify-center mx-auto mb-6">
                    <div className={value.iconClass}>
                      <Image
                        src={value.icon}
                        alt={value.title}
                        width={112}
                        height={112}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-black mb-4">
                    {value.title}
                  </h3>
                  <p className="text-black font-semibold text-sm leading-relaxed">
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
