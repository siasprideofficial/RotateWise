import { FileText, Scale, Users, CreditCard, Shield, AlertTriangle, Ban, RefreshCw, Mail, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Terms = () => {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "acceptance",
      icon: CheckCircle,
      title: "Acceptance of Terms",
      content: `By accessing or using FinanceFlow's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

These terms constitute a legally binding agreement between you ("User," "you," or "your") and FinanceFlow ("Company," "we," "us," or "our"). We reserve the right to modify these terms at any time, and your continued use of our services constitutes acceptance of any modifications.`
    },
    {
      id: "services",
      icon: CreditCard,
      title: "Description of Services",
      content: `FinanceFlow provides credit card bill management consulting and financial assistance guidance services. Our services include:

• Financial consultation and assessment
• Credit card payment planning and strategy development
• Bill management guidance and optimization
• Financial education and resources
• Personalized financial recommendations

Our services are designed to help you better manage your credit card payments and improve your overall financial discipline. We provide guidance, education, and strategic planning to assist you in making informed financial decisions.`
    },
    {
      id: "eligibility",
      icon: Users,
      title: "Eligibility Requirements",
      content: `To use our services, you must:

• Be at least 18 years of age or the age of majority in your jurisdiction
• Have the legal capacity to enter into a binding agreement
• Provide accurate, current, and complete information during registration
• Maintain the security of your account credentials
• Not be prohibited from using our services under applicable laws

By using our services, you represent and warrant that you meet all eligibility requirements. We reserve the right to refuse service, terminate accounts, or cancel orders at our discretion.`
    },
    {
      id: "user-obligations",
      icon: Scale,
      title: "User Obligations",
      content: `When using our services, you agree to:

• Provide accurate, truthful, and complete information
• Maintain the confidentiality of your account information
• Notify us immediately of any unauthorized use of your account
• Use our services only for lawful purposes
• Not engage in any activity that interferes with our services
• Not attempt to gain unauthorized access to our systems
• Not misrepresent your identity or affiliation
• Comply with all applicable laws and regulations

You are solely responsible for all activities that occur under your account and for ensuring that your use of our services complies with all applicable laws.`
    },
    {
      id: "fees",
      icon: CreditCard,
      title: "Fees and Payment",
      content: `Our service fees are communicated clearly before you engage our services:

• Initial consultation may be offered free of charge
• Service fees are disclosed upfront before any paid engagement
• Payment terms are agreed upon before service commencement
• All fees are subject to applicable taxes
• Refund policies are provided at the time of service agreement

We reserve the right to modify our fees with prior notice. Any changes to fees will not affect services already contracted.`
    },
    {
      id: "intellectual-property",
      icon: Shield,
      title: "Intellectual Property",
      content: `All content, features, and functionality on our website and services are owned by FinanceFlow and are protected by intellectual property laws:

• Our trademarks, logos, and service marks may not be used without permission
• Content may not be reproduced, distributed, or modified without authorization
• You may not remove any copyright or proprietary notices
• User feedback and suggestions may be used by us without obligation

You retain ownership of any personal information you provide, but grant us a license to use it for providing our services as described in our Privacy Policy.`
    },
    {
      id: "limitations",
      icon: AlertTriangle,
      title: "Limitations and Disclaimers",
      content: `IMPORTANT: Please read this section carefully.

Our services are provided "AS IS" and "AS AVAILABLE" without warranties of any kind, either express or implied. We do not guarantee:

• The accuracy or completeness of any information provided
• That our services will meet your specific requirements
• That our services will be uninterrupted, timely, or error-free
• Any particular financial outcome or result

FinanceFlow is NOT a bank, lender, financial institution, or credit counseling agency. We provide educational guidance and consulting services only. Any financial decisions you make are your sole responsibility.

To the maximum extent permitted by law, we disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement.`
    },
    {
      id: "liability",
      icon: Scale,
      title: "Limitation of Liability",
      content: `To the fullest extent permitted by applicable law:

• We shall not be liable for any indirect, incidental, special, consequential, or punitive damages
• Our total liability shall not exceed the amount paid by you for our services in the 12 months preceding the claim
• We are not liable for any loss or damage resulting from your reliance on information obtained through our services
• We are not responsible for any third-party actions or services

Some jurisdictions do not allow the exclusion of certain warranties or limitation of liability, so some of the above limitations may not apply to you.`
    },
    {
      id: "prohibited",
      icon: Ban,
      title: "Prohibited Activities",
      content: `You are prohibited from using our services to:

• Violate any applicable laws, regulations, or third-party rights
• Provide false, misleading, or fraudulent information
• Engage in any activity that could harm our reputation or business
• Attempt to circumvent any security measures
• Use automated systems to access our services without permission
• Harass, abuse, or harm other users or our staff
• Transmit viruses, malware, or other harmful code
• Engage in any form of unauthorized data collection

Violation of these prohibitions may result in immediate termination of your access to our services and potential legal action.`
    },
    {
      id: "termination",
      icon: RefreshCw,
      title: "Termination",
      content: `Either party may terminate the service relationship:

• You may terminate by discontinuing use of our services and notifying us in writing
• We may terminate or suspend your access at any time, with or without cause
• Upon termination, your right to use our services ceases immediately
• Provisions that by their nature should survive termination will remain in effect

We will make reasonable efforts to notify you before termination, except in cases of violation of these terms, illegal activity, or circumstances requiring immediate action.`
    },
    {
      id: "disputes",
      icon: Scale,
      title: "Dispute Resolution",
      content: `In the event of any dispute arising from these terms or our services:

• You agree to first attempt to resolve disputes informally by contacting us
• If informal resolution fails, disputes will be resolved through binding arbitration
• Arbitration will be conducted in accordance with applicable arbitration rules
• Class action lawsuits and class-wide arbitrations are not permitted
• You retain the right to bring claims in small claims court

These terms are governed by applicable laws without regard to conflict of law principles. Any legal action must be brought within one year of the claim arising.`
    },
    {
      id: "modifications",
      icon: RefreshCw,
      title: "Modifications to Terms",
      content: `We reserve the right to modify these Terms of Service at any time:

• Material changes will be communicated via email or website notice
• The "Last Updated" date will be revised accordingly
• Continued use after modifications constitutes acceptance
• If you disagree with changes, you must discontinue use of our services

We encourage you to review these terms periodically to stay informed of any updates.`
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
            <FileText className="w-4 h-4 text-indigo-400" />
            <span className="text-sm text-gray-300">Legal Agreement</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            Terms of <span className="gradient-text">Service</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Please read these Terms of Service carefully before using our services. 
            By accessing or using our services, you agree to be bound by these terms.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-300">Last Updated: {lastUpdated}</span>
            </div>
            <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
              <Scale className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Legally Binding</span>
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
              {sections.slice(0, 8).map((section, index) => (
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

      {/* Important Notice Banner */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20" />
            <div className="relative z-10 p-6 md:p-8 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-300 mb-2">Important Legal Notice</h3>
                <p className="text-gray-300">
                  FinanceFlow provides financial assistance guidance and consulting services only. We are <strong>NOT</strong> a bank, 
                  lender, credit counseling agency, or financial institution. We do not provide loans, credit, or financial products. 
                  All financial decisions remain your responsibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div 
                key={index} 
                id={section.id}
                className="glass-card rounded-2xl p-6 md:p-8 hover-lift animate-fade-in-up scroll-mt-24"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-indigo-400 text-sm font-medium">Section {index + 1}</span>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <div key={pIndex} className="mb-4">
                      {paragraph.startsWith('•') ? (
                        <ul className="space-y-2">
                          {paragraph.split('\n').map((line, lIndex) => (
                            <li key={lIndex} className="flex items-start gap-3">
                              <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{line.replace('• ', '')}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400 leading-relaxed">{paragraph}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Agreement Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-6 md:p-8 border border-indigo-500/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Your Agreement</h3>
                <p className="text-gray-400 mb-4">
                  By using FinanceFlow's services, you acknowledge that you have read, understood, and agree to be bound 
                  by these Terms of Service. If you do not agree to these terms, please discontinue use of our services immediately.
                </p>
                <p className="text-gray-400">
                  We recommend that you print or save a copy of these Terms of Service for your records.
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
                Questions About These Terms?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                If you have any questions about these Terms of Service, please contact us. 
                Our team is here to help clarify any concerns.
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
                  <span>Quick response time</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5" />
                  <span>Clear explanations</span>
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
            <Link to="/privacy" className="glass-card rounded-2xl p-6 hover-lift group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors">Privacy Policy</h3>
                  <p className="text-gray-400 text-sm">Learn how we protect your data</p>
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

export default Terms;
