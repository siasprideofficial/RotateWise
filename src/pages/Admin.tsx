import { useState } from 'react';
import { useSite, ContactFormField, LegalPage } from '../context/SiteContext';
import {
  Settings,
  BarChart3,
  Users,
  FileText,
  Edit3,
  Trash2,
  Plus,
  Save,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  ChevronRight,
  Mail,
  Phone,
  Clock,
  TrendingUp,
  MousePointer,
  FileCheck,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Check,
  AlertCircle,
  Globe,
  MessageSquare,
} from 'lucide-react';

// Login Component
const AdminLogin = () => {
  const { adminLogin } = useSite();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      setError('');
    } else {
      setError('Invalid password. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div className="relative glass-card rounded-3xl p-8 md:p-12 max-w-md w-full animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full btn-primary rounded-xl py-3 flex items-center justify-center gap-2"
          >
            <Lock className="w-5 h-5" />
            Login to Admin Panel
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Default password: <code className="text-indigo-400">admin123</code>
        </p>
      </div>
    </main>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const {
    settings,
    updateSettings,
    formFields,
    addFormField,
    updateFormField,
    deleteFormField,
    submissions,
    markAsRead,
    deleteSubmission,
    legalPages,
    addLegalPage,
    updateLegalPage,
    deleteLegalPage,
    analytics,
    adminLogout,
  } = useSite();

  const [activeTab, setActiveTab] = useState('analytics');
  const [editingSettings, setEditingSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState(settings);
  
  // Form field editing
  const [editingField, setEditingField] = useState<ContactFormField | null>(null);
  const [newField, setNewField] = useState(false);
  const [fieldForm, setFieldForm] = useState<Partial<ContactFormField>>({});
  
  // Legal page editing
  const [editingPage, setEditingPage] = useState<LegalPage | null>(null);
  const [newPage, setNewPage] = useState(false);
  const [pageForm, setPageForm] = useState<Partial<LegalPage>>({});
  
  // Submission viewing
  const [viewingSubmission, setViewingSubmission] = useState<string | null>(null);

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'submissions', label: 'Submissions', icon: Users },
    { id: 'form', label: 'Contact Form', icon: Edit3 },
    { id: 'legal', label: 'Legal Pages', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const unreadCount = submissions.filter(s => !s.read).length;

  // Save settings
  const handleSaveSettings = () => {
    updateSettings(tempSettings);
    setEditingSettings(false);
  };

  // Save form field
  const handleSaveField = () => {
    if (editingField) {
      updateFormField(editingField.id, fieldForm);
    } else if (newField) {
      addFormField({
        name: fieldForm.name || '',
        label: fieldForm.label || '',
        type: fieldForm.type || 'text',
        placeholder: fieldForm.placeholder || '',
        required: fieldForm.required || false,
        options: fieldForm.options || [],
        order: formFields.length + 1,
      });
    }
    setEditingField(null);
    setNewField(false);
    setFieldForm({});
  };

  // Save legal page
  const handleSavePage = () => {
    if (editingPage) {
      updateLegalPage(editingPage.id, pageForm);
    } else if (newPage) {
      addLegalPage({
        slug: pageForm.slug || '',
        title: pageForm.title || '',
        content: pageForm.content || '',
        isActive: pageForm.isActive ?? true,
      });
    }
    setEditingPage(null);
    setNewPage(false);
    setPageForm({});
  };

  // Calculate analytics
  const totalViews = Object.values(analytics.pageViews).reduce((a, b) => a + b, 0);
  const todayVisits = analytics.dailyVisits.find(
    d => d.date === new Date().toISOString().split('T')[0]
  )?.visits || 0;

  return (
    <main className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">{settings.siteName} Admin</h1>
                <p className="text-sm text-gray-400">Manage your website</p>
              </div>
            </div>
            <button
              onClick={adminLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="glass-card rounded-2xl p-4 space-y-2 sticky top-24">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                  {tab.id === 'submissions' && unreadCount > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                  <ChevronRight className={`w-4 h-4 ml-auto ${activeTab === tab.id ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6 animate-fade-in-up">
                <h2 className="text-2xl font-bold text-white">Analytics Overview</h2>
                
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="glass-card rounded-2xl p-6 hover-lift">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <MousePointer className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Total Page Views</p>
                        <p className="text-2xl font-bold text-white">{totalViews.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-2xl p-6 hover-lift">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Today's Visits</p>
                        <p className="text-2xl font-bold text-white">{todayVisits.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-2xl p-6 hover-lift">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                        <FileCheck className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Total Submissions</p>
                        <p className="text-2xl font-bold text-white">{analytics.submissions}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-2xl p-6 hover-lift">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Conversion Rate</p>
                        <p className="text-2xl font-bold text-white">{analytics.conversionRate.toFixed(2)}%</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Top Pages */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Top Pages</h3>
                  {analytics.topPages.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.topPages.map((page, index) => (
                        <div
                          key={page.page}
                          className="flex items-center gap-4 p-3 bg-white/5 rounded-xl"
                        >
                          <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </span>
                          <span className="text-white flex-1">{page.page}</span>
                          <span className="text-gray-400">{page.views} views</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">No page views recorded yet</p>
                  )}
                </div>

                {/* Daily Visits Chart (Simplified) */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Daily Visits (Last 7 Days)</h3>
                  {analytics.dailyVisits.length > 0 ? (
                    <div className="flex items-end gap-2 h-40">
                      {analytics.dailyVisits.slice(-7).map((day) => {
                        const maxVisits = Math.max(...analytics.dailyVisits.map(d => d.visits));
                        const height = maxVisits > 0 ? (day.visits / maxVisits) * 100 : 0;
                        return (
                          <div key={day.date} className="flex-1 flex flex-col items-center gap-2">
                            <div
                              className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-lg transition-all"
                              style={{ height: `${Math.max(height, 5)}%` }}
                            />
                            <span className="text-xs text-gray-400">
                              {new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">No daily visit data yet</p>
                  )}
                </div>
              </div>
            )}

            {/* Submissions Tab */}
            {activeTab === 'submissions' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
                  <span className="text-gray-400">
                    {submissions.length} total • {unreadCount} unread
                  </span>
                </div>

                {submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <div
                        key={submission.id}
                        className={`glass-card rounded-2xl p-6 transition-all ${
                          !submission.read ? 'border-l-4 border-l-indigo-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-white font-semibold">
                                {submission.data.name || 'Anonymous'}
                              </span>
                              {!submission.read && (
                                <span className="bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">
                                  New
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-3">
                              {submission.data.email && (
                                <span className="flex items-center gap-1">
                                  <Mail className="w-4 h-4" />
                                  {submission.data.email}
                                </span>
                              )}
                              {submission.data.phone && (
                                <span className="flex items-center gap-1">
                                  <Phone className="w-4 h-4" />
                                  {submission.data.phone}
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {new Date(submission.submittedAt).toLocaleString()}
                              </span>
                            </div>
                            
                            {viewingSubmission === submission.id && (
                              <div className="mt-4 p-4 bg-white/5 rounded-xl space-y-2">
                                {Object.entries(submission.data).map(([key, value]) => (
                                  <div key={key}>
                                    <span className="text-gray-400 text-sm capitalize">{key}:</span>
                                    <p className="text-white">{value}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setViewingSubmission(
                                  viewingSubmission === submission.id ? null : submission.id
                                );
                                if (!submission.read) markAsRead(submission.id);
                              }}
                              className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                            >
                              <Eye className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => deleteSubmission(submission.id)}
                              className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-all"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="glass-card rounded-2xl p-12 text-center">
                    <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No submissions yet</p>
                  </div>
                )}
              </div>
            )}

            {/* Form Builder Tab */}
            {activeTab === 'form' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Contact Form Fields</h2>
                  <button
                    onClick={() => {
                      setNewField(true);
                      setFieldForm({});
                    }}
                    className="btn-primary rounded-xl px-4 py-2 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Field
                  </button>
                </div>

                {/* Field Editor Modal */}
                {(editingField || newField) && (
                  <div className="glass-card rounded-2xl p-6 border-2 border-indigo-500">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {editingField ? 'Edit Field' : 'Add New Field'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Field Name (ID)</label>
                        <input
                          type="text"
                          value={fieldForm.name || ''}
                          onChange={(e) => setFieldForm({ ...fieldForm, name: e.target.value })}
                          placeholder="e.g., email"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Label</label>
                        <input
                          type="text"
                          value={fieldForm.label || ''}
                          onChange={(e) => setFieldForm({ ...fieldForm, label: e.target.value })}
                          placeholder="e.g., Email Address"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Type</label>
                        <select
                          value={fieldForm.type || 'text'}
                          onChange={(e) => setFieldForm({ ...fieldForm, type: e.target.value as ContactFormField['type'] })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="text">Text</option>
                          <option value="email">Email</option>
                          <option value="tel">Phone</option>
                          <option value="textarea">Textarea</option>
                          <option value="select">Select/Dropdown</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Placeholder</label>
                        <input
                          type="text"
                          value={fieldForm.placeholder || ''}
                          onChange={(e) => setFieldForm({ ...fieldForm, placeholder: e.target.value })}
                          placeholder="e.g., Enter your email"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      {fieldForm.type === 'select' && (
                        <div className="md:col-span-2">
                          <label className="block text-sm text-gray-400 mb-2">Options (comma separated)</label>
                          <input
                            type="text"
                            value={(fieldForm.options || []).join(', ')}
                            onChange={(e) => setFieldForm({ ...fieldForm, options: e.target.value.split(',').map(s => s.trim()) })}
                            placeholder="e.g., Option 1, Option 2, Option 3"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="required"
                          checked={fieldForm.required || false}
                          onChange={(e) => setFieldForm({ ...fieldForm, required: e.target.checked })}
                          className="w-5 h-5 rounded bg-white/5 border-white/10 text-indigo-500 focus:ring-indigo-500"
                        />
                        <label htmlFor="required" className="text-gray-300">Required field</label>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={handleSaveField}
                        className="btn-primary rounded-xl px-6 py-2 flex items-center gap-2"
                      >
                        <Save className="w-5 h-5" />
                        Save Field
                      </button>
                      <button
                        onClick={() => {
                          setEditingField(null);
                          setNewField(false);
                          setFieldForm({});
                        }}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Fields List */}
                <div className="space-y-3">
                  {formFields
                    .sort((a, b) => a.order - b.order)
                    .map((field, index) => (
                      <div
                        key={field.id}
                        className="glass-card rounded-xl p-4 flex items-center gap-4"
                      >
                        <GripVertical className="w-5 h-5 text-gray-500" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3">
                            <span className="text-white font-medium">{field.label}</span>
                            <span className="text-xs px-2 py-0.5 bg-indigo-500/20 text-indigo-400 rounded-full">
                              {field.type}
                            </span>
                            {field.required && (
                              <span className="text-xs px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full">
                                Required
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">Name: {field.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              const newFields = [...formFields];
                              if (index > 0) {
                                [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
                                newFields.forEach((f, i) => f.order = i + 1);
                                formFields.forEach((f, i) => updateFormField(f.id, { order: newFields[i].order }));
                              }
                            }}
                            disabled={index === 0}
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all disabled:opacity-30"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              const newFields = [...formFields];
                              if (index < formFields.length - 1) {
                                [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
                                newFields.forEach((f, i) => f.order = i + 1);
                                formFields.forEach((f, i) => updateFormField(f.id, { order: newFields[i].order }));
                              }
                            }}
                            disabled={index === formFields.length - 1}
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all disabled:opacity-30"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingField(field);
                              setFieldForm(field);
                            }}
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteFormField(field.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Legal Pages Tab */}
            {activeTab === 'legal' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Legal Pages</h2>
                  <button
                    onClick={() => {
                      setNewPage(true);
                      setPageForm({});
                    }}
                    className="btn-primary rounded-xl px-4 py-2 flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Page
                  </button>
                </div>

                {/* Page Editor Modal */}
                {(editingPage || newPage) && (
                  <div className="glass-card rounded-2xl p-6 border-2 border-indigo-500">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {editingPage ? 'Edit Legal Page' : 'Add New Legal Page'}
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Page Title</label>
                          <input
                            type="text"
                            value={pageForm.title || ''}
                            onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                            placeholder="e.g., Privacy Policy"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">URL Slug</label>
                          <input
                            type="text"
                            value={pageForm.slug || ''}
                            onChange={(e) => setPageForm({ ...pageForm, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                            placeholder="e.g., privacy-policy"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-400 mb-2">Content (HTML supported)</label>
                        <textarea
                          value={pageForm.content || ''}
                          onChange={(e) => setPageForm({ ...pageForm, content: e.target.value })}
                          placeholder="Enter the page content..."
                          rows={12}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="isActive"
                          checked={pageForm.isActive ?? true}
                          onChange={(e) => setPageForm({ ...pageForm, isActive: e.target.checked })}
                          className="w-5 h-5 rounded bg-white/5 border-white/10 text-indigo-500 focus:ring-indigo-500"
                        />
                        <label htmlFor="isActive" className="text-gray-300">Page is active</label>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={handleSavePage}
                        className="btn-primary rounded-xl px-6 py-2 flex items-center gap-2"
                      >
                        <Save className="w-5 h-5" />
                        Save Page
                      </button>
                      <button
                        onClick={() => {
                          setEditingPage(null);
                          setNewPage(false);
                          setPageForm({});
                        }}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Pages List */}
                <div className="space-y-4">
                  {legalPages.map((page) => (
                    <div
                      key={page.id}
                      className="glass-card rounded-2xl p-6"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-5 h-5 text-indigo-400" />
                            <span className="text-white font-semibold">{page.title}</span>
                            {page.isActive ? (
                              <span className="text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                Active
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded-full">
                                Inactive
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Globe className="w-4 h-4" />
                              /{page.slug}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Updated: {new Date(page.lastUpdated).toLocaleDateString()}
                            </span>
                          </div>
                          {page.content && (
                            <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                              {page.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingPage(page);
                              setPageForm(page);
                            }}
                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"
                          >
                            <Edit3 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => deleteLegalPage(page.id)}
                            className="p-2 hover:bg-red-500/20 rounded-lg text-gray-400 hover:text-red-400 transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Site Settings</h2>
                  {!editingSettings ? (
                    <button
                      onClick={() => {
                        setEditingSettings(true);
                        setTempSettings(settings);
                      }}
                      className="btn-primary rounded-xl px-4 py-2 flex items-center gap-2"
                    >
                      <Edit3 className="w-5 h-5" />
                      Edit Settings
                    </button>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveSettings}
                        className="btn-primary rounded-xl px-4 py-2 flex items-center gap-2"
                      >
                        <Save className="w-5 h-5" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingSettings(false)}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>

                <div className="glass-card rounded-2xl p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <Globe className="w-4 h-4" />
                        Website Name
                      </label>
                      {editingSettings ? (
                        <input
                          type="text"
                          value={tempSettings.siteName}
                          onChange={(e) => setTempSettings({ ...tempSettings, siteName: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-white text-lg font-medium">{settings.siteName}</p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <MessageSquare className="w-4 h-4" />
                        Tagline
                      </label>
                      {editingSettings ? (
                        <input
                          type="text"
                          value={tempSettings.tagline}
                          onChange={(e) => setTempSettings({ ...tempSettings, tagline: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-white text-lg font-medium">{settings.tagline}</p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </label>
                      {editingSettings ? (
                        <input
                          type="email"
                          value={tempSettings.email}
                          onChange={(e) => setTempSettings({ ...tempSettings, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-white text-lg font-medium">{settings.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </label>
                      {editingSettings ? (
                        <input
                          type="tel"
                          value={tempSettings.phone}
                          onChange={(e) => setTempSettings({ ...tempSettings, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-white text-lg font-medium">{settings.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <MessageSquare className="w-4 h-4" />
                        WhatsApp Number
                      </label>
                      {editingSettings ? (
                        <input
                          type="text"
                          value={tempSettings.whatsappNumber}
                          onChange={(e) => setTempSettings({ ...tempSettings, whatsappNumber: e.target.value })}
                          placeholder="e.g., 919999999999"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-white text-lg font-medium">{settings.whatsappNumber}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <Globe className="w-4 h-4" />
                        Office Address
                      </label>
                      {editingSettings ? (
                        <textarea
                          value={tempSettings.address}
                          onChange={(e) => setTempSettings({ ...tempSettings, address: e.target.value })}
                          rows={2}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <p className="text-white text-lg font-medium">{settings.address}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Preview</h3>
                  <div className="p-6 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl border border-indigo-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                        {(editingSettings ? tempSettings.siteName : settings.siteName).charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">
                          {editingSettings ? tempSettings.siteName : settings.siteName}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {editingSettings ? tempSettings.tagline : settings.tagline}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

// Main Admin Component
const Admin = () => {
  const { isAdminLoggedIn } = useSite();

  if (!isAdminLoggedIn) {
    return <AdminLogin />;
  }

  return <AdminDashboard />;
};

export default Admin;
