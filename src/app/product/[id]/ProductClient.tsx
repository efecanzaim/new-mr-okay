"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Share2, X } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import ProductCard from "@/components/ProductCard";
import { Product, products } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

// Share menu icons as SVG components
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

interface ProductClientProps {
  product: Product;
  productId: string;
}

export default function ProductClient({ product, productId }: ProductClientProps) {
  const { language } = useLanguage();
  const t = allTranslations[language];
  const [selectedMl, setSelectedMl] = useState<50 | 100 | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  // Share URL and text
  const shareUrl = `https://mrokayparfum.com/product/${productId}`;
  const shareTitle = `Mr. Okay ${product.name} - ${product.collection}`;
  const shareText = product.description;

  // Close share menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    if (showShareMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareMenu]);

  // Handle share button click - toggle share menu
  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
  };

  // Share via email
  const shareToEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    setShowShareMenu(false);
  };

  // Share to specific platform
  const shareToWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n${shareUrl}`)}`, "_blank");
    setShowShareMenu(false);
  };

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
    setShowShareMenu(false);
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
    setShowShareMenu(false);
  };

  // Galeri görselleri - sıralama: 1, 2, hover, 4
  const galleryImages = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  // Get related products (same category, exclude current product)
  const relatedProducts = products
    .filter((p) => p.id !== productId && p.category === product.category)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      collection: p.collection,
      price: p.price,
      image: p.image,
      category: p.category,
      description: p.description,
    }));

  return (
    <div className="bg-white min-h-screen pt-20">
      {/* Product Detail */}
      <section className="py-4 lg:py-8">
        <div className="max-w-7xl mx-auto px-2 lg:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Left Side - Image Gallery (3/5 = 60%) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="lg:col-span-3 flex flex-col-reverse lg:flex-row gap-3"
            >
              {/* Thumbnail Gallery - Mobilde altta yatay, masaüstünde solda dikey */}
              {galleryImages.length > 1 && (
                <div className="grid grid-cols-4 lg:grid-cols-1 gap-2 lg:gap-0 w-full lg:w-36 flex-shrink-0 lg:max-h-[100vh] lg:flex lg:flex-col">
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className="relative group lg:flex-1 lg:min-h-0"
                    >
                      {/* Thumbnail Image */}
                      <div 
                        className="relative overflow-hidden"
                        style={{ background: 'linear-gradient(107deg, rgba(89, 89, 89, 0.20) 0%, rgba(89, 89, 89, 0.03) 100%)' }}
                      >
                        <Image
                          src={img}
                          alt={`${product.name} - Thumbnail ${index + 1}`}
                          width={200}
                          height={300}
                          className="w-full h-auto lg:w-full lg:h-full lg:object-contain transition-opacity duration-300 group-hover:opacity-80"
                          sizes="(max-width: 1024px) 25vw, 144px"
                          quality={100}
                        />
                      </div>
                      {/* Sliding Indicator Line */}
                      <motion.div
                        className="absolute -bottom-1 lg:-right-1 lg:bottom-0 left-0 lg:left-auto right-0 lg:top-0 h-0.5 lg:h-auto lg:w-0.5 bg-black"
                        initial={false}
                        animate={{
                          scaleX: selectedImageIndex === index ? 1 : 0,
                          scaleY: selectedImageIndex === index ? 1 : 0,
                          opacity: selectedImageIndex === index ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div
                className="relative flex-1 min-w-0 aspect-[2/3]"
                style={{ background: 'linear-gradient(107deg, rgba(89, 89, 89, 0.20) 0%, rgba(89, 89, 89, 0.03) 100%)' }}
              >
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={galleryImages[selectedImageIndex]}
                      alt={`${product.name} - Görsel ${selectedImageIndex + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      quality={100}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right Side - Product Info (2/5 = 40%) */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start space-y-6"
            >
              {/* Collection & Name */}
              <div>
                <span className="inline-block bg-black text-white text-[10px] tracking-ultrawide uppercase px-3 py-1.5 mb-3 font-semibold">
                  {product.collection}
                </span>
                <h1 className="font-serif text-4xl lg:text-5xl text-black mb-2">
                  {product.name}
                </h1>
                
                {/* Custom Product Descriptions */}
                {productId === "classic" && (
                  <div className="mb-4">
                    <p className="text-black font-bold text-lg mb-2">{t["product.classic.tagline"]}</p>
                    <p className="text-black font-medium leading-relaxed">
                      {t["product.classic.desc"]}
                    </p>
                  </div>
                )}

                {productId === "weekend" && (
                  <div className="mb-4">
                    <p className="text-black font-bold text-lg mb-2">{t["product.weekend.tagline"]}</p>
                    <p className="text-black font-medium leading-relaxed">
                      {t["product.weekend.desc"]}
                    </p>
                  </div>
                )}

                {productId === "elegant" && (
                  <div className="mb-4">
                    <p className="text-black font-bold text-lg mb-2">{t["product.elegant.tagline"]}</p>
                    <p className="text-black font-medium leading-relaxed">
                      {t["product.elegant.desc"]}
                    </p>
                  </div>
                )}

                {productId === "avantgarde" && (
                  <div className="mb-4">
                    <p className="text-black font-bold text-lg mb-2">{t["product.avantgarde.tagline"]}</p>
                    <p className="text-black font-medium leading-relaxed">
                      {t["product.avantgarde.desc"]}
                    </p>
                  </div>
                )}

                {productId === "holiday" && (
                  <div className="mb-4">
                    <p className="text-black font-bold text-lg mb-2">{t["product.holiday.tagline"]}</p>
                    <p className="text-black font-medium leading-relaxed">
                      {t["product.holiday.desc"]}
                    </p>
                  </div>
                )}

                {/* Smartwoman Products */}
                {productId === "mystery" && (
                  <div className="mb-4">
                    <p className="text-black font-medium leading-relaxed">
                      {t["product.mystery.desc"]}
                    </p>
                  </div>
                )}

                {productId === "celebrity" && (
                  <div className="mb-4">
                    <p className="text-black font-medium leading-relaxed">
                      {t["product.celebrity.desc"]}
                    </p>
                  </div>
                )}

                {productId === "majesty" && (
                  <div className="mb-4">
                    <p className="text-black font-medium leading-relaxed">
                      {t["product.majesty.desc"]}
                    </p>
                  </div>
                )}

                {productId === "dreamy" && (
                  <div className="mb-4">
                    <p className="text-black font-medium leading-relaxed">
                      {t["product.dreamy.desc"]}
                    </p>
                  </div>
                )}

                {productId === "shiny" && (
                  <div className="mb-4">
                    <p className="text-black font-medium leading-relaxed">
                      {t["product.shiny.desc"]}
                    </p>
                  </div>
                )}

                <p className="text-xs tracking-ultrawide uppercase text-black mb-2 font-semibold">
                  {t["product.scentFamily"]}
                </p>
                <p className="text-black font-semibold">{product.family}</p>
              </div>

              {/* ML Selector */}
              <div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedMl(50)}
                    className={`px-4 py-2 border transition-all text-sm font-semibold ${
                      selectedMl === 50
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-black hover:bg-gray-100'
                    }`}
                  >
                    50ml
                  </button>
                  <button
                    onClick={() => setSelectedMl(100)}
                    className={`px-4 py-2 border transition-all text-sm font-semibold ${
                      selectedMl === 100
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-black hover:bg-gray-100'
                    }`}
                  >
                    100ml
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-4 pt-2">
                <Link href="/stores" className="w-full">
                  <MagneticButton variant="primary" size="lg" className="w-full">
                    {t["product.buyPoints"]}
                  </MagneticButton>
                </Link>

                <div className="flex gap-3 relative" ref={shareMenuRef}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleShare}
                    className="p-3 border border-black hover:bg-black transition-colors group"
                    aria-label={t["product.share"] || "Paylaş"}
                  >
                    <Share2 size={18} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors" />
                  </motion.button>

                  {/* Share Menu Popup */}
                  <AnimatePresence>
                    {showShareMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-full left-0 mb-2 bg-white border border-black shadow-xl p-3 z-50"
                      >
                        {/* Social Share Buttons - Horizontal */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={shareToFacebook}
                            className="w-10 h-10 bg-[#1877f2] rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                            aria-label="Facebook"
                          >
                            <FacebookIcon />
                          </button>

                          <button
                            onClick={shareToTwitter}
                            className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                            aria-label="X (Twitter)"
                          >
                            <TwitterIcon />
                          </button>

                          <button
                            onClick={shareToWhatsApp}
                            className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                            aria-label="WhatsApp"
                          >
                            <WhatsAppIcon />
                          </button>

                          <button
                            onClick={shareToEmail}
                            className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                            aria-label="Email"
                          >
                            <MailIcon />
                          </button>

                          <button
                            onClick={() => setShowShareMenu(false)}
                            className="w-10 h-10 bg-black/10 rounded-full flex items-center justify-center text-black hover:bg-black/20 transition-colors"
                            aria-label="Kapat"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Fragrance Notes */}
              <div className="pt-6 border-t border-black/10">
                <p className="text-xs tracking-ultrawide uppercase text-black mb-6 font-semibold">
                  {t["product.scentNotes"]}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-ultrawide uppercase text-silver-dark font-semibold w-12 pt-0.5">
                      {t["product.top"]}
                    </span>
                    <div className="flex-1 flex flex-wrap gap-2">
                      {product.scent.top.map((note) => (
                        <span
                          key={note}
                          className="px-3 py-1 bg-black/5 text-sm text-black"
                        >
                          {t[`scent.${note}`] || note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-ultrawide uppercase text-silver-dark font-semibold w-12 pt-0.5">
                      {t["product.middle"]}
                    </span>
                    <div className="flex-1 flex flex-wrap gap-2">
                      {product.scent.middle.map((note) => (
                        <span
                          key={note}
                          className="px-3 py-1 bg-black/5 text-sm text-black"
                        >
                          {t[`scent.${note}`] || note}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-[10px] tracking-ultrawide uppercase text-silver-dark font-semibold w-12 pt-0.5">
                      {t["product.base"]}
                    </span>
                    <div className="flex-1 flex flex-wrap gap-2">
                      {product.scent.base.map((note) => (
                        <span
                          key={note}
                          className="px-3 py-1 bg-black/5 text-sm text-black"
                        >
                          {t[`scent.${note}`] || note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-16">
            <p className="text-[10px] tracking-ultrawide font-semibold uppercase text-black mb-4">
              {t["product.completeCollection"]}
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-black">
              {t["product.youMayLike"]}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
