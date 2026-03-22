"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { getProductById } from "@/data/products";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

// Sample cart data using real products
const cartItemsData = [
  { productId: "classic", quantity: 1 },
  { productId: "elegant", quantity: 2 },
];

// Build cart items with full product data
const cartItems = cartItemsData
  .map((item) => {
    const product = getProductById(item.productId);
    if (!product) return null;
    return {
      ...product,
      quantity: item.quantity,
    };
  })
  .filter((item): item is NonNullable<typeof item> => item !== null);

export default function CartPage() {
  const { language } = useLanguage();
  const t = allTranslations[language];
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-white min-h-screen pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-4xl lg:text-5xl text-black mb-12">
            {t["cart.title"]}
          </h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-8">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 pb-8 border-b border-black/10"
                  >
                    {/* Product Image */}
                    <Link href={`/product/${item.id}`} className="w-28 h-36 bg-gray-100 flex-shrink-0 relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-500"
                        sizes="112px"
                        quality={100}
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[10px] tracking-ultrawide uppercase text-silver-dark mb-1">
                          {item.collection}
                        </p>
                        <Link href={`/product/${item.id}`}>
                          <h3 className="font-serif text-lg text-black hover:text-silver transition-colors">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-silver-dark mt-1">
                          {item.ml}ml
                        </p>
                      </div>

                      <div className="flex items-end justify-between">
                        {/* Quantity */}
                        <div className="flex items-center border border-black/20">
                          <button className="p-2 text-silver hover:text-black transition-colors">
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center text-sm text-black">
                            {item.quantity}
                          </span>
                          <button className="p-2 text-silver hover:text-black transition-colors">
                            <Plus size={14} />
                          </button>
                        </div>

                        <button className="p-2 text-silver-dark hover:text-black transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-black font-light">
                        ₺{(item.price * item.quantity).toLocaleString('tr-TR')}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-8 sticky top-32">
                  <h2 className="text-xs tracking-ultrawide uppercase text-silver mb-8">
                    {t["cart.orderSummary"]}
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-silver-dark">{t["cart.subtotal"]}</span>
                      <span className="text-black">₺{subtotal.toLocaleString('tr-TR')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-silver-dark">{t["cart.shipping"]}</span>
                      <span className="text-black">{t["cart.free"]}</span>
                    </div>
                  </div>

                  <div className="flex justify-between py-4 border-t border-black/10 mb-8">
                    <span className="text-black">{t["cart.total"]}</span>
                    <span className="text-xl text-black font-light">
                      ₺{subtotal.toLocaleString('tr-TR')}
                    </span>
                  </div>

                  <MagneticButton variant="primary" size="lg" className="w-full">
                    {t["cart.checkout"]}
                  </MagneticButton>

                  <Link
                    href="/collections/businessman"
                    className="block text-center text-xs tracking-ultrawide uppercase text-silver-dark hover:text-black transition-colors mt-6"
                  >
                    {t["cart.continueShopping"]}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-silver-dark font-light mb-8">
                {t["cart.empty"]}
              </p>
              <Link href="/collections/businessman">
                <MagneticButton variant="outline">
                  {t["cart.discoverCollection"]}
                </MagneticButton>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
