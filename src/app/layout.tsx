import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Mr Okay | Lüks Parfümeri",
  description:
    "Sofistike bireyler için özenle hazırlanmış eşsiz kokular. Mr Okay - Zarafetin duyularla buluştuğu yer.",
  keywords: [
    "lüks parfüm",
    "parfümeri",
    "koku",
    "kolonya",
    "Mr Okay",
    "tasarım kokular",
  ],
  openGraph: {
    title: "Mr Okay | Lüks Parfümeri",
    description:
      "Sofistike bireyler için özenle hazırlanmış eşsiz kokular.",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <html lang="tr">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            @font-face {
              font-family: 'Blacksword';
              src: url('${basePath}/fonts/Blacksword.otf') format('opentype');
              font-weight: normal;
              font-style: normal;
              font-display: swap;
            }

            @font-face {
              font-family: 'Avenir';
              src: url('${basePath}/fonts/Avenir.otf') format('truetype');
              font-weight: 400 700;
              font-style: normal;
              font-display: swap;
            }

            @font-face {
              font-family: 'AvenirThin';
              src: url('${basePath}/fonts/AvenirThin.ttf') format('truetype');
              font-weight: 200 400;
              font-style: normal;
              font-display: swap;
            }
          `
        }} />
      </head>
      <body className="bg-white text-black antialiased">
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
}
