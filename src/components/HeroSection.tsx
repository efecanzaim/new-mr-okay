"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const slides = [
    { type: 'image', src: `${basePath}/images/slider2.jpg`, heading: 'Yeni yılı, yeni kokunuzla karşılayın.' },
    { type: 'video', src: `${basePath}/images/hero_video.mp4`, heading: 'Klasik, Disiplinli, Özgüvenli' },
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    resetTimer();
  };

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
              >
                <Image
                  src={slide.src}
                  alt="Hero Slider"
                  fill
                  className="object-cover object-center"
                  priority
                  unoptimized
                />
              </motion.div>
            )
          ))}

        </div>

      {/* CTA Content - Bottom of Hero */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pb-8 lg:pb-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h2
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
            className="avenir text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed tracking-wide mb-8"
            style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)' }}
          >
            {slides[currentSlide].heading}
          </motion.h2>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8, ease: [0.23, 1, 0.32, 1] }}
          >
            <Link href="/collections/businessman">
              <button
                className="px-12 py-4 bg-white text-black text-xs tracking-ultrawide uppercase font-medium transition-colors duration-300 hover:bg-black hover:text-white avenir"
              >
                Keşfet
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
