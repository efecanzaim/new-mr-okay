import { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "Mr Okay ile iletişime geçin. Sorularınız, önerileriniz veya özel siparişleriniz için bize ulaşın.",
  keywords: [
    "Mr Okay iletişim",
    "parfüm mağaza",
    "müşteri hizmetleri",
    "sipariş",
    "destek",
  ],
  openGraph: {
    title: "İletişim | Mr Okay",
    description:
      "Mr Okay ile iletişime geçin. Sorularınız için bize ulaşın.",
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
