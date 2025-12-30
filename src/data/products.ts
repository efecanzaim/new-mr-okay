export interface Product {
  id: string;
  name: string;
  collection: string;
  price: number;
  ml: number;
  image: string;
  category: "businessman" | "smartwoman";
  subcategory: "classic" | "avant-garde" | "elegant" | "holiday" | "weekend";
  scent: {
    top: string[];
    middle: string[];
    base: string[];
  };
  description: string;
  family: string;
  alt_notes?: string[];
}

export const products: Product[] = [
  // BUSINESSMAN - ELEGANT
  {
    id: "elegant",
    name: "Elegant",
    collection: "BUSINESSMAN",
    price: 1250,
    ml: 50,
    image: "/products/elegant.png",
    category: "businessman",
    subcategory: "elegant",
    scent: {
      top: ["Bergamot", "Pembe Biber", "Lavanta"],
      middle: ["Menekşe yaprakları", "Süsen (İris)", "Adaçayı"],
      base: ["Sandal Ağacı", "Vetiver", "Kehribar", "Misk"],
    },
    description: "Sofistike, zarif ve entelektüel",
    family: "Woody, Aromatik, Pudralı",
  },

  // BUSINESSMAN - AVANT-GARDE
  {
    id: "avant-garde",
    name: "Avant-Garde",
    collection: "BUSINESSMAN",
    price: 1250,
    ml: 50,
    image: "/products/avantgarde.png",
    category: "businessman",
    subcategory: "avant-garde",
    scent: {
      top: ["Siyah Biber", "Zencefil", "Bergamot", "Kakule"],
      middle: ["Tütsü", "Süet Deri", "Kakao özü veya bitter çikolata", "Adaçayı", "Sedir Ağacı"],
      base: ["Vetiver", "Amber", "Misk", "Labdanum", "Oud"],
    },
    description: "Yaratıcı, vizyoner, cesur",
    family: "Woody, Spicy",
  },

  // BUSINESSMAN - CLASSIC
  {
    id: "classic",
    name: "Classic",
    collection: "BUSINESSMAN",
    price: 1250,
    ml: 50,
    image: "/products/classic.png",
    category: "businessman",
    subcategory: "classic",
    scent: {
      top: ["Bergamot", "Lavanta"],
      middle: ["Geranyum", "Adaçayı"],
      base: ["Meşe yosunu", "Vetiver", "Tonka fasulyesi"],
    },
    description: "Klasik, disiplinli, özgüvenli",
    family: "Fougere",
  },

  // BUSINESSMAN - WEEKEND
  {
    id: "weekend",
    name: "Weekend",
    collection: "BUSINESSMAN",
    price: 1250,
    ml: 50,
    image: "/products/weekend.png",
    category: "businessman",
    subcategory: "weekend",
    scent: {
      top: ["Greyfurt", "Bergamot", "Ardıç Tohumu"],
      middle: ["Lavanta", "Adaçayı", "Yeşil Çay Akoru"],
      base: ["Vetiver", "Paçuli", "Kashmir Wood"],
    },
    description: "Şehirli, modern, hafta sonlarının keyfini huzurla çıkaran bir stil",
    family: "Amber, Misk, Spicy",
  },

  // BUSINESSMAN - HOLIDAY
  {
    id: "holiday",
    name: "Holiday",
    collection: "BUSINESSMAN",
    price: 1250,
    ml: 50,
    image: "/products/holiday.png",
    category: "businessman",
    subcategory: "holiday",
    scent: {
      top: ["Limon", "Nane", "Yeşil Elma", "Deniz esintisi (Marine akorlar)"],
      middle: ["Lavanta", "Ginger (Zencefil)", "Geranium"],
      base: ["Sedir Ağacı", "Kehribar", "Beyaz Misk"],
    },
    description: "Hayatı dolu dolu yaşayan, özgür ruhlu ve enerjik iş adamı",
    family: "Aquatic, Narenciye, Aromatik",
  },
];

// Helper functions
export const getProductsByCategory = (category: Product["category"]) => {
  return products.filter((product) => product.category === category);
};

export const getProductsBySubcategory = (
  category: Product["category"],
  subcategory: Product["subcategory"]
) => {
  return products.filter(
    (product) =>
      product.category === category && product.subcategory === subcategory
  );
};

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id);
};

export const getFeaturedProducts = (count: number = 4) => {
  return products.slice(0, count);
};
