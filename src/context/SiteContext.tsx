import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface ContactFormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  required: boolean;
  options?: string[]; // For select type
  order: number;
}

export interface ContactSubmission {
  id: string;
  data: Record<string, string>;
  submittedAt: string;
  read: boolean;
}

export interface LegalPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  lastUpdated: string;
  isActive: boolean;
}

export interface AnalyticsData {
  pageViews: Record<string, number>;
  dailyVisits: { date: string; visits: number }[];
  topPages: { page: string; views: number }[];
  submissions: number;
  conversionRate: number;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  whatsappNumber: string;
}

interface SiteContextType {
  // Settings
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  
  // Contact Form Fields
  formFields: ContactFormField[];
  addFormField: (field: Omit<ContactFormField, 'id'>) => void;
  updateFormField: (id: string, field: Partial<ContactFormField>) => void;
  deleteFormField: (id: string) => void;
  reorderFormFields: (fields: ContactFormField[]) => void;
  
  // Contact Submissions
  submissions: ContactSubmission[];
  addSubmission: (data: Record<string, string>) => void;
  markAsRead: (id: string) => void;
  deleteSubmission: (id: string) => void;
  
  // Legal Pages
  legalPages: LegalPage[];
  addLegalPage: (page: Omit<LegalPage, 'id' | 'lastUpdated'>) => void;
  updateLegalPage: (id: string, page: Partial<LegalPage>) => void;
  deleteLegalPage: (id: string) => void;
  getLegalPageBySlug: (slug: string) => LegalPage | undefined;
  
  // Analytics
  analytics: AnalyticsData;
  trackPageView: (page: string) => void;
  
  // Auth
  isAdminLoggedIn: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
}

const defaultSettings: SiteSettings = {
  siteName: 'FinanceFlow',
  tagline: 'Smart Credit Card Bill Management',
  email: 'info@financeflow.com',
  phone: '+1 (555) 123-4567',
  address: '123 Financial District, Business Bay, New York, NY 10004',
  whatsappNumber: '919999999999',
};

const defaultFormFields: ContactFormField[] = [
  {
    id: '1',
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'John Doe',
    required: true,
    order: 1,
  },
  {
    id: '2',
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'john@example.com',
    required: true,
    order: 2,
  },
  {
    id: '3',
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 000-0000',
    required: true,
    order: 3,
  },
  {
    id: '4',
    name: 'service',
    label: 'Service Interest',
    type: 'select',
    placeholder: 'Select a service',
    required: true,
    options: ['Credit Card Bill Management', 'Payment Planning', 'Financial Consulting', 'Debt Optimization', 'Other'],
    order: 4,
  },
  {
    id: '5',
    name: 'message',
    label: 'Your Message',
    type: 'textarea',
    placeholder: 'Tell us about your situation...',
    required: true,
    order: 5,
  },
];

const defaultLegalPages: LegalPage[] = [
  {
    id: 'privacy',
    slug: 'privacy',
    title: 'Privacy Policy',
    content: '',
    lastUpdated: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'terms',
    slug: 'terms',
    title: 'Terms of Service',
    content: '',
    lastUpdated: new Date().toISOString(),
    isActive: true,
  },
  {
    id: 'disclaimer',
    slug: 'disclaimer',
    title: 'Disclaimer',
    content: '',
    lastUpdated: new Date().toISOString(),
    isActive: true,
  },
];

const defaultAnalytics: AnalyticsData = {
  pageViews: {},
  dailyVisits: [],
  topPages: [],
  submissions: 0,
  conversionRate: 0,
};

const ADMIN_PASSWORD = 'admin123'; // Change this in production

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('siteSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [formFields, setFormFields] = useState<ContactFormField[]>(() => {
    const saved = localStorage.getItem('formFields');
    return saved ? JSON.parse(saved) : defaultFormFields;
  });

  const [submissions, setSubmissions] = useState<ContactSubmission[]>(() => {
    const saved = localStorage.getItem('submissions');
    return saved ? JSON.parse(saved) : [];
  });

  const [legalPages, setLegalPages] = useState<LegalPage[]>(() => {
    const saved = localStorage.getItem('legalPages');
    return saved ? JSON.parse(saved) : defaultLegalPages;
  });

  const [analytics, setAnalytics] = useState<AnalyticsData>(() => {
    const saved = localStorage.getItem('analytics');
    return saved ? JSON.parse(saved) : defaultAnalytics;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('adminLoggedIn');
    return saved === 'true';
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('formFields', JSON.stringify(formFields));
  }, [formFields]);

  useEffect(() => {
    localStorage.setItem('submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('legalPages', JSON.stringify(legalPages));
  }, [legalPages]);

  useEffect(() => {
    localStorage.setItem('analytics', JSON.stringify(analytics));
  }, [analytics]);

  // Settings functions
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Form Fields functions
  const addFormField = (field: Omit<ContactFormField, 'id'>) => {
    const newField: ContactFormField = {
      ...field,
      id: Date.now().toString(),
    };
    setFormFields(prev => [...prev, newField]);
  };

  const updateFormField = (id: string, field: Partial<ContactFormField>) => {
    setFormFields(prev =>
      prev.map(f => (f.id === id ? { ...f, ...field } : f))
    );
  };

  const deleteFormField = (id: string) => {
    setFormFields(prev => prev.filter(f => f.id !== id));
  };

  const reorderFormFields = (fields: ContactFormField[]) => {
    setFormFields(fields);
  };

  // Submissions functions
  const addSubmission = (data: Record<string, string>) => {
    const newSubmission: ContactSubmission = {
      id: Date.now().toString(),
      data,
      submittedAt: new Date().toISOString(),
      read: false,
    };
    setSubmissions(prev => [newSubmission, ...prev]);
    setAnalytics(prev => ({
      ...prev,
      submissions: prev.submissions + 1,
    }));
  };

  const markAsRead = (id: string) => {
    setSubmissions(prev =>
      prev.map(s => (s.id === id ? { ...s, read: true } : s))
    );
  };

  const deleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  // Legal Pages functions
  const addLegalPage = (page: Omit<LegalPage, 'id' | 'lastUpdated'>) => {
    const newPage: LegalPage = {
      ...page,
      id: Date.now().toString(),
      lastUpdated: new Date().toISOString(),
    };
    setLegalPages(prev => [...prev, newPage]);
  };

  const updateLegalPage = (id: string, page: Partial<LegalPage>) => {
    setLegalPages(prev =>
      prev.map(p =>
        p.id === id ? { ...p, ...page, lastUpdated: new Date().toISOString() } : p
      )
    );
  };

  const deleteLegalPage = (id: string) => {
    setLegalPages(prev => prev.filter(p => p.id !== id));
  };

  const getLegalPageBySlug = (slug: string) => {
    return legalPages.find(p => p.slug === slug && p.isActive);
  };

  // Analytics functions
  const trackPageView = (page: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    setAnalytics(prev => {
      const newPageViews = { ...prev.pageViews };
      newPageViews[page] = (newPageViews[page] || 0) + 1;

      let newDailyVisits = [...prev.dailyVisits];
      const todayIndex = newDailyVisits.findIndex(d => d.date === today);
      if (todayIndex >= 0) {
        newDailyVisits[todayIndex].visits += 1;
      } else {
        newDailyVisits.push({ date: today, visits: 1 });
      }
      // Keep only last 30 days
      newDailyVisits = newDailyVisits.slice(-30);

      const topPages = Object.entries(newPageViews)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 10);

      const totalViews = Object.values(newPageViews).reduce((a, b) => a + b, 0);
      const conversionRate = totalViews > 0 ? (prev.submissions / totalViews) * 100 : 0;

      return {
        ...prev,
        pageViews: newPageViews,
        dailyVisits: newDailyVisits,
        topPages,
        conversionRate,
      };
    });
  };

  // Auth functions
  const adminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('adminLoggedIn', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('adminLoggedIn');
  };

  return (
    <SiteContext.Provider
      value={{
        settings,
        updateSettings,
        formFields,
        addFormField,
        updateFormField,
        deleteFormField,
        reorderFormFields,
        submissions,
        addSubmission,
        markAsRead,
        deleteSubmission,
        legalPages,
        addLegalPage,
        updateLegalPage,
        deleteLegalPage,
        getLegalPageBySlug,
        analytics,
        trackPageView,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
