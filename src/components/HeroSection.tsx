"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const slides = [
    { type: 'video', src: `${basePath}/images/hero_video.mp4`, heading: 'Klasik, Disiplinli, Özgüvenli' },
    { type: 'image', src: `${basePath}/images/slider2.jpg`, heading: 'Yeni yılı, yeni kokunuzla karşılayın.' },
  ];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

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
      <section ref={ref} className="relative h-[100dvh] w-full overflow-hidden">
        {/* Slider Background */}
        <motion.div style={{ y, scale }} className="absolute top-0 left-0 w-full h-full">
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
                />
              </motion.div>
            )
          ))}

        </motion.div>

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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-12 py-4 border border-white/30 bg-white/10 backdrop-blur-sm text-xs tracking-ultrawide uppercase font-light overflow-hidden transition-colors duration-300 hover:bg-white avenir-thin"
              >
                <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
                  Keşfet
                </span>
                <div className="absolute inset-0 bg-white z-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Slider Controls - Below CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex items-center justify-center gap-6 mt-8"
          >
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-black/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-black/50 transition-all duration-300"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>

            {/* Slide Indicators */}
            <div className="flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full border border-black/30 transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/70 w-2'
                  }`}
                />
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-black/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 hover:border-black/50 transition-all duration-300"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}
