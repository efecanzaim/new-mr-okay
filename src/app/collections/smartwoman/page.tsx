"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

const smartwomanProducts = [
  {
    id: "midnight-silk",
    name: "Midnight Silk",
    collection: "İmza",
    price: 9600,
    image: "/products/midnight-silk.jpg",
    category: "İmza",
    description: "Gecenin gizemini taşıyan, sofistike ve büyüleyici bir koku. Kendine güvenen kadınlar için.",
    notes: {
      top: "Bergamot, Pembe Biber",
      middle: "Yasemin, Gül",
      base: "Misk, Sandal Ağacı"
    }
  },
  {
    id: "velvet-rose",
    name: "Velvet Rose",
    collection: "Çiçeksi",
    price: 8250,
    image: "/products/velvet-rose.jpg",
    category: "Çiçeksi",
    description: "Kadifemsi gül yaprakları ve yumuşak amber notalarıyla romantik bir yolculuk.",
    notes: {
      top: "Greyfurt, Portakal Çiçeği",
      middle: "Kırmızı Gül, Şakayık",
      base: "Amber, Vanilya"
    }
  },
  {
    id: "pearl-essence",
    name: "Pearl Essence",
    collection: "Taze",
    price: 7350,
    image: "/products/pearl-essence.jpg",
    category: "Taze",
    description: "İncinin saflığını yansıtan, temiz ve ferah bir koku. Her anınız için ideal.",
    notes: {
      top: "Limon, Beyaz Çay",
      middle: "Zambak, Müge Çiçeği",
      base: "Beyaz Misk, Sedir"
    }
  },
  {
    id: "noir-femme",
    name: "Noir Femme",
    collection: "Yoğun",
    price: 10500,
    image: "/products/noir-femme.jpg",
    category: "Yoğun",
    description: "Karanlığın zarif gücünü taşıyan, cesur ve etkileyici bir imza kokusu.",
    notes: {
      top: "Safran, Zencefil",
      middle: "Oud, Süsen",
      base: "Deri, Kehribar"
    }
  },
  {
    id: "crystal-dawn",
    name: "Crystal Dawn",
    collection: "Taze",
    price: 6750,
    image: "/products/crystal-dawn.jpg",
    category: "Taze",
    description: "Şafağın ilk ışıklarını andıran, enerjik ve canlandırıcı bir başlangıç.",
    notes: {
      top: "Mandarin, Armut",
      middle: "Frezia, Manolya",
      base: "Beyaz Odun, Misk"
    }
  },
  {
    id: "satin-nights",
    name: "Satin Nights",
    collection: "İmza",
    price: 8850,
    image: "/products/satin-nights.jpg",
    category: "İmza",
    description: "Saten kumaş kadar yumuşak, gece kadar çekici. Özel geceler için vazgeçilmez.",
    notes: {
      top: "Tuberose, Ylang Ylang",
      middle: "Yasemin, Portakal Çiçeği",
      base: "Vanilya, Tonka"
    }
  },
  {
    id: "ivory-musk",
    name: "Ivory Musk",
    collection: "Duygusal",
    price: 8550,
    image: "/products/ivory-musk.jpg",
    category: "Duygusal",
    description: "Saf misk notalarıyla sarmalanan, zarif ve duygusal bir dokunuş.",
    notes: {
      top: "Beyaz Şeftali, Bergamot",
      middle: "Yasemin, Zambak",
      base: "Misk, Kashmir Odunu"
    }
  },
  {
    id: "silver-moon",
    name: "Silver Moon",
    collection: "Çiçeksi",
    price: 7950,
    image: "/products/silver-moon.jpg",
    category: "Çiçeksi",
    description: "Ay ışığının büyüsünü taşıyan, romantik ve feminen bir koku deneyimi.",
    notes: {
      top: "Armut, Nergis",
      middle: "Gardenia, İris",
      base: "Sandal Ağacı, Vanilya"
    }
  },
];

export default function SmartwomanCollectionPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-white" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-6"
        >
          <p className="text-[10px] tracking-ultrawide uppercase text-black font-semibold mb-4">
            Koleksiyon
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-black">
            SMARTWOMAN
          </h1>
          <p className="text-lg text-black font-medium mt-4 max-w-xl mx-auto">
            Her notada zarif özgüven. Kendi kaderini şekillendiren kadınlar
            için tasarlanmış kokular.
          </p>
        </motion.div>
      </section>

      {/* Product Showcase - Alternating Layout */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {smartwomanProducts.map((product, index) => {
            const isEven = index % 2 === 0;

            return (
              <ScrollReveal key={product.id}>
                <div
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-16 py-16 lg:py-24 ${index !== 0 ? 'border-t border-black/5' : ''}`}
                >
                  {/* Product Image */}
                  <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative aspect-square overflow-hidden" style={{ background: 'linear-gradient(107deg, rgba(89, 89, 89, 0.20) 0%, rgba(89, 89, 89, 0.03) 100%)' }}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-8"
                        quality={100}
                      />
                    </div>
                  </motion.div>

                  {/* Product Info */}
                  <motion.div
                    className={`w-full lg:w-1/2 ${isEven ? 'lg:pl-8' : 'lg:pr-8'}`}
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-[10px] tracking-ultrawide uppercase text-black font-semibold mb-3">
                      {product.collection}
                    </p>
                    <h2 className="font-serif text-3xl lg:text-4xl text-black mb-4">
                      {product.name}
                    </h2>
                    <p className="text-black font-medium leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Scent Notes */}
                    <div className="mb-8 space-y-3">
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] tracking-ultrawide uppercase text-black font-semibold w-16">Üst</span>
                        <span className="text-sm text-black font-medium">{product.notes.top}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] tracking-ultrawide uppercase text-black font-semibold w-16">Orta</span>
                        <span className="text-sm text-black font-medium">{product.notes.middle}</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-[10px] tracking-ultrawide uppercase text-black font-semibold w-16">Alt</span>
                        <span className="text-sm text-black font-medium">{product.notes.base}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <p className="text-2xl text-black mb-8">
                      {product.price.toLocaleString("tr-TR")} ₺
                    </p>

                    {/* Discover Button */}
                    <Link
                      href={`/product/${product.id}`}
                      className="inline-block border border-black px-8 py-4 text-xs tracking-ultrawide uppercase text-black hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Keşfet
                    </Link>
                  </motion.div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* Collection Story */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p className="text-[10px] tracking-ultrawide uppercase text-black font-semibold mb-6">
              SMARTWOMAN Felsefesi
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-black mb-8 leading-tight">
              &ldquo;Güç gürültülü değildir. Odadan ayrıldıktan çok sonra
              bile kalıcı olan sessiz özgüventir.&rdquo;
            </h2>
            <p className="text-black font-medium leading-relaxed">
              SMARTWOMAN koleksiyonu, modern kadınlığın çok yönlü doğasını
              kutlar. Toplantı odalarından gala gecelerine, bu kokular
              güçlendirmek ve ilham vermek için tasarlandı.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
