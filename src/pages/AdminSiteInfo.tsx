import { useState, useEffect, useRef } from 'react';
import AdminLayout from '../components/AdminLayout';
import { siteInfoAPI } from '../services/api';
import { Save, Plus, Trash2, Edit3, X, Check, Building2, Phone, Mail, MapPin, Clock, Globe, Facebook, Twitter, Linkedin, Instagram, Youtube, ExternalLink, Image, Info, Upload, RefreshCw } from 'lucide-react';

interface ContactInfo {
  id: number;
  type: string;
  icon: string;
  label: string;
  value: string;
  link: string;
  enabled: boolean;
  sort_order: number;
}

interface FooterLink {
  id: number;
  section_id: number;
  label: string;
  url: string;
  is_external: boolean;
  enabled: boolean;
  sort_order: number;
}

interface FooterSection {
  id: number;
  title: string;
  links: FooterLink[];
  enabled: boolean;
  sort_order: number;
}

interface SocialLink {
  id: number;
  platform: string;
  url: string;
  enabled: boolean;
  sort_order: number;
}

interface SiteInfoData {
  siteName: string;
  site_name?: string;
  tagline: string;
  description: string;
  copyright: string;
  logo: string;
  logo_url?: string;
}

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
  const [siteInfo, setSiteInfo] = useState<SiteInfoData>({
    siteName: 'RotateWise',
    tagline: '',
    description: '',
    copyright: '',
    logo: ''
  });
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [footerSections, setFooterSections] = useState<FooterSection[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  
  const [activeTab, setActiveTab] = useState<'general' | 'contact' | 'footer' | 'social'>('general');
  const [editingContact, setEditingContact] = useState<number | null>(null);
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [editingLink, setEditingLink] = useState<{ sectionId: number; linkId: number } | null>(null);
  const [showAddContact, setShowAddContact] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showAddLink, setShowAddLink] = useState<number | null>(null);
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showLogoInfo, setShowLogoInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newContact, setNewContact] = useState({
    type: 'phone',
    icon: 'phone',
    label: '',
    value: '',
    link: '',
  });

  const [newSection, setNewSection] = useState({ title: '' });
  const [newLink, setNewLink] = useState({ label: '', url: '', is_external: false });
  const [newSocial, setNewSocial] = useState({ platform: 'facebook', url: '' });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await siteInfoAPI.get();
      
      if (response.siteInfo) {
        // Handle both naming conventions from backend
        const info = response.siteInfo;
        setSiteInfo({
          siteName: info.siteName || info.site_name || 'RotateWise',
          tagline: info.tagline || '',
          description: info.description || '',
          copyright: info.copyright || '',
          logo: info.logo || info.logo_url || ''
        });
      }
      if (response.contactInfo) {
        setContactInfo(response.contactInfo);
      }
      if (response.footerSections) {
        setFooterSections(response.footerSections);
      }
      if (response.socialLinks) {
        setSocialLinks(response.socialLinks);
      }
    } catch (err) {
      console.error('Error fetching site info:', err);
      setError('Failed to load site information.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showSaveSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // General Settings
  const updateSiteInfo = async (updates: Partial<SiteInfoData>) => {
    try {
      const updated = { ...siteInfo, ...updates };
      setSiteInfo(updated);
      await siteInfoAPI.update(updated);
      showSaveSuccess();
    } catch (err) {
      console.error('Error updating site info:', err);
      alert('Failed to save changes.');
    }
  };

  // Contact Info Functions
  const addContact = async () => {
    if (!newContact.label || !newContact.value) return;
    try {
      const response = await siteInfoAPI.createContactInfo({
        type: newContact.type,
        label: newContact.label,
        value: newContact.value,
        icon: newContact.icon,
        link: newContact.link,
        enabled: true,
        sort_order: contactInfo.length + 1
      });
      if (response.id) {
        setContactInfo([...contactInfo, {
          id: response.id,
          ...newContact,
          enabled: true,
          sort_order: contactInfo.length + 1
        }]);
        setNewContact({ type: 'phone', icon: 'phone', label: '', value: '', link: '' });
        setShowAddContact(false);
        showSaveSuccess();
      }
    } catch (err) {
      console.error('Error adding contact:', err);
      alert('Failed to add contact info.');
    }
  };

  const updateContact = async (id: number, updates: Partial<ContactInfo>) => {
    try {
      await siteInfoAPI.updateContactInfo(id, updates);
      setContactInfo(contactInfo.map(c => c.id === id ? { ...c, ...updates } : c));
      showSaveSuccess();
    } catch (err) {
      console.error('Error updating contact:', err);
    }
  };

  const deleteContact = async (id: number) => {
    if (!confirm('Are you sure you want to delete this contact info?')) return;
    try {
      await siteInfoAPI.deleteContactInfo(id);
      setContactInfo(contactInfo.filter(c => c.id !== id));
      showSaveSuccess();
    } catch (err) {
      console.error('Error deleting contact:', err);
    }
  };

  // Footer Section Functions
  const addSection = async () => {
    if (!newSection.title) return;
    try {
      const response = await siteInfoAPI.createFooterSection({
        title: newSection.title,
        enabled: true,
        sort_order: footerSections.length + 1
      });
      if (response.id) {
        setFooterSections([...footerSections, {
          id: response.id,
          title: newSection.title,
          links: [],
          enabled: true,
          sort_order: footerSections.length + 1
        }]);
        setNewSection({ title: '' });
        setShowAddSection(false);
        showSaveSuccess();
      }
    } catch (err) {
      console.error('Error adding section:', err);
    }
  };

  const updateSection = async (id: number, updates: Partial<FooterSection>) => {
    try {
      await siteInfoAPI.updateFooterSection(id, updates);
      setFooterSections(footerSections.map(s => s.id === id ? { ...s, ...updates } : s));
      showSaveSuccess();
    } catch (err) {
      console.error('Error updating section:', err);
    }
  };

  const deleteSection = async (id: number) => {
    if (!confirm('Are you sure you want to delete this footer section?')) return;
    try {
      await siteInfoAPI.deleteFooterSection(id);
      setFooterSections(footerSections.filter(s => s.id !== id));
      showSaveSuccess();
    } catch (err) {
      console.error('Error deleting section:', err);
    }
  };

  // Footer Link Functions
  const addLink = async (sectionId: number) => {
    if (!newLink.label || !newLink.url) return;
    try {
      const response = await siteInfoAPI.createFooterLink({
        section_id: sectionId,
        label: newLink.label,
        url: newLink.url,
        is_external: newLink.is_external
      });
      if (response.id) {
        const section = footerSections.find(s => s.id === sectionId);
        const newLinkData: FooterLink = {
          id: response.id,
          section_id: sectionId,
          label: newLink.label,
          url: newLink.url,
          is_external: newLink.is_external,
          enabled: true,
          sort_order: (section?.links.length || 0) + 1
        };
        setFooterSections(footerSections.map(s =>
          s.id === sectionId ? { ...s, links: [...s.links, newLinkData] } : s
        ));
        setNewLink({ label: '', url: '', is_external: false });
        setShowAddLink(null);
        showSaveSuccess();
      }
    } catch (err) {
      console.error('Error adding link:', err);
    }
  };

  const updateLink = async (sectionId: number, linkId: number, updates: Partial<FooterLink>) => {
    try {
      await siteInfoAPI.updateFooterLink(linkId, updates);
      setFooterSections(footerSections.map(s =>
        s.id === sectionId
          ? { ...s, links: s.links.map(l => l.id === linkId ? { ...l, ...updates } : l) }
          : s
      ));
      showSaveSuccess();
    } catch (err) {
      console.error('Error updating link:', err);
    }
  };

  const deleteLink = async (sectionId: number, linkId: number) => {
    try {
      await siteInfoAPI.deleteFooterLink(linkId);
      setFooterSections(footerSections.map(s =>
        s.id === sectionId ? { ...s, links: s.links.filter(l => l.id !== linkId) } : s
      ));
      showSaveSuccess();
    } catch (err) {
      console.error('Error deleting link:', err);
    }
  };

  // Social Link Functions
  const addSocial = async () => {
    if (!newSocial.url) return;
    try {
      const response = await siteInfoAPI.createSocialLink({
        platform: newSocial.platform,
        url: newSocial.url
      });
      if (response.id) {
        setSocialLinks([...socialLinks, {
          id: response.id,
          platform: newSocial.platform,
          url: newSocial.url,
          enabled: true,
          sort_order: socialLinks.length + 1
        }]);
        setNewSocial({ platform: 'facebook', url: '' });
        setShowAddSocial(false);
        showSaveSuccess();
      }
    } catch (err) {
      console.error('Error adding social:', err);
    }
  };

  const updateSocial = async (id: number, updates: Partial<SocialLink>) => {
    try {
      await siteInfoAPI.updateSocialLink(id, updates);
      setSocialLinks(socialLinks.map(s => s.id === id ? { ...s, ...updates } : s));
      showSaveSuccess();
    } catch (err) {
      console.error('Error updating social:', err);
    }
  };

  const deleteSocial = async (id: number) => {
    if (!confirm('Are you sure you want to delete this social link?')) return;
    try {
      await siteInfoAPI.deleteSocialLink(id);
      setSocialLinks(socialLinks.filter(s => s.id !== id));
      showSaveSuccess();
    } catch (err) {
      console.error('Error deleting social:', err);
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Site Info</h1>
            <p className="text-gray-600 mt-1">Manage website information, contact details, and footer content</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            {saveSuccess && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                <Check className="w-4 h-4" />
                <span className="text-sm font-medium">Saved!</span>
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

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
                      className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-200"
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                    {showLogoInfo && (
                      <div className="absolute left-0 top-7 z-50 w-80 p-4 bg-white rounded-xl shadow-xl border border-gray-200">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0">
                            <Image className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Logo Guidelines</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              <li><strong>Size:</strong> 200 x 50 pixels</li>
                              <li><strong>Format:</strong> PNG, SVG, WebP</li>
                              <li><strong>Max File:</strong> 100KB</li>
                            </ul>
                          </div>
                        </div>
                        <button onClick={() => setShowLogoInfo(false)} className="absolute top-2 right-2 text-gray-400">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-6">
                    <div className="w-48 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden">
                      {siteInfo.logo ? (
                        <img src={siteInfo.logo} alt="Logo" className="max-w-full max-h-full object-contain" />
                      ) : (
                        <div className="text-center">
                          <Image className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                          <span className="text-xs text-gray-400">No logo</span>
                        </div>
                      )}
                    </div>
                    {siteInfo.logo && (
                      <button onClick={() => updateSiteInfo({ logo: '' })} className="text-sm text-red-600 flex items-center gap-1">
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Logo URL</label>
                    <input
                      type="text"
                      value={siteInfo.logo || ''}
                      onChange={(e) => updateSiteInfo({ logo: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="https://example.com/logo.png"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Or Upload</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/svg+xml,image/webp,image/jpeg"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            updateSiteInfo({ logo: reader.result as string });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                    >
                      <Upload className="w-4 h-4" />
                      Choose File
                    </button>
                  </div>
                </div>
              </div>

              <hr />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website Name</label>
                <input
                  type="text"
                  value={siteInfo.siteName}
                  onChange={(e) => updateSiteInfo({ siteName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter website name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  value={siteInfo.tagline}
                  onChange={(e) => updateSiteInfo({ tagline: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter tagline"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={siteInfo.description}
                  onChange={(e) => updateSiteInfo({ description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none"
                  placeholder="Enter description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                <input
                  type="text"
                  value={siteInfo.copyright}
                  onChange={(e) => updateSiteInfo({ copyright: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="© 2024 Your Company"
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
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4" />
                Add Contact Info
              </button>
            </div>

            {showAddContact && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Add New Contact Info</h3>
                  <button onClick={() => setShowAddContact(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon Type</label>
                    <select
                      value={newContact.icon}
                      onChange={(e) => setNewContact({ ...newContact, icon: e.target.value, type: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., Phone"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Value</label>
                    <input
                      type="text"
                      value={newContact.value}
                      onChange={(e) => setNewContact({ ...newContact, value: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., +1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Link (optional)</label>
                    <input
                      type="text"
                      value={newContact.link}
                      onChange={(e) => setNewContact({ ...newContact, link: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g., tel:+15551234567"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setShowAddContact(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Cancel
                  </button>
                  <button onClick={addContact} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                    <Save className="w-4 h-4" />
                    Add Contact
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="divide-y">
                {contactInfo.map((contact) => (
                  <div key={contact.id} className="p-4 hover:bg-gray-50">
                    {editingContact === contact.id ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Icon</label>
                            <select
                              value={contact.icon}
                              onChange={(e) => updateContact(contact.id, { icon: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg"
                            >
                              {iconOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Label</label>
                            <input
                              type="text"
                              value={contact.label}
                              onChange={(e) => updateContact(contact.id, { label: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Value</label>
                            <input
                              type="text"
                              value={contact.value}
                              onChange={(e) => updateContact(contact.id, { value: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Link</label>
                            <input
                              type="text"
                              value={contact.link || ''}
                              onChange={(e) => updateContact(contact.id, { link: e.target.value })}
                              className="w-full px-3 py-2 border rounded-lg"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => setEditingContact(null)}
                            className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm"
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
                            <div className="w-9 h-5 bg-gray-200 peer-checked:bg-indigo-600 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                          </label>
                          <button onClick={() => setEditingContact(contact.id)} className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteContact(contact.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {contactInfo.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No contact information added yet.
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
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4" />
                Add Section
              </button>
            </div>

            {showAddSection && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Add New Footer Section</h3>
                  <button onClick={() => setShowAddSection(false)} className="text-gray-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Section Title</label>
                  <input
                    type="text"
                    value={newSection.title}
                    onChange={(e) => setNewSection({ title: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., Resources"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setShowAddSection(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Cancel
                  </button>
                  <button onClick={addSection} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">
                    <Save className="w-4 h-4" />
                    Add Section
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {footerSections.map((section) => (
                <div key={section.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <div className="p-4 bg-gray-50 border-b">
                    {editingSection === section.id ? (
                      <div className="flex items-center gap-4">
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(section.id, { title: e.target.value })}
                          className="flex-1 px-3 py-2 border rounded-lg"
                        />
                        <button onClick={() => setEditingSection(null)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm">
                          Done
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{section.title}</h3>
                        <div className="flex items-center gap-3">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={section.enabled}
                              onChange={(e) => updateSection(section.id, { enabled: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-gray-200 peer-checked:bg-indigo-600 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                          </label>
                          <button onClick={() => setEditingSection(section.id)} className="p-2 text-gray-400 hover:text-indigo-600 rounded-lg">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button onClick={() => deleteSection(section.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="divide-y">
                    {section.links.map((link) => (
                      <div key={link.id} className="p-3 hover:bg-gray-50">
                        {editingLink?.sectionId === section.id && editingLink?.linkId === link.id ? (
                          <div className="flex flex-col sm:flex-row gap-3">
                            <input
                              type="text"
                              value={link.label}
                              onChange={(e) => updateLink(section.id, link.id, { label: e.target.value })}
                              className="flex-1 px-3 py-2 border rounded-lg text-sm"
                              placeholder="Label"
                            />
                            <input
                              type="text"
                              value={link.url}
                              onChange={(e) => updateLink(section.id, link.id, { url: e.target.value })}
                              className="flex-1 px-3 py-2 border rounded-lg text-sm"
                              placeholder="URL"
                            />
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={link.is_external}
                                onChange={(e) => updateLink(section.id, link.id, { is_external: e.target.checked })}
                                className="rounded"
                              />
                              External
                            </label>
                            <button onClick={() => setEditingLink(null)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm">
                              Done
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span>{link.label}</span>
                              {link.is_external && <ExternalLink className="w-3 h-3 text-gray-400" />}
                              <span className="text-sm text-gray-400">{link.url}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button onClick={() => setEditingLink({ sectionId: section.id, linkId: link.id })} className="p-1.5 text-gray-400 hover:text-indigo-600 rounded">
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => deleteLink(section.id, link.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}

                    {showAddLink === section.id ? (
                      <div className="p-4 bg-indigo-50">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <input
                            type="text"
                            value={newLink.label}
                            onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
                            className="flex-1 px-3 py-2 border rounded-lg text-sm"
                            placeholder="Link Label"
                          />
                          <input
                            type="text"
                            value={newLink.url}
                            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                            className="flex-1 px-3 py-2 border rounded-lg text-sm"
                            placeholder="URL"
                          />
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={newLink.is_external}
                              onChange={(e) => setNewLink({ ...newLink, is_external: e.target.checked })}
                              className="rounded"
                            />
                            External
                          </label>
                          <div className="flex gap-2">
                            <button onClick={() => { setShowAddLink(null); setNewLink({ label: '', url: '', is_external: false }); }} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 rounded-lg text-sm">
                              Cancel
                            </button>
                            <button onClick={() => addLink(section.id)} className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm">
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
              {footerSections.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border p-8 text-center text-gray-500">
                  No footer sections added yet.
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
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4" />
                Add Social Link
              </button>
            </div>

            {showAddSocial && (
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Add Social Link</h3>
                  <button onClick={() => setShowAddSocial(false)} className="text-gray-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform</label>
                    <select
                      value={newSocial.platform}
                      onChange={(e) => setNewSocial({ ...newSocial, platform: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                    >
                      {socialPlatforms.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">URL</label>
                    <input
                      type="text"
                      value={newSocial.url}
                      onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                      className="w-full px-4 py-3 border rounded-lg"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setShowAddSocial(false)} className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                    Cancel
                  </button>
                  <button onClick={addSocial} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">
                    <Save className="w-4 h-4" />
                    Add Social
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="divide-y">
                {socialLinks.map((social) => (
                  <div key={social.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${social.enabled ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                        {getSocialIcon(social.platform)}
                      </div>
                      <div>
                        <p className="font-medium capitalize">{social.platform}</p>
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
                        <div className="w-9 h-5 bg-gray-200 peer-checked:bg-indigo-600 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full"></div>
                      </label>
                      <button onClick={() => deleteSocial(social.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {socialLinks.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No social links added yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
