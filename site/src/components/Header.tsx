"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, ChevronDown, ShoppingBag, User } from "lucide-react";
import { useLanguage, languages } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

const businessmanCategories = [
  { name: "Elegant",     href: "/product/elegant",    descKey: "header.menu.elegant",    image: "/products/elegant.png" },
  { name: "Avant-garde", href: "/product/avantgarde", descKey: "header.menu.avantgarde", image: "/products/avantgarde.png" },
  { name: "Classic",     href: "/product/classic",    descKey: "header.menu.classic",    image: "/products/classic.png" },
  { name: "Weekend",     href: "/product/weekend",    descKey: "header.menu.weekend",    image: "/products/weekend.png" },
  { name: "Holiday",     href: "/product/holiday",    descKey: "header.menu.holiday",    image: "/products/holiday.png" },
];

const smartwomanCategories = [
  { name: "Majesty",   href: "/product/majesty",   descKey: "header.menu.majesty",   image: "/products/majesty.png" },
  { name: "Dreamy",    href: "/product/dreamy",    descKey: "header.menu.dreamy",    image: "/products/dreamy.png" },
  { name: "Mystery",   href: "/product/mystery",   descKey: "header.menu.mystery",   image: "/products/mystery.png" },
  { name: "Celebrity", href: "/product/celebrity", descKey: "header.menu.celebrity", image: "/products/celebrity.png" },
  { name: "Shiny",     href: "/product/shiny",     descKey: "header.menu.shiny",     image: "/products/shiny.png" },
];

/* ─── Nav link style ─────────────────────────────────────────
   Guerlain values: font-size 10.8px, font-weight 400,
   letter-spacing 1.2px, text-transform uppercase, padding 4px 6px
──────────────────────────────────────────────────────────── */
const navLinkStyle: React.CSSProperties = {
  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  fontSize: "13px",
  fontWeight: 400,
  letterSpacing: "1.2px",
  textTransform: "uppercase",
  padding: "4px 8px",
  lineHeight: "16px",
};

export default function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState<false | "businessman" | "smartwoman">(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage } = useLanguage();
  const t = allTranslations[language];

  // Close lang on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const onMegaEnter = (col: "businessman" | "smartwoman") => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(col);
  };
  const onMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <>
      {/* ─── Main Header ─── */}
      <header
        className="bg-[#faf9f6] border-b border-black/10"
        style={{ height: "56px" }}
      >
        <div
          className="h-full flex items-center justify-between"
          style={{ padding: "0 24px" }}
        >
          {/* LEFT — Logo + Nav together */}
          <div className="flex items-center">
          <Link href="/" className="shrink-0 flex items-center mr-6">
            <span
              className="text-black leading-none"
              style={{ fontFamily: "Blacksword, serif", fontSize: "28px", fontWeight: "normal" }}
            >
              Mr. Okay
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center">
            {/* Smartwoman */}
            <div onMouseEnter={() => onMegaEnter("smartwoman")} onMouseLeave={onMegaLeave}>
              <Link href="/collections/smartwoman" style={navLinkStyle} className="text-black hover:text-black/60 transition-colors duration-200 block">
                SMARTWOMAN
              </Link>
            </div>

            {/* Businessman — hardcoded EN uppercase to avoid İ */}
            <div onMouseEnter={() => onMegaEnter("businessman")} onMouseLeave={onMegaLeave}>
              <Link href="/collections/businessman" style={navLinkStyle} className="text-black hover:text-black/60 transition-colors duration-200 block">
                BUSINESSMAN
              </Link>
            </div>

            {/* About */}
            <Link href="/about" style={navLinkStyle} className="text-black hover:text-black/60 transition-colors duration-200 block">
              {(t["header.aboutUs"] || "Hikayemiz").toLocaleUpperCase("tr-TR")}
            </Link>

            {/* Stores */}
            <Link href="/stores" style={navLinkStyle} className="text-black hover:text-black/60 transition-colors duration-200 block">
              {(t["header.stores"] || "Mağazalarımız").toLocaleUpperCase("tr-TR")}
            </Link>
          </nav>

          </div>{/* end left group */}

          {/* RIGHT — Icons */}
          <div className="hidden lg:flex items-center gap-3">

            {/* Search input */}
            <div className="flex items-center border-b border-black/30 focus-within:border-black transition-colors duration-200">
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ARA"
                className="bg-transparent text-black placeholder:text-black/60 focus:outline-none w-40"
                style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1.2px", padding: "2px 0" }}
              />
              <button className="ml-1 shrink-0">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.6465 19.6465C19.8417 19.4512 20.1583 19.4512 20.3535 19.6465L22.3535 21.6465C22.5488 21.8417 22.5488 22.1583 22.3535 22.3535C22.1583 22.5488 21.8417 22.5488 21.6465 22.3535L19.6465 20.3535C19.4512 20.1583 19.4512 19.8417 19.6465 19.6465ZM11.5 1.5C17.0228 1.5 21.5 5.97715 21.5 11.5C21.5 17.0228 17.0228 21.5 11.5 21.5C5.97715 21.5 1.5 17.0228 1.5 11.5C1.5 5.97715 5.97715 1.5 11.5 1.5ZM11.5 2.5C6.52944 2.5 2.5 6.52944 2.5 11.5C2.5 16.4706 6.52944 20.5 11.5 20.5C16.4706 20.5 20.5 16.4706 20.5 11.5C20.5 6.52944 16.4706 2.5 11.5 2.5Z" fill="#020202"/>
                </svg>
              </button>
            </div>

            {/* Cart */}
            <Link href="/cart" className="text-black/70 hover:text-black transition-colors duration-200">
              <ShoppingBag size={22} strokeWidth={1.5} />
            </Link>

            {/* Account */}
            <Link href="/account" className="text-black/70 hover:text-black transition-colors duration-200">
              <User size={22} strokeWidth={1.5} />
            </Link>

            {/* Language */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(v => !v)}
                className="flex items-center gap-1 text-black/70 hover:text-black transition-colors duration-200"
                style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "1.2px" }}
              >
                <Globe size={22} strokeWidth={1.5} />
                <span className="uppercase">{language}</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-[#faf9f6] border border-black/10 shadow-md min-w-[140px] z-50"
                  >
                    {languages.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-black hover:bg-black/5 transition-colors ${language === lang.code ? "font-bold" : "font-semibold"}`}
                        style={{ fontSize: "12px", letterSpacing: "1px" }}
                      >
                        <span className="font-bold">{lang.code.toUpperCase()}</span>
                        <span>{lang.name.toUpperCase()}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-black"
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>

        {/* ─── Mega Menu ─── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              onMouseEnter={() => onMegaEnter(megaOpen as "businessman" | "smartwoman")}
              onMouseLeave={onMegaLeave}
              className="bg-[#faf9f6] border-t border-b border-black/10 absolute left-0 right-0"
            >
              <div className="px-6 lg:px-6 py-10">
                <div className="grid grid-cols-5 gap-6">
                  {(megaOpen === "smartwoman" ? smartwomanCategories : businessmanCategories).map((cat, i) => (
                    <motion.div
                      key={cat.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                    >
                      <Link href={cat.href} className="group block" onClick={() => setMegaOpen(false)}>
                        <div
                          className="aspect-[3/4] mb-3 overflow-hidden relative"
                          style={{ background: "linear-gradient(107deg, rgba(89,89,89,0.15) 0%, rgba(89,89,89,0.03) 100%)" }}
                        >
                          <Image
                            src={cat.image}
                            alt={cat.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            sizes="20vw"
                            quality={90}
                          />
                        </div>
                        <p className="text-black group-hover:text-black/60 transition-colors duration-200" style={navLinkStyle}>
                          {cat.name}
                        </p>
                        <p className="text-black/40 mt-0.5" style={{ fontSize: "11px", letterSpacing: "0.4px" }}>
                          {t[cat.descKey as keyof typeof t]}
                        </p>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 pt-5 border-t border-black/8">
                  <Link
                    href={megaOpen === "smartwoman" ? "/collections/smartwoman" : "/collections/businessman"}
                    onClick={() => setMegaOpen(false)}
                    className="text-black hover:text-black/60 transition-colors duration-200"
                    style={{ fontSize: "10.8px", letterSpacing: "1.2px", textTransform: "uppercase" }}
                  >
                    {megaOpen === "smartwoman" ? "Tüm Smartwoman Koleksiyonunu Keşfet →" : "Tüm Businessman Koleksiyonunu Keşfet →"}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#faf9f6] lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-center min-h-full gap-6 px-8 py-24">
              {[
                { label: "SMARTWOMAN", href: "/collections/smartwoman" },
                { label: "BUSINESSMAN", href: "/collections/businessman" },
                { label: (t["header.aboutUs"] || "Hikayemiz").toLocaleUpperCase("tr-TR"), href: "/about" },
                { label: (t["header.stores"] || "Mağazalarımız").toLocaleUpperCase("tr-TR"), href: "/stores" },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-black hover:text-black/60 transition-colors duration-200"
                  style={{ fontSize: "12px", letterSpacing: "1.6px", textTransform: "uppercase" }}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-6 border-t border-black/10 w-full flex justify-center gap-2 mt-2">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLanguage(lang.code); setMobileOpen(false); }}
                    className={`px-3 py-1.5 transition-colors ${language === lang.code ? "bg-black text-[#faf9f6]" : "border border-black/20 text-black hover:border-black/50"}`}
                    style={{ fontSize: "10px", letterSpacing: "1px", textTransform: "uppercase" }}
                  >
                    {lang.code}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
