// API Configuration
// @ts-expect-error Vite env
const API_BASE_URL = import.meta.env?.VITE_API_URL || '/api';

// Helper function to make API requests
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'An error occurred');
  }

  return data;
}

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    request<{ success: boolean; admin: Admin; token: string; message?: string }>('/auth.php?action=login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    request<{ success: boolean }>('/auth.php?action=logout', {
      method: 'POST',
    }),

  checkSession: () =>
    request<{ authenticated: boolean; admin?: Admin }>('/auth.php?action=check'),

  updateProfile: (data: { name: string; email: string; phone: string }) =>
    request<{ success: boolean }>('/auth.php?action=update-profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  changePassword: (currentPassword: string, newPassword: string) =>
    request<{ success: boolean }>('/auth.php?action=change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

// Leads API
export const leadsAPI = {
  getAll: (filters?: { status?: string; source?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.source) params.append('source', filters.source);
    if (filters?.search) params.append('search', filters.search);
    const query = params.toString() ? `&${params.toString()}` : '';
    return request<{ leads: Lead[] }>(`/leads.php?action=list${query}`);
  },

  getById: (id: number) =>
    request<{ lead: Lead }>(`/leads.php?action=get&id=${id}`),

  create: (data: LeadInput) =>
    request<{ success: boolean; id: number }>('/leads.php?action=create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<Lead>) =>
    request<{ success: boolean }>(`/leads.php?action=update&id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    }),

  updateStatus: (id: number, status: string) =>
    request<{ success: boolean }>('/leads.php?action=update-status', {
      method: 'PUT',
      body: JSON.stringify({ id, status }),
    }),

  delete: (id: number) =>
    request<{ success: boolean }>(`/leads.php?action=delete&id=${id}`, {
      method: 'DELETE',
    }),

  getStats: () =>
    request<{ stats: LeadStats; recentLeads: Lead[] }>('/leads.php?action=stats'),
};

// Notifications API
export const notificationsAPI = {
  getAll: (filter?: 'all' | 'read' | 'unread') => {
    const query = filter ? `&filter=${filter}` : '';
    return request<{ notifications: Notification[] }>(`/notifications.php?action=list${query}`);
  },

  markAsRead: (id: number) =>
    request<{ success: boolean }>('/notifications.php?action=mark-read', {
      method: 'PUT',
      body: JSON.stringify({ id }),
    }),

  markAllAsRead: () =>
    request<{ success: boolean }>('/notifications.php?action=mark-all-read', {
      method: 'PUT',
    }),

  delete: (id: number) =>
    request<{ success: boolean }>(`/notifications.php?action=delete&id=${id}`, {
      method: 'DELETE',
    }),

  clearRead: () =>
    request<{ success: boolean }>('/notifications.php?action=clear-read', {
      method: 'DELETE',
    }),

  getUnreadCount: () =>
    request<{ count: number }>('/notifications.php?action=unread-count'),
};

// Site Info API
export const siteInfoAPI = {
  get: () =>
    request<{
      siteInfo: SiteInfo;
      contactInfo: ContactInfo[];
      footerSections: FooterSection[];
      socialLinks: SocialLink[];
    }>('/site-info.php?action=get'),

  update: (data: Partial<SiteInfo>) =>
    request<{ success: boolean }>('/site-info.php?action=update', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  // Contact Info
  getContactInfo: () =>
    request<{ contactInfo: ContactInfo[] }>('/site-info.php?action=contact-info'),

  createContactInfo: (data: Omit<ContactInfo, 'id'>) =>
    request<{ success: boolean; id: number }>('/site-info.php?action=contact-info', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateContactInfo: (id: number, data: Partial<ContactInfo>) =>
    request<{ success: boolean }>(`/site-info.php?action=contact-info&id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    }),

  deleteContactInfo: (id: number) =>
    request<{ success: boolean }>(`/site-info.php?action=contact-info&id=${id}`, {
      method: 'DELETE',
    }),

  // Footer Sections
  createFooterSection: (data: { title: string; enabled?: boolean; sort_order?: number }) =>
    request<{ success: boolean; id: number }>('/site-info.php?action=footer-sections', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateFooterSection: (id: number, data: Partial<FooterSection>) =>
    request<{ success: boolean }>(`/site-info.php?action=footer-sections&id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    }),

  deleteFooterSection: (id: number) =>
    request<{ success: boolean }>(`/site-info.php?action=footer-sections&id=${id}`, {
      method: 'DELETE',
    }),

  // Footer Links
  createFooterLink: (data: { section_id: number; label: string; url: string; is_external?: boolean }) =>
    request<{ success: boolean; id: number }>('/site-info.php?action=footer-links', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateFooterLink: (id: number, data: Partial<FooterLink>) =>
    request<{ success: boolean }>(`/site-info.php?action=footer-links&id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    }),

  deleteFooterLink: (id: number) =>
    request<{ success: boolean }>(`/site-info.php?action=footer-links&id=${id}`, {
      method: 'DELETE',
    }),

  // Social Links
  createSocialLink: (data: { platform: string; url: string }) =>
    request<{ success: boolean; id: number }>('/site-info.php?action=social-links', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateSocialLink: (id: number, data: Partial<SocialLink>) =>
    request<{ success: boolean }>(`/site-info.php?action=social-links&id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    }),

  deleteSocialLink: (id: number) =>
    request<{ success: boolean }>(`/site-info.php?action=social-links&id=${id}`, {
      method: 'DELETE',
    }),
};

// Form Fields API
export const formFieldsAPI = {
  getAll: () =>
    request<{ fields: FormField[] }>('/form-fields.php?action=list'),

  create: (data: Omit<FormField, 'id'>) =>
    request<{ success: boolean; id: number }>('/form-fields.php?action=create', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<FormField>) =>
    request<{ success: boolean }>(`/form-fields.php?action=update&id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    }),

  delete: (id: number) =>
    request<{ success: boolean }>(`/form-fields.php?action=delete&id=${id}`, {
      method: 'DELETE',
    }),

  reorder: (fieldIds: number[]) =>
    request<{ success: boolean }>('/form-fields.php?action=reorder', {
      method: 'PUT',
      body: JSON.stringify({ fields: fieldIds }),
    }),

  // Options for select fields
  createOption: (data: { field_id: number; option_value: string; option_label: string }) =>
    request<{ success: boolean; id: number }>('/form-fields.php?action=options', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateOption: (id: number, data: { option_value: string; option_label: string; sort_order?: number }) =>
    request<{ success: boolean }>(`/form-fields.php?action=options&id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ id, ...data }),
    }),

  deleteOption: (id: number) =>
    request<{ success: boolean }>(`/form-fields.php?action=options&id=${id}`, {
      method: 'DELETE',
    }),
};

// Settings API
export const settingsAPI = {
  get: () =>
    request<{ settings: AdminSettings }>('/settings.php?action=get'),

  update: (data: Partial<AdminSettings>) =>
    request<{ success: boolean }>('/settings.php?action=update', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Type definitions
export interface Admin {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone?: string;
  loan_amount?: string;
  employment_status?: string;
  message?: string;
  source: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface LeadInput {
  name: string;
  email: string;
  phone?: string;
  loanAmount?: string;
  employmentStatus?: string;
  message?: string;
  source?: string;
}

export interface LeadStats {
  total: number;
  new: number;
  contacted: number;
  converted: number;
}

export interface Notification {
  id: number;
  type: 'lead' | 'status' | 'reminder' | 'system';
  title: string;
  message: string;
  lead_id?: number;
  is_read: boolean;
  created_at: string;
  lead_name?: string;
  lead_email?: string;
}

export interface SiteInfo {
  siteName: string;
  tagline: string;
  description: string;
  copyright: string;
  logo: string;
}

export interface ContactInfo {
  id: number;
  type: string;
  label: string;
  value: string;
  icon: string;
  link: string;
  enabled: boolean;
  sort_order: number;
}

export interface FooterSection {
  id: number;
  title: string;
  enabled: boolean;
  sort_order: number;
  links: FooterLink[];
}

export interface FooterLink {
  id: number;
  section_id: number;
  label: string;
  url: string;
  is_external: boolean;
  enabled: boolean;
  sort_order: number;
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  enabled: boolean;
  sort_order: number;
}

export interface FormField {
  id: number;
  field_name: string;
  label: string;
  field_type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  required: boolean;
  enabled: boolean;
  sort_order: number;
  options?: FormOption[];
}

export interface FormOption {
  id: number;
  field_id: number;
  option_value: string;
  option_label: string;
  sort_order: number;
}

export interface AdminSettings {
  emailNotifications: boolean;
  dailySummary: boolean;
  weeklyReport: boolean;
}
