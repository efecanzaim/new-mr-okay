import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import Providers from "@/components/Providers";

const GA_MEASUREMENT_ID = "G-V1DMQ3GKR1";

const siteUrl = "https://mrokayparfum.com";

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
  other: {
    "fb:app_id": "YOUR_FACEBOOK_APP_ID", // Facebook Developers'dan alınan App ID
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

// JSON-LD Structured Data
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Mr. Okay Beauty",
  "alternateName": "Mr. Okay",
  "url": "https://mrokayparfum.com",
  "logo": "https://mrokayparfum.com/images/logo.png",
  "description": "Sofistike kadınlar ve erkekler için tasarlanan niş parfümler. Mr. Okay Beauty, zamansız kokularla kişisel imzalar yaratır.",
  "foundingDate": "2024",
  "sameAs": [
    "https://www.instagram.com/mr.okayparfum/",
    "https://www.facebook.com/mrokay",
    "https://www.tiktok.com/@mrokay"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "availableLanguage": ["Turkish", "English", "German", "French", "Arabic"]
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Mr. Okay Beauty",
  "url": "https://mrokayparfum.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://mrokayparfum.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Mr. Okay Beauty",
  "image": "https://mrokayparfum.com/images/logo.png",
  "url": "https://mrokayparfum.com",
  "description": "Niş parfümler ve özel kokular sunan premium parfüm markası",
  "priceRange": "$$",
  "servesCuisine": "Parfüm",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.0082",
    "longitude": "28.9784"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  }
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
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
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
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        {/* Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            if(!window._fbPixelLoaded){
              window._fbPixelLoaded=true;
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '26407586398877003');
              fbq('track', 'PageView');
            }
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=26407586398877003&ev=PageView&noscript=1"
          />
        </noscript>
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
