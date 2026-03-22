"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, MapPin, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { language } = useLanguage();
  const t = allTranslations[language];

  const navItems = [
    { href: "/", icon: Home, label: t["nav.home"] },
    { href: "/stores", icon: MapPin, label: t["nav.findStore"] },
    { href: "/contact", icon: Mail, label: t["nav.contact"] },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-black/10 shadow-lg"
    >
      <div className="flex items-center justify-around py-2 px-4 safe-area-bottom">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center py-2 px-3 min-w-[64px]"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 1.5 : 1}
                  className={`transition-colors duration-300 ${
                    isActive ? "text-black" : "text-black/50"
                  }`}
                />
              </motion.div>
              <span
                className={`text-[10px] mt-1 transition-colors duration-300 ${
                  isActive ? "text-black font-medium" : "text-black/50"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
