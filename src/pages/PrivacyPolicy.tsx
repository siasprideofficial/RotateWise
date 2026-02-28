import { Shield, Lock, Eye, Database, UserCheck, Globe, Mail, Calendar, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "information-collection",
      icon: Database,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          text: "We may collect personal information that you voluntarily provide to us when you express interest in our services, participate in activities, or contact us. This includes:",
          list: [
            "Name and contact information (email, phone number, address)",
            "Financial information relevant to our services",
            "Employment and income details",
            "Credit card and payment-related information you choose to share",
            "Communication preferences"
          ]
        },
        {
          subtitle: "Automatically Collected Information",
          text: "When you visit our website, we may automatically collect certain information:",
          list: [
            "Device and browser information",
            "IP address and location data",
            "Pages visited and time spent on our site",
            "Referral source and navigation patterns"
          ]
        }
      ]
    },
    {
      id: "information-use",
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Primary Uses",
          text: "We use the information we collect for the following purposes:",
          list: [
            "To provide, operate, and maintain our services",
            "To process your inquiries and service requests",
            "To develop personalized financial management strategies",
            "To communicate with you about our services",
            "To send administrative information and updates",
            "To respond to your comments, questions, and requests",
            "To improve our website and services"
          ]
        },
        {
          subtitle: "Legal Basis for Processing",
          text: "We process your personal information based on:",
          list: [
            "Your consent for specific purposes",
            "Performance of a contract with you",
            "Compliance with legal obligations",
            "Our legitimate business interests"
          ]
        }
      ]
    },
    {
      id: "information-sharing",
      icon: UserCheck,
      title: "Information Sharing & Disclosure",
      content: [
        {
          subtitle: "We Do Not Sell Your Data",
          text: "We want to be absolutely clear: We do not sell, rent, or trade your personal information to third parties for their marketing purposes.",
          list: []
        },
        {
          subtitle: "Limited Sharing",
          text: "We may share your information only in the following circumstances:",
          list: [
            "With your explicit consent",
            "With service providers who assist our operations (under strict confidentiality)",
            "To comply with legal obligations or court orders",
            "To protect our rights, privacy, safety, or property",
            "In connection with a business transfer or merger (with prior notice)"
          ]
        }
      ]
    },
    {
      id: "data-security",
      icon: Lock,
      title: "Data Security",
      content: [
        {
          subtitle: "Our Security Measures",
          text: "We implement robust security measures to protect your personal information:",
          list: [
            "SSL/TLS encryption for data transmission",
            "Encrypted storage of sensitive information",
            "Regular security audits and vulnerability assessments",
            "Access controls and authentication protocols",
            "Employee training on data protection practices",
            "Secure data centers with physical security measures"
          ]
        },
        {
          subtitle: "Your Role in Security",
          text: "While we take extensive measures to protect your data, we encourage you to:",
          list: [
            "Use strong, unique passwords",
            "Keep your login credentials confidential",
            "Log out of your account after each session",
            "Report any suspicious activity immediately"
          ]
        }
      ]
    },
    {
      id: "your-rights",
      icon: Shield,
      title: "Your Privacy Rights",
      content: [
        {
          subtitle: "Your Rights Include",
          text: "Depending on your location, you may have the following rights:",
          list: [
            "Right to access your personal information",
            "Right to correct inaccurate data",
            "Right to request deletion of your data",
            "Right to restrict processing",
            "Right to data portability",
            "Right to withdraw consent",
            "Right to object to processing",
            "Right to lodge a complaint with supervisory authorities"
          ]
        },
        {
          subtitle: "Exercising Your Rights",
          text: "To exercise any of these rights, please contact us using the information provided below. We will respond to your request within 30 days.",
          list: []
        }
      ]
    },
    {
      id: "cookies",
      icon: Globe,
      title: "Cookies & Tracking Technologies",
      content: [
        {
          subtitle: "How We Use Cookies",
          text: "We use cookies and similar tracking technologies to:",
          list: [
            "Remember your preferences and settings",
            "Analyze website traffic and usage patterns",
            "Improve user experience and website performance",
            "Provide personalized content and recommendations"
          ]
        },
        {
          subtitle: "Managing Cookies",
          text: "You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.",
          list: []
        }
      ]
    },
    {
      id: "retention",
      icon: Calendar,
      title: "Data Retention",
      content: [
        {
          subtitle: "Retention Period",
          text: "We retain your personal information only for as long as necessary to:",
          list: [
            "Provide our services to you",
            "Comply with legal obligations",
            "Resolve disputes and enforce agreements",
            "Meet legitimate business purposes"
          ]
        },
        {
          subtitle: "After Retention Period",
          text: "Once the retention period expires, we securely delete or anonymize your personal information in accordance with our data retention policies.",
          list: []
        }
      ]
    },
    {
      id: "updates",
      icon: FileText,
      title: "Policy Updates",
      content: [
        {
          subtitle: "Changes to This Policy",
          text: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:",
          list: [
            "Posting the updated policy on our website",
            "Updating the 'Last Updated' date",
            "Sending email notification for significant changes",
            "Displaying a prominent notice on our website"
          ]
        }
      ]
    }
  ];

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6 animate-fade-in-down">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300">Your Privacy Matters</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            Privacy <span className="gradient-text">Policy</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            We are committed to protecting your privacy and ensuring the security of your personal information. 
            This policy explains how we collect, use, and safeguard your data.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-300">Last Updated: {lastUpdated}</span>
            </div>
            <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">GDPR-Aligned Data Practices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Quick Navigation */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Navigation</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {sections.map((section, index) => (
                <a
                  key={index}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-indigo-600/20 border border-white/10 hover:border-indigo-500/30 transition-all duration-300 group"
                >
                  <section.icon className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300" />
                  <span className="text-sm text-gray-300 group-hover:text-white truncate">{section.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div 
                key={index} 
                id={section.id}
                className="glass-card rounded-2xl p-6 md:p-8 hover-lift animate-fade-in-up scroll-mt-24"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                </div>

                <div className="space-y-6">
                  {section.content.map((block, blockIndex) => (
                    <div key={blockIndex}>
                      <h3 className="text-lg font-semibold text-indigo-300 mb-3">{block.subtitle}</h3>
                      <p className="text-gray-400 mb-4">{block.text}</p>
                      {block.list.length > 0 && (
                        <ul className="space-y-2">
                          {block.list.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-6 md:p-8 border-l-4 border-indigo-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Important Notice</h3>
                <p className="text-gray-400">
                  By using our services, you acknowledge that you have read and understood this Privacy Policy. 
                  If you do not agree with our practices, please do not use our services. If you have any questions 
                  or concerns about this policy, please contact us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 px-8 py-12 md:py-16 text-center">
              <Mail className="w-12 h-12 text-white/80 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Questions About Your Privacy?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                If you have any questions about this Privacy Policy or how we handle your personal information, 
                please don't hesitate to contact our privacy team.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="btn-primary bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  Contact Us
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5" />
                  <span>Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5" />
                  <span>Dedicated privacy team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Legal Pages */}
      <section className="py-12 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Related Legal Documents</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/terms" className="glass-card rounded-2xl p-6 hover-lift group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">Terms of Service</h3>
                  <p className="text-gray-400 text-sm">Read our terms and conditions</p>
                </div>
              </div>
            </Link>
            <Link to="/disclaimer" className="glass-card rounded-2xl p-6 hover-lift group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">Disclaimer</h3>
                  <p className="text-gray-400 text-sm">Important disclaimers about our services</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
