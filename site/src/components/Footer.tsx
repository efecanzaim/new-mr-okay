"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Instagram, Facebook, Youtube, Mail, Send, MessageCircle, Truck, Store, Shield } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";
import { ultraLabelStyle, microLabelStyle, navLinkStyle, HELVETICA_STACK } from "@/styles/typography";

const allTranslations = { tr, en, de, fr, ar };

const SIGNATURE_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { language } = useLanguage();
  const t = allTranslations[language];
  const reduceMotion = useReducedMotion();

  const footerLinks = {
    collections: [
      { name: "BUSINESSMAN", href: "/collections/businessman" },
      { name: "SMARTWOMAN", href: "/collections/smartwoman" },
      { name: t["footer.limitedEdition"], href: "/collections/limited", upcoming: true },
    ],
    company: [
      { name: t["footer.ourStory"], href: "/about" },
      { name: t["footer.blog"], href: "/blog" },
      { name: t["footer.contact"], href: "/contact" },
    ],
    legal: [
      { name: t["footer.privacy"], href: "/privacy" },
      { name: t["footer.terms"], href: "/terms" },
      { name: t["footer.shipping"], href: "/shipping" },
    ],
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const entrance = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : delay, ease: SIGNATURE_EASE },
  });

  const socials = [
    { Icon: Instagram, href: "https://www.instagram.com/mr.okayparfum/", label: "Instagram'da takip et" },
    { Icon: Facebook, href: "https://facebook.com", label: "Facebook'ta takip et" },
    { Icon: Youtube, href: "https://youtube.com", label: "YouTube'da takip et" },
  ];

  const trustBadges = [
    { Icon: Truck, titleKey: "footer.freeShipping", descKey: "footer.freeShipping.desc" },
    { Icon: Store, titleKey: "footer.storePickup", descKey: "footer.storePickup.desc" },
    { Icon: Shield, titleKey: "footer.securePayment", descKey: "footer.securePayment.desc" },
  ] as const;

  const columnHeadingStyle = { ...ultraLabelStyle, marginBottom: "24px" };
  const linkStyle = { fontFamily: HELVETICA_STACK, fontSize: "14px", fontWeight: 400, letterSpacing: "0.04em" };

  return (
    <>
      {/* ─── Newsletter + Social (cream) ─── */}
      <section className="bg-[#faf9f6] py-6 lg:py-8 border-t border-black/10" aria-label="Bülten ve sosyal medya">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <motion.div {...entrance(0)} className="flex flex-col lg:flex-row lg:items-center gap-3">
              <h3 className="text-black whitespace-nowrap" style={{ ...microLabelStyle, fontSize: "16px", fontWeight: 400 }}>
                {t["footer.subscribe"]}
              </h3>
              <form onSubmit={handleSubscribe} className="flex flex-1 max-w-md" role="search" aria-label="Bültene abone ol">
                <label htmlFor="footer-email" className="sr-only">E-posta adresi</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t["footer.subscribe.placeholder"]}
                  required
                  className="flex-1 px-3 py-2 bg-white border border-black/20 text-black placeholder:text-black/70 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-colors duration-300"
                  style={{ fontFamily: HELVETICA_STACK, letterSpacing: "0.04em" }}
                />
                <button
                  type="submit"
                  aria-label="Bültene abone ol"
                  className="px-4 py-2 bg-black text-white hover:bg-black/90 transition-colors duration-300 flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  <Send size={14} strokeWidth={1.5} aria-hidden="true" />
                </button>
              </form>
              {isSubscribed && (
                <motion.p
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-black/70 lg:ml-4"
                  style={microLabelStyle}
                  role="status"
                  aria-live="polite"
                >
                  {t["footer.subscribe.success"]}
                </motion.p>
              )}
            </motion.div>

            <motion.div {...entrance(0.2)} className="flex flex-col lg:flex-row lg:items-center gap-3 lg:justify-end">
              <h3 className="text-black whitespace-nowrap" style={{ ...microLabelStyle, fontSize: "16px", fontWeight: 400 }}>
                {t["footer.followUs"]}
              </h3>
              <div className="flex items-center gap-2" role="group" aria-label="Sosyal medya bağlantıları">
                {socials.map(({ Icon, href, label }) => (
                  <motion.a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                    className="w-9 h-9 rounded-full border border-black/20 flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    <Icon size={16} strokeWidth={1.5} aria-hidden="true" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Pre-Footer trust strip (ink) ─── */}
      <section className="bg-black py-8 lg:py-10" aria-label="Hizmet vaatleri">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {trustBadges.map(({ Icon, titleKey, descKey }, i) => (
              <motion.div
                key={titleKey}
                {...entrance(i * 0.1)}
                className="flex items-start space-x-4"
              >
                <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 border border-white/15">
                  <Icon size={24} strokeWidth={1.5} className="text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-white mb-2" style={ultraLabelStyle}>
                    {t[titleKey as keyof typeof t]}
                  </h3>
                  <p className="text-white/90" style={{ ...microLabelStyle, fontSize: "12px", lineHeight: 1.5 }}>
                    {t[descKey as keyof typeof t]}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Main Footer (ink) ─── */}
      <footer className="bg-black border-t border-white/10 pb-20 lg:pb-0" aria-label="Site bağlantıları">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
              {/* Brand */}
              <motion.div {...entrance(0)} className="lg:col-span-4">
                <Link
                  href="/"
                  className="inline-block mb-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label="Mr. Okay anasayfa"
                >
                  <span
                    className="text-3xl lg:text-4xl font-normal text-white block text-center"
                    style={{ fontFamily: "Blacksword, serif", letterSpacing: "0", lineHeight: 1 }}
                  >
                    Mr. Okay
                  </span>
                </Link>
                <p className="text-white/90 max-w-sm" style={{ ...microLabelStyle, fontSize: "14px", lineHeight: 1.6 }}>
                  {t["footer.brandDesc"]}
                </p>
              </motion.div>

              {/* Link columns */}
              <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
                <motion.div {...entrance(0.1)}>
                  <h3 className="text-white" style={columnHeadingStyle}>{t["footer.collections"]}</h3>
                  <ul className="space-y-4">
                    {footerLinks.collections.map((link) => (
                      <li key={link.name}>
                        {link.upcoming ? (
                          <span
                            className="text-white/60 cursor-not-allowed inline-flex items-center gap-2"
                            style={linkStyle}
                            aria-label={`${link.name} (yakında)`}
                          >
                            {link.name}
                            <span className="text-white/40" style={{ ...ultraLabelStyle, fontSize: "9px" }}>
                              YAKINDA
                            </span>
                          </span>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-white hover:text-white/70 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            style={linkStyle}
                          >
                            {link.name}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div {...entrance(0.2)}>
                  <h3 className="text-white" style={columnHeadingStyle}>{t["footer.company"]}</h3>
                  <ul className="space-y-4">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white hover:text-white/70 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          style={linkStyle}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div {...entrance(0.3)}>
                  <h3 className="text-white" style={columnHeadingStyle}>{t["footer.legal"]}</h3>
                  <ul className="space-y-4">
                    {footerLinks.legal.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white hover:text-white/70 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          style={linkStyle}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bize Ulaşın */}
          <div className="py-12 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-8">
              <h3 className="text-white text-center md:text-left" style={ultraLabelStyle}>
                {t["footer.contactUs"]}
              </h3>
              <div className="flex items-center justify-center gap-8" role="group" aria-label="İletişim kanalları">
                <a
                  href="https://wa.me/905073484420"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  aria-label={`${t["footer.whatsapp"]} — WhatsApp ile mesaj`}
                >
                  <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-2 group-hover:border-white/50 transition-colors duration-300">
                    <MessageCircle size={28} strokeWidth={1.25} className="text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white group-hover:text-white/70 transition-colors duration-300" style={{ ...microLabelStyle, fontSize: "12px" }}>
                    {t["footer.whatsapp"]}
                  </span>
                </a>
                <a
                  href="mailto:info@mrokay.com"
                  className="flex flex-col items-center group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                  aria-label={`${t["footer.contact"]} — E-posta ile yaz`}
                >
                  <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-2 group-hover:border-white/50 transition-colors duration-300">
                    <Mail size={28} strokeWidth={1.25} className="text-white" aria-hidden="true" />
                  </div>
                  <span className="text-white group-hover:text-white/70 transition-colors duration-300" style={{ ...microLabelStyle, fontSize: "12px" }}>
                    {t["footer.contact"]}
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="py-6 border-t border-white/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-white/80" style={{ ...microLabelStyle, fontSize: "12px" }}>
                © {currentYear} Mr. Okay {t["footer.rights"]}
              </p>
              <p className="text-white/80" style={{ ...microLabelStyle, fontSize: "12px" }}>
                {t["footer.madeWith"]}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
