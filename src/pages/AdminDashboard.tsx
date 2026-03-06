import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Eye
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  loanAmount?: string;
  employmentStatus?: string;
  details?: string;
  status: 'new' | 'contacted' | 'converted' | 'closed';
  createdAt: string;
  source: 'popup' | 'contact-page';
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0
  });

  useEffect(() => {
    // Load leads from localStorage
    const storedLeads = localStorage.getItem('leads');
    if (storedLeads) {
      const parsedLeads: Lead[] = JSON.parse(storedLeads);
      setLeads(parsedLeads);
      
      // Calculate stats
      setStats({
        total: parsedLeads.length,
        new: parsedLeads.filter(l => l.status === 'new').length,
        contacted: parsedLeads.filter(l => l.status === 'contacted').length,
        converted: parsedLeads.filter(l => l.status === 'converted').length
      });
    } else {
      // Initialize with demo leads
      const demoLeads: Lead[] = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+1 234 567 8901',
          loanAmount: '$10,000 - $25,000',
          employmentStatus: 'Employed Full-Time',
          details: 'Looking for a personal loan for home renovation',
          status: 'new',
          createdAt: new Date().toISOString(),
          source: 'contact-page'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '+1 234 567 8902',
          loanAmount: '$5,000 - $10,000',
          employmentStatus: 'Self-Employed',
          details: 'Need consultation for business expansion',
          status: 'contacted',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          source: 'popup'
        },
        {
          id: '3',
          name: 'Michael Chen',
          email: 'michael.c@email.com',
          phone: '+1 234 567 8903',
          loanAmount: '$25,000 - $50,000',
          employmentStatus: 'Business Owner',
          details: 'Interested in credit card consolidation',
          status: 'converted',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          source: 'contact-page'
        },
        {
          id: '4',
          name: 'Emily Davis',
          email: 'emily.d@email.com',
          details: 'Quick inquiry about interest rates',
          status: 'new',
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          source: 'popup'
        },
        {
          id: '5',
          name: 'Robert Wilson',
          email: 'robert.w@email.com',
          phone: '+1 234 567 8905',
          loanAmount: 'Under $5,000',
          employmentStatus: 'Employed Part-Time',
          details: 'Small personal loan inquiry',
          status: 'new',
          createdAt: new Date(Date.now() - 7200000).toISOString(),
          source: 'contact-page'
        }
      ];
      
      localStorage.setItem('leads', JSON.stringify(demoLeads));
      setLeads(demoLeads);
      setStats({
        total: demoLeads.length,
        new: demoLeads.filter(l => l.status === 'new').length,
        contacted: demoLeads.filter(l => l.status === 'contacted').length,
        converted: demoLeads.filter(l => l.status === 'converted').length
      });
    }
  }, []);

  const statCards = [
    {
      title: 'Total Leads',
      value: stats.total,
      change: '+12%',
      positive: true,
      icon: Users,
      color: 'from-indigo-500 to-purple-600'
    },
    {
      title: 'New Leads',
      value: stats.new,
      change: '+8%',
      positive: true,
      icon: Clock,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Contacted',
      value: stats.contacted,
      change: '+15%',
      positive: true,
      icon: TrendingUp,
      color: 'from-orange-500 to-pink-500'
    },
    {
      title: 'Converted',
      value: stats.converted,
      change: '+5%',
      positive: true,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getStatusBadge = (status: Lead['status']) => {
    const styles = {
      new: 'bg-blue-100 text-blue-700',
      contacted: 'bg-yellow-100 text-yellow-700',
      converted: 'bg-green-100 text-green-700',
      closed: 'bg-gray-100 text-gray-700'
    };
    return styles[status];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's an overview of your leads.</p>
          </div>
          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all"
          >
            View All Leads
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600 text-sm mt-1">{stat.title}</p>
              </div>
            );
          })}
        </div>

        {/* Recent Leads */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
            <Link
              to="/admin/leads"
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
            >
              View All
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">
                            {lead.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{lead.email}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                        {lead.source.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">{formatDate(lead.createdAt)}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/admin/leads/${lead.id}`}
                        className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {lead.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.email}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusBadge(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{formatDate(lead.createdAt)}</span>
                  <Link
                    to={`/admin/leads/${lead.id}`}
                    className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {leads.length === 0 && (
            <div className="px-6 py-12 text-center">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No leads yet. They will appear here once someone submits a form.</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
