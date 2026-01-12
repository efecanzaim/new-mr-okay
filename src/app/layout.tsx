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
    default: "Mr. Okay | Niş ve Zamansız Parfümler",
    template: "%s | Mr. Okay",
  },
  description:
    "Sofistike kadınlar ve erkekler için tasarlanan niş parfümler. Mr. Okay Beauty, zamansız kokularla kişisel imzalar yaratır.",
  keywords: [
    "Mr. Okay",
    "Mr. Okay Beauty",
    "Erkek parfümü",
    "Kadın parfümü",
    "Businessman parfüm",
    "Smartwoman parfüm",
    "Tasarım parfüm",
    "Premium koku",
    "Özel koku",
    "Hediye parfüm",
    "Erkek hediye",
    "Kadın hediye",
    "Seyahat boy parfüm",
  ],
  authors: [{ name: "Mr. Okay Beauty" }],
  creator: "Mr. Okay Beauty",
  publisher: "Mr. Okay Beauty",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Mr. Okay | Niş ve Zamansız Parfümler",
    description:
      "Sofistike kadınlar ve erkekler için tasarlanan niş parfümler. Mr. Okay Beauty, zamansız kokularla kişisel imzalar yaratır.",
    url: siteUrl,
    siteName: "Mr. Okay Beauty",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mr. Okay – Sofistike Kadın ve Erkekler İçin Niş Parfümler",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr. Okay | Niş ve Zamansız Parfümler",
    description:
      "Sofistike kadınlar ve erkekler için tasarlanan niş parfümler. Mr. Okay Beauty, zamansız kokularla kişisel imzalar yaratır.",
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
