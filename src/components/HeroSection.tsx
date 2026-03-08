"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const { language } = useLanguage();
  const t = allTranslations[language];

  const slides = [
    { type: 'image', src: `${basePath}/images/slider3.png`, supertitle: 'Yeni Koleksiyon', title: 'SMARTWOMAN', subtitle: 'Beş Farklı An, Bir Kadın.', link: '/collections/smartwoman', objectPosition: 'center' },
    { type: 'image', src: `${basePath}/images/slider2.jpg`, headingKey: 'home.hero.subtitle', link: '/collections/businessman', objectPosition: 'center' },
    { type: 'video', src: `${basePath}/images/hero_video.mp4`, headingKey: 'product.classic.tagline', link: '/collections/businessman', objectPosition: 'center' },
  ];

  // Auto-advance slider - resets when resetKey changes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, [slides.length, resetKey]);

  const resetTimer = useCallback(() => {
    setResetKey((prev) => prev + 1);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  };

  return (
    <>
      <section className="relative h-[100dvh] w-full overflow-hidden">
        {/* Slider Background */}
        <div className="absolute top-0 left-0 w-full h-full">
          {/* All slides rendered, visibility controlled by opacity */}
          {slides.map((slide, index) => (
            slide.type === 'video' ? (
              <motion.video
                key={`video-${index}`}
                initial={false}
                animate={{ opacity: currentSlide === index ? 1 : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src={slide.src} type="video/mp4" />
              </motion.video>
            ) : (
              <motion.div
                key={`image-${index}`}
                initial={false}
                animate={{ opacity: currentSlide === index ? 1 : 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full"
                style={{ backgroundColor: 'transparent' }}
              >
                <Image
                  src={slide.src}
                  alt="Hero Slider"
                  fill
                  className="object-cover"
                  style={{ objectPosition: slide.objectPosition || 'center' }}
                  priority
                  quality={100}
                />
              </motion.div>
            )
          ))}

        </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[5] pointer-events-none" />

      {/* CTA Content - Bottom of Hero */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-24 lg:pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          {(slides[currentSlide].title || currentSlide === 1) && (
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
              className="avenir text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide mb-4"
              style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)' }}
            >
              {slides[currentSlide].title || t["home.hero.title"]}
            </motion.h1>
          )}

          {/* Subtitle */}
          <motion.h2
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: slides[currentSlide].title || currentSlide === 1 ? 0.2 : 0, ease: [0.23, 1, 0.32, 1] }}
            className="avenir text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed tracking-wide mb-8"
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)' }}
          >
            {slides[currentSlide].subtitle || (slides[currentSlide].headingKey && t[slides[currentSlide].headingKey as keyof typeof t]) || slides[currentSlide].headingKey}
          </motion.h2>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link href={slides[currentSlide].link || '/collections/businessman'}>
              <button
                className="px-12 py-4 bg-white text-black text-xs tracking-ultrawide uppercase font-medium transition-colors duration-300 hover:bg-black hover:text-white avenir"
              >
                {t["home.hero.discover"]}
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Left Arrow - Centered on left edge */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={prevSlide}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </motion.button>

      {/* Right Arrow - Centered on right edge */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={nextSlide}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </motion.button>
    </section>
    </>
  );
}
