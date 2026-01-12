import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sepet | Mr. Okay Beauty",
  description: "Seçtiğiniz Mr. Okay Beauty ürünlerini inceleyin ve alışverişinizi güvenle tamamlayın.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
