import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { SiteProvider, useSite } from './context/SiteContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Disclaimer from './pages/Disclaimer';
import Admin from './pages/Admin';

// Scroll to top on route change and track page views
function ScrollToTop() {
  const { pathname } = useLocation();
  const { trackPageView } = useSite();
  const trackPageViewRef = useRef(trackPageView);
  const lastPathRef = useRef<string | null>(null);

  // Keep the ref updated
  useEffect(() => {
    trackPageViewRef.current = trackPageView;
  }, [trackPageView]);

  useEffect(() => {
    // Only run if pathname actually changed
    if (lastPathRef.current === pathname) return;
    lastPathRef.current = pathname;

    // Scroll to top
    window.scrollTo(0, 0);
    
    // Track page view (delayed to avoid render issues)
    const timer = setTimeout(() => {
      const pageName = pathname === '/' ? 'Home' : pathname.replace('/', '').replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      trackPageViewRef.current(pageName);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

// Layout wrapper to conditionally show navbar/footer
function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const isAdminPage = pathname === '/admin';

  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollToTop />
      {!isAdminPage && <Navbar />}
      {children}
      {!isAdminPage && <Footer />}
      {!isAdminPage && <WhatsAppButton />}
    </div>
  );
}

function AppRoutes() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function App() {
  return (
    <SiteProvider>
      <AppRoutes />
    </SiteProvider>
  );
}

export default App;
