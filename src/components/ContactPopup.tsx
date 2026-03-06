import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { leadsAPI } from '../services/api';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup = ({ isOpen, onClose }: ContactPopupProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.name.trim()) newErrors.name = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = true;
    if (!formData.details.trim()) newErrors.details = true;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Save lead to backend
        await leadsAPI.create({
          name: formData.name,
          email: formData.email,
          message: formData.details,
          source: 'popup',
        });
      } catch (error) {
        console.error('Error saving lead:', error);
        // Continue anyway - we'll still redirect to contact page
      }
      
      setIsSubmitting(false);
      onClose();
      
      // Navigate to contact page with pre-filled data
      navigate(`/contact?name=${encodeURIComponent(formData.name)}&email=${encodeURIComponent(formData.email)}&details=${encodeURIComponent(formData.details)}`);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn" />
      
      {/* Popup */}
      <div 
        className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl animate-popupIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all duration-200 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Gradient accent */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl" />
        
        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="text-center mb-5">
            <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">Get Free Consultation</h3>
            <p className="text-gray-500 text-sm mt-1">Quick response within 24 hours</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name *"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm ${
                  errors.name 
                    ? 'border-red-300 bg-red-50 focus:border-red-500' 
                    : 'border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/30'
                } outline-none`}
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address *"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 text-sm ${
                  errors.email 
                    ? 'border-red-300 bg-red-50 focus:border-red-500' 
                    : 'border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/30'
                } outline-none`}
              />
            </div>

            <div>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Tell us about your loan requirements *"
                rows={2}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 resize-none text-sm ${
                  errors.details 
                    ? 'border-red-300 bg-red-50 focus:border-red-500' 
                    : 'border-gray-200 focus:border-indigo-500 focus:bg-indigo-50/30'
                } outline-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-sm hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Request Free Consultation'}
            </button>
          </form>

          {/* Trust */}
          <p className="text-center text-xs text-gray-400 mt-4">
            🔒 Your information is secure and private
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
