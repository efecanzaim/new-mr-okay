import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Businessman Koleksiyonu | Mr. Okay Beauty",
  description:
    "İş, şehir ve özgürlük arasında dengelenmiş bir koku evreni. Businessman Koleksiyonu, modern erkeğin farklı anları için tasarlandı.",
  keywords: [
    "Businessman parfüm koleksiyonu",
    "Erkek parfümü",
    "Niş erkek parfümü",
    "Ofis parfümü",
    "İş hayatı parfümü",
    "Classic parfüm",
    "Elegant parfüm",
    "Weekend parfüm",
    "Avant-garde parfüm",
    "Holiday parfüm",
  ],
  openGraph: {
    title: "Businessman Koleksiyonu | Mr. Okay Beauty",
    description:
      "İş, şehir ve özgürlük arasında dengelenmiş bir koku evreni. Businessman Koleksiyonu, modern erkeğin farklı anları için tasarlandı.",
    images: [
      {
        url: "/images/businessman_hero.png",
        width: 1200,
        height: 630,
        alt: "Mr. Okay Beauty Businessman Koleksiyonu",
      },
    ],
    type: "website",
  },
};

export default function BusinessmanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
