"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CollectionBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Businessman Collection */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="group"
          >
            <Link href="/collections/businessman">
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src={`${basePath}/images/businessman_banner.jpg`}
                    alt="Businessman Collection"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={100}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                  <p className="text-[10px] tracking-ultrawide uppercase text-white/80 mb-2">
                    Erkekler İçin
                  </p>
                  <h3 className="font-serif text-3xl lg:text-4xl text-white mb-4 transition-all duration-500">
                    BUSINESSMAN
                  </h3>
                  <p className="text-sm text-white/70 font-light max-w-sm">
                    Erkekliğin cesur ifadesi. Dikkat çeken kokular.
                  </p>
                  <motion.div
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    className="h-px bg-white/50 mt-6"
                  />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Smartwoman Collection */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
            className="group"
          >
            <div className="cursor-default">
              <div className="relative aspect-[4/5] overflow-hidden">
                <div className="absolute inset-0">
                  <Image
                    src={`${basePath}/images/smartwoman_banner.jpg`}
                    alt="Smartwoman Collection"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={100}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Coming Soon Badge */}
                <div className="absolute top-8 lg:top-12 left-1/2 -translate-x-1/2">
                  <div className="bg-white/95 backdrop-blur-sm px-6 py-3 rounded-sm shadow-lg">
                    <p className="text-base lg:text-lg font-semibold text-black tracking-widest">
                      ÇOK YAKINDA
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                  <p className="text-[10px] tracking-ultrawide uppercase text-white/80 mb-2">
                    Kadınlar İçin
                  </p>
                  <h3 className="font-serif text-3xl lg:text-4xl text-white mb-4 transition-all duration-500">
                    SMARTWOMAN
                  </h3>
                  <p className="text-sm text-white/70 font-light max-w-sm">
                    Her notada zarif güven. Güçlendiren kokular.
                  </p>
                  <motion.div
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    className="h-px bg-white/50 mt-6"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
