import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative py-32 overflow-hidden">
        <div className="mesh-gradient"></div>
        <div className="gradient-orb gradient-orb-1"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 animate-fadeInUp">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/70 animate-fadeInUp delay-100">
              How we collect, use, and protect your information
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 m-0">Your Privacy Matters</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  At RotateWise, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                </p>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">1</span>
                    Information We Collect
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Personal identification information (name, email address, phone number)',
                      'Employment and financial information for consultation purposes',
                      'Communication records when you contact us',
                      'Feedback and survey responses',
                      'Any other information you choose to provide'
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
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">2</span>
                    How We Use Your Information
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Provide personalized credit card loan consultation services',
                      'Respond to your inquiries and fulfill your requests',
                      'Send you relevant updates about our services',
                      'Improve our services and user experience',
                      'Comply with legal obligations',
                      'Protect against fraudulent or illegal activity'
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
                    Information Sharing
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    We do not sell your personal information. We may share your information only in the following circumstances:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'With your explicit consent',
                      'With service providers who assist in our operations',
                      'To comply with legal requirements or court orders',
                      'To protect our rights, privacy, safety, or property',
                      'In connection with a business transaction (merger, acquisition, etc.)'
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
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">4</span>
                    Data Security
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include encryption, secure servers, access controls, and regular security assessments. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">5</span>
                    Your Rights
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="space-y-2">
                    {[
                      'Right to access your personal information',
                      'Right to correct inaccurate information',
                      'Right to request deletion of your information',
                      'Right to withdraw consent at any time',
                      'Right to lodge a complaint with relevant authorities'
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
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">6</span>
                    Cookies and Tracking
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may use cookies and similar tracking technologies to enhance your experience on our website. Cookies help us understand how you use our site and allow us to improve our services. You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">7</span>
                    Data Retention
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. When your information is no longer needed, we will securely delete or anonymize it.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">8</span>
                    Changes to This Policy
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website with a revised effective date. We encourage you to review this policy periodically.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">9</span>
                    Contact Us
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    If you have any questions about this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="mt-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <p className="text-gray-700">
                      <strong>Email:</strong> privacy@rotatewise.com<br />
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
              <p className="text-gray-600 mb-6">Have questions about our privacy practices?</p>
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

export default PrivacyPolicy;
