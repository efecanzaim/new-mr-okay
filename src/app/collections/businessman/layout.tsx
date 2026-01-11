import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Businessman Koleksiyonu",
  description:
    "Mr Okay Businessman Koleksiyonu. Modern iş insanı için tasarlanmış sofistike ve güçlü kokular. Classic, Weekend, Elegant, Avant-garde ve Holiday parfümleri.",
  keywords: [
    "businessman parfüm",
    "erkek parfümü",
    "ofis parfümü",
    "iş parfümü",
    "classic parfüm",
    "elegant parfüm",
    "weekend parfüm",
    "avantgarde parfüm",
    "holiday parfüm",
  ],
  openGraph: {
    title: "Businessman Koleksiyonu | Mr Okay",
    description:
      "Modern iş insanı için tasarlanmış sofistike ve güçlü kokular.",
    images: [
      {
        url: "/images/businessman_hero.png",
        width: 1200,
        height: 630,
        alt: "Mr Okay Businessman Koleksiyonu",
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
