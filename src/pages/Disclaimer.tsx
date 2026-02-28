import { AlertTriangle, Shield, Building2, TrendingUp, Scale, FileText, Info, Mail, Calendar, CheckCircle, AlertCircle, XCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Disclaimer = () => {
  const lastUpdated = "January 15, 2025";

  const importantDisclaimer = {
    title: "Important Service Disclaimer",
    content: `FinanceFlow provides financial assistance guidance, credit card bill management consulting, and educational services only. We are committed to full transparency about the nature of our services.

We are NOT a bank, lender, credit union, financial institution, credit counseling agency, debt settlement company, or any other regulated financial entity.

We do NOT:
• Provide loans or credit of any kind
• Accept deposits or manage funds
• Make payments on your behalf
• Negotiate directly with creditors
• Guarantee specific financial outcomes
• Provide investment advice or securities recommendations

Our role is strictly limited to providing guidance, education, and strategic planning to help you make informed decisions about managing your credit card payments and improving your financial discipline.`
  };

  const disclaimers = [
    {
      icon: Building2,
      title: "Not a Financial Institution",
      content: `FinanceFlow is a financial consulting and guidance service. We are not licensed as a bank, credit union, or any other financial institution under any jurisdiction's banking laws.

We do not hold any banking licenses, lending permits, or financial services authorizations that would allow us to accept deposits, provide credit, or engage in banking activities.

Our services are limited to:
• Educational guidance and information
• Financial planning consultation
• Bill management strategy development
• Credit card payment optimization advice`,
      severity: "critical"
    },
    {
      icon: TrendingUp,
      title: "No Guaranteed Results",
      content: `We do not and cannot guarantee any specific financial outcomes from using our services. Financial situations are unique and depend on many factors beyond our control.

While our guidance is based on sound financial principles and best practices, your results may vary based on:
• Your individual financial circumstances
• Your ability to implement recommendations
• Changes in your income or expenses
• Economic conditions and external factors
• Decisions made by creditors or institutions

Past success stories or testimonials do not guarantee similar results for you.`,
      severity: "warning"
    },
    {
      icon: Scale,
      title: "Not Legal or Tax Advice",
      content: `The information and guidance provided by FinanceFlow does not constitute legal, tax, or accounting advice. We are not attorneys, CPAs, or licensed tax professionals.

For matters involving:
• Legal disputes with creditors
• Bankruptcy considerations
• Tax implications of debt settlement
• Legal rights regarding debt collection
• Complex financial legal matters

You should consult with appropriately licensed professionals in your jurisdiction. Our guidance is for educational and informational purposes only.`,
      severity: "warning"
    },
    {
      icon: Shield,
      title: "Information Accuracy",
      content: `While we strive to provide accurate and up-to-date information, we cannot guarantee that all information on our website or in our consultations is complete, current, or error-free.

Financial regulations, credit card terms, and best practices change frequently. Information that was accurate at one time may become outdated.

We recommend:
• Verifying important information independently
• Consulting official sources for regulations
• Reviewing current terms with your financial institutions
• Seeking professional advice for complex situations`,
      severity: "info"
    },
    {
      icon: AlertTriangle,
      title: "Third-Party Relationships",
      content: `FinanceFlow is independent and is not affiliated with, endorsed by, or partnered with any:
• Credit card companies or issuers
• Banks or financial institutions
• Credit bureaus or reporting agencies
• Government agencies or regulators

Any references to third-party companies, products, or services are for informational purposes only and do not imply endorsement or affiliation.

We do not receive compensation from financial institutions for recommending their products or services.`,
      severity: "info"
    },
    {
      icon: Info,
      title: "Educational Purpose",
      content: `All content on our website, including articles, guides, calculators, and consultation advice, is provided for educational and informational purposes only.

This content is intended to help you:
• Understand credit card management concepts
• Learn about financial planning strategies
• Make more informed financial decisions
• Develop better money management habits

It should not be interpreted as specific advice tailored to your unique situation without a thorough consultation.`,
      severity: "info"
    }
  ];

  const userResponsibilities = [
    "You are responsible for all financial decisions you make",
    "You should verify all information before acting on it",
    "You should consult licensed professionals for legal, tax, or investment matters",
    "You must comply with all terms and conditions of your credit agreements",
    "You are responsible for making your own payments to creditors",
    "You should report any concerns or issues to us immediately"
  ];

  const weDoNot = [
    { text: "Provide loans or credit", icon: XCircle },
    { text: "Make payments on your behalf", icon: XCircle },
    { text: "Negotiate with creditors for you", icon: XCircle },
    { text: "Guarantee debt reduction", icon: XCircle },
    { text: "Provide legal or tax advice", icon: XCircle },
    { text: "Accept or manage your funds", icon: XCircle }
  ];

  const weDo = [
    { text: "Provide educational guidance", icon: CheckCircle },
    { text: "Offer strategic planning advice", icon: CheckCircle },
    { text: "Help you understand your options", icon: CheckCircle },
    { text: "Develop payment strategies", icon: CheckCircle },
    { text: "Provide ongoing support", icon: CheckCircle },
    { text: "Empower informed decisions", icon: CheckCircle }
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
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-gray-300">Important Information</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up">
            Legal <span className="gradient-text">Disclaimer</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Please read this disclaimer carefully to understand the nature and limitations of our services. 
            Transparency and honesty are core values at FinanceFlow.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-300">Last Updated: {lastUpdated}</span>
            </div>
            <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Full Transparency</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider" />

      {/* Critical Disclaimer Banner */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden border-2 border-amber-500/30">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-orange-600/10" />
            <div className="relative z-10 p-6 md:p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-amber-300">{importantDisclaimer.title}</h2>
                  <p className="text-amber-400/80 text-sm">Please read this carefully</p>
                </div>
              </div>

              <div className="space-y-4">
                {importantDisclaimer.content.split('\n\n').map((paragraph, index) => (
                  <div key={index}>
                    {paragraph.startsWith('We do NOT:') ? (
                      <>
                        <p className="text-gray-200 font-semibold mb-3">{paragraph.split('\n')[0]}</p>
                        <ul className="space-y-2">
                          {paragraph.split('\n').slice(1).map((line, lIndex) => (
                            <li key={lIndex} className="flex items-start gap-3">
                              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-300">{line.replace('• ', '')}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p className="text-gray-300 leading-relaxed">{paragraph}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do vs What We Don't */}
      <section className="py-16 bg-gradient-to-b from-black via-indigo-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-indigo-400 font-semibold uppercase tracking-wider">Clear Understanding</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Our Services <span className="gradient-text">Defined</span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              To ensure complete transparency, here's a clear breakdown of what our services include and exclude.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* What We Do */}
            <div className="glass-card rounded-2xl p-6 md:p-8 hover-lift border border-green-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">What We DO</h3>
              </div>
              <ul className="space-y-4">
                {weDo.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What We Don't Do */}
            <div className="glass-card rounded-2xl p-6 md:p-8 hover-lift border border-red-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">What We DON'T Do</h3>
              </div>
              <ul className="space-y-4">
                {weDoNot.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-gray-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Disclaimers */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-indigo-400 font-semibold uppercase tracking-wider">Detailed Information</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Detailed <span className="gradient-text">Disclaimers</span>
            </h2>
          </div>

          <div className="space-y-6">
            {disclaimers.map((disclaimer, index) => (
              <div 
                key={index}
                className={`glass-card rounded-2xl p-6 md:p-8 hover-lift animate-fade-in-up border-l-4 ${
                  disclaimer.severity === 'critical' 
                    ? 'border-red-500' 
                    : disclaimer.severity === 'warning' 
                      ? 'border-amber-500' 
                      : 'border-indigo-500'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    disclaimer.severity === 'critical' 
                      ? 'bg-gradient-to-br from-red-500 to-rose-600' 
                      : disclaimer.severity === 'warning' 
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600' 
                        : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                  }`}>
                    <disclaimer.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className={`text-xs font-medium uppercase tracking-wider ${
                      disclaimer.severity === 'critical' 
                        ? 'text-red-400' 
                        : disclaimer.severity === 'warning' 
                          ? 'text-amber-400' 
                          : 'text-indigo-400'
                    }`}>
                      {disclaimer.severity === 'critical' ? 'Critical' : disclaimer.severity === 'warning' ? 'Important' : 'Information'}
                    </span>
                    <h3 className="text-xl font-bold text-white">{disclaimer.title}</h3>
                  </div>
                </div>

                <div className="space-y-4 pl-0 md:pl-16">
                  {disclaimer.content.split('\n\n').map((paragraph, pIndex) => (
                    <div key={pIndex}>
                      {paragraph.startsWith('•') || paragraph.includes('\n•') ? (
                        <ul className="space-y-2">
                          {paragraph.split('\n').filter(line => line.startsWith('•')).map((line, lIndex) => (
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

      {/* User Responsibilities */}
      <section className="py-16 bg-gradient-to-b from-black via-indigo-950/10 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Your Responsibilities</h2>
                <p className="text-gray-400">As a user of our services</p>
              </div>
            </div>

            <ul className="space-y-4">
              {userResponsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-3 animate-fade-in-up" style={{ animationDelay: `${index * 0.05}s` }}>
                  <div className="w-6 h-6 rounded-full bg-indigo-600/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-indigo-300 font-semibold">{index + 1}</span>
                  </div>
                  <span className="text-gray-300">{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Acknowledgment Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-2xl p-6 md:p-8 border border-indigo-500/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Acknowledgment</h3>
                <p className="text-gray-400 mb-4">
                  By using FinanceFlow's website and services, you acknowledge that you have read, understood, 
                  and agree to this Disclaimer. You understand the nature and limitations of our services and 
                  accept full responsibility for your financial decisions.
                </p>
                <p className="text-gray-400">
                  If you have any questions about this Disclaimer or our services, please contact us before 
                  using our services.
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
              <AlertCircle className="w-12 h-12 text-white/80 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Need Clarification?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
                If you have any questions about this Disclaimer or need clarification about the nature of our services, 
                please don't hesitate to contact us.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="btn-primary bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  Contact Us
                </Link>
                <Link
                  to="/faq"
                  className="btn-secondary border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold flex items-center gap-2 transition-all duration-300"
                >
                  <HelpCircle className="w-5 h-5" />
                  View FAQ
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5" />
                  <span>Full transparency</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle className="w-5 h-5" />
                  <span>Honest communication</span>
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default Disclaimer;
