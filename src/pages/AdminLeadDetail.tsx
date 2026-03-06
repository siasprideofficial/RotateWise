import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  DollarSign,
  Calendar,
  MessageSquare,
  Trash2,
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

export default function AdminLeadDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const storedLeads = localStorage.getItem('leads');
    if (storedLeads) {
      const leads: Lead[] = JSON.parse(storedLeads);
      const foundLead = leads.find(l => l.id === id);
      if (foundLead) {
        setLead(foundLead);
      } else {
        navigate('/admin/leads');
      }
    }
  }, [id, navigate]);

  const updateStatus = (newStatus: Lead['status']) => {
    if (!lead) return;

    const storedLeads = localStorage.getItem('leads');
    if (storedLeads) {
      const leads: Lead[] = JSON.parse(storedLeads);
      const updatedLeads = leads.map(l =>
        l.id === lead.id ? { ...l, status: newStatus } : l
      );
      localStorage.setItem('leads', JSON.stringify(updatedLeads));
      setLead({ ...lead, status: newStatus });
    }
  };

  const handleDelete = () => {
    const storedLeads = localStorage.getItem('leads');
    if (storedLeads) {
      const leads: Lead[] = JSON.parse(storedLeads);
      const updatedLeads = leads.filter(l => l.id !== id);
      localStorage.setItem('leads', JSON.stringify(updatedLeads));
      navigate('/admin/leads');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status: Lead['status']) => {
    const styles = {
      new: 'bg-blue-100 text-blue-700 border-blue-200',
      contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      converted: 'bg-green-100 text-green-700 border-green-200',
      closed: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    return styles[status];
  };

  if (!lead) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              to="/admin/leads"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lead Details</h1>
              <p className="text-gray-600">View and manage this lead</p>
            </div>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-200 rounded-xl hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete Lead
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">
                    {lead.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900">{lead.name}</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium capitalize border ${getStatusBadge(lead.status)}`}>
                      {lead.status}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 capitalize">
                      {lead.source.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <a href={`mailto:${lead.email}`} className="text-gray-900 font-medium hover:text-indigo-600">
                      {lead.email}
                    </a>
                  </div>
                </div>

                {lead.phone && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a href={`tel:${lead.phone}`} className="text-gray-900 font-medium hover:text-indigo-600">
                        {lead.phone}
                      </a>
                    </div>
                  </div>
                )}

                {lead.loanAmount && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Loan Amount</p>
                      <p className="text-gray-900 font-medium">{lead.loanAmount}</p>
                    </div>
                  </div>
                )}

                {lead.employmentStatus && (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Employment</p>
                      <p className="text-gray-900 font-medium">{lead.employmentStatus}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Details/Message */}
            {lead.details && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">Additional Details</h3>
                </div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-xl">
                  {lead.details}
                </p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${lead.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
                {lead.phone && (
                  <a
                    href={`tel:${lead.phone}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Update */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Status</h3>
              <div className="space-y-2">
                {(['new', 'contacted', 'converted', 'closed'] as Lead['status'][]).map((status) => (
                  <button
                    key={status}
                    onClick={() => updateStatus(status)}
                    className={`w-full py-3 px-4 rounded-xl text-left font-medium capitalize transition-all ${
                      lead.status === status
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Lead Created</p>
                    <p className="text-sm text-gray-500">{formatDate(lead.createdAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Lead</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{lead.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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
