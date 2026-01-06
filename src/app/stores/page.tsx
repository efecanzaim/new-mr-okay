"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/ScrollReveal";
import {
  MapPin,
  Store,
  Phone,
  Clock,
  ChevronRight,
  Search,
  Filter,
  Navigation,
} from "lucide-react";
import type { StoreLocation } from "@/components/StoreMap";
import { useLanguage } from "@/context/LanguageContext";
import { tr } from "@/translations/tr";
import { en } from "@/translations/en";
import { de } from "@/translations/de";
import { fr } from "@/translations/fr";
import { ar } from "@/translations/ar";

const allTranslations = { tr, en, de, fr, ar };

// Dynamic import for Leaflet (SSR disabled)
const StoreMap = dynamic(() => import("@/components/StoreMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-black/20 border-t-black rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-stone-500 tracking-wide">Harita yükleniyor...</p>
      </div>
    </div>
  ),
});

// Store data
const storeData: StoreLocation[] = [
  // Adana
  {
    id: "adana-2",
    name: "Adana/Seyhan/Çınar Mahallesi",
    type: "physical",
    city: "Adana",
    district: "Seyhan",
    address: "Çınarlı Mah. İnönü No:18/B Doruk Otel Karşısı Seyhan/Adana",
    coordinates: [36.99027412380862, 35.32456495431724],
  },
  {
    id: "adana-5",
    name: "Adana/Seyhan/Bülent Angın Bulvarı",
    type: "physical",
    city: "Adana",
    district: "Seyhan",
    address: "Yeni Baraj Yolu Bülent Angın Bulvarı F.Özkurt Apt.No:94/B Seyhan/Adana",
    coordinates: [37.030887, 35.313710],
  },
  // Ankara
  {
    id: "ankara-kizilay",
    name: "Ankara/Kızılay",
    type: "physical",
    city: "Ankara",
    district: "Çankaya",
    address: "Kızılay Mahallesi Atatürk Bulvarı Kocabeyoğlu Pasajı Blok No: 80 İç Kapı No: 3 Çankaya / Ankara",
    coordinates: [39.922669, 32.853991],
  },
  // Çanakkale
  {
    id: "canakkale-17-burda",
    name: "Çanakkale/17 Burda AVM",
    type: "physical",
    city: "Çanakkale",
    district: "Merkez",
    address: "Barbaros Mahallesi Atatürk Cad. No: 207 Çanakkale/TÜRKİYE",
    coordinates: [40.123332, 26.411287],
  },
  // İstanbul
  {
    id: "istanbul-besiktas",
    name: "İstanbul/Beşiktaş",
    type: "physical",
    city: "İstanbul",
    district: "Beşiktaş",
    address: "Sinanpaşa Mah. Hasfırın Cad. No:1 Beşiktaş / İstanbul",
    coordinates: [41.043127, 29.006499],
  },
  {
    id: "istanbul-beyoglu",
    name: "İstanbul/Beyoğlu",
    type: "physical",
    city: "İstanbul",
    district: "Beyoğlu",
    address: "Asmalı Mescid Mah. İstiklal Cad. No:130/A Beyoğlu / İstanbul",
    coordinates: [41.032395, 28.975935],
  },
  {
    id: "istanbul-kadikoy",
    name: "İstanbul/Kadıköy",
    type: "physical",
    city: "İstanbul",
    district: "Kadıköy",
    address: "Söğütlüçeşme Cad. Elbekhan No: 82 / 1 D Osmanağa Kadıköy / İstanbul",
    coordinates: [40.990590, 29.029420],
  },
  {
    id: "istanbul-nisantasi",
    name: "İstanbul/Nişantaşı",
    type: "physical",
    city: "İstanbul",
    district: "Şişli",
    address: "Halaskargazi Mah.Rumeli Cad. Bereket Apt. No:55 / B Şişli / İstanbul",
    coordinates: [41.053047, 28.989106],
  },
  {
    id: "istanbul-sisli",
    name: "İstanbul/Şişli",
    type: "physical",
    city: "İstanbul",
    district: "Şişli",
    address: "19 Mayıs Mah. Halaskargazi Cad. Cat Chaferta No: 176/A Şişli - İstanbul",
    coordinates: [41.05850489823284, 28.987217660933897],
  },
  {
    id: "istanbul-atasehir",
    name: "İstanbul/Ataşehir/Optimum AVM",
    type: "physical",
    city: "İstanbul",
    district: "Ataşehir",
    address: "Yeni Sahra, Demokrasi Cd., 34746 Ataşehir/İstanbul",
    coordinates: [40.9945076367627, 29.08336229679556],
  },
  {
    id: "istanbul-bakirkoy",
    name: "İstanbul/Bakırköy Cadde",
    type: "physical",
    city: "İstanbul",
    district: "Bakırköy",
    address: "Fahri Korutürk Caddesi. Gür Çarşısı Ve İş Hanı No:39 Dükkan No:1 Bakırköy / İstanbul",
    coordinates: [40.98001950617644, 28.87393664126239],
  },
  {
    id: "istanbul-brandium",
    name: "İstanbul/Brandium AVM",
    type: "physical",
    city: "İstanbul",
    district: "Ataşehir",
    address: "Küçükbakkalköy Mahallesi, Dudullu Caddesi. No:23-25, 34758 Ataşehir/İstanbul",
    coordinates: [40.982113259229735, 29.13201578329955],
  },
  {
    id: "istanbul-maltepe",
    name: "İstanbul/Maltepe Park AVM",
    type: "physical",
    city: "İstanbul",
    district: "Maltepe",
    address: "Cevizli, Tugay Yolu Cd. No:67, 34846 Maltepe/İstanbul",
    coordinates: [40.91944858462875, 29.164501038733896],
  },
  // İzmir
  {
    id: "izmir-karsiyaka",
    name: "İzmir/Karşıyaka",
    type: "physical",
    city: "İzmir",
    district: "Karşıyaka",
    address: "1717 Sok. No:82/E Karşıyaka / İzmir",
    coordinates: [38.45673249926686, 27.11806955436966],
  },
];

// Online Marketplaces
const marketplaces = [
  {
    id: "trendyol",
    name: "Trendyol",
    logo: "https://cdn.dsmcdn.com/Assets/t/y/creative/2021/mobile/logo-ty.svg",
    url: "https://www.trendyol.com/pd/loris/mr-okay-businessman-classic-50-ml-p-1075310730",
  },
  {
    id: "lorisparfum",
    name: "Loris Parfum",
    logo: "",
    url: "https://lorisparfum.com/collections/kreasyon/products/businessman-classic-50-ml?_pos=1&_fid=efd173327&_ss=c",
  },
  {
    id: "hepsiburada",
    name: "Hepsiburada",
    logo: "https://images.hepsiburada.net/assets/svg/hepsiburada-logo.svg",
    url: "https://www.hepsiburada.com/loris-mr-okay-businessman-classic-50-ml-p-HBCV0000BOOE73",
  },
  {
    id: "pttavm",
    name: "PTT AVM",
    logo: "https://www.pttavm.com/Assets/images/logo.svg",
    url: "https://www.pttavm.com/mr-okay-businessman-classic-50-ml-p-1411937013",
  },
  {
    id: "lcwaikiki",
    name: "LC Waikiki",
    logo: "https://lcwaikiki.com/assets/images/logo.svg",
    url: "https://www.lcw.com/mr-okay-businessman-classic-50-ml-renksiz-o-5260536",
  },
  {
    id: "pazarama",
    name: "Pazarama",
    logo: "",
    url: "https://www.pazarama.com/mr-okay-businessman-classic-50-ml-p-8681933131355",
  },
  {
    id: "n11",
    name: "N11",
    logo: "",
    url: "https://www.n11.com/urun/mr-okay-businessman-classic-50-ml-fresh-116348820",
  },
  {
    id: "idefix",
    name: "Idefix",
    logo: "",
    url: "https://www.idefix.com/mr-okay-businessman-classic-50-ml-p-18090284",
  },
];

const cities = ["Tümü", "İstanbul", "Ankara", "Adana", "Çanakkale", "İzmir"];

export default function StoresPage() {
  const [selectedStore, setSelectedStore] = useState<StoreLocation | null>(null);
  const [selectedCity, setSelectedCity] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"physical" | "marketplace">("physical");
  const { language } = useLanguage();
  const t = allTranslations[language];

  const filteredStores = useMemo(() => {
    return storeData.filter((store) => {
      const matchesCity = selectedCity === "Tümü" || store.city === selectedCity;
      const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           store.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCity && matchesSearch;
    });
  }, [selectedCity, searchQuery]);

  const physicalStores = filteredStores;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-100 via-stone-50 to-white" />

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.03 }}
            transition={{ duration: 2 }}
            className="absolute top-20 left-10 w-96 h-96 rounded-full bg-black blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.02 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute bottom-0 right-20 w-[500px] h-[500px] rounded-full bg-stone-400 blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative z-10 text-center px-6"
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-16 h-16 mx-auto mb-6 border border-black/10 rounded-full flex items-center justify-center"
          >
            <MapPin size={24} strokeWidth={1} className="text-black/70" />
          </motion.div>
          <p className="text-[10px] tracking-ultrawide uppercase text-stone-500 mb-4">
            {t["stores.subtitle"]}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-black mb-4">
            {t["stores.title"]}
          </h1>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="max-w-[1800px] mx-auto px-4 lg:px-8">
          {/* Tab Selector */}
          <ScrollReveal>
            <div className="flex justify-center mb-12">
              <div className="inline-flex border border-stone-200 bg-stone-50">
                <button
                  onClick={() => setActiveTab("physical")}
                  className={`px-8 py-4 text-xs tracking-ultrawide uppercase font-medium transition-all duration-300 ${
                    activeTab === "physical"
                      ? "bg-black text-white"
                      : "bg-transparent text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {t["stores.physicalStores"]}
                </button>
                <button
                  onClick={() => setActiveTab("marketplace")}
                  className={`px-8 py-4 text-xs tracking-ultrawide uppercase font-medium transition-all duration-300 ${
                    activeTab === "marketplace"
                      ? "bg-black text-white"
                      : "bg-transparent text-stone-600 hover:bg-stone-100"
                  }`}
                >
                  {t["stores.marketplaces"]}
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Physical Stores Section */}
          {activeTab === "physical" && (
            <>
              {/* Filter Bar */}
              <ScrollReveal>
                <div className="bg-stone-50 border border-stone-200 p-4 lg:p-6 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    placeholder={t["stores.searchPlaceholder"]}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-stone-200 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Store Count */}
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200">
                  <Store size={14} className="text-stone-600" />
                  <span className="text-xs tracking-wide text-stone-600">
                    {physicalStores.length} {t["stores.results"]}
                  </span>
                </div>

                {/* City Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 text-xs tracking-wide uppercase bg-white border border-stone-200 hover:border-black transition-colors"
                >
                  <Filter size={14} />
                  {t["stores.cityFilter"]}
                  <ChevronRight size={14} className={`transition-transform ${showFilters ? "rotate-90" : ""}`} />
                </button>
              </div>

              {/* City Filter Dropdown */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-stone-200">
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={`px-4 py-2 text-xs tracking-wide transition-all ${
                            selectedCity === city
                              ? "bg-black text-white"
                              : "bg-white text-stone-600 border border-stone-200 hover:border-black"
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>

          {/* Map & List Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Store List */}
            <div className="order-2 lg:order-1 space-y-8">
              {/* Physical Stores */}
              {physicalStores.length > 0 && (
                <ScrollReveal direction="left">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-black flex items-center justify-center">
                        <Store size={18} className="text-white" />
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl text-black">{t["stores.physicalStores"]}</h2>
                        <p className="text-xs text-stone-500">{physicalStores.length} {t["stores.location"]}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {physicalStores.map((store, index) => (
                        <motion.div
                          key={store.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setSelectedStore(store)}
                          className={`group cursor-pointer border transition-all duration-300 ${
                            selectedStore?.id === store.id
                              ? "border-black bg-stone-50"
                              : "border-stone-200 hover:border-black bg-white"
                          }`}
                        >
                          <div className="p-5">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-medium text-black">{store.name}</h3>
                                </div>
                                <p className="text-sm text-stone-500 mb-3">{store.address}</p>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500">
                                  {store.phone && (
                                    <span className="flex items-center gap-1.5">
                                      <Phone size={12} />
                                      {store.phone}
                                    </span>
                                  )}
                                  {store.workingHours && (
                                    <span className="flex items-center gap-1.5">
                                      <Clock size={12} />
                                      {store.workingHours}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="w-10 h-10 border border-black flex items-center justify-center">
                                  <Navigation size={16} className="text-black" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* No Results */}
              {filteredStores.length === 0 && (
                <div className="text-center py-16">
                  <MapPin size={48} className="mx-auto text-stone-300 mb-4" />
                  <p className="text-stone-500">Aramanızla eşleşen sonuç bulunamadı.</p>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="order-1 lg:order-2">
              <ScrollReveal direction="right">
                <div className="sticky top-24">
                  <div className="bg-stone-100 border border-stone-200 overflow-hidden">
                    <div className="h-[400px] lg:h-[calc(100vh-200px)] min-h-[500px]">
                      <StoreMap
                        stores={physicalStores}
                        selectedStore={selectedStore}
                        onStoreSelect={setSelectedStore}
                      />
                    </div>
                  </div>

                  {/* Selected Store Info */}
                  <AnimatePresence>
                    {selectedStore && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="mt-4 bg-black text-white p-6"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-[10px] tracking-ultrawide uppercase text-white/50 mb-2">
                              Seçili Mağaza
                            </p>
                            <h3 className="font-serif text-xl mb-2">{selectedStore.name}</h3>
                            <p className="text-sm text-white/70 mb-4">{selectedStore.address}</p>
                            <div className="flex flex-wrap gap-4 text-xs text-white/60">
                              {selectedStore.phone && (
                                <span className="flex items-center gap-1.5">
                                  <Phone size={12} />
                                  {selectedStore.phone}
                                </span>
                              )}
                              {selectedStore.workingHours && (
                                <span className="flex items-center gap-1.5">
                                  <Clock size={12} />
                                  {selectedStore.workingHours}
                                </span>
                              )}
                            </div>
                          </div>
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${selectedStore.coordinates[0]},${selectedStore.coordinates[1]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs tracking-wide uppercase hover:bg-stone-100 transition-colors"
                          >
                            <Navigation size={14} />
                            Yol Tarifi
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            </div>
          </div>
            </>
          )}

          {/* Marketplace Section */}
          {activeTab === "marketplace" && (
            <ScrollReveal>
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <p className="text-[10px] tracking-ultrawide uppercase text-stone-500 mb-4">
                    Online Pazar Yerleri
                  </p>
                  <h2 className="font-serif text-4xl md:text-5xl text-black mb-4">
                    Güvenilir Platformlardan Alışveriş
                  </h2>
                  <p className="text-stone-500 font-light max-w-lg mx-auto">
                    Ürünlerimizi Türkiye'nin önde gelen e-ticaret platformlarından satın alabilirsiniz.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {marketplaces.map((marketplace, index) => (
                    <motion.a
                      key={marketplace.id}
                      href={marketplace.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative bg-white border border-stone-200 hover:border-black transition-all duration-300 overflow-hidden"
                    >
                      <div className="aspect-[4/3] flex items-center justify-center p-8 bg-stone-50 group-hover:bg-white transition-colors duration-300">
                        <div className="text-center w-full">
                          <h3 className="font-medium text-black text-lg mb-2">{marketplace.name}</h3>
                          <p className="text-xs text-stone-500 uppercase tracking-wide">Satın Al</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 border-2 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-stone-50 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <p className="text-[10px] tracking-ultrawide uppercase text-stone-500 mb-4">
              Online Alışveriş
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-black mb-6">
              Evinizin Konforunda Alışveriş
            </h2>
            <p className="text-stone-500 font-light max-w-lg mx-auto mb-8">
              Tüm koleksiyonlarımızı online mağazamızdan veya yetkili satıcılarımızdan güvenle satın alabilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/collections/businessman"
                className="px-8 py-4 bg-black text-white text-xs tracking-ultrawide uppercase hover:bg-stone-800 transition-colors"
              >
                Koleksiyonu Keşfet
              </a>
              <a
                href="/contact"
                className="px-8 py-4 border border-black text-black text-xs tracking-ultrawide uppercase hover:bg-black hover:text-white transition-colors"
              >
                Bize Ulaşın
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
