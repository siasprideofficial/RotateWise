import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const About = () => {
  const values = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Trust & Integrity',
      description: 'We build lasting relationships based on honesty and transparent communication.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Excellence',
      description: 'We strive for excellence in every consultation and recommendation we provide.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Client Focus',
      description: 'Your financial success is our primary goal. We put your needs first.',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'Innovation',
      description: 'We continuously improve our methods to provide better financial guidance.',
    },
  ];

  const team = [
    { name: 'Vikram Mehta', role: 'Founder & CEO', initials: 'VM' },
    { name: 'Anita Sharma', role: 'Head of Consulting', initials: 'AS' },
    { name: 'Rahul Kapoor', role: 'Senior Financial Advisor', initials: 'RK' },
    { name: 'Sneha Patel', role: 'Client Relations Manager', initials: 'SP' },
  ];

  const timeline = [
    { year: '2009', title: 'Founded', description: 'RotateWise was established with a mission to democratize financial guidance.' },
    { year: '2014', title: 'Expansion', description: 'Expanded services across major cities in India.' },
    { year: '2018', title: '5000+ Clients', description: 'Reached milestone of helping over 5000 clients achieve their goals.' },
    { year: '2024', title: 'Digital First', description: 'Launched comprehensive digital consultation platform.' },
  ];

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
              Your Trusted Financial
              <span className="block text-gradient-light">Partner</span>
            </h1>
            <p className="text-xl text-white/70 animate-fadeInUp delay-200">
              Helping individuals and businesses make informed credit card loan decisions since 2009.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <AnimatedSection>
              <div className="premium-card rounded-3xl p-10 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To empower individuals and businesses with expert financial guidance, helping them navigate credit card loans with confidence and clarity. We believe everyone deserves access to transparent, personalized financial advice.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200}>
              <div className="premium-card rounded-3xl p-10 h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To become India's most trusted credit card loan consultation service, known for integrity, expertise, and genuine care for our clients' financial well-being. We aim to transform how people approach credit decisions.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32 section-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                Growing <span className="text-gradient-primary">Together</span>
              </h2>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-purple-500"></div>
            
            <div className="space-y-12 lg:space-y-0">
              {timeline.map((item, index) => (
                <AnimatedSection key={index} delay={index * 150}>
                  <div className={`lg:flex items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                    <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'}`}>
                      <div className="premium-card rounded-2xl p-8">
                        <span className="text-4xl font-bold text-gradient-primary">{item.year}</span>
                        <h3 className="text-2xl font-semibold text-gray-900 mt-2 mb-3">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold absolute left-1/2 -translate-x-1/2 shadow-lg shadow-indigo-500/30">
                      {index + 1}
                    </div>
                    <div className="lg:w-1/2"></div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                Our Values
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                What We <span className="text-gradient-primary">Stand For</span>
              </h2>
              <p className="text-lg text-gray-600">
                Our core values guide every interaction and decision we make.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="premium-card rounded-2xl p-8 text-center h-full group">
                  <div className="feature-icon w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-6">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 lg:py-32 section-gradient-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-sm font-medium mb-4">
                Our Team
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Meet the <span className="text-gradient-primary">Experts</span>
              </h2>
              <p className="text-lg text-gray-600">
                Our experienced team is dedicated to helping you achieve your financial goals.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="premium-card rounded-2xl p-8 text-center group">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    {member.initials}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-medium">{member.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 hero-gradient relative overflow-hidden">
        <div className="mesh-gradient opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: '10K+', label: 'Clients Helped' },
              { value: '₹50Cr+', label: 'Loans Facilitated' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '15+', label: 'Years Experience' },
            ].map((stat, index) => (
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

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get <span className="text-gradient-primary">Started?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of satisfied clients who have achieved their financial goals with our guidance.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-1"
            >
              Get Free Consultation
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;
