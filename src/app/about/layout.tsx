import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | Mr. Okay Beauty",
  description:
    "Mr. Okay Beauty'nin doğuşunu, felsefesini ve zamansız kokuların ardındaki vizyonu keşfedin.",
  keywords: [
    "Mr. Okay hakkında",
    "Mr. Okay Beauty hakkında",
    "Niş parfüm markası",
    "Parfüm tasarımcısı",
    "Türk parfüm markası",
    "İstanbul merkezli parfümeri",
    "Parfüm ustası",
    "Koku tasarımı",
    "Parfüm markası hikâyesi",
  ],
  openGraph: {
    title: "Hakkımızda | Mr. Okay Beauty",
    description:
      "Mr. Okay Beauty'nin doğuşunu, felsefesini ve zamansız kokuların ardındaki vizyonu keşfedin.",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
