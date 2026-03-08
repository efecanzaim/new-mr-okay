import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smartwoman Koleksiyonu | Mr. Okay Beauty",
  description:
    "Her notada zarif özgüven. Kendi kaderini şekillendiren kadınlar için tasarlanmış kokular. Smartwoman Koleksiyonu ile tanışın.",
  keywords: [
    "Smartwoman parfüm koleksiyonu",
    "Kadın parfümü",
    "Niş kadın parfümü",
    "Mystery parfüm",
    "Celebrity parfüm",
    "Majesty parfüm",
    "Dreamy parfüm",
    "Shiny parfüm",
  ],
  openGraph: {
    title: "Smartwoman Koleksiyonu | Mr. Okay Beauty",
    description:
      "Her notada zarif özgüven. Kendi kaderini şekillendiren kadınlar için tasarlanmış kokular.",
    images: [
      {
        url: "/images/smartwoman_banner.jpg",
        width: 1200,
        height: 630,
        alt: "Mr. Okay Beauty Smartwoman Koleksiyonu",
      },
    ],
    type: "website",
  },
};

export default function SmartwomanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
