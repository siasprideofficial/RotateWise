import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import CustomSelect from '../components/CustomSelect';
import { Phone, Mail, MapPin, Clock, Globe } from 'lucide-react';
import { leadsAPI, siteInfoAPI, formFieldsAPI } from '../services/api';

interface ContactInfo {
  id: number;
  type: string;
  icon: string;
  label: string;
  value: string;
  link?: string;
  enabled: boolean;
}

interface FormField {
  id: number;
  field_name: string;
  label: string;
  field_type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  required: boolean;
  enabled: boolean;
  options?: { id: number; option_value: string; option_label: string }[];
}

const defaultFields: FormField[] = [
  {
    id: 1,
    field_name: 'fullName',
    label: 'Full Name',
    field_type: 'text',
    placeholder: 'John Doe',
    required: true,
    enabled: true,
  },
  {
    id: 2,
    field_name: 'email',
    label: 'Email Address',
    field_type: 'email',
    placeholder: 'john@example.com',
    required: true,
    enabled: true,
  },
  {
    id: 3,
    field_name: 'phone',
    label: 'Phone Number',
    field_type: 'tel',
    placeholder: '+1 (555) 000-0000',
    required: true,
    enabled: true,
  },
  {
    id: 4,
    field_name: 'loanAmount',
    label: 'Loan Amount Interested',
    field_type: 'select',
    placeholder: 'Select loan amount',
    required: true,
    enabled: true,
    options: [
      { id: 1, option_value: 'under-5000', option_label: 'Under $5,000' },
      { id: 2, option_value: '5000-10000', option_label: '$5,000 - $10,000' },
      { id: 3, option_value: '10000-25000', option_label: '$10,000 - $25,000' },
      { id: 4, option_value: '25000-50000', option_label: '$25,000 - $50,000' },
      { id: 5, option_value: '50000-plus', option_label: '$50,000+' },
    ],
  },
  {
    id: 5,
    field_name: 'employmentStatus',
    label: 'Employment Status',
    field_type: 'select',
    placeholder: 'Select employment status',
    required: true,
    enabled: true,
    options: [
      { id: 1, option_value: 'employed-full', option_label: 'Employed Full-Time' },
      { id: 2, option_value: 'employed-part', option_label: 'Employed Part-Time' },
      { id: 3, option_value: 'self-employed', option_label: 'Self-Employed' },
      { id: 4, option_value: 'business-owner', option_label: 'Business Owner' },
      { id: 5, option_value: 'retired', option_label: 'Retired' },
      { id: 6, option_value: 'student', option_label: 'Student' },
      { id: 7, option_value: 'other', option_label: 'Other' },
    ],
  },
  {
    id: 6,
    field_name: 'message',
    label: 'Additional Information',
    field_type: 'textarea',
    placeholder: 'Tell us more about your requirements...',
    required: false,
    enabled: true,
  },
];

const defaultContactInfo: ContactInfo[] = [
  { id: 1, type: 'phone', icon: 'phone', label: 'Phone', value: '+91 98765 43210', link: 'tel:+919876543210', enabled: true },
  { id: 2, type: 'email', icon: 'email', label: 'Email', value: 'contact@rotatewise.com', link: 'mailto:contact@rotatewise.com', enabled: true },
  { id: 3, type: 'address', icon: 'address', label: 'Office', value: '123, Financial District, Mumbai, Maharashtra 400001', enabled: true },
  { id: 4, type: 'hours', icon: 'hours', label: 'Business Hours', value: 'Monday - Saturday: 9:00 AM - 7:00 PM', enabled: true },
];

const Contact = () => {
  const location = useLocation();
  const [showPrefilledNotice, setShowPrefilledNotice] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>(defaultContactInfo);

  // Load form fields and contact info from API
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load form fields
        const fieldsResponse = await formFieldsAPI.getAll();
        if (fieldsResponse.fields && fieldsResponse.fields.length > 0) {
          const enabledFields = fieldsResponse.fields.filter(f => f.enabled);
          setFormFields(enabledFields);
          
          const initialData: Record<string, string> = {};
          enabledFields.forEach(field => {
            initialData[field.field_name] = '';
          });
          setFormData(initialData);
        } else {
          throw new Error('No fields from API');
        }
      } catch {
        // Fallback to default fields
        setFormFields(defaultFields.filter(f => f.enabled));
        const initialData: Record<string, string> = {};
        defaultFields.filter(f => f.enabled).forEach(field => {
          initialData[field.field_name] = '';
        });
        setFormData(initialData);
      }

      try {
        // Load site info including contact info
        const siteResponse = await siteInfoAPI.get();
        if (siteResponse.contactInfo && siteResponse.contactInfo.length > 0) {
          setContactInfo(siteResponse.contactInfo.filter(c => c.enabled));
        }
      } catch {
        // Keep default contact info
      }
    };

    loadData();
  }, []);

  // Parse URL params for pre-filled data from popup
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    const email = params.get('email');
    const details = params.get('details');
    
    if (name || email || details) {
      setFormData(prev => ({
        ...prev,
        fullName: name || prev.fullName || '',
        email: email || prev.email || '',
        message: details || prev.message || '',
      }));
      setShowPrefilledNotice(true);
      
      setTimeout(() => setShowPrefilledNotice(false), 5000);
    }
  }, [location, formFields]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    formFields.forEach(field => {
      if (field.required && !formData[field.field_name]?.trim()) {
        newErrors[field.field_name] = `${field.label} is required`;
      }
      
      if (field.field_type === 'email' && formData[field.field_name] && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[field.field_name])) {
        newErrors[field.field_name] = 'Please enter a valid email';
      }
      
      if (field.field_type === 'tel' && formData[field.field_name] && !/^[0-9+\s()-]{10,}$/.test(formData[field.field_name])) {
        newErrors[field.field_name] = 'Please enter a valid phone number';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getOptionLabel = (field: FormField, value: string) => {
    if (field.options) {
      const option = field.options.find(o => o.option_value === value);
      return option?.option_label || value;
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Get labels for select fields
        const loanAmountField = formFields.find(f => f.field_name === 'loanAmount');
        const employmentField = formFields.find(f => f.field_name === 'employmentStatus');
        
        await leadsAPI.create({
          name: formData.fullName || formData.name || '',
          email: formData.email || '',
          phone: formData.phone || '',
          loanAmount: loanAmountField ? getOptionLabel(loanAmountField, formData.loanAmount) : formData.loanAmount,
          employmentStatus: employmentField ? getOptionLabel(employmentField, formData.employmentStatus) : formData.employmentStatus,
          message: formData.message || '',
          source: 'contact-page',
        });
        
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting your request. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const renderField = (field: FormField) => {
    switch (field.field_type) {
      case 'textarea':
        return (
          <textarea
            name={field.field_name}
            value={formData[field.field_name] || ''}
            onChange={handleChange}
            rows={4}
            className={`form-input w-full px-5 py-4 rounded-xl resize-none ${
              errors[field.field_name] ? 'border-red-400 bg-red-50' : ''
            }`}
            placeholder={field.placeholder}
          />
        );
      
      case 'select':
        return (
          <CustomSelect
            options={field.options?.map(o => ({ value: o.option_value, label: o.option_label })) || []}
            value={formData[field.field_name] || ''}
            onChange={(value) => handleSelectChange(field.field_name, value)}
            placeholder={field.placeholder}
            error={errors[field.field_name]}
          />
        );
      
      default:
        return (
          <input
            type={field.field_type}
            name={field.field_name}
            value={formData[field.field_name] || ''}
            onChange={handleChange}
            className={`form-input w-full px-5 py-4 rounded-xl ${
              errors[field.field_name] ? 'border-red-400 bg-red-50' : ''
            }`}
            placeholder={field.placeholder}
          />
        );
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="text-center max-w-lg animate-fadeInUp">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/30">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your consultation request has been submitted successfully. Our team will contact you within 24 hours.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative py-32 lg:py-40 overflow-hidden">
        <div className="mesh-gradient"></div>
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fadeInUp">
              Get Your Free
              <span className="block text-gradient-light">Consultation</span>
            </h1>
            <p className="text-xl text-white/70 animate-fadeInUp delay-200">
              Share your details and our experts will contact you within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <AnimatedSection>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  Let's <span className="text-gradient-primary">Connect</span>
                </h2>
                <p className="text-lg text-gray-600 mb-10">
                  Ready to take control of your finances? Fill out the form and our expert consultants will guide you through your credit card loan options.
                </p>

                {/* Contact Cards */}
                <div className="space-y-6">
                  {contactInfo.map((info) => {
                    const gradients: Record<string, string> = {
                      phone: 'from-indigo-500 to-purple-600',
                      email: 'from-cyan-500 to-blue-600',
                      address: 'from-purple-500 to-pink-600',
                      hours: 'from-green-500 to-emerald-600',
                      custom: 'from-orange-500 to-red-600',
                    };

                    const getIcon = (iconType: string) => {
                      switch (iconType) {
                        case 'phone': return <Phone className="w-7 h-7 text-white" />;
                        case 'email': return <Mail className="w-7 h-7 text-white" />;
                        case 'address': return <MapPin className="w-7 h-7 text-white" />;
                        case 'hours': return <Clock className="w-7 h-7 text-white" />;
                        default: return <Globe className="w-7 h-7 text-white" />;
                      }
                    };

                    return (
                      <div key={info.id} className="premium-card rounded-2xl p-6 flex items-start gap-5">
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradients[info.type] || gradients.custom} flex items-center justify-center flex-shrink-0`}>
                          {getIcon(info.icon)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.label}</h3>
                          {info.link ? (
                            <a href={info.link} className="text-gray-600 hover:text-indigo-600 transition-colors">
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-gray-600">{info.value}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection delay={200}>
              <div className="premium-card rounded-3xl p-8 lg:p-10">
                {/* Prefilled Notice */}
                {showPrefilledNotice && (
                  <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-700 text-sm">
                      We've pre-filled some information from your previous submission. Please complete the remaining fields.
                    </p>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Consultation</h3>
                <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you shortly.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dynamic Form Fields */}
                  {formFields.map((field) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label} {field.required && '*'}
                      </label>
                      {renderField(field)}
                      {errors[field.field_name] && field.field_type !== 'select' && (
                        <p className="text-red-500 text-sm mt-1.5">{errors[field.field_name]}</p>
                      )}
                    </div>
                  ))}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Free Consultation'}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to our{' '}
                    <a href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</a>
                    {' '}and{' '}
                    <a href="/terms-of-service" className="text-indigo-600 hover:underline">Terms of Service</a>
                  </p>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 lg:py-32 section-gradient-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
                FAQs
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Frequently Asked <span className="text-gradient-primary">Questions</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              {
                question: 'Is the consultation really free?',
                answer: 'Yes, our initial consultation is completely free. We believe in building trust first before any commitment.',
              },
              {
                question: 'How long does the consultation process take?',
                answer: 'The initial consultation typically takes 30-45 minutes. We\'ll understand your needs and provide personalized recommendations.',
              },
              {
                question: 'What documents do I need?',
                answer: 'For the initial consultation, you don\'t need any documents. We\'ll guide you on what\'s needed once we understand your requirements.',
              },
              {
                question: 'How soon will you contact me?',
                answer: 'Our team will contact you within 24 hours of submitting your request, usually much sooner during business hours.',
              },
            ].map((faq, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="premium-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
