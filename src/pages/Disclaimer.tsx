import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const Disclaimer = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative py-32 overflow-hidden">
        <div className="mesh-gradient"></div>
        <div className="gradient-orb gradient-orb-1"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 animate-fadeInUp">
              Disclaimer
            </h1>
            <p className="text-xl text-white/70 animate-fadeInUp delay-100">
              Important information about our services
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="prose max-w-none">
              <div className="premium-card rounded-3xl p-8 lg:p-12 mb-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0">Important Notice</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Please read this disclaimer carefully before using our services. By accessing or using RotateWise's consultation services, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">1</span>
                    Consultation Services Only
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    RotateWise provides credit card loan consultation services only. We are not a bank, financial institution, or lending company. We do not directly provide loans, credit, or any financial products. Our role is limited to providing guidance, information, and recommendations to help you make informed decisions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">2</span>
                    Not a Lender
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    RotateWise is not a lender and does not make credit decisions. Any loan applications or credit decisions are made solely by the respective financial institutions. We do not guarantee loan approval, specific interest rates, or loan terms. Loan eligibility depends on various factors determined by lending institutions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">3</span>
                    No Guarantees
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    While we strive to provide accurate and helpful information, we make no guarantees or warranties regarding:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Loan approval or rejection',
                      'Interest rates or loan terms',
                      'Processing time for applications',
                      'Accuracy of third-party information',
                      'Outcomes based on our recommendations'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">4</span>
                    Financial Advice Disclaimer
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    The information provided through our consultation services is for general informational purposes only and should not be considered as professional financial, legal, or tax advice. We recommend consulting with qualified professionals for specific financial decisions. Individual circumstances vary, and our general guidance may not be suitable for your specific situation.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">5</span>
                    Limitation of Liability
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    RotateWise shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our consultation services, reliance on information provided, decisions made based on our recommendations, or actions of third-party financial institutions. Your use of our services is at your own risk.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">6</span>
                    Third-Party Links
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our website may contain links to third-party websites or services. We are not responsible for the content, accuracy, or practices of these external sites. Accessing third-party links is at your own discretion and risk.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">7</span>
                    Changes to Disclaimer
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting on our website. Continued use of our services after changes constitutes acceptance of the modified disclaimer.
                  </p>
                </div>
              </div>

              <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  Last updated: January 2024
                </p>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">Have questions about our disclaimer?</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Contact Us
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Disclaimer;
