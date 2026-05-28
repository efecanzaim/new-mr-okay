import HeroSection from "@/components/HeroSection";
import EditorialBanner from "@/components/EditorialBanner";
import ProductShowcase from "@/components/ProductShowcase";
import SmartWomanBanner from "@/components/SmartWomanBanner";
import CollectionBanner from "@/components/CollectionBanner";
import BrandStory from "@/components/BrandStory";

export default function Home() {
  return (
    <>
      {/* Hero sticks; sections slide over it */}
      <div style={{ position: "sticky", top: 0, zIndex: 0 }}>
        <HeroSection />
      </div>

      <div style={{ position: "relative", zIndex: 1, background: "#faf9f6" }}>
        <EditorialBanner />
        <ProductShowcase category="businessman" titleKey="showcase.subtitle" />
        <SmartWomanBanner />
        <ProductShowcase category="smartwoman" titleKey="showcase.smartwoman.subtitle" />
        <CollectionBanner />
        <BrandStory />
      </div>
    </>
  );
}
