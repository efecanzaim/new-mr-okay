"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const MESSAGES: Record<string, { text: string; href: string }> = {
  tr: { text: "Tüm siparişlerde ücretsiz kargo & özel ayrıcalıklar", href: "/stores" },
  en: { text: "Complimentary shipping on all orders & exclusive privileges", href: "/stores" },
  de: { text: "Kostenloser Versand für alle Bestellungen & exklusive Vorteile", href: "/stores" },
  fr: { text: "Livraison gratuite sur toutes les commandes & privilèges exclusifs", href: "/stores" },
  ar: { text: "شحن مجاني على جميع الطلبات & امتيازات حصرية", href: "/stores" },
};

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  const { language } = useLanguage();
  const msg = MESSAGES[language] || MESSAGES.tr;

  if (!visible) return null;

  return (
    <div className="relative bg-black flex items-center justify-center" style={{ height: "32px" }}>
      <Link
        href={msg.href}
        className="text-white text-center px-10"
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontSize: "14px", fontWeight: 400, letterSpacing: "0.6px", lineHeight: "20px", textDecoration: "none" }}
      >
        {msg.text}
      </Link>
      <button
        onClick={() => setVisible(false)}
        aria-label="Kapat"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors duration-200"
      >
        <X size={12} strokeWidth={1.5} />
      </button>
    </div>
  );
}
