"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const { language } = useLanguage();
  const t = allTranslations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-white" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-6"
        >
          <p className="text-[10px] tracking-ultrawide uppercase text-silver-dark mb-4">
            {t["contact.subtitle"]}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-black">
            {t["contact.title"]}
          </h1>
        </motion.div>
      </section>

      {/* Contact Content */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <ScrollReveal direction="left">
              <div className="space-y-12">
                <div>
                  <h2 className="font-serif text-3xl lg:text-4xl text-black mb-6">
                    {t["contact.intro.title"]}
                    <br />
                    <span className="text-gradient-silver">{t["contact.intro.subtitle"]}</span>
                  </h2>
                  <p className="text-silver-dark font-light leading-relaxed">
                    {t["contact.intro.desc"]}
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 border border-black/20 flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} strokeWidth={1} className="text-silver" />
                    </div>
                    <div>
                      <p className="text-xs tracking-ultrawide uppercase text-silver mb-1">
                        {t["contact.info.mainStore"]}
                      </p>
                      <p className="text-silver-dark font-light">
                        Barbaros Bulvarı Gürel İş Merkezi
                        <br />
                        No.47 D.14 Beşiktaş-İstanbul / Türkiye
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 border border-black/20 flex items-center justify-center flex-shrink-0">
                      <Mail size={16} strokeWidth={1} className="text-silver" />
                    </div>
                    <div>
                      <p className="text-xs tracking-ultrawide uppercase text-silver mb-1">
                        {t["contact.info.email"]}
                      </p>
                      <p className="text-silver-dark font-light">
                        iletisim@mrokay.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 border border-black/20 flex items-center justify-center flex-shrink-0">
                      <Phone size={16} strokeWidth={1} className="text-silver" />
                    </div>
                    <div>
                      <p className="text-xs tracking-ultrawide uppercase text-silver mb-1">
                        {t["contact.info.phone"]}
                      </p>
                      <p className="text-silver-dark font-light">
                        +90 507 348 44 20
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-black/10">
                  <p className="text-xs tracking-ultrawide uppercase text-silver mb-4">
                    {t["contact.info.workingHours"]}
                  </p>
                  <div className="space-y-2 text-silver-dark font-light text-sm">
                    <p>{t["contact.info.hours.weekdays"]}</p>
                    <p>{t["contact.info.hours.saturday"]}</p>
                    <p>{t["contact.info.hours.sunday"]}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal direction="right" delay={0.2}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs tracking-ultrawide uppercase text-silver mb-3">
                      {t["contact.form.name"]}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-black/20 py-3 text-black font-light focus:outline-none focus:border-silver transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs tracking-ultrawide uppercase text-silver mb-3">
                      {t["contact.form.email"]}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-black/20 py-3 text-black font-light focus:outline-none focus:border-silver transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs tracking-ultrawide uppercase text-silver mb-3">
                    {t["contact.form.subject"]}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-black/20 py-3 text-black font-light focus:outline-none focus:border-silver transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs tracking-ultrawide uppercase text-silver mb-3">
                    {t["contact.form.message"]}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={5}
                    className="w-full bg-transparent border-b border-black/20 py-3 text-black font-light focus:outline-none focus:border-silver transition-colors resize-none"
                    required
                  />
                </div>

                <div className="pt-4">
                  <MagneticButton type="submit" variant="primary" size="lg">
                    {t["contact.form.send"]}
                  </MagneticButton>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
