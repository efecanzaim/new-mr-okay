import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mağazalarımız",
  description:
    "Mr Okay mağaza lokasyonlarını keşfedin. Türkiye genelinde premium parfüm deneyimi için en yakın mağazamızı bulun.",
  keywords: [
    "Mr Okay mağaza",
    "parfüm mağazası",
    "parfüm satış noktası",
    "İstanbul parfüm",
    "Ankara parfüm",
    "İzmir parfüm",
  ],
  openGraph: {
    title: "Mağazalarımız | Mr Okay",
    description:
      "Mr Okay mağaza lokasyonlarını keşfedin. En yakın mağazamızı bulun.",
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
