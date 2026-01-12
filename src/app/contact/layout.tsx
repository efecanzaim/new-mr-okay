import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Mr. Okay Beauty",
  description:
    "Sorularınız, önerileriniz veya işbirlikleri için Mr. Okay Beauty ekibiyle iletişime geçebilirsiniz.",
  keywords: [
    "Mr. Okay iletişim",
    "Mr. Okay iletişim bilgileri",
    "Mr. Okay Beauty iletişim",
    "Niş parfüm markası iletişim",
    "Parfüm mağazası iletişim",
    "Müşteri destek hattı",
    "Parfüm danışmanlığı",
    "sipariş",
    "destek",
  ],
  openGraph: {
    title: "İletişim | Mr. Okay Beauty",
    description:
      "Sorularınız, önerileriniz veya işbirlikleri için Mr. Okay Beauty ekibiyle iletişime geçebilirsiniz.",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
