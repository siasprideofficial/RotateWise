import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import {
  Search,
  Filter,
  Eye,
  Trash2,
  ChevronDown,
  Users,
  X
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

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [deleteModal, setDeleteModal] = useState<string | null>(null);

  useEffect(() => {
    const storedLeads = localStorage.getItem('leads');
    if (storedLeads) {
      setLeads(JSON.parse(storedLeads));
    }
  }, []);

  useEffect(() => {
    let result = [...leads];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        lead =>
          lead.name.toLowerCase().includes(query) ||
          lead.email.toLowerCase().includes(query) ||
          (lead.phone && lead.phone.includes(query))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter(lead => lead.status === statusFilter);
    }

    // Source filter
    if (sourceFilter !== 'all') {
      result = result.filter(lead => lead.source === sourceFilter);
    }

    // Sort by date (newest first)
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setFilteredLeads(result);
  }, [leads, searchQuery, statusFilter, sourceFilter]);

  const handleDelete = (id: string) => {
    const updatedLeads = leads.filter(lead => lead.id !== id);
    setLeads(updatedLeads);
    localStorage.setItem('leads', JSON.stringify(updatedLeads));
    setDeleteModal(null);
  };

  const updateStatus = (id: string, newStatus: Lead['status']) => {
    const updatedLeads = leads.map(lead =>
      lead.id === id ? { ...lead, status: newStatus } : lead
    );
    setLeads(updatedLeads);
    localStorage.setItem('leads', JSON.stringify(updatedLeads));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
            <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
            <p className="text-gray-600">Manage and track all your consultation requests.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-900">{filteredLeads.length}</span>
            of {leads.length} leads
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-500" />
              <span>Filters</span>
              <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Filter Dropdowns */}
            <div className={`flex flex-col sm:flex-row gap-3 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none bg-white"
              >
                <option value="all">All Sources</option>
                <option value="popup">Popup Form</option>
                <option value="contact-page">Contact Page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table/Cards */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lead</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-sm">
                            {lead.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{lead.name}</p>
                          {lead.loanAmount && (
                            <p className="text-sm text-gray-500">{lead.loanAmount}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900">{lead.email}</p>
                      {lead.phone && <p className="text-sm text-gray-500">{lead.phone}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                        {lead.source.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                        className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize border-0 cursor-pointer ${getStatusBadge(lead.status)}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm whitespace-nowrap">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/leads/${lead.id}`}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => setDeleteModal(lead.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-100">
            {filteredLeads.map((lead) => (
              <div key={lead.id} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {lead.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.email}</p>
                    </div>
                  </div>
                  <select
                    value={lead.status}
                    onChange={(e) => updateStatus(lead.id, e.target.value as Lead['status'])}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize border-0 cursor-pointer ${getStatusBadge(lead.status)}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div className="space-y-2 mb-3">
                  {lead.phone && (
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-400">Phone:</span> {lead.phone}
                    </p>
                  )}
                  {lead.loanAmount && (
                    <p className="text-sm text-gray-600">
                      <span className="text-gray-400">Loan:</span> {lead.loanAmount}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">{formatDate(lead.createdAt)}</p>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <Link
                    to={`/admin/leads/${lead.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  <button
                    onClick={() => setDeleteModal(lead.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredLeads.length === 0 && (
            <div className="px-6 py-16 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No leads found</h3>
              <p className="text-gray-500">
                {searchQuery || statusFilter !== 'all' || sourceFilter !== 'all'
                  ? 'Try adjusting your filters.'
                  : 'Leads will appear here once someone submits a form.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Lead</h3>
              <button
                onClick={() => setDeleteModal(null)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this lead? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteModal)}
                className="flex-1 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
