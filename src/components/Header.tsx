import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteInfoAPI } from '../services/api';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [siteName, setSiteName] = useState('RotateWise');
  const [siteLogo, setSiteLogo] = useState('');
  const location = useLocation();

  // Load site info from API
  useEffect(() => {
    const loadSiteInfo = async () => {
      try {
        const response = await siteInfoAPI.get();
        setSiteName(response.siteInfo.siteName || 'RotateWise');
        setSiteLogo(response.siteInfo.logo || '');
      } catch {
        // Fallback to localStorage for development
        const saved = localStorage.getItem('siteInfo');
        if (saved) {
          const siteInfo = JSON.parse(saved);
          setSiteName(siteInfo.siteName || 'RotateWise');
          setSiteLogo(siteInfo.logo || '');
        }
      }
    };
    loadSiteInfo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-gray-900/5 py-3'
          : isHomePage
          ? 'bg-transparent py-5'
          : 'bg-white/90 backdrop-blur-xl py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            {siteLogo ? (
              <img 
                src={siteLogo} 
                alt={siteName} 
                className="h-10 max-w-[180px] object-contain transition-all duration-300 group-hover:scale-105"
              />
            ) : (
              <>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                  isScrolled || !isHomePage
                    ? 'bg-gradient-to-br from-indigo-500 to-purple-600'
                    : 'bg-white/20 backdrop-blur-sm'
                }`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className={`text-xl font-bold transition-colors duration-300 ${
                  isScrolled || !isHomePage ? 'text-gray-900' : 'text-white'
                }`}>
                  {siteName}
                </span>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Solutions', id: 'solutions' },
              { label: 'Features', id: 'features' },
              { label: 'How It Works', id: 'how-it-works' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                  isScrolled || !isHomePage
                    ? 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
            <Link
              to="/about"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                isScrolled || !isHomePage
                  ? 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              About
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                isScrolled || !isHomePage
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5'
                  : 'bg-white text-gray-900 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              Get Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled || !isHomePage
                ? 'text-gray-700 hover:bg-gray-100'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fadeInDown">
            <div className={`rounded-2xl p-4 ${
              isScrolled || !isHomePage
                ? 'bg-gray-50'
                : 'bg-white/10 backdrop-blur-xl'
            }`}>
              <div className="space-y-1">
                {[
                  { label: 'Solutions', id: 'solutions' },
                  { label: 'Features', id: 'features' },
                  { label: 'How It Works', id: 'how-it-works' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isScrolled || !isHomePage
                        ? 'text-gray-700 hover:bg-white hover:text-indigo-600'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                <Link
                  to="/about"
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isScrolled || !isHomePage
                      ? 'text-gray-700 hover:bg-white hover:text-indigo-600'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  About
                </Link>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200/20">
                <Link
                  to="/contact"
                  className="block w-full px-6 py-3 text-center text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                >
                  Get Free Consultation
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
