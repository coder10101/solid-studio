import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import IntroScreen from "./components/sections/IntroScreen";
import HeroSection from "./components/sections/HeroSection";
import StatementSection from "./components/sections/StatementSection";
import CollectionSection from "./components/sections/CollectionSection";
import ServicesSection from "./components/sections/ServicesSection";
import ProcessSection from "./components/sections/ProcessSection";
import InquiryModal from "./components/modals/InquiryModal";
import CollectionPage from "./components/pages/CollectionPage";
import ProductDetailPage from "./components/pages/ProductDetailPage";
import {
  collection,
  contactInfo,
  navLinks,
  processSteps,
  servicesData,
  statementData,
} from "./data/content";

export default function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [siteReady, setSiteReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState("a custom piece");
  const [route, setRoute] = useState<string>(() => window.location.hash || "#/");

  useEffect(() => {
    const handleHashChange = () => {
      const current = window.location.hash || "#/";
      setRoute(current);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      setIntroVisible(false);
      setSiteReady(true);
      return;
    }

    const readyTimer = window.setTimeout(() => setSiteReady(true), 1900);
    const finishTimer = window.setTimeout(() => setIntroVisible(false), 2600);

    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(finishTimer);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen || inquiryOpen || introVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, inquiryOpen, introVisible]);

  const openInquiry = (piece: string) => {
    setSelectedPiece(piece);
    setInquiryOpen(true);
  };

  const navigate = (path: string) => {
    window.location.hash = path;
    setRoute(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Determine current active page
  const isProductDetail = route.startsWith("#/collection/");
  const productSlug = isProductDetail
    ? route.replace("#/collection/", "").split("?")[0]
    : null;
  const isCollectionCatalog =
    route === "#/collection" || route.startsWith("#/collection?");

  return (
    <>
      {introVisible && <IntroScreen />}

      <div className={`site ${siteReady ? "site--ready" : ""}`}>
        <Header
          navLinks={navLinks}
          menuOpen={menuOpen}
          onToggleMenu={() => setMenuOpen((prev) => !prev)}
          onCloseMenu={() => setMenuOpen(false)}
          onOpenInquiry={openInquiry}
          currentRoute={route}
          onNavigate={navigate}
        />

        <main id="top">
          {isProductDetail && productSlug ? (
            <ProductDetailPage
              slug={productSlug}
              items={collection}
              onOpenInquiry={openInquiry}
              onNavigate={navigate}
            />
          ) : isCollectionCatalog ? (
            <CollectionPage
              items={collection}
              onOpenInquiry={openInquiry}
              onNavigate={navigate}
            />
          ) : (
            <>
              <HeroSection onNavigate={navigate} />

              <StatementSection
                indexLabel={statementData.indexLabel}
                lead={statementData.lead}
                paragraphs={statementData.paragraphs}
              />

              <CollectionSection
                items={collection}
                onOpenInquiry={openInquiry}
                onNavigate={navigate}
              />

              <ServicesSection
                services={servicesData}
                onOpenInquiry={openInquiry}
              />

              <ProcessSection steps={processSteps} />
            </>
          )}
        </main>

        <Footer contactInfo={contactInfo} />

        <InquiryModal
          isOpen={inquiryOpen}
          onClose={() => setInquiryOpen(false)}
          selectedPiece={selectedPiece}
          contactInfo={contactInfo}
        />
      </div>
    </>
  );
}
