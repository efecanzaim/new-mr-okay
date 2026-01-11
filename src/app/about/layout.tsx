import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Mr Okay'in hikayesini keşfedin. 1920'lerden bu yana lüks parfümeri sanatını sürdüren, İstanbul merkezli bir miras markası.",
  keywords: [
    "Mr Okay hakkında",
    "parfüm markası",
    "lüks parfüm tarihi",
    "İstanbul parfümeri",
    "parfüm ustası",
  ],
  openGraph: {
    title: "Hakkımızda | Mr Okay",
    description:
      "Mr Okay'in hikayesini keşfedin. 1920'lerden bu yana lüks parfümeri sanatını sürdüren bir miras markası.",
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
