import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Mr. Okay Beauty",
  description:
    "Parfüm dünyasına dair yazılar, koku kültürü ve tasarımına dair uzman bakış açısı: Mr. Okay Blog.",
  keywords: [
    "Parfüm blog",
    "Niş parfüm rehberi",
    "Koku kültürü",
    "Parfüm tasarımı",
    "Koku notaları",
    "Parfüm seçimi",
    "Parfüm uzmanı yazıları",
    "Kadın ve erkek parfümleri",
  ],
  openGraph: {
    title: "Blog | Mr. Okay Beauty",
    description:
      "Parfüm dünyasına dair yazılar, koku kültürü ve tasarımına dair uzman bakış açısı: Mr. Okay Blog.",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
