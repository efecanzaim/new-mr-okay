"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { getProductsByCategory } from "@/data/products";

const businessmanProducts = getProductsByCategory("businessman");

export default function BusinessmanCollectionPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[100vh] flex flex-col justify-between overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/businessman_hero.png"
            alt="Businessman Collection"
            fill
            className="object-cover"
            style={{ objectPosition: '50% 80%' }}
            priority
            quality={100}
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Top Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-6 pt-32"
        >
          <p className="text-[10px] tracking-ultrawide uppercase text-white font-semibold mb-4">
            Koleksiyon
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-white">
            BUSINESSMAN
          </h1>
        </motion.div>

        {/* Bottom Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center px-6 pb-16"
        >
          <p className="text-4xl text-white font-normal max-w-6xl mx-auto">
            İş, şehir ve özgürlük arasında dengelenmiş bir yaşam koleksiyonu...
          </p>
        </motion.div>
      </section>

      {/* Product Showcase - Alternating Layout */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {businessmanProducts.map((product, index) => {
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
                        src={`/images/businessman_${product.id}.png`}
                        alt={product.name}
                        fill
                        className="object-cover"
                        quality={100}
                        style={product.id === 'weekend' ? { transform: 'scale(1.15)' } : undefined}
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
                    <h2 className="font-serif text-3xl lg:text-4xl text-black mb-6">
                      {product.name}
                    </h2>

                    {/* Custom Description */}
                    {product.id === "classic" && (
                      <div className="text-black font-medium leading-relaxed mb-8 space-y-4">
                        <p>
                          Siyah-beyaz bir zeminde başlayan sessiz bir oyunun merkezindedir. İlk sıkımda ferah ve kontrollü bir açılış hissi verir; net, ölçülü ve kararlı. Satranç taşları gibi acele etmez, hamlelerini hesaplar. Bu koku, gücünü bağırarak değil, duruşuyla hissettiren erkekler için tasarlanmıştır.
                        </p>
                        <p>
                          Zaman geçtikçe derinleşen yapısı, zemine düşen uzun bir gölge gibi varlığını kalıcı kılar. Classic, iş hayatında stratejiyle hareket eden, şehirde kendi alanını bilen ve liderliği doğal kabul eden erkeklerin imzasıdır. Ne fazlalık ister ne de tesadüf; doğru hamlenin, doğru anda yapılması gibi.
                        </p>
                      </div>
                    )}

                    {product.id === "weekend" && (
                      <div className="text-black font-medium leading-relaxed mb-8 space-y-4">
                        <p>
                          Hafta sonuna hazırlanmanın kendine özgü bir ritüel olduğunu bilen erkekler için tasarlandı. Bu koku, aceleyle değil özenle seçilir; dışarı çıkmadan önce yapılan son dokunuş gibidir. Şehir ışıkları yanmadan, planlar netleşmeden önce devreye girer ve günün temposunu keyfe dönüştürür.
                        </p>
                        <p>
                          Sıkıldığında ferah, enerjik ve modern bir etki yaratır; tıpkı özel bir akşam için hazırlanan bir sahne gibi. Weekend, ilgi görmekten çekinmeyen, detaylara önem veren ve hafta sonunu sıradan bir mola değil, bir deneyim olarak yaşayan erkeklerin imzasıdır. Bu bir kaçış değil; şehirde, doğru anda, doğru şekilde görünme halidir.
                        </p>
                      </div>
                    )}

                    {product.id === "elegant" && (
                      <div className="text-black font-medium leading-relaxed mb-8 space-y-4">
                        <p>
                          Sıradan olanla yetinmeyen erkekler için tasarlanmış nadir bir imzadır. Tıpkı ustasının elinden çıkmış eşsiz bir kılıç gibi; sessiz, kusursuz ve geri dönülmez bir etki bırakır. İlk anda sakin ve soğukkanlıdır; gücünü göstermek için yükselmez, varlığıyla alan yaratır.
                        </p>
                        <p>
                          Tenle buluştukça derinleşir ve yalnızca gerçekten özel anlarda kendini ele verir. Elegant, herkesin fark etmesi için değil, doğru bakışların onu tanıması için vardır. Bu bir stil değil, bir ayrıcalıktır; geçici etkilerden arınmış, kalıcı bir zarafet halidir.
                        </p>
                      </div>
                    )}

                    {product.id === "avantgarde" && (
                      <div className="text-black font-medium leading-relaxed mb-8 space-y-4">
                        <p>
                          Alışılmış yolların dışına çıkma cesaretiyle başlar. Yağmurun şehirle bütünleştiği bir gecede, düşünceler berraklaşır; ışıklar silikleşirken zihnin yönü netleşir. Bu koku ilk anda canlı ve keskindir, güvenli sınırları değil yeni ihtimalleri çağırır.
                        </p>
                        <p>
                          Ten üzerinde ilerledikçe sakinleşir ama kaybolmaz; tıpkı gece boyunca parlayan bir fikir gibi. Avant-garde, kalıplara uyum sağlamak için değil, kendi çizgisini yaratmak için vardır. Bu bir duruş değil, bir bakış açısıdır; modern, bağımsız ve ileriye dönük.
                        </p>
                      </div>
                    )}

                    {/* Discover Button */}
                    <Link
                      href={`/product/${product.id}`}
                      className="inline-block bg-black text-white font-bold border border-black px-8 py-4 text-xs tracking-ultrawide uppercase hover:bg-white hover:text-black transition-all duration-300"
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
      <section className="py-24 lg:py-32 bg-white border-t border-black/5">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <p className="text-[10px] tracking-ultrawide uppercase text-black font-semibold mb-6">
              BUSINESSMAN Felsefesi
            </p>
            <h2 className="font-serif text-3xl lg:text-4xl text-black mb-8 leading-tight">
              &ldquo;Başarının bir kokusu var. Tek kelime etmeden önce
              giydiğiniz özgüven o.&rdquo;
            </h2>
            <p className="text-black font-medium leading-relaxed">
              BUSINESSMAN koleksiyonu, ilk izlenimlerin önemini anlayan erkekler
              için tasarlandı. Bu koleksiyondaki her koku, otorite,
              sofistike ve unutulmaz bir varlık yansıtmak için tasarlandı.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
