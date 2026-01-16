import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, Suspense, lazy, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Layout Components (loaded immediately - critical for FCP)
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyCTA } from "@/components/StickyCTA";
import { Toaster } from "@/components/ui/sonner";
import { ScrollProgress, GrainOverlay, CustomCursor } from "@/components/animations";

// Lazy load all pages for code splitting
const Home = lazy(() => import("@/pages/Home"));
const Services = lazy(() => import("@/pages/Services"));
const BarSetups = lazy(() => import("@/pages/BarSetups"));
const BarSetupDetail = lazy(() => import("@/pages/BarSetupDetail"));
const MolecularMixology = lazy(() => import("@/pages/MolecularMixology"));
const Menus = lazy(() => import("@/pages/Menus"));
const Packages = lazy(() => import("@/pages/Packages"));
const Gallery = lazy(() => import("@/pages/Gallery"));
const Reviews = lazy(() => import("@/pages/Reviews"));
const About = lazy(() => import("@/pages/About"));
const FAQs = lazy(() => import("@/pages/FAQs"));
const Contact = lazy(() => import("@/pages/Contact"));
const HashtagGenerator = lazy(() => import("@/pages/tools/HashtagGenerator"));
const DrinkGenerator = lazy(() => import("@/pages/tools/DrinkGenerator"));

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Loading skeleton for lazy pages
const PageLoader = memo(function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(0_0%_2%)]">
      <div className="text-center">
        <motion.div
          className="w-12 h-12 border-3 border-[hsl(352_33%_59%)] border-t-transparent rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-[hsl(40_20%_65%)] text-sm">Loading...</p>
      </div>
    </div>
  );
});

// Memoized Layout component
const Layout = memo(function Layout({ children }) {
  return (
    <div className="min-h-screen bg-noir">
      <ScrollProgress />
      <CustomCursor />
      <GrainOverlay opacity={0.025} />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <StickyCTA />
    </div>
  );
});

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/bar-setups" element={<BarSetups />} />
            <Route path="/bar-setups/:slug" element={<BarSetupDetail />} />
            <Route path="/molecular" element={<MolecularMixology />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tools/hashtag-generator" element={<HashtagGenerator />} />
            <Route path="/tools/drink-generator" element={<DrinkGenerator />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
