import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ContactPopup from '../components/ContactPopup';
import AnimatedSection from '../components/AnimatedSection';

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const features = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Trusted Guidance',
      description: 'Expert advisors with years of experience in credit card loans and financial planning.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: 'Better Rates',
      description: 'We help you find competitive interest rates tailored to your financial profile.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Fast Process',
      description: 'Streamlined consultation process to get you the answers you need quickly.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Personal Support',
      description: 'Dedicated consultants who understand your unique financial situation.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Clear Analysis',
      description: 'Comprehensive credit analysis to help you understand your options.',
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Secure Process',
      description: 'Your personal and financial information is always protected.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Share Your Requirements',
      description: 'Tell us about your financial needs and goals through our simple consultation form.',
    },
    {
      number: '02',
      title: 'Expert Analysis',
      description: 'Our consultants analyze your profile and identify the best loan options for you.',
    },
    {
      number: '03',
      title: 'Personalized Guidance',
      description: 'Receive tailored recommendations and guidance throughout your loan journey.',
    },
    {
      number: '04',
      title: 'Achieve Your Goals',
      description: 'Make informed decisions with confidence and achieve your financial objectives.',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Clients Helped' },
    { value: '₹50Cr+', label: 'Loans Facilitated' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '15+', label: 'Years Experience' },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      content: 'RotateWise helped me understand my options clearly. Their guidance was invaluable in getting the right loan for my business expansion.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'IT Professional',
      content: 'The consultation process was smooth and professional. They found me a much better rate than I could have found on my own.',
      rating: 5,
    },
    {
      name: 'Amit Patel',
      role: 'Entrepreneur',
      content: 'Excellent service and expert advice. The team at RotateWise truly understands credit card loans and financial planning.',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient relative min-h-screen flex items-center overflow-hidden">
        {/* Animated mesh gradient */}
        <div className="mesh-gradient"></div>
        
        {/* Gradient orbs */}
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        <div className="gradient-orb gradient-orb-3"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6 animate-fadeInUp">
                Smart Credit Card
                <span className="block text-gradient-light">Loan Solutions</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto lg:mx-0 mb-10 animate-fadeInUp delay-200">
                Expert consultation to help you navigate credit card loans with confidence. Get personalized guidance and find the best rates for your needs.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fadeInUp delay-300">
                <Link
                  to="/contact"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-gray-900 font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
                >
                  Get Free Consultation
                </Link>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>See How It Works</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block animate-fadeInUp delay-400">
              <div className="relative">
                {/* Main card */}
                <div className="glass-card rounded-3xl p-8 animate-float">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-white/60 text-sm">Available Credit</p>
                      <p className="text-3xl font-bold text-white">₹5,00,000</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">Low Interest Rate</p>
                          <p className="text-white/50 text-sm">Starting 11.99% p.a.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-medium">Quick Approval</p>
                          <p className="text-white/50 text-sm">Within 24-48 hours</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 glass-card rounded-2xl p-4 animate-floatReverse">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Approved</p>
                      <p className="text-white/50 text-xs">Just now</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-8 glass-card rounded-2xl px-5 py-3 animate-float">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 text-lg">★★★★★</span>
                    <span className="text-white/70 text-sm">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-white/50 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32 section-gradient-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Expert Credit Card Loan
                <span className="text-gradient-primary"> Consultation</span>
              </h2>
              <p className="text-lg text-gray-600">
                We provide comprehensive guidance to help you make informed decisions about credit card loans and achieve your financial goals.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="premium-card rounded-2xl p-8 h-full group">
                  <div className="feature-icon w-14 h-14 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                Simple Process
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                How It <span className="text-gradient-primary">Works</span>
              </h2>
              <p className="text-lg text-gray-600">
                Getting expert loan consultation is easy. Follow these simple steps to get started on your financial journey.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="relative text-center">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20"></div>
                  )}
                  
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-2xl font-bold mb-6 shadow-lg shadow-indigo-500/30">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={600}>
            <div className="mt-16 text-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
              >
                Start Your Consultation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="mesh-gradient opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60 font-medium">
                    {stat.label}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 lg:py-32 section-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium mb-4">
                Our Solutions
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Tailored for <span className="text-gradient-primary">Your Needs</span>
              </h2>
              <p className="text-lg text-gray-600">
                Whether you're an individual or a business, we have the right consultation services for you.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Personal Loans',
                description: 'Get guidance on personal credit card loans for your individual financial needs and goals.',
                icon: '👤',
                features: ['Credit assessment', 'Rate comparison', 'Repayment planning'],
              },
              {
                title: 'Business Loans',
                description: 'Expert consultation for business credit needs to help grow and expand your enterprise.',
                icon: '🏢',
                features: ['Business credit analysis', 'Working capital solutions', 'Growth financing'],
              },
              {
                title: 'Debt Consolidation',
                description: 'Simplify your finances by consolidating multiple debts into a single manageable payment.',
                icon: '📊',
                features: ['Debt analysis', 'Consolidation strategies', 'Interest reduction'],
              },
            ].map((solution, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="premium-card rounded-2xl p-8 h-full">
                  <div className="text-4xl mb-6">{solution.icon}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {solution.description}
                  </p>
                  <ul className="space-y-3">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-gray-700">
                        <svg className="w-5 h-5 text-indigo-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
                Client Stories
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                What Our <span className="text-gradient-primary">Clients Say</span>
              </h2>
              <p className="text-lg text-gray-600">
                Hear from clients who have achieved their financial goals with our guidance.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <div className="testimonial-card rounded-2xl p-8 border border-gray-100 h-full">
                  <div className="flex items-center gap-1 mb-4 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 relative z-10 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 hero-gradient relative overflow-hidden">
        <div className="mesh-gradient opacity-50"></div>
        <div className="gradient-orb gradient-orb-1"></div>
        <div className="gradient-orb gradient-orb-2"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              Take the first step towards achieving your financial goals. Get free expert consultation today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-gray-900 font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
              >
                Get Free Consultation
              </Link>
              <a
                href="tel:+919876543210"
                className="w-full sm:w-auto px-10 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us Now
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Popup */}
      <ContactPopup
        isOpen={showPopup}
        onClose={handleClosePopup}
      />
    </div>
  );
};

export default Home;
