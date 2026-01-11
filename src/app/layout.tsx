import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import Providers from "@/components/Providers";

const siteUrl = "https://mrokay.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mr Okay | Lüks Erkek Parfümleri",
    template: "%s | Mr Okay",
  },
  description:
    "Sofistike erkekler için özenle hazırlanmış eşsiz kokular. Mr Okay - Zarafetin duyularla buluştuğu yer. Businessman koleksiyonu ile fark yaratın.",
  keywords: [
    "lüks parfüm",
    "erkek parfümü",
    "businessman parfüm",
    "premium koku",
    "Mr Okay",
    "tasarım parfüm",
    "özel koku",
    "hediye parfüm",
    "erkek hediye",
    "lüks hediye",
  ],
  authors: [{ name: "Mr Okay" }],
  creator: "Mr Okay",
  publisher: "Mr Okay",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Mr Okay | Lüks Erkek Parfümleri",
    description:
      "Sofistike erkekler için özenle hazırlanmış eşsiz kokular. Businessman koleksiyonu ile fark yaratın.",
    url: siteUrl,
    siteName: "Mr Okay",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mr Okay - Lüks Erkek Parfümleri",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr Okay | Lüks Erkek Parfümleri",
    description:
      "Sofistike erkekler için özenle hazırlanmış eşsiz kokular. Businessman koleksiyonu ile fark yaratın.",
    images: ["/images/og-image.jpg"],
    creator: "@mrokay",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "tr-TR": `${siteUrl}/tr`,
      "en-US": `${siteUrl}/en`,
      "de-DE": `${siteUrl}/de`,
      "fr-FR": `${siteUrl}/fr`,
      "ar-SA": `${siteUrl}/ar`,
    },
  },
  category: "parfüm",
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
