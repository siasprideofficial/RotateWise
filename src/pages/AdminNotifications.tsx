import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import {
  Bell,
  UserPlus,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Trash2,
  Check,
  Filter,
  Search
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'new_lead' | 'status_change' | 'system' | 'reminder';
  title: string;
  message: string;
  leadId?: string;
  read: boolean;
  createdAt: string;
}

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load notifications from localStorage or create demo notifications
    const storedNotifications = localStorage.getItem('adminNotifications');
    if (storedNotifications) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      // Create demo notifications
      const demoNotifications: Notification[] = [
        {
          id: '1',
          type: 'new_lead',
          title: 'New Lead Received',
          message: 'John Smith submitted a consultation request for $25,000 - $50,000 loan.',
          leadId: '1',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 mins ago
        },
        {
          id: '2',
          type: 'new_lead',
          title: 'New Lead Received',
          message: 'Sarah Johnson is interested in credit card loan consultation.',
          leadId: '2',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
        },
        {
          id: '3',
          type: 'status_change',
          title: 'Lead Status Updated',
          message: 'Lead "Michael Brown" status changed from New to Contacted.',
          leadId: '3',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString() // 5 hours ago
        },
        {
          id: '4',
          type: 'reminder',
          title: 'Follow-up Reminder',
          message: 'Remember to follow up with Emily Davis regarding her loan application.',
          leadId: '4',
          read: false,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() // 1 day ago
        },
        {
          id: '5',
          type: 'system',
          title: 'Weekly Report Ready',
          message: 'Your weekly lead performance report is ready to view.',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString() // 2 days ago
        },
        {
          id: '6',
          type: 'new_lead',
          title: 'New Lead from Popup',
          message: 'Robert Wilson submitted a quick consultation request from the homepage popup.',
          leadId: '5',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString() // 3 days ago
        },
        {
          id: '7',
          type: 'system',
          title: 'System Update',
          message: 'Admin panel has been updated with new features. Check out the settings page.',
          read: true,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString() // 5 days ago
        }
      ];
      setNotifications(demoNotifications);
      localStorage.setItem('adminNotifications', JSON.stringify(demoNotifications));
    }
  }, []);

  const saveNotifications = (updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications);
    localStorage.setItem('adminNotifications', JSON.stringify(updatedNotifications));
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    saveNotifications(updated);
  };

  const clearAllRead = () => {
    const updated = notifications.filter(n => !n.read);
    saveNotifications(updated);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'new_lead':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'status_change':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'reminder':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'system':
        return <Bell className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredNotifications = notifications
    .filter(n => {
      if (filter === 'unread') return !n.read;
      if (filter === 'read') return n.read;
      return true;
    })
    .filter(n => {
      if (!searchTerm) return true;
      return (
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-1">
              {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Mark all as read
              </button>
            )}
            {notifications.some(n => n.read) && (
              <button
                onClick={clearAllRead}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Clear read
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                filter === 'all'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Filter className="w-4 h-4" />
              All
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                filter === 'unread'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Unread
              {unreadCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-indigo-100 text-indigo-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter('read')}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                filter === 'read'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Read
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No notifications</h3>
              <p className="text-gray-600">
                {filter === 'unread'
                  ? "You've read all your notifications!"
                  : filter === 'read'
                  ? 'No read notifications yet.'
                  : 'No notifications to show.'}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 sm:p-5 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-indigo-50/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      notification.type === 'new_lead' ? 'bg-green-100' :
                      notification.type === 'status_change' ? 'bg-blue-100' :
                      notification.type === 'reminder' ? 'bg-yellow-100' :
                      'bg-purple-100'
                    }`}>
                      {getIcon(notification.type)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className={`text-sm font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-indigo-500 rounded-full"></span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatTime(notification.createdAt)}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-3">
                        {notification.leadId && (
                          <Link
                            to={`/admin/leads/${notification.leadId}`}
                            className="text-xs font-medium text-indigo-600 hover:text-indigo-700"
                          >
                            View Lead →
                          </Link>
                        )}
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700"
                          >
                            <Check className="w-3 h-3" />
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700 ml-auto"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bell className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Notification Settings</h3>
              <p className="text-sm text-gray-600 mt-1">
                Customize which notifications you receive and how you receive them in the{' '}
                <Link to="/admin/settings" className="text-indigo-600 hover:underline font-medium">
                  Settings page
                </Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
