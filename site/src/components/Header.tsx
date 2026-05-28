"use client";

import { useState, useEffect, useRef, useCallback, useId, FormEvent, KeyboardEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, Globe, ChevronDown, ShoppingBag, User, Search, ArrowLeft } from "lucide-react";
import { useLanguage, languages } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";
import { navLinkStyle, microLabelStyle } from "@/styles/typography";

const allTranslations = { tr, en, de, fr, ar };

type CollectionKey = "businessman" | "smartwoman";

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

const collectionLabel: Record<CollectionKey, string> = {
  businessman: "BUSINESSMAN",
  smartwoman: "SMARTWOMAN",
};

const collectionHref: Record<CollectionKey, string> = {
  businessman: "/collections/businessman",
  smartwoman: "/collections/smartwoman",
};

export default function Header() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const langButtonId = useId();
  const langListboxId = useId();
  const megaSmartId = useId();
  const megaBusinessId = useId();

  const [megaOpen, setMegaOpen] = useState<false | CollectionKey>(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<CollectionKey | null>(null);
  const [langOpen, setLangOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const megaTimeout = useRef<NodeJS.Timeout | null>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const megaContainerRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<CollectionKey, HTMLAnchorElement | null>>({
    businessman: null,
    smartwoman: null,
  });
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

  // Close mega when focus moves outside the cluster
  useEffect(() => {
    if (!megaOpen) return;
    const onFocusIn = (e: FocusEvent) => {
      if (!megaContainerRef.current) return;
      const target = e.target as Node;
      if (!megaContainerRef.current.contains(target)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [megaOpen]);

  // Global Escape: close lang, mega, mobile drawer / sub-panel
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileSub) { setMobileSub(null); return; }
      if (langOpen) { setLangOpen(false); return; }
      if (megaOpen) {
        const trigger = triggerRefs.current[megaOpen];
        setMegaOpen(false);
        trigger?.focus();
        return;
      }
      if (mobileOpen) { setMobileOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [langOpen, megaOpen, mobileOpen, mobileSub]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileSub(null);
    setMegaOpen(false);
    setLangOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobileOpen]);

  const openMega = useCallback((col: CollectionKey) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(col);
  }, []);

  const scheduleCloseMega = useCallback(() => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 120);
  }, []);

  const onTriggerKey = (col: CollectionKey) => (e: KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setMegaOpen(col);
      // Focus first option in mega next frame
      requestAnimationFrame(() => {
        const region = document.getElementById(col === "smartwoman" ? megaSmartId : megaBusinessId);
        const firstLink = region?.querySelector<HTMLAnchorElement>('a[role="menuitem"]');
        firstLink?.focus();
      });
    }
  };

  const onLangKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!langOpen) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const options = langRef.current?.querySelectorAll<HTMLButtonElement>('[role="option"]');
      if (!options || options.length === 0) return;
      const current = document.activeElement as HTMLElement;
      const idx = Array.from(options).indexOf(current as HTMLButtonElement);
      const next = e.key === "ArrowDown"
        ? (idx + 1) % options.length
        : (idx - 1 + options.length) % options.length;
      options[next].focus();
    }
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // TODO: /search route henüz yok; geçici olarak collections/businessman üzerinden query string.
    window.location.href = `/collections/businessman?q=${encodeURIComponent(searchQuery.trim())}`;
  };

  const megaEase: [number, number, number, number] = reduceMotion ? [0, 0, 1, 1] : [0.23, 1, 0.32, 1];
  const megaDuration = reduceMotion ? 0 : 0.3;

  const renderMegaItem = (cat: typeof smartwomanCategories[number], i: number) => (
    <motion.div
      key={cat.name}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : i * 0.04, duration: megaDuration }}
    >
      <Link
        href={cat.href}
        role="menuitem"
        className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        onClick={() => setMegaOpen(false)}
      >
        <div
          className="aspect-[3/4] mb-3 overflow-hidden relative"
          style={{ background: "linear-gradient(107deg, rgba(89,89,89,0.15) 0%, rgba(89,89,89,0.03) 100%)" }}
        >
          <Image
            src={cat.image}
            alt={`${cat.name} parfümü`}
            fill
            className={reduceMotion ? "object-cover" : "object-cover group-hover:scale-105 transition-transform duration-700"}
            sizes="20vw"
            quality={90}
          />
        </div>
        <p className="text-black group-hover:text-black/60 transition-colors duration-300" style={navLinkStyle}>
          {cat.name}
        </p>
        <p className="text-black/80 mt-0.5" style={microLabelStyle}>
          {t[cat.descKey as keyof typeof t]}
        </p>
      </Link>
    </motion.div>
  );

  return (
    <>
      {/* Skip link (visible on focus) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-black focus:text-white focus:px-4 focus:py-2"
        style={navLinkStyle}
      >
        İÇERİĞE ATLA
      </a>

      {/* ─── Main Header ─── */}
      <header
        ref={megaContainerRef}
        className="bg-[#faf9f6] border-b border-black/10 relative"
        style={{ height: "56px" }}
        aria-label="Site"
      >
        <div
          className="h-full grid grid-cols-3 items-center"
          style={{ padding: "0 24px" }}
        >
          {/* LEFT — Nav */}
          <nav className="hidden lg:flex items-center justify-self-start" aria-label="Ana navigasyon">
            {/* Smartwoman */}
            <div onMouseEnter={() => openMega("smartwoman")} onMouseLeave={scheduleCloseMega}>
              <Link
                ref={(el) => { triggerRefs.current.smartwoman = el; }}
                href="/collections/smartwoman"
                style={navLinkStyle}
                className="text-black hover:text-black/60 transition-colors duration-300 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                aria-haspopup="menu"
                aria-expanded={megaOpen === "smartwoman"}
                aria-controls={megaSmartId}
                onFocus={() => openMega("smartwoman")}
                onKeyDown={onTriggerKey("smartwoman")}
              >
                SMARTWOMAN
              </Link>
            </div>

            {/* Businessman — uppercase EN to avoid Turkish İ */}
            <div onMouseEnter={() => openMega("businessman")} onMouseLeave={scheduleCloseMega}>
              <Link
                ref={(el) => { triggerRefs.current.businessman = el; }}
                href="/collections/businessman"
                style={navLinkStyle}
                className="text-black hover:text-black/60 transition-colors duration-300 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                aria-haspopup="menu"
                aria-expanded={megaOpen === "businessman"}
                aria-controls={megaBusinessId}
                onFocus={() => openMega("businessman")}
                onKeyDown={onTriggerKey("businessman")}
              >
                BUSINESSMAN
              </Link>
            </div>

            {/* About */}
            <Link
              href="/about"
              style={navLinkStyle}
              className="text-black hover:text-black/60 transition-colors duration-300 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {(t["header.aboutUs"] || "Hikayemiz").toLocaleUpperCase("tr-TR")}
            </Link>

            {/* Stores */}
            <Link
              href="/stores"
              style={navLinkStyle}
              className="text-black hover:text-black/60 transition-colors duration-300 block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              {(t["header.stores"] || "Mağazalarımız").toLocaleUpperCase("tr-TR")}
            </Link>
          </nav>

          {/* CENTER — Logo. Larger on landing (front-door presence), tighter on inner routes. */}
          <Link
            href="/"
            className="group shrink-0 flex items-center justify-self-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            aria-label="Mr. Okay anasayfa"
          >
            <span
              className="text-black leading-none transition-[font-size,letter-spacing] duration-500 ease-out"
              style={{
                fontFamily: "Blacksword, serif",
                fontSize: pathname === "/" ? "32px" : "28px",
                fontWeight: "normal",
                letterSpacing: "0",
              }}
            >
              <span className="inline-block transition-[letter-spacing] duration-700 ease-out group-hover:tracking-[0.02em]">
                Mr. Okay
              </span>
            </span>
          </Link>

          {/* RIGHT — Icons */}
          <div className="hidden lg:flex items-center gap-3 justify-self-end">

            {/* Search */}
            <form
              role="search"
              onSubmit={handleSearchSubmit}
              className="flex items-center border-b border-black/20 focus-within:border-black transition-colors duration-300"
            >
              <label htmlFor="header-search" className="sr-only">Site içinde ara</label>
              <input
                id="header-search"
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="ARA"
                className="bg-transparent text-black placeholder:text-black/70 w-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.092em", padding: "2px 0" }}
              />
              <button
                type="submit"
                className="ml-1 shrink-0 text-black hover:text-black/60 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                aria-label="Aramayı gönder"
              >
                <Search size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </form>

            {/* Cart */}
            <Link
              href="/cart"
              className="text-black hover:text-black/60 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              aria-label="Sepet"
            >
              <ShoppingBag size={22} strokeWidth={1.5} aria-hidden="true" />
            </Link>

            {/* Account */}
            <Link
              href="/account"
              className="text-black hover:text-black/60 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              aria-label="Hesap"
            >
              <User size={22} strokeWidth={1.5} aria-hidden="true" />
            </Link>

            {/* Language */}
            <div className="relative" ref={langRef} onKeyDown={onLangKey}>
              <button
                id={langButtonId}
                onClick={() => setLangOpen(v => !v)}
                className="flex items-center gap-1 text-black hover:text-black/60 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.092em" }}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                aria-controls={langListboxId}
                aria-label="Dil seçimi"
              >
                <Globe size={22} strokeWidth={1.5} aria-hidden="true" />
                <span className="uppercase">{language}</span>
                <ChevronDown size={13} className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`} aria-hidden="true" />
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    id={langListboxId}
                    role="listbox"
                    aria-labelledby={langButtonId}
                    initial={reduceMotion ? false : { opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: reduceMotion ? 0 : 0.2 }}
                    className="absolute top-full right-0 mt-2 bg-[#faf9f6] border border-black/10 min-w-[140px] z-50"
                  >
                    {languages.map(lang => {
                      const selected = language === lang.code;
                      return (
                        <li key={lang.code} role="option" aria-selected={selected}>
                          <button
                            onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                            className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-black hover:bg-black/5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black ${selected ? "font-bold" : "font-medium"}`}
                            style={{ fontSize: "13px", letterSpacing: "0.092em" }}
                          >
                            <span className="font-bold">{lang.code.toUpperCase()}</span>
                            <span>{lang.name.toUpperCase()}</span>
                          </button>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-black justify-self-end focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            {mobileOpen ? <X size={20} strokeWidth={1.5} aria-hidden="true" /> : <Menu size={20} strokeWidth={1.5} aria-hidden="true" />}
          </button>
        </div>

        {/* ─── Desktop Mega Menu ─── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              id={megaOpen === "smartwoman" ? megaSmartId : megaBusinessId}
              role="menu"
              aria-label={`${collectionLabel[megaOpen]} koleksiyonu`}
              initial={reduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: megaDuration, ease: megaEase }}
              onMouseEnter={() => openMega(megaOpen as CollectionKey)}
              onMouseLeave={scheduleCloseMega}
              className="bg-[#faf9f6] border-t border-b border-black/10 absolute left-0 right-0"
            >
              <div className="px-6 lg:px-6 py-10">
                <div className="grid grid-cols-5 gap-6">
                  {(megaOpen === "smartwoman" ? smartwomanCategories : businessmanCategories).map(renderMegaItem)}
                </div>

                <div className="mt-8 pt-5 border-t border-black/10">
                  <Link
                    href={collectionHref[megaOpen]}
                    role="menuitem"
                    onClick={() => setMegaOpen(false)}
                    className="text-black hover:text-black/60 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    style={navLinkStyle}
                  >
                    {megaOpen === "smartwoman" ? "Tüm Smartwoman Koleksiyonunu Keşfet →" : "Tüm Businessman Koleksiyonunu Keşfet →"}
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobil menü"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}
            className="fixed inset-0 z-40 bg-[#faf9f6] lg:hidden overflow-y-auto"
          >
            {/* Sub-panel: collection bottom-sheet */}
            <AnimatePresence>
              {mobileSub && (
                <motion.div
                  key="mobile-sub"
                  initial={reduceMotion ? false : { x: "100%" }}
                  animate={{ x: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
                  transition={{ duration: reduceMotion ? 0 : 0.35, ease: megaEase }}
                  className="absolute inset-0 bg-[#faf9f6] z-10 overflow-y-auto"
                  role="region"
                  aria-label={`${collectionLabel[mobileSub]} koleksiyonu`}
                >
                  <div className="px-6 pt-6 pb-24">
                    <button
                      onClick={() => setMobileSub(null)}
                      className="flex items-center gap-2 text-black mb-8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      style={navLinkStyle}
                      aria-label="Ana menüye dön"
                    >
                      <ArrowLeft size={16} strokeWidth={1.5} aria-hidden="true" />
                      <span>GERİ</span>
                    </button>

                    <h2 className="text-black mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "28px", fontWeight: 500 }}>
                      {collectionLabel[mobileSub]}
                    </h2>

                    <ul className="grid grid-cols-2 gap-4">
                      {(mobileSub === "smartwoman" ? smartwomanCategories : businessmanCategories).map(cat => (
                        <li key={cat.name}>
                          <Link
                            href={cat.href}
                            onClick={() => { setMobileSub(null); setMobileOpen(false); }}
                            className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                          >
                            <div
                              className="aspect-[3/4] mb-2 overflow-hidden relative"
                              style={{ background: "linear-gradient(107deg, rgba(89,89,89,0.15) 0%, rgba(89,89,89,0.03) 100%)" }}
                            >
                              <Image
                                src={cat.image}
                                alt={`${cat.name} parfümü`}
                                fill
                                className="object-cover"
                                sizes="50vw"
                                quality={85}
                              />
                            </div>
                            <p className="text-black" style={navLinkStyle}>{cat.name}</p>
                            <p className="text-black/80 mt-0.5" style={microLabelStyle}>
                              {t[cat.descKey as keyof typeof t]}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-10 border-t border-black/10 pt-6">
                      <Link
                        href={collectionHref[mobileSub]}
                        onClick={() => { setMobileSub(null); setMobileOpen(false); }}
                        className="text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        style={navLinkStyle}
                      >
                        TÜM {collectionLabel[mobileSub]} KOLEKSİYONU →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main drawer content */}
            <div className="flex flex-col items-center justify-center min-h-full gap-6 px-8 py-24">
              {(["smartwoman", "businessman"] as CollectionKey[]).map(col => (
                <button
                  key={col}
                  onClick={() => setMobileSub(col)}
                  className="flex items-center gap-2 text-black hover:text-black/60 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  style={navLinkStyle}
                  aria-haspopup="true"
                  aria-expanded={mobileSub === col}
                >
                  <span>{collectionLabel[col]}</span>
                  <ChevronDown size={14} strokeWidth={1.5} className="-rotate-90" aria-hidden="true" />
                </button>
              ))}

              {[
                { label: (t["header.aboutUs"] || "Hikayemiz").toLocaleUpperCase("tr-TR"), href: "/about" },
                { label: (t["header.stores"] || "Mağazalarımız").toLocaleUpperCase("tr-TR"), href: "/stores" },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-black hover:text-black/60 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  style={navLinkStyle}
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-6 border-t border-black/10 w-full flex justify-center gap-2 mt-2" role="group" aria-label="Dil seçimi">
                {languages.map(lang => {
                  const selected = language === lang.code;
                  return (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code); setMobileOpen(false); }}
                      className={`px-3 py-1.5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black ${selected ? "bg-black text-[#faf9f6]" : "border border-black/20 text-black hover:border-black/50"}`}
                      style={navLinkStyle}
                      aria-pressed={selected}
                      aria-label={`Dil: ${lang.name}`}
                    >
                      {lang.code}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
