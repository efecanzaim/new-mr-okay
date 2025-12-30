"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ShoppingBag, Menu, X, User, Heart, Mail, Search, MapPin } from "lucide-react";
// Note: Some icons are used only in desktop view

const businessmanCategories = [
  { name: "Elegant", href: "/product/elegant", description: "Sofistike, zarif ve entelektüel", image: "/products/elegant.png" },
  { name: "Avant-Garde", href: "/product/avant-garde", description: "Yaratıcı, özgün, cesur", image: "/products/avantgarde.png" },
  { name: "Classic", href: "/product/classic", description: "Klasik, disiplinli, özgüvenli", image: "/products/classic.png" },
  { name: "Weekend", href: "/product/weekend", description: "Rahat, modern ve hafif", image: "/products/weekend.png" },
  { name: "Holiday", href: "/product/holiday", description: "Hayatı dolu dolu yaşayan", image: "/products/holiday.png" },
];

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [logoAnimationComplete, setLogoAnimationComplete] = useState(false);
  const [showNavigation, setShowNavigation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const megaMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll threshold for triggering logo animation (in pixels)
  const SCROLL_THRESHOLD = 30;

  // Handle animation state based on page and scroll position
  useEffect(() => {
    if (isHomePage) {
      // Check if we've scrolled past the threshold
      const hasScrolled = window.scrollY > SCROLL_THRESHOLD;

      if (!hasScrolled) {
        // At top - show centered logo
        setLogoAnimationComplete(false);
        setShowNavigation(false);
      } else {
        // Scrolled past threshold - show normal header state
        setLogoAnimationComplete(true);
        setShowNavigation(true);
      }
    } else {
      // Other pages - always show normal state
      setLogoAnimationComplete(true);
      setShowNavigation(true);
    }
  }, [isHomePage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollYValue = window.scrollY;

      // Only run animation logic on home page
      if (isHomePage) {
        const hasScrolled = scrollYValue > SCROLL_THRESHOLD;

        if (hasScrolled && !logoAnimationComplete) {
          // Scrolled past threshold - complete animation
          setLogoAnimationComplete(true);
          setTimeout(() => {
            setShowNavigation(true);
          }, 800);
        } else if (!hasScrolled && logoAnimationComplete) {
          // Scrolled back to top - reset animation
          setLogoAnimationComplete(false);
          setShowNavigation(false);
        }
      }

      setIsScrolled(scrollYValue > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [logoAnimationComplete, isHomePage]);

  const handleMegaMenuEnter = () => {
    if (megaMenuTimeoutRef.current) {
      clearTimeout(megaMenuTimeoutRef.current);
    }
    setIsMegaMenuOpen(true);
  };

  const handleMegaMenuLeave = () => {
    megaMenuTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 150);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "glass py-6 shadow-sm"
            : "bg-transparent py-10"
        }`}
      >
        <nav className="w-full px-4 lg:px-6">
          <div className="flex items-center justify-between">
            {/* Left Navigation - hidden on home page when not scrolled */}
            <div className={`hidden lg:flex items-center space-x-8 transition-opacity duration-500 ${
              isHomePage && !showNavigation ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>
              <Link
                href="/about"
                className="text-base font-sans font-medium uppercase text-black/70 hover:text-black transition-colors duration-400 line-through-hover header-font"
              >
                Mr. Okay
              </Link>

              <Link
                href="/collections/businessman"
                className="text-base font-sans font-light uppercase text-black/70 hover:text-black transition-colors duration-400 line-through-hover header-font"
                onMouseEnter={handleMegaMenuEnter}
                onMouseLeave={handleMegaMenuLeave}
              >
                BUSINESSMAN
              </Link>

              <Link
                href="/collections/smartwoman"
                className="text-base font-sans font-light uppercase text-black/70 hover:text-black transition-colors duration-400 line-through-hover header-font"
              >
                SMARTWOMAN
              </Link>
            </div>

            {/* Center Logo */}
            {isHomePage ? (
              // Animated logo for home page - starts at center, moves to header on scroll
              <Link
                key="home-logo"
                href="/"
                className={`absolute left-1/2 -translate-x-1/2 z-50 ${!logoAnimationComplete ? 'pointer-events-none' : ''} ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
              >
                <motion.div
                  initial={{
                    y: "20vh",
                    scale: isMobile ? 1.5 : 2,
                  }}
                  animate={{
                    y: logoAnimationComplete ? "0px" : "20vh",
                    scale: logoAnimationComplete ? 1 : (isMobile ? 1.5 : 2),
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <h1
                    className={`text-3xl lg:text-4xl font-normal whitespace-nowrap origin-center ${!logoAnimationComplete ? 'text-white' : 'text-black'}`}
                    style={{
                      fontFamily: 'Blacksword, serif',
                      fontStyle: 'normal',
                      letterSpacing: '0',
                      textShadow: !logoAnimationComplete ? '0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)' : 'none'
                    }}
                  >
                    Mr. Okay
                  </h1>
                </motion.div>
              </Link>
            ) : (
              // Static logo for other pages - no animation, just appears in place
              <Link key="other-logo" href="/" className="absolute left-1/2 -translate-x-1/2">
                <motion.div
                  initial={false}
                  whileHover={{ scale: 1.05 }}
                  className="text-center"
                >
                  <h1 className="text-3xl lg:text-4xl font-normal text-black" style={{ fontFamily: 'Blacksword, serif', fontStyle: 'normal', letterSpacing: '0' }}>
                    Mr. Okay
                  </h1>
                </motion.div>
              </Link>
            )}

            {/* Right Navigation - Always visible */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Search Icon & Bar */}
              <div className="relative flex items-center">
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 200, opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                      className="overflow-hidden mr-2"
                    >
                      <input
                        type="text"
                        placeholder="Ara..."
                        autoFocus
                        className="w-full px-3 py-1.5 text-sm border border-black/20 bg-white text-black placeholder:text-black/40 focus:outline-none focus:border-black/40 transition-colors"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Search
                      size={26}
                      strokeWidth={1.5}
                      className={`transition-colors duration-500 ${
                        isHomePage && !logoAnimationComplete
                          ? 'text-white/70 group-hover:text-white'
                          : 'text-black/70 group-hover:text-black'
                      }`}
                    />
                  </motion.div>
                </button>
              </div>

              {/* Store Locator Icon */}
              <Link href="/stores" className="group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <MapPin
                    size={26}
                    strokeWidth={1}
                    className={`transition-colors duration-500 ${
                      isHomePage && !logoAnimationComplete
                        ? 'text-white/70 group-hover:text-white'
                        : 'text-black/70 group-hover:text-black'
                    }`}
                  />
                </motion.div>
              </Link>

              {/* Contact Icon */}
              <Link href="/contact" className="group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Mail
                    size={26}
                    strokeWidth={1}
                    className={`transition-colors duration-500 ${
                      isHomePage && !logoAnimationComplete
                        ? 'text-white/70 group-hover:text-white'
                        : 'text-black/70 group-hover:text-black'
                    }`}
                  />
                </motion.div>
              </Link>

              {/* Account Icon */}
              <Link href="/account" className="group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <User
                    size={26}
                    strokeWidth={1}
                    className={`transition-colors duration-500 ${
                      isHomePage && !logoAnimationComplete
                        ? 'text-white/70 group-hover:text-white'
                        : 'text-black/70 group-hover:text-black'
                    }`}
                  />
                </motion.div>
              </Link>

              {/* Favorites Icon */}
              <Link href="/favorites" className="group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    size={26}
                    strokeWidth={1}
                    className={`transition-colors duration-500 ${
                      isHomePage && !logoAnimationComplete
                        ? 'text-white/70 group-hover:text-white'
                        : 'text-black/70 group-hover:text-black'
                    }`}
                  />
                </motion.div>
              </Link>

              {/* Cart Icon */}
              <Link href="/cart" className="relative group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingBag
                    size={26}
                    strokeWidth={1}
                    className={`transition-colors duration-500 ${
                      isHomePage && !logoAnimationComplete
                        ? 'text-white/70 group-hover:text-white'
                        : 'text-black/70 group-hover:text-black'
                    }`}
                  />
                </motion.div>
                <span className={`absolute -top-1 -right-1 w-4 h-4 text-[10px] rounded-full flex items-center justify-center font-medium transition-colors duration-500 ${
                  isHomePage && !logoAnimationComplete
                    ? 'bg-white text-black'
                    : 'bg-black text-white'
                }`}>
                  0
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden ml-auto">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`transition-colors duration-300 ${
                  isMobileMenuOpen ? 'text-black' : (isHomePage && !logoAnimationComplete ? 'text-white' : 'text-black')
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mega Menu */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div
              ref={megaMenuRef}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              onMouseEnter={handleMegaMenuEnter}
              onMouseLeave={handleMegaMenuLeave}
              className="absolute top-full left-0 right-0 bg-white shadow-lg"
            >
              <div className="w-full px-4 lg:px-6 py-12">
                <div className="grid grid-cols-5 gap-8">
                  {businessmanCategories.map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                    >
                      <Link
                        href={category.href}
                        className="group block"
                        onClick={() => setIsMegaMenuOpen(false)}
                      >
                        <div className="aspect-[3/4] bg-silver-light mb-4 overflow-hidden relative">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="20vw"
                          />
                        </div>
                        <h3 className="font-serif text-lg text-black group-hover:text-silver-dark transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-xs text-silver-dark mt-1 font-light tracking-wide">
                          {category.description}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-black/5">
                  <Link
                    href="/collections/businessman"
                    className="text-xs tracking-ultrawide uppercase text-silver-dark hover:text-black transition-colors duration-300"
                    onClick={() => setIsMegaMenuOpen(false)}
                  >
                    Tüm Businessman Koleksiyonunu Gör →
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col items-center justify-center h-full px-8"
            >
              {/* Ana Menü Linkleri */}
              <div className="space-y-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-serif text-2xl text-black hover:text-silver-dark transition-colors"
                  >
                    Hakkımızda
                  </Link>
                </motion.div>

                {/* Businessman */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="pt-4"
                >
                  <Link
                    href="/collections/businessman"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-serif text-2xl text-black hover:text-silver-dark transition-colors mb-4"
                  >
                    {'Businessman'.toLocaleUpperCase('en-US')}
                  </Link>
                  <div className="space-y-2">
                    {businessmanCategories.map((cat, index) => (
                      <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.05 }}
                      >
                        <Link
                          href={cat.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-sm text-silver-dark hover:text-black transition-colors py-1"
                        >
                          {cat.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Smartwoman */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4"
                >
                  <Link
                    href="/collections/smartwoman"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-serif text-2xl text-black hover:text-silver-dark transition-colors"
                  >
                    {'Smartwoman'.toLocaleUpperCase('en-US')}
                  </Link>
                </motion.div>

                {/* İletişim */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="pt-4"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block font-serif text-2xl text-black hover:text-silver-dark transition-colors"
                  >
                    İletişim
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
