export interface Product {
  id: string;
  name: string;
  collection: string;
  price: number;
  ml: number;
  image: string;
  images?: string[]; // Galeri görselleri
  category: "businessman" | "smartwoman";
  subcategory: "classic" | "avantgarde" | "elegant" | "holiday" | "weekend" | "mystery" | "celebrity" | "majesty" | "dreamy" | "shiny";
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
  // BUSINESSMAN - CLASSIC
  {
    id: "classic",
    name: "Classic",
    collection: "BUSINESSMAN",
    price: 1250,
    ml: 50,
    image: "/products/classic.png",
    images: [
      "/products/classic.png",
      "/products/classic_hover.png",
      "/products/classic_detail1.png",
      "/products/classic_detail2.png",
    ],
    category: "businessman",
    subcategory: "classic",
    scent: {
      top: ["Bergamot", "Lavender"],
      middle: ["Geranium", "Sage"],
      base: ["Oak Moss", "Vetiver", "Tonka Bean"],
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
    images: [
      "/products/weekend.png",
      "/products/weekend_hover.png",
      "/products/weekend_detail1.png",
      "/products/weekend_detail2.png",
    ],
    category: "businessman",
    subcategory: "weekend",
    scent: {
      top: ["Grapefruit", "Bergamot", "Juniper Berry"],
      middle: ["Lavender", "Sage", "Green Tea Accord"],
      base: ["Vetiver", "Patchouli", "Kashmir Wood"],
    },
    description: "Şehirli, modern, hafta sonlarının keyfini huzurla çıkaran bir stil",
    family: "Amber, Musk, Spicy",
  },

  // BUSINESSMAN - ELEGANT
  {
    id: "elegant",
    name: "Elegant",
    collection: "BUSINESSMAN",
    price: 1250,
    ml: 50,
    image: "/products/elegant.png",
    images: [
      "/products/elegant.png",
      "/products/elegant_hover.png",
      "/products/elegant_detail1.png",
      "/products/elegant_detail2.png",
    ],
    category: "businessman",
    subcategory: "elegant",
    scent: {
      top: ["Bergamot", "Pink Pepper", "Lavender"],
      middle: ["Violet Leaves", "Iris", "Sage"],
      base: ["Sandalwood", "Vetiver", "Amber", "Musk"],
    },
    description: "Sofistike, zarif ve entelektüel",
    family: "Woody, Aromatic, Powdery",
  },

  // BUSINESSMAN - AVANT-GARDE
  {
    id: "avantgarde",
    name: "Avant-garde",
    collection: "BUSINESSMAN",
    price: 1250,
    ml: 50,
    image: "/products/avantgarde.png",
    images: [
      "/products/avantgarde.png",
      "/products/avantgarde_hover.png",
      "/products/avantgarde_detail1.png",
      "/products/avantgarde_detail2.png",
    ],
    category: "businessman",
    subcategory: "avantgarde",
    scent: {
      top: ["Black Pepper", "Ginger", "Bergamot", "Cardamom"],
      middle: ["Incense", "Suede", "Cocoa", "Sage", "Cedar"],
      base: ["Vetiver", "Amber", "Musk", "Labdanum", "Oud"],
    },
    description: "Yaratıcı, vizyoner, cesur",
    family: "Woody, Spicy",
  },

  // BUSINESSMAN - HOLIDAY
  {
    id: "holiday",
    name: "Holiday",
    collection: "BUSINESSMAN",
    price: 1250,
    ml: 50,
    image: "/products/holiday.png",
    images: [
      "/products/holiday.png",
      "/products/holiday_hover.png",
      "/products/holiday_detail1.png",
      "/products/holiday_detail2.png",
    ],
    category: "businessman",
    subcategory: "holiday",
    scent: {
      top: ["Lemon", "Mint", "Green Apple", "Marine Accord"],
      middle: ["Lavender", "Ginger", "Geranium"],
      base: ["Cedar", "Amber", "White Musk"],
    },
    description: "Hayatı dolu dolu yaşayan, özgür ruhlu ve enerjik iş adamı",
    family: "Aquatic, Narenciye, Aromatik",
  },

  // SMARTWOMAN - MYSTERY
  {
    id: "mystery",
    name: "Mystery",
    collection: "SMARTWOMAN",
    price: 1250,
    ml: 50,
    image: "/products/mystery.png",
    images: [
      "/products/mystery1.png",
      "/products/mystery2.png",
      "/products/mystery_hover.png",
      "/products/mystery4.png",
    ],
    category: "smartwoman",
    subcategory: "mystery",
    scent: {
      top: ["Pink Pepper", "Silkwood Blossom", "Jasmine Sambac"],
      middle: ["Whipped Cream", "Vanilla", "Chestnut"],
      base: ["Sandalwood", "Cashmere Wood"],
    },
    description: "Gecenin gizemini taşıyan, sofistike ve büyüleyici",
    family: "Vanilla Woody",
  },

  // SMARTWOMAN - CELEBRITY
  {
    id: "celebrity",
    name: "Celebrity",
    collection: "SMARTWOMAN",
    price: 1250,
    ml: 50,
    image: "/products/celebrity.png",
    images: [
      "/products/celebrity1.png",
      "/products/celebrity2.png",
      "/products/celebrity_hover.png",
      "/products/celebrity4.png",
    ],
    category: "smartwoman",
    subcategory: "celebrity",
    scent: {
      top: ["Saffron", "Jasmin"],
      middle: ["Amberwood", "Ambergris"],
      base: ["Fir Resin", "Cedar"],
    },
    description: "Işıltılı, karizmatik ve göz alıcı",
    family: "Oriental",
  },

  // SMARTWOMAN - MAJESTY
  {
    id: "majesty",
    name: "Majesty",
    collection: "SMARTWOMAN",
    price: 1250,
    ml: 50,
    image: "/products/majesty.png",
    images: [
      "/products/majesty1.png",
      "/products/majesty2.png",
      "/products/majesty_hover.png",
      "/products/majesty4.png",
    ],
    category: "smartwoman",
    subcategory: "majesty",
    scent: {
      top: ["Pear", "Rose", "Lavender"],
      middle: ["Ylang Ylang", "Jasmine"],
      base: ["Vanilla", "Musk", "Moss"],
    },
    description: "Asil, güçlü ve etkileyici",
    family: "Floral Fruity",
  },

  // SMARTWOMAN - DREAMY
  {
    id: "dreamy",
    name: "Dreamy",
    collection: "SMARTWOMAN",
    price: 1250,
    ml: 50,
    image: "/products/dreamy.png",
    images: [
      "/products/dreamy1.png",
      "/products/dreamy2.png",
      "/products/dreamy_hover.png",
      "/products/dreamy4.png",
    ],
    category: "smartwoman",
    subcategory: "dreamy",
    scent: {
      top: ["Pitahaya"],
      middle: ["Red Peony", "Frangipani"],
      base: ["Vanilla", "Patchouli"],
    },
    description: "Hayalperest, romantik ve zarif",
    family: "Floral",
  },

  // SMARTWOMAN - SHINY
  {
    id: "shiny",
    name: "Shiny",
    collection: "SMARTWOMAN",
    price: 1250,
    ml: 50,
    image: "/products/shiny.png",
    images: [
      "/products/shiny1.png",
      "/products/shiny2.png",
      "/products/shiny_hover.png",
      "/products/shiny4.png",
    ],
    category: "smartwoman",
    subcategory: "shiny",
    scent: {
      top: ["Lavender", "Mandarin Orange", "Black Currant", "Petitgrain"],
      middle: ["Lavender", "Orange Blossom", "Jasmine"],
      base: ["Madagascar Vanilla", "Musk", "Cedar", "Ambergris"],
    },
    description: "Enerjik, parlak ve canlı",
    family: "Citrus Fougere",
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
