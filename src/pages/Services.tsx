import { Link } from 'react-router-dom';
import {
  CreditCard,
  Calculator,
  TrendingUp,
  Shield,
  Clock,
  Users,
  CheckCircle,
  ArrowRight,
  AlertTriangle,
  BarChart3,
  HeadphonesIcon,
  FileCheck,
  Zap,
  Lock,
  RefreshCw,
  Target,
} from 'lucide-react';

const mainServices = [
  {
    icon: CreditCard,
    title: 'Credit Card Bill Management',
    description: 'Comprehensive management of all your credit card payments with strategic planning to minimize interest and avoid late fees.',
    features: [
      'Multi-card payment coordination',
      'Due date optimization',
      'Minimum payment tracking',
      'Statement reconciliation',
    ],
  },
  {
    icon: Calculator,
    title: 'Payment Planning',
    description: 'Custom payment schedules designed around your income cycle to ensure timely payments without financial strain.',
    features: [
      'Income-based scheduling',
      'Priority payment allocation',
      'Cash flow optimization',
      'Budget integration',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Financial Consulting',
    description: 'Expert guidance on managing credit utilization, improving credit scores, and building long-term financial health.',
    features: [
      'Credit score analysis',
      'Utilization optimization',
      'Financial health assessment',
      'Personalized recommendations',
    ],
  },
  {
    icon: RefreshCw,
    title: 'Debt Optimization',
    description: 'Strategic approaches to manage and reduce credit card debt efficiently while maintaining financial stability.',
    features: [
      'Interest rate analysis',
      'Balance transfer guidance',
      'Payment prioritization',
      'Debt reduction roadmap',
    ],
  },
];

const whoWeHelp = [
  {
    icon: Users,
    title: 'Salaried Professionals',
    description: 'Managing multiple credit cards on a fixed monthly income.',
  },
  {
    icon: Target,
    title: 'Business Owners',
    description: 'Handling business and personal credit card obligations.',
  },
  {
    icon: Zap,
    title: 'Freelancers',
    description: 'Navigating irregular income with credit card payments.',
  },
  {
    icon: AlertTriangle,
    title: 'Those Facing Payment Pressure',
    description: 'Seeking professional help to manage overwhelming bills.',
  },
];

const benefits = [
  {
    icon: Clock,
    title: 'Timely Payment Planning',
    description: 'Strategic scheduling ensures you never miss a payment deadline, protecting your credit score and avoiding late fees.',
  },
  {
    icon: BarChart3,
    title: 'Complete Financial Clarity',
    description: 'Gain full visibility into your credit card obligations with clear dashboards and regular status reports.',
  },
  {
    icon: Zap,
    title: 'Reduced Penalties',
    description: 'Proactive management helps you avoid late payment fees, over-limit charges, and excessive interest accumulation.',
  },
  {
    icon: TrendingUp,
    title: 'Improved Financial Discipline',
    description: 'Build lasting habits with structured payment plans and regular financial health check-ins.',
  },
  {
    icon: Lock,
    title: 'Complete Confidentiality',
    description: 'Your financial data is protected with bank-level encryption and strict privacy protocols.',
  },
  {
    icon: RefreshCw,
    title: 'Flexible Assistance',
    description: 'Services tailored to your unique situation, whether you have one card or many.',
  },
];

const securityFeatures = [
  { icon: Lock, label: 'SSL Secured Platform' },
  { icon: Shield, label: 'GDPR-Aligned Data Practices' },
  { icon: FileCheck, label: 'Privacy-First Infrastructure' },
  { icon: Users, label: 'Confidential Client Handling' },
];

export default function Services() {
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
              <CreditCard className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-300">Comprehensive Credit Card Management Solutions</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Professional Credit Card
              <span className="block gradient-text">Bill Management Services</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up">
              Comprehensive financial assistance services designed to help you manage credit card 
              payments efficiently, avoid penalties, and achieve lasting financial clarity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
              <Link
                to="/contact"
                className="btn-primary px-8 py-4 rounded-full text-white font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/how-it-works"
                className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Main Services Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-indigo-400 font-semibold mb-4 block">WHAT WE OFFER</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comprehensive Financial
              <span className="gradient-text"> Assistance Services</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From bill management to financial consulting, we provide end-to-end solutions 
              for your credit card management needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mainServices.map((service, index) => (
              <div key={index} className="glass-card rounded-3xl p-8 hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Help Section */}
      <section className="py-24 bg-gradient-to-b from-black via-indigo-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">WHO WE HELP</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Our Services Are Designed
              <span className="gradient-text"> For You</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Whether you're a professional, business owner, or freelancer, our credit card 
              management services can help you achieve financial peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whoWeHelp.map((item, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 text-center hover-lift">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">BENEFITS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose Our Credit Card
              <span className="gradient-text"> Management Service</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the advantages of professional financial assistance and take control 
              of your credit card payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 hover-lift group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center mb-6 group-hover:from-indigo-500/40 group-hover:to-purple-600/40 transition-colors">
                  <benefit.icon className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Brief */}
      <section className="py-24 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-indigo-400 font-semibold mb-4 block">HOW IT WORKS</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Getting Started is
                  <span className="gradient-text"> Simple</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { step: '1', title: 'Free Consultation', desc: 'Share your current credit card situation with us.' },
                    { step: '2', title: 'Custom Analysis', desc: 'We analyze your bills and create a tailored strategy.' },
                    { step: '3', title: 'Implementation', desc: 'We execute the plan and manage your payments.' },
                    { step: '4', title: 'Ongoing Support', desc: 'Continuous monitoring and adjustments as needed.' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">{item.step}</span>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium mt-8"
                >
                  Learn more about our process
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-3xl blur-xl" />
                <div className="relative glass-card rounded-3xl p-8">
                  <div className="text-center mb-6">
                    <HeadphonesIcon className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">Ready to Start?</h3>
                    <p className="text-gray-400">Get your free consultation today</p>
                  </div>
                  <Link
                    to="/contact"
                    className="btn-primary w-full py-4 rounded-xl text-white font-semibold flex items-center justify-center gap-2"
                  >
                    Schedule Free Consultation
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <p className="text-center text-gray-500 text-sm mt-4">
                    No commitment required • 100% confidential
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Confidentiality */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">SECURITY</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Data is
              <span className="gradient-text"> Safe With Us</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We understand the sensitive nature of financial information. That's why we 
              implement the highest security standards to protect your data.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 text-center hover-lift">
                <feature.icon className="w-10 h-10 text-green-400 mx-auto mb-3" />
                <p className="text-white font-medium text-sm">{feature.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 glass-card rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-4 text-center">Our Security Promise</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Your financial data is encrypted using SSL technology',
                'We never share your information with third parties without consent',
                'Regular security audits ensure our systems remain protected',
                'All team members undergo strict background verification',
                'Data is stored in secure, compliant cloud infrastructure',
                'You have full control over your data and can request deletion anytime',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-400 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
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
                Let Us Help You Manage Your Credit Cards
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Take the first step towards financial clarity. Get a free consultation with 
                our expert team and discover how we can help.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  Get Free Consultation
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
