import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Parfüm dünyasından haberler, ipuçları ve rehberler. Koku katmanlama, parfüm seçimi ve bakım hakkında uzman önerileri.",
  keywords: [
    "parfüm blog",
    "koku rehberi",
    "parfüm ipuçları",
    "koku katmanlama",
    "parfüm nasıl seçilir",
    "erkek parfüm önerileri",
  ],
  openGraph: {
    title: "Blog | Mr Okay",
    description:
      "Parfüm dünyasından haberler, ipuçları ve rehberler.",
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
