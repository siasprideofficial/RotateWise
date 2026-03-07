import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  CreditCard,
  FileText,
  Globe
} from 'lucide-react';
import { siteInfoAPI, notificationsAPI } from '../services/api';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [siteName, setSiteName] = useState('RotateWise');
  const [siteLogo, setSiteLogo] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Load site info from API
  useEffect(() => {
    const loadSiteInfo = async () => {
      try {
        const response = await siteInfoAPI.get();
        if (response.siteInfo) {
          const info = response.siteInfo;
          setSiteName(info.siteName || info.site_name || 'RotateWise');
          setSiteLogo(info.logo || info.logo_url || '');
        }
      } catch (error) {
        console.error('Error loading site info:', error);
      }
    };
    loadSiteInfo();
    
    // Poll for changes every 30 seconds
    const interval = setInterval(loadSiteInfo, 30000);
    return () => clearInterval(interval);
  }, []);

  // Get unread notifications count from API
  useEffect(() => {
    const loadUnreadCount = async () => {
      try {
        const response = await notificationsAPI.getAll();
        if (response.notifications) {
          const unread = response.notifications.filter((n: { is_read: boolean }) => !n.is_read).length;
          setUnreadCount(unread);
        }
      } catch (error) {
        console.error('Error loading notifications:', error);
        setUnreadCount(0);
      }
    };
    loadUnreadCount();
  }, [location]); // Re-check when location changes

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Leads', path: '/admin/leads', icon: Users },
    { name: 'Contact Form', path: '/admin/contact-form', icon: FileText },
    { name: 'Site Info', path: '/admin/site-info', icon: Globe },
    { name: 'Notifications', path: '/admin/notifications', icon: Bell },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin');
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0a2540] transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/10">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            {siteLogo ? (
              <img 
                src={siteLogo} 
                alt={siteName} 
                className="h-8 max-w-[140px] object-contain"
              />
            ) : (
              <>
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-bold text-lg">{siteName}</span>
              </>
            )}
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search - Optional */}
            <div className="hidden sm:block flex-1 max-w-md">
              <h1 className="text-lg font-semibold text-gray-800">Admin Panel</h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <Link 
                to="/admin/notifications"
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white px-1">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">A</span>
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {profileDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setProfileDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-20">
                      <Link
                        to="/admin/settings"
                        onClick={() => setProfileDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
