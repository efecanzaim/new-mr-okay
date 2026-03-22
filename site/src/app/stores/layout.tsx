import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mağazalar | Mr. Okay Beauty",
  description:
    "Mr. Okay Beauty mağazalarını keşfedin. Seçkin satış noktalarında zamansız parfüm koleksiyonlarımızla tanışın.",
  keywords: [
    "Mr. Okay mağazaları",
    "Niş parfüm satış noktaları",
    "Parfüm mağazası",
    "Parfüm satış noktaları",
    "İstanbul parfüm mağazası",
    "Ankara parfüm mağazası",
    "İzmir parfüm mağazası",
    "Adana parfüm mağazası",
    "Çanakkale parfüm mağazası",
  ],
  openGraph: {
    title: "Mağazalar | Mr. Okay Beauty",
    description:
      "Mr. Okay Beauty mağazalarını keşfedin. Seçkin satış noktalarında zamansız parfüm koleksiyonlarımızla tanışın.",
    type: "website",
  },
};

export default function StoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
