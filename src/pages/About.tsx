import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Target,
  Eye,
  Heart,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Scale,
  Lock,
  Handshake,
  Star,
  Trophy,
  BadgeCheck,
  Medal,
} from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Trust & Integrity',
    description: 'We operate with complete transparency and honesty in every client interaction.',
  },
  {
    icon: Heart,
    title: 'Client-First Approach',
    description: 'Your financial well-being is our top priority. We succeed only when you succeed.',
  },
  {
    icon: Scale,
    title: 'Ethical Practices',
    description: 'We adhere to the highest ethical standards in financial services.',
  },
  {
    icon: Lock,
    title: 'Confidentiality',
    description: 'Your financial information is protected with bank-level security protocols.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'We leverage modern technology to deliver efficient, effective solutions.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    description: 'We work alongside you as partners, not just service providers.',
  },
];

const stats = [
  { number: '50,000+', label: 'Clients Served' },
  { number: '$100M+', label: 'Bills Managed' },
  { number: '98%', label: 'Client Satisfaction' },
  { number: '10+', label: 'Years Experience' },
];

// Team Slider Component
function TeamSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, team.length - itemsPerView);

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    startAutoPlay();
  };

  return (
    <div className="relative">
      {/* Slider Container */}
      <div className="overflow-hidden px-2" ref={sliderRef}>
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {team.map((member, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="glass-card rounded-2xl p-8 text-center hover-lift h-full">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-indigo-400 font-medium text-sm mb-4">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'w-8 bg-indigo-500'
                : 'w-2 bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

          </div>
  );
}

// Awards Slider Component
function AwardsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, awards.length - itemsPerView);

  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3500);
  };

  useEffect(() => {
    startAutoPlay();
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    startAutoPlay();
  };

  return (
    <div className="relative">
      {/* Slider Container */}
      <div className="overflow-hidden px-2">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {awards.map((award, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-3"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <div className="glass-card rounded-2xl p-8 text-center hover-lift h-full">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-6">
                  <award.icon className="w-10 h-10 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{award.label}</h3>
                <p className="text-gray-400 text-sm">{award.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'w-8 bg-indigo-500'
                : 'w-2 bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

          </div>
  );
}

const team = [
  {
    name: 'David Mitchell',
    role: 'Founder & CEO',
    bio: '15+ years in financial services with expertise in credit management.',
    gradient: 'from-indigo-500 to-purple-600',
  },
  {
    name: 'Sarah Anderson',
    role: 'Head of Operations',
    bio: 'Former banking executive with deep understanding of credit systems.',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    name: 'Michael Roberts',
    role: 'Chief Financial Advisor',
    bio: 'Certified financial planner helping clients achieve financial freedom.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    name: 'Jennifer Lee',
    role: 'Client Success Manager',
    bio: 'Dedicated to ensuring every client receives exceptional support.',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Robert Chen',
    role: 'Technology Director',
    bio: 'Building secure, innovative fintech solutions for modern financial needs.',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    name: 'Emily Watson',
    role: 'Compliance Officer',
    bio: 'Ensuring all services meet regulatory standards and best practices.',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

const awards = [
  { icon: Award, label: 'Best Fintech Service 2024', desc: 'Global Finance Awards' },
  { icon: Shield, label: 'ISO 27001 Certified', desc: 'Information Security' },
  { icon: Star, label: 'Top Rated on Trustpilot', desc: '4.9/5 Rating' },
  { icon: BadgeCheck, label: 'BBB A+ Rating', desc: 'Better Business Bureau' },
  { icon: Trophy, label: 'Excellence in Service', desc: 'Finance Industry Awards' },
  { icon: Medal, label: 'Customer Choice 2024', desc: 'Consumer Reports' },
];

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-3xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-down">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Trusted Financial Partner Since 2014</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Your Trusted Partner in
              <span className="block gradient-text">Financial Management</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in-up">
              At FinanceFlow, we believe everyone deserves financial clarity and peace of mind. 
              Our mission is to help you manage credit card payments efficiently while building 
              a stronger financial future.
            </p>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up">
            {stats.map((stat, index) => (
              <div key={index} className="text-center glass-card rounded-2xl p-6 hover-lift">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="glass-card rounded-3xl p-8 md:p-12 hover-lift">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                To empower individuals and businesses with effective credit card bill management 
                solutions that reduce financial stress, avoid unnecessary penalties, and foster 
                long-term financial discipline.
              </p>
              <ul className="space-y-3">
                {[
                  'Simplify complex financial obligations',
                  'Provide transparent, ethical guidance',
                  'Deliver measurable results',
                  'Build lasting financial habits',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="glass-card rounded-3xl p-8 md:p-12 hover-lift">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                To become the world's most trusted financial assistance platform, where every 
                individual has access to professional credit management services that transform 
                their financial lives.
              </p>
              <ul className="space-y-3">
                {[
                  'Global accessibility to financial services',
                  'Industry-leading security standards',
                  'Continuous innovation in fintech',
                  'Community of financially empowered individuals',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-gradient-to-b from-black via-indigo-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">OUR VALUES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Principles That Guide
              <span className="gradient-text"> Our Service</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our core values shape every interaction and decision we make in serving you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 hover-lift group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center mb-6 group-hover:from-indigo-500/40 group-hover:to-purple-600/40 transition-colors">
                  <value.icon className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency Policy Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 md:p-12 hover-lift">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Our Transparency Commitment
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                We believe trust is built through complete transparency. Here's what you can 
                always expect from FinanceFlow:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Clear Pricing',
                  desc: 'No hidden fees or surprise charges. You know exactly what you pay for.',
                },
                {
                  title: 'Honest Assessment',
                  desc: 'We provide realistic expectations, never making promises we cannot keep.',
                },
                {
                  title: 'Regular Updates',
                  desc: 'Stay informed with frequent progress reports on your financial status.',
                },
                {
                  title: 'Open Communication',
                  desc: 'Direct access to your dedicated advisor for questions anytime.',
                },
                {
                  title: 'Data Protection',
                  desc: 'Your information is encrypted and never shared without consent.',
                },
                {
                  title: 'Exit Freedom',
                  desc: 'No long-term contracts. You can pause or stop services anytime.',
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">OUR TEAM</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet the Experts Behind
              <span className="gradient-text"> Your Success</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our team of experienced financial professionals is dedicated to helping you achieve 
              your financial goals.
            </p>
          </div>

          <TeamSlider />
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">RECOGNITION</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Awards &
              <span className="gradient-text"> Certifications</span>
            </h2>
          </div>

          <AwardsSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600" />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative px-8 py-16 md:px-16 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Experience the FinanceFlow Difference?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied clients who have transformed their financial lives 
                with our expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  Start Your Journey Today
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+1234567890"
                  className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Call: +1 (234) 567-890
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-white/70 text-sm flex-wrap">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Free Consultation
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  No Hidden Fees
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  24/7 Support
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
