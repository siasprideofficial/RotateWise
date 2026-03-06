import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Globe } from 'lucide-react';
import { siteInfoAPI } from '../services/api';

interface FooterLink {
  id: number;
  label: string;
  url: string;
  is_external: boolean;
}

interface FooterSection {
  id: number;
  title: string;
  links: FooterLink[];
  enabled: boolean;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  enabled: boolean;
}

interface SiteInfoData {
  siteName: string;
  tagline: string;
  description: string;
  logo: string;
  copyright: string;
}

const defaultSiteInfo: SiteInfoData = {
  siteName: 'RotateWise',
  tagline: 'Smart Credit Card Loan Consultation',
  description: 'Expert credit card loan consultation services helping you make informed financial decisions with personalized guidance.',
  logo: '',
  copyright: '© 2024 RotateWise. All rights reserved.',
};

const defaultFooterSections: FooterSection[] = [
  {
    id: 1,
    title: 'Quick Links',
    enabled: true,
    links: [
      { id: 1, label: 'Home', url: '/', is_external: false },
      { id: 2, label: 'About Us', url: '/about', is_external: false },
      { id: 3, label: 'Contact', url: '/contact', is_external: false },
    ]
  },
  {
    id: 2,
    title: 'Services',
    enabled: true,
    links: [
      { id: 1, label: 'Credit Card Loans', url: '/contact', is_external: false },
      { id: 2, label: 'Debt Consolidation', url: '/contact', is_external: false },
      { id: 3, label: 'Financial Planning', url: '/contact', is_external: false },
    ]
  },
  {
    id: 3,
    title: 'Legal',
    enabled: true,
    links: [
      { id: 1, label: 'Privacy Policy', url: '/privacy-policy', is_external: false },
      { id: 2, label: 'Terms of Service', url: '/terms-of-service', is_external: false },
      { id: 3, label: 'Disclaimer', url: '/disclaimer', is_external: false },
    ]
  },
];

const defaultSocialLinks: SocialLink[] = [
  { id: 1, platform: 'facebook', url: 'https://facebook.com', enabled: true },
  { id: 2, platform: 'twitter', url: 'https://twitter.com', enabled: true },
  { id: 3, platform: 'linkedin', url: 'https://linkedin.com', enabled: true },
  { id: 4, platform: 'instagram', url: 'https://instagram.com', enabled: true },
];

const Footer = () => {
  const [siteInfo, setSiteInfo] = useState<SiteInfoData>(defaultSiteInfo);
  const [footerSections, setFooterSections] = useState<FooterSection[]>(defaultFooterSections);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(defaultSocialLinks);

  useEffect(() => {
    const loadSiteInfo = async () => {
      try {
        const response = await siteInfoAPI.get();
        setSiteInfo({
          siteName: response.siteInfo.siteName || defaultSiteInfo.siteName,
          tagline: response.siteInfo.tagline || defaultSiteInfo.tagline,
          description: response.siteInfo.description || defaultSiteInfo.description,
          logo: response.siteInfo.logo || '',
          copyright: response.siteInfo.copyright || defaultSiteInfo.copyright,
        });
        
        if (response.footerSections && response.footerSections.length > 0) {
          setFooterSections(response.footerSections);
        }
        
        if (response.socialLinks && response.socialLinks.length > 0) {
          setSocialLinks(response.socialLinks);
        }
      } catch {
        // Fallback to localStorage for development
        const saved = localStorage.getItem('siteInfo');
        if (saved) {
          const parsed = JSON.parse(saved);
          setSiteInfo({
            siteName: parsed.siteName || defaultSiteInfo.siteName,
            tagline: parsed.tagline || defaultSiteInfo.tagline,
            description: parsed.description || defaultSiteInfo.description,
            logo: parsed.logo || '',
            copyright: parsed.copyrightText || defaultSiteInfo.copyright,
          });
          if (parsed.footerSections) {
            setFooterSections(parsed.footerSections);
          }
          if (parsed.socialLinks) {
            setSocialLinks(parsed.socialLinks);
          }
        }
      }
    };
    loadSiteInfo();
  }, []);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook': return <Facebook className="w-5 h-5" />;
      case 'twitter': return <Twitter className="w-5 h-5" />;
      case 'linkedin': return <Linkedin className="w-5 h-5" />;
      case 'instagram': return <Instagram className="w-5 h-5" />;
      case 'youtube': return <Youtube className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const enabledSections = footerSections.filter(s => s.enabled);
  const enabledSocials = socialLinks.filter(s => s.enabled);

  return (
    <footer className="relative bg-[#0a2540] text-white overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className={`py-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-${2 + enabledSections.length} gap-8 lg:gap-12`}>
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              {siteInfo.logo ? (
                <img 
                  src={siteInfo.logo} 
                  alt={siteInfo.siteName} 
                  className="h-10 max-w-[180px] object-contain"
                />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold">{siteInfo.siteName}</span>
                </>
              )}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              {siteInfo.description}
            </p>
            
            {/* Social Links */}
            {enabledSocials.length > 0 && (
              <div className="flex items-center gap-3">
                {enabledSocials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 text-gray-400 hover:text-white"
                    aria-label={social.platform}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Dynamic Footer Sections */}
          {enabledSections.map((section) => (
            <div key={section.id}>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.id}>
                    {link.is_external ? (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        to={link.url}
                        className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              {siteInfo.copyright}
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Privacy
              </Link>
              <Link to="/terms-of-service" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Terms
              </Link>
              <Link to="/disclaimer" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
