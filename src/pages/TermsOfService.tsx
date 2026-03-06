import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative py-32 overflow-hidden">
        <div className="mesh-gradient"></div>
        <div className="gradient-orb gradient-orb-1"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 animate-fadeInUp">
              Terms of Service
            </h1>
            <p className="text-xl text-white/70 animate-fadeInUp delay-100">
              Please read these terms carefully before using our services
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
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0">Agreement to Terms</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using RotateWise's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms constitute a legally binding agreement between you and RotateWise.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">1</span>
                    Description of Services
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    RotateWise provides credit card loan consultation services, including but not limited to financial guidance, loan option analysis, and personalized recommendations. Our services are advisory in nature and do not include direct lending or credit provision. We help you understand your options and make informed financial decisions.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">2</span>
                    User Responsibilities
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    By using our services, you agree to:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Provide accurate and complete information during consultations',
                      'Use our services only for lawful purposes',
                      'Not misrepresent your identity or financial situation',
                      'Maintain confidentiality of any account credentials',
                      'Comply with all applicable laws and regulations',
                      'Not interfere with or disrupt our services'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-600">
                        <svg className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">3</span>
                    Consultation Process
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Our consultation process involves collecting information about your financial situation and goals. Based on this information, we provide personalized recommendations. The final decision on any financial product or loan remains entirely with you. We encourage you to independently verify any information and seek additional professional advice as needed.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">4</span>
                    Fees and Payments
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Initial consultations are provided free of charge. Any additional services that may incur fees will be clearly communicated before you proceed. We do not charge hidden fees, and all pricing will be transparent and agreed upon in advance.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">5</span>
                    Intellectual Property
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    All content on the RotateWise website, including text, graphics, logos, images, and software, is the property of RotateWise and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from our content without express written permission.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">6</span>
                    Limitation of Liability
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    To the fullest extent permitted by law, RotateWise shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for our services, if any. This limitation applies regardless of the form of action, whether in contract, tort, or otherwise.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">7</span>
                    Indemnification
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    You agree to indemnify and hold harmless RotateWise, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of our services, violation of these terms, or infringement of any third-party rights.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">8</span>
                    Termination
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to terminate or suspend your access to our services at any time, without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties. You may also discontinue using our services at any time.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">9</span>
                    Governing Law
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">10</span>
                    Changes to Terms
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after any changes constitutes acceptance of the new terms. We encourage you to review these terms periodically.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">11</span>
                    Contact Information
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-gray-700">
                      <strong>Email:</strong> legal@rotatewise.com<br />
                      <strong>Phone:</strong> +91 98765 43210<br />
                      <strong>Address:</strong> 123, Financial District, Mumbai, Maharashtra 400001
                    </p>
                  </div>
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
              <p className="text-gray-600 mb-6">Have questions about our terms?</p>
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

export default TermsOfService;
