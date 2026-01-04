"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Koku Katmanlama Sanatı",
    excerpt:
      "Parfüm katmanlama sanatını öğrenerek benzersiz imza kokunuzu nasıl yaratacağınızı keşfedin.",
    date: "15 Ara 2024",
    category: "Rehberler",
    readTime: "5 dk okuma",
  },
  {
    id: 2,
    title: "Şişenin Arkasında: Noir Absolute",
    excerpt:
      "En çok satan Avant-garde parfümümüzün yaratım sürecine özel bir bakış.",
    date: "10 Ara 2024",
    category: "Kamera Arkası",
    readTime: "8 dk okuma",
  },
  {
    id: 3,
    title: "Sürdürülebilir Tedarik: Taahhüdümüz",
    excerpt:
      "Mr Okay'in lüksten ödün vermeden etik malzeme tedarikini nasıl sağladığı.",
    date: "5 Ara 2024",
    category: "Sürdürülebilirlik",
    readTime: "6 dk okuma",
  },
  {
    id: 4,
    title: "Kış Parfümleri: Kapsamlı Rehber",
    excerpt:
      "Soğuk mevsimi ve tatil buluşmalarını tamamlayacak mükemmel kokular.",
    date: "28 Kas 2024",
    category: "Mevsimsel",
    readTime: "7 dk okuma",
  },
  {
    id: 5,
    title: "Udun Tarihi",
    excerpt:
      "Dünyanın en değerli parfüm malzemesinin yolculuğunu izlemek.",
    date: "20 Kas 2024",
    category: "Eğitim",
    readTime: "10 dk okuma",
  },
  {
    id: 6,
    title: "Parfüm Gardırobu: Temel Kokular",
    excerpt:
      "Her durum için çok yönlü bir koku koleksiyonu oluşturmak.",
    date: "15 Kas 2024",
    category: "Rehberler",
    readTime: "6 dk okuma",
  },
];

export default function BlogPage() {
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
            Dergi
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-black">
            Blog
          </h1>
          <p className="text-silver-dark font-light mt-4 max-w-lg mx-auto">
            Hikayeler, içgörüler ve kaliteli parfümeri sanatı
          </p>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Featured Post */}
          <ScrollReveal className="mb-16 lg:mb-24">
            <Link href={`/blog/${blogPosts[0].id}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="text-[10px] tracking-ultrawide uppercase text-silver border border-silver/30 px-3 py-1">
                      {blogPosts[0].category}
                    </span>
                    <span className="text-xs text-silver-dark">
                      {blogPosts[0].date}
                    </span>
                  </div>
                  <h2 className="font-serif text-3xl lg:text-4xl text-black mb-4 group-hover:text-silver transition-colors duration-300">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-silver-dark font-light leading-relaxed mb-6">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center text-xs tracking-ultrawide uppercase text-silver group-hover:text-black transition-colors">
                    <span>Makaleyi Oku</span>
                    <ArrowRight
                      size={14}
                      className="ml-2 group-hover:translate-x-2 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {blogPosts.slice(1).map((post, index) => (
              <ScrollReveal key={post.id} delay={index * 0.1}>
                <Link href={`/blog/${post.id}`} className="group block">
                  <div className="relative aspect-[16/10] bg-gray-100 overflow-hidden mb-6">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="text-[10px] tracking-ultrawide uppercase text-silver-dark">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-silver-dark/50">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-black mb-3 group-hover:text-silver transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-sm text-silver-dark font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                  <p className="text-xs text-silver-dark/50 mt-4">{post.date}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
