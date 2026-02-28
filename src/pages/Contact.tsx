import { useState, useRef, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  Shield,
  Users,
  Star,
  ArrowRight,
  Loader2,
  ChevronDown,
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

const workingHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 8:00 PM EST' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
  { day: 'Sunday', hours: 'Closed' },
];

const trustPoints = [
  { icon: Shield, label: '100% Confidential' },
  { icon: Users, label: '50,000+ Clients' },
  { icon: Star, label: '4.9/5 Rating' },
  { icon: Clock, label: '24hr Response' },
];

// Custom Dropdown Component for Select Fields
function CustomDropdown({ 
  value, 
  onChange,
  options,
  placeholder
}: { 
  value: string; 
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-left flex items-center justify-between transition-all duration-200 ${
          isOpen 
            ? 'border-indigo-500 ring-2 ring-indigo-500/20' 
            : 'border-white/10 hover:border-white/20'
        }`}
      >
        <span className={value ? 'text-white' : 'text-gray-500'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          {/* Dropdown Panel */}
          <div className="absolute z-50 w-full mt-2 py-2 rounded-xl border border-indigo-500/30 shadow-2xl shadow-black/70 animate-fade-in bg-[#0a0a12] backdrop-blur-none">
            <div className="px-4 py-3 border-b border-indigo-500/20 bg-indigo-950/50">
              <p className="text-xs text-indigo-300 uppercase tracking-wider font-semibold">Select an option</p>
            </div>
            <div className="py-1 max-h-64 overflow-y-auto bg-[#0a0a12]">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3.5 flex items-center gap-3 transition-all duration-150 border-b border-white/5 last:border-0 ${
                    value === option
                      ? 'bg-indigo-600/30 text-white'
                      : 'text-gray-300 hover:bg-indigo-900/40 hover:text-white'
                  }`}
                >
                  <span className="flex-1 text-left font-medium">{option}</span>
                  {value === option && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Contact() {
  const { settings, formFields, addSubmission } = useSite();
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sortedFields = [...formFields].sort((a, b) => a.order - b.order);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to context
    addSubmission(formData);
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({});
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our experts',
      value: settings.phone,
      action: `tel:${settings.phone.replace(/\D/g, '')}`,
    },
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a detailed inquiry',
      value: settings.email,
      action: `mailto:${settings.email}`,
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Quick response via chat',
      value: settings.phone,
      action: `https://wa.me/${settings.whatsappNumber}`,
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Our head office',
      value: settings.address,
      action: '#',
    },
  ];

  const renderField = (field: typeof formFields[0]) => {
    switch (field.type) {
      case 'textarea':
        return (
          <div key={field.id} className="md:col-span-2">
            <label htmlFor={field.name} className="block text-white font-medium mb-2">
              {field.label} {field.required && '*'}
            </label>
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
              placeholder={field.placeholder}
            />
          </div>
        );
      case 'select':
        return (
          <div key={field.id}>
            <label htmlFor={field.name} className="block text-white font-medium mb-2">
              {field.label} {field.required && '*'}
            </label>
            <CustomDropdown
              value={formData[field.name] || ''}
              onChange={(value) => handleChange(field.name, value)}
              options={field.options || []}
              placeholder={field.placeholder}
            />
          </div>
        );
      default:
        return (
          <div key={field.id}>
            <label htmlFor={field.name} className="block text-white font-medium mb-2">
              {field.label} {field.required && '*'}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder={field.placeholder}
            />
          </div>
        );
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-down">
              <Mail className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-300">24-Hour Response Guaranteed</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Get Your Free
              <span className="block gradient-text">Financial Consultation</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up">
              Take the first step towards financial clarity. Our expert team is ready to 
              help you manage your credit card payments efficiently.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300 glass-card rounded-full px-4 py-2">
                  <point.icon className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm">{point.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Contact Form & Info Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="glass-card rounded-3xl p-8 md:p-10 hover-lift">
              <h2 className="text-2xl font-bold text-white mb-2">Request Free Consultation</h2>
              <p className="text-gray-400 mb-8">Fill out the form and we'll get back to you within 24 hours.</p>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
                  <p className="text-gray-400 mb-6">
                    Your consultation request has been received. Our team will contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-indigo-400 hover:text-indigo-300 font-medium"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {sortedFields.map((field) => renderField(field))}
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500"
                    />
                    <label htmlFor="consent" className="text-gray-400 text-sm">
                      I agree to the privacy policy and consent to being contacted regarding my inquiry. 
                      I understand my information will be handled confidentially.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Request Free Consultation
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-500 text-sm">
                    No spam, no obligations. Your information is 100% secure.
                  </p>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.action}
                    target={item.action.startsWith('http') ? '_blank' : undefined}
                    rel={item.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="glass-card rounded-2xl p-6 hover-lift group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center mb-4 group-hover:from-indigo-500/40 group-hover:to-purple-600/40 transition-colors">
                      <item.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                    <p className="text-indigo-400 font-medium text-sm">{item.value}</p>
                  </a>
                ))}
              </div>

              {/* Working Hours */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-6 h-6 text-indigo-400" />
                  <h3 className="text-xl font-bold text-white">Working Hours</h3>
                </div>
                <div className="space-y-3">
                  {workingHours.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="text-gray-400">{schedule.day}</span>
                      <span className="text-white font-medium">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick WhatsApp Contact */}
              <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">Need Quick Help?</h3>
                    <p className="text-gray-400 text-sm mb-3">Chat with us instantly on WhatsApp</p>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(`Hello! I would like to learn more about ${settings.siteName}'s services.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-medium"
                    >
                      Start WhatsApp Chat
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Security Note */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <Shield className="w-8 h-8 text-green-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Your Privacy is Protected</h3>
                    <p className="text-gray-400 text-sm">
                      All communications are encrypted and your financial information is handled 
                      with the utmost confidentiality. We never share your data with third parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-4 h-80 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Visit Our Office</h3>
              <p className="text-gray-400">{settings.address}</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium mt-4"
              >
                Get Directions
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ContactFAQSection />
    </main>
  );
}

// Contact FAQ Section Component
function ContactFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How long does it take to get a response?',
      answer: 'We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly or reach out via WhatsApp.',
    },
    {
      question: 'Is the consultation really free?',
      answer: 'Yes, your initial consultation is completely free with no obligations. We believe in providing value upfront and helping you understand how we can assist.',
    },
    {
      question: 'What information should I prepare?',
      answer: 'Having your recent credit card statements and a general understanding of your monthly income would be helpful, but not required for the initial consultation.',
    },
    {
      question: 'Can I consult anonymously?',
      answer: 'While we need basic contact information for communication, we respect your privacy completely. You can share financial details at your own comfort level.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">Quick answers to common questions</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <h3 className="text-white font-semibold pr-8">{faq.question}</h3>
                <ArrowRight 
                  className={`w-5 h-5 text-indigo-400 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-90' : ''
                  }`} 
                />
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
