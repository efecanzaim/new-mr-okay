import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sepetim",
  description: "Mr Okay alışveriş sepetiniz. Seçtiğiniz parfümleri inceleyin ve siparişinizi tamamlayın.",
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
