import { useState, useEffect, useRef } from 'react';
import { Save, Plus, Trash2, Edit3, X, Check, Building2, Phone, Mail, MapPin, Clock, Globe, Facebook, Twitter, Linkedin, Instagram, Youtube, ExternalLink, Image, Info, Upload } from 'lucide-react';

interface ContactInfo {
  id: string;
  type: 'phone' | 'email' | 'address' | 'hours' | 'custom';
  icon: string;
  label: string;
  value: string;
  link?: string;
  enabled: boolean;
}

interface FooterLink {
  id: string;
  label: string;
  url: string;
  isExternal: boolean;
}

interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
  enabled: boolean;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  enabled: boolean;
}

interface SiteInfo {
  siteName: string;
  tagline: string;
  description: string;
  logo?: string;
  contactInfo: ContactInfo[];
  footerSections: FooterSection[];
  socialLinks: SocialLink[];
  copyrightText: string;
}

const defaultSiteInfo: SiteInfo = {
  siteName: 'RotateWise',
  tagline: 'Smart Credit Card Loan Consultation',
  description: 'Expert guidance for your credit card loan needs. We help you find the best loan solutions with personalized consultation services.',
  contactInfo: [
    { id: '1', type: 'phone', icon: 'phone', label: 'Phone', value: '+1 (555) 123-4567', link: 'tel:+15551234567', enabled: true },
    { id: '2', type: 'email', icon: 'email', label: 'Email', value: 'contact@rotatewise.com', link: 'mailto:contact@rotatewise.com', enabled: true },
    { id: '3', type: 'address', icon: 'address', label: 'Address', value: '123 Financial District, New York, NY 10004', enabled: true },
    { id: '4', type: 'hours', icon: 'hours', label: 'Business Hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM', enabled: true },
  ],
  footerSections: [
    {
      id: '1',
      title: 'Quick Links',
      enabled: true,
      links: [
        { id: '1', label: 'Home', url: '/', isExternal: false },
        { id: '2', label: 'About Us', url: '/about', isExternal: false },
        { id: '3', label: 'Contact', url: '/contact', isExternal: false },
      ]
    },
    {
      id: '2',
      title: 'Services',
      enabled: true,
      links: [
        { id: '1', label: 'Credit Card Loans', url: '/contact', isExternal: false },
        { id: '2', label: 'Debt Consolidation', url: '/contact', isExternal: false },
        { id: '3', label: 'Financial Planning', url: '/contact', isExternal: false },
      ]
    },
    {
      id: '3',
      title: 'Legal',
      enabled: true,
      links: [
        { id: '1', label: 'Privacy Policy', url: '/privacy-policy', isExternal: false },
        { id: '2', label: 'Terms of Service', url: '/terms-of-service', isExternal: false },
        { id: '3', label: 'Disclaimer', url: '/disclaimer', isExternal: false },
        { id: '4', label: 'Admin Login', url: '/admin', isExternal: false },
      ]
    },
  ],
  socialLinks: [
    { id: '1', platform: 'facebook', url: 'https://facebook.com', enabled: true },
    { id: '2', platform: 'twitter', url: 'https://twitter.com', enabled: true },
    { id: '3', platform: 'linkedin', url: 'https://linkedin.com', enabled: true },
    { id: '4', platform: 'instagram', url: 'https://instagram.com', enabled: true },
    { id: '5', platform: 'youtube', url: 'https://youtube.com', enabled: false },
  ],
  copyrightText: '© 2024 RotateWise. All rights reserved.',
};

const iconOptions = [
  { value: 'phone', label: 'Phone', icon: Phone },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'address', label: 'Address', icon: MapPin },
  { value: 'hours', label: 'Hours', icon: Clock },
  { value: 'globe', label: 'Website', icon: Globe },
];

const socialPlatforms = [
  { value: 'facebook', label: 'Facebook', icon: Facebook },
  { value: 'twitter', label: 'Twitter/X', icon: Twitter },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'youtube', label: 'YouTube', icon: Youtube },
];

export default function AdminSiteInfo() {
  const [siteInfo, setSiteInfo] = useState<SiteInfo>(defaultSiteInfo);
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'footer' | 'social'>('general');
  const [editingContact, setEditingContact] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editingLink, setEditingLink] = useState<{ sectionId: string; linkId: string } | null>(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showAddLink, setShowAddLink] = useState<string | null>(null);
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showLogoInfo, setShowLogoInfo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newContact, setNewContact] = useState<Partial<ContactInfo>>({
    type: 'phone',
    icon: 'phone',
    label: '',
    value: '',
    link: '',
    enabled: true,
  });

  const [newSection, setNewSection] = useState({ title: '', enabled: true });
  const [newLink, setNewLink] = useState({ label: '', url: '', isExternal: false });
  const [newSocial, setNewSocial] = useState({ platform: 'facebook', url: '', enabled: true });

  useEffect(() => {
    const saved = localStorage.getItem('siteInfo');
    if (saved) {
      setSiteInfo(JSON.parse(saved));
    } else {
      localStorage.setItem('siteInfo', JSON.stringify(defaultSiteInfo));
    }
  }, []);

  const saveSiteInfo = (updatedInfo: SiteInfo) => {
    setSiteInfo(updatedInfo);
    localStorage.setItem('siteInfo', JSON.stringify(updatedInfo));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // Contact Info Functions
  const addContact = () => {
    if (!newContact.label || !newContact.value) return;
    const contact: ContactInfo = {
      id: Date.now().toString(),
      type: newContact.type as ContactInfo['type'],
      icon: newContact.icon || 'phone',
      label: newContact.label,
      value: newContact.value,
      link: newContact.link,
      enabled: true,
    };
    saveSiteInfo({ ...siteInfo, contactInfo: [...siteInfo.contactInfo, contact] });
    setNewContact({ type: 'phone', icon: 'phone', label: '', value: '', link: '', enabled: true });
    setShowAddContact(false);
  };

  const updateContact = (id: string, updates: Partial<ContactInfo>) => {
    const updatedContacts = siteInfo.contactInfo.map(c =>
      c.id === id ? { ...c, ...updates } : c
    );
    saveSiteInfo({ ...siteInfo, contactInfo: updatedContacts });
  };

  const deleteContact = (id: string) => {
    if (confirm('Are you sure you want to delete this contact info?')) {
      saveSiteInfo({ ...siteInfo, contactInfo: siteInfo.contactInfo.filter(c => c.id !== id) });
    }
  };

  // Footer Section Functions
  const addSection = () => {
    if (!newSection.title) return;
    const section: FooterSection = {
      id: Date.now().toString(),
      title: newSection.title,
      links: [],
      enabled: true,
    };
    saveSiteInfo({ ...siteInfo, footerSections: [...siteInfo.footerSections, section] });
    setNewSection({ title: '', enabled: true });
    setShowAddSection(false);
  };

  const updateSection = (id: string, updates: Partial<FooterSection>) => {
    const updatedSections = siteInfo.footerSections.map(s =>
      s.id === id ? { ...s, ...updates } : s
    );
    saveSiteInfo({ ...siteInfo, footerSections: updatedSections });
  };

  const deleteSection = (id: string) => {
    if (confirm('Are you sure you want to delete this footer section?')) {
      saveSiteInfo({ ...siteInfo, footerSections: siteInfo.footerSections.filter(s => s.id !== id) });
    }
  };

  // Footer Link Functions
  const addLink = (sectionId: string) => {
    if (!newLink.label || !newLink.url) return;
    const link: FooterLink = {
      id: Date.now().toString(),
      ...newLink,
    };
    const updatedSections = siteInfo.footerSections.map(s =>
      s.id === sectionId ? { ...s, links: [...s.links, link] } : s
    );
    saveSiteInfo({ ...siteInfo, footerSections: updatedSections });
    setNewLink({ label: '', url: '', isExternal: false });
    setShowAddLink(null);
  };

  const updateLink = (sectionId: string, linkId: string, updates: Partial<FooterLink>) => {
    const updatedSections = siteInfo.footerSections.map(s =>
      s.id === sectionId
        ? { ...s, links: s.links.map(l => (l.id === linkId ? { ...l, ...updates } : l)) }
        : s
    );
    saveSiteInfo({ ...siteInfo, footerSections: updatedSections });
  };

  const deleteLink = (sectionId: string, linkId: string) => {
    const updatedSections = siteInfo.footerSections.map(s =>
      s.id === sectionId ? { ...s, links: s.links.filter(l => l.id !== linkId) } : s
    );
    saveSiteInfo({ ...siteInfo, footerSections: updatedSections });
  };

  // Social Link Functions
  const addSocial = () => {
    if (!newSocial.url) return;
    const social: SocialLink = {
      id: Date.now().toString(),
      ...newSocial,
    };
    saveSiteInfo({ ...siteInfo, socialLinks: [...siteInfo.socialLinks, social] });
    setNewSocial({ platform: 'facebook', url: '', enabled: true });
    setShowAddSocial(false);
  };

  const updateSocial = (id: string, updates: Partial<SocialLink>) => {
    const updatedSocials = siteInfo.socialLinks.map(s =>
      s.id === id ? { ...s, ...updates } : s
    );
    saveSiteInfo({ ...siteInfo, socialLinks: updatedSocials });
  };

  const deleteSocial = (id: string) => {
    if (confirm('Are you sure you want to delete this social link?')) {
      saveSiteInfo({ ...siteInfo, socialLinks: siteInfo.socialLinks.filter(s => s.id !== id) });
    }
  };

  const getContactIcon = (iconType: string) => {
    switch (iconType) {
      case 'phone': return <Phone className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'address': return <MapPin className="w-5 h-5" />;
      case 'hours': return <Clock className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Site Info</h1>
          <p className="text-gray-600 mt-1">Manage website information, contact details, and footer content</p>
        </div>
        {saveSuccess && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Changes saved!</span>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-4 overflow-x-auto">
          {[
            { id: 'general', label: 'General', icon: Building2 },
            { id: 'contact', label: 'Contact Info', icon: Phone },
            { id: 'footer', label: 'Footer Sections', icon: Globe },
            { id: 'social', label: 'Social Links', icon: ExternalLink },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* General Tab */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h2>
          <div className="space-y-6 max-w-2xl">
            {/* Logo Section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <label className="block text-sm font-medium text-gray-700">Website Logo</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLogoInfo(!showLogoInfo)}
                    className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-200 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                  {showLogoInfo && (
                    <div className="absolute left-0 top-7 z-50 w-80 p-4 bg-white rounded-xl shadow-xl border border-gray-200 animate-fadeInUp">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                          <Image className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Logo Guidelines</h4>
                          <ul className="text-sm text-gray-600 space-y-1.5">
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                              <span><strong>Recommended Size:</strong> 200 x 50 pixels</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                              <span><strong>Max Size:</strong> 300 x 80 pixels</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                              <span><strong>Format:</strong> PNG, SVG, or WebP (transparent background preferred)</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                              <span><strong>File Size:</strong> Under 100KB for best performance</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                              <span><strong>Aspect Ratio:</strong> Horizontal (4:1 or 3:1 works best)</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowLogoInfo(false)}
                        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Logo Preview */}
              <div className="mb-4">
                <div className="flex items-center gap-6">
                  <div className="w-48 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                    {siteInfo.logo ? (
                      <img
                        src={siteInfo.logo}
                        alt="Logo Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <Image className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                        <span className="text-xs text-gray-400">No logo set</span>
                      </div>
                    )}
                  </div>
                  {siteInfo.logo && (
                    <button
                      onClick={() => saveSiteInfo({ ...siteInfo, logo: '' })}
                      className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Logo
                    </button>
                  )}
                </div>
              </div>

              {/* Logo URL Input */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Logo URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={siteInfo.logo || ''}
                      onChange={(e) => saveSiteInfo({ ...siteInfo, logo: e.target.value })}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">Enter the URL of your logo image or use file upload below.</p>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">Or Upload Logo File</label>
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/svg+xml,image/webp,image/jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            saveSiteInfo({ ...siteInfo, logo: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                    >
                      <Upload className="w-4 h-4" />
                      Choose File
                    </button>
                    <span className="text-xs text-gray-500">PNG, SVG, WebP, or JPEG (max 100KB)</span>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Website Name</label>
              <input
                type="text"
                value={siteInfo.siteName}
                onChange={(e) => saveSiteInfo({ ...siteInfo, siteName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter website name"
              />
              <p className="mt-2 text-sm text-gray-500">This name will appear in the header, footer, and throughout the website.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
              <input
                type="text"
                value={siteInfo.tagline}
                onChange={(e) => saveSiteInfo({ ...siteInfo, tagline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter tagline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={siteInfo.description}
                onChange={(e) => saveSiteInfo({ ...siteInfo, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                placeholder="Enter website description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
              <input
                type="text"
                value={siteInfo.copyrightText}
                onChange={(e) => saveSiteInfo({ ...siteInfo, copyrightText: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter copyright text"
              />
            </div>
          </div>
        </div>
      )}

      {/* Contact Info Tab */}
      {activeTab === 'contact' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddContact(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Contact Info
            </button>
          </div>

          {/* Add Contact Modal */}
          {showAddContact && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add New Contact Info</h3>
                <button onClick={() => setShowAddContact(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon Type</label>
                  <select
                    value={newContact.icon}
                    onChange={(e) => setNewContact({ ...newContact, icon: e.target.value, type: e.target.value as ContactInfo['type'] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    {iconOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Label</label>
                  <input
                    type="text"
                    value={newContact.label}
                    onChange={(e) => setNewContact({ ...newContact, label: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Phone, Email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                  <input
                    type="text"
                    value={newContact.value}
                    onChange={(e) => setNewContact({ ...newContact, value: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., +1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link (optional)</label>
                  <input
                    type="text"
                    value={newContact.link}
                    onChange={(e) => setNewContact({ ...newContact, link: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., tel:+15551234567"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddContact(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addContact}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Add Contact
                </button>
              </div>
            </div>
          )}

          {/* Contact Info List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {siteInfo.contactInfo.map((contact) => (
                <div key={contact.id} className="p-4 hover:bg-gray-50">
                  {editingContact === contact.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                          <select
                            value={contact.icon}
                            onChange={(e) => updateContact(contact.id, { icon: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          >
                            {iconOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                          <input
                            type="text"
                            value={contact.label}
                            onChange={(e) => updateContact(contact.id, { label: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                          <input
                            type="text"
                            value={contact.value}
                            onChange={(e) => updateContact(contact.id, { value: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                          <input
                            type="text"
                            value={contact.link || ''}
                            onChange={(e) => updateContact(contact.id, { link: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={() => setEditingContact(null)}
                          className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                        >
                          <Check className="w-4 h-4" />
                          Done
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${contact.enabled ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                          {getContactIcon(contact.icon)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{contact.label}</p>
                          <p className="text-sm text-gray-500">{contact.value}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={contact.enabled}
                            onChange={(e) => updateContact(contact.id, { enabled: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                        <button
                          onClick={() => setEditingContact(contact.id)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteContact(contact.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              {siteInfo.contactInfo.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No contact information added yet. Click "Add Contact Info" to add one.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Sections Tab */}
      {activeTab === 'footer' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddSection(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Section
            </button>
          </div>

          {/* Add Section Modal */}
          {showAddSection && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add New Footer Section</h3>
                <button onClick={() => setShowAddSection(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                <input
                  type="text"
                  value={newSection.title}
                  onChange={(e) => setNewSection({ ...newSection, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Resources, Company"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddSection(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addSection}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Add Section
                </button>
              </div>
            </div>
          )}

          {/* Footer Sections List */}
          <div className="space-y-4">
            {siteInfo.footerSections.map((section) => (
              <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  {editingSection === section.id ? (
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(section.id, { title: e.target.value })}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => setEditingSection(null)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                      >
                        <Check className="w-4 h-4" />
                        Done
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{section.title}</h3>
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={section.enabled}
                            onChange={(e) => updateSection(section.id, { enabled: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                        </label>
                        <button
                          onClick={() => setEditingSection(section.id)}
                          className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteSection(section.id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Links */}
                <div className="divide-y divide-gray-100">
                  {section.links.map((link) => (
                    <div key={link.id} className="p-3 hover:bg-gray-50">
                      {editingLink?.sectionId === section.id && editingLink?.linkId === link.id ? (
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="text"
                            value={link.label}
                            onChange={(e) => updateLink(section.id, link.id, { label: e.target.value })}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                            placeholder="Label"
                          />
                          <input
                            type="text"
                            value={link.url}
                            onChange={(e) => updateLink(section.id, link.id, { url: e.target.value })}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                            placeholder="URL"
                          />
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={link.isExternal}
                              onChange={(e) => updateLink(section.id, link.id, { isExternal: e.target.checked })}
                              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            External
                          </label>
                          <button
                            onClick={() => setEditingLink(null)}
                            className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                          >
                            Done
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-900">{link.label}</span>
                            {link.isExternal && <ExternalLink className="w-3 h-3 text-gray-400" />}
                            <span className="text-sm text-gray-400">{link.url}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setEditingLink({ sectionId: section.id, linkId: link.id })}
                              className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteLink(section.id, link.id)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add Link Form */}
                  {showAddLink === section.id ? (
                    <div className="p-4 bg-indigo-50">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="text"
                          value={newLink.label}
                          onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="Link Label"
                        />
                        <input
                          type="text"
                          value={newLink.url}
                          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                          placeholder="URL (e.g., /about or https://...)"
                        />
                        <label className="flex items-center gap-2 text-sm whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={newLink.isExternal}
                            onChange={(e) => setNewLink({ ...newLink, isExternal: e.target.checked })}
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          External
                        </label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setShowAddLink(null);
                              setNewLink({ label: '', url: '', isExternal: false });
                            }}
                            className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => addLink(section.id)}
                            className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddLink(section.id)}
                      className="w-full p-3 text-sm text-indigo-600 hover:bg-indigo-50 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Link
                    </button>
                  )}
                </div>
              </div>
            ))}
            {siteInfo.footerSections.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-gray-500">
                No footer sections added yet. Click "Add Section" to add one.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Social Links Tab */}
      {activeTab === 'social' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button
              onClick={() => setShowAddSocial(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Social Link
            </button>
          </div>

          {/* Add Social Modal */}
          {showAddSocial && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Add Social Link</h3>
                <button onClick={() => setShowAddSocial(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                  <select
                    value={newSocial.platform}
                    onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    {socialPlatforms.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                  <input
                    type="text"
                    value={newSocial.url}
                    onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddSocial(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addSocial}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Add Social
                </button>
              </div>
            </div>
          )}

          {/* Social Links List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {siteInfo.socialLinks.map((social) => (
                <div key={social.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${social.enabled ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                      {getSocialIcon(social.platform)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{social.platform}</p>
                      <p className="text-sm text-gray-500 truncate max-w-xs">{social.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={social.enabled}
                        onChange={(e) => updateSocial(social.id, { enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                    <button
                      onClick={() => deleteSocial(social.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {siteInfo.socialLinks.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  No social links added yet. Click "Add Social Link" to add one.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
