import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from 'lucide-react';
import { useSite } from '../context/SiteContext';

const footerLinks = {
  services: [
    { name: 'Credit Card Bill Management', path: '/services' },
    { name: 'Payment Planning', path: '/services' },
    { name: 'Financial Consulting', path: '/services' },
    { name: 'Debt Optimization', path: '/services' },
  ],
  company: [
    { name: 'About Us', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ],
  resources: [
    { name: 'Financial Tips Blog', path: '/' },
    { name: 'Payment Calculator', path: '/' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Support Center', path: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Disclaimer', path: '/disclaimer' },
  ],
};

const socialLinks = [
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
];

export default function Footer() {
  const { settings } = useSite();
  
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                {settings.siteName.split(/(?=[A-Z])/).map((part, index) => 
                  index === 0 ? part : <span key={index} className="gradient-text">{part}</span>
                )}
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Your trusted partner in credit card bill management and financial assistance. 
              We help you achieve financial clarity and peace of mind.
            </p>
            <div className="space-y-3">
              <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-indigo-500" />
                {settings.email}
              </a>
              <a href={`tel:${settings.phone.replace(/\D/g, '')}`} className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-indigo-500" />
                {settings.phone}
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-indigo-500" />
                {settings.address}
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5 text-green-500" />
              <span className="text-sm">SSL Secured Platform</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5 text-blue-500" />
              <span className="text-sm">GDPR-Aligned Data Practices</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5 text-purple-500" />
              <span className="text-sm">Privacy-First Infrastructure</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-5 h-5 text-indigo-500" />
              <span className="text-sm">Confidential Client Handling</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {settings.siteName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/disclaimer" className="text-gray-500 hover:text-white text-sm transition-colors">
              Disclaimer
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
