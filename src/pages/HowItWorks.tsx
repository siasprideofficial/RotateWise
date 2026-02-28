import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  HeadphonesIcon,
  FileSearch,
  LineChart,
  Rocket,
  Shield,
  CheckCircle,
  ArrowRight,
  Clock,
  Users,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  RefreshCw,
  ChevronRight,
} from 'lucide-react';

const processSteps = [
  {
    step: 1,
    title: 'Initial Consultation',
    subtitle: 'Understanding Your Situation',
    icon: HeadphonesIcon,
    description: 'Begin with a free, no-obligation consultation where we understand your current financial situation, credit card obligations, and specific challenges.',
    details: [
      'Confidential discussion about your credit cards',
      'Understanding your income and payment capacity',
      'Identifying pain points and challenges',
      'Initial assessment of your requirements',
    ],
    duration: '30-45 minutes',
    channels: [
      { icon: Phone, label: 'Phone Call' },
      { icon: MessageCircle, label: 'WhatsApp' },
      { icon: Mail, label: 'Email' },
    ],
  },
  {
    step: 2,
    title: 'Requirement Analysis',
    subtitle: 'Deep Dive Into Your Finances',
    icon: FileSearch,
    description: 'Our experts analyze your credit card statements, payment history, and financial patterns to identify optimization opportunities.',
    details: [
      'Review of all credit card statements',
      'Interest rate and fee analysis',
      'Due date mapping and coordination',
      'Cash flow assessment',
    ],
    duration: '2-3 business days',
    deliverables: [
      'Comprehensive financial snapshot',
      'Identified savings opportunities',
      'Risk assessment report',
    ],
  },
  {
    step: 3,
    title: 'Strategy Planning',
    subtitle: 'Custom Plan Development',
    icon: LineChart,
    description: 'Based on our analysis, we create a personalized payment management strategy tailored to your unique financial situation.',
    details: [
      'Optimized payment schedule creation',
      'Priority allocation framework',
      'Budget integration plan',
      'Contingency planning',
    ],
    duration: '1-2 business days',
    deliverables: [
      'Detailed payment calendar',
      'Monthly budget recommendation',
      'Written strategy document',
    ],
  },
  {
    step: 4,
    title: 'Strategy Implementation',
    subtitle: 'Putting the Plan to Action',
    icon: Rocket,
    description: 'We execute the agreed-upon strategy, managing your credit card payments according to the optimized schedule.',
    details: [
      'Payment tracking setup',
      'Reminder system activation',
      'Real-time monitoring initiation',
      'Communication channel establishment',
    ],
    duration: 'Immediate',
    deliverables: [
      'Active payment management',
      'Regular status updates',
      'Direct access to advisor',
    ],
  },
  {
    step: 5,
    title: 'Continuous Support',
    subtitle: 'Ongoing Partnership',
    icon: Shield,
    description: 'Receive ongoing monitoring, regular check-ins, and adjustments to ensure your financial health continues to improve.',
    details: [
      'Monthly progress reviews',
      'Strategy adjustments as needed',
      'Financial health updates',
      '24/7 emergency support',
    ],
    duration: 'Ongoing',
    deliverables: [
      'Monthly progress reports',
      'Quarterly strategy reviews',
      'Continuous optimization',
    ],
  },
];

const timeline = [
  { day: 'Day 1', action: 'Free Consultation', icon: HeadphonesIcon },
  { day: 'Day 2-4', action: 'Analysis Complete', icon: FileSearch },
  { day: 'Day 5-6', action: 'Strategy Delivered', icon: LineChart },
  { day: 'Day 7', action: 'Implementation Begins', icon: Rocket },
  { day: 'Ongoing', action: 'Continuous Support', icon: Shield },
];

const faqs = [
  {
    question: 'What documents do I need to provide?',
    answer: 'You will need to share your recent credit card statements (last 3 months), income details, and any other relevant financial documents. We handle all information with strict confidentiality.',
  },
  {
    question: 'How long does the entire process take?',
    answer: 'From initial consultation to implementation, the process typically takes 5-7 business days. However, you will start seeing benefits from day one of implementation.',
  },
  {
    question: 'Can I make changes to the plan later?',
    answer: 'Absolutely! Our service is flexible. We conduct regular reviews and adjust your strategy based on changing circumstances, income variations, or new financial goals.',
  },
  {
    question: 'What if I have multiple credit cards?',
    answer: 'We specialize in managing multiple credit cards. Our coordinated approach ensures all your cards are managed efficiently with optimized payment timing.',
  },
  {
    question: 'Is there a long-term contract?',
    answer: 'No, we believe in earning your trust. Our services are flexible with no long-term commitments. You can adjust or pause services at any time.',
  },
];

// FAQ Section Component with Accordion
function FAQSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-400 font-semibold mb-4 block">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Common Questions About
            <span className="gradient-text"> Our Process</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full p-6 text-left"
              >
                <h3 className="text-white font-semibold pr-8">{faq.question}</h3>
                <ChevronRight 
                  className={`w-5 h-5 text-indigo-400 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-90' : ''
                  }`} 
                />
              </button>
              <div 
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HowItWorks() {
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
              <Rocket className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-300">Simple 5-Step Process to Financial Freedom</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Your Journey to
              <span className="block gradient-text">Financial Clarity</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up">
              Our streamlined 5-step process makes credit card bill management effortless. 
              From consultation to ongoing support, we're with you every step of the way.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-sm animate-fade-in-up">
              <div className="flex items-center gap-2 text-gray-300 glass-card rounded-full px-4 py-2">
                <Clock className="w-5 h-5 text-indigo-400" />
                5-7 Days to Start
              </div>
              <div className="flex items-center gap-2 text-gray-300 glass-card rounded-full px-4 py-2">
                <Users className="w-5 h-5 text-indigo-400" />
                Dedicated Advisor
              </div>
              <div className="flex items-center gap-2 text-gray-300 glass-card rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-indigo-400" />
                98% Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Timeline Overview */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 hover-lift">
            <h2 className="text-2xl font-bold text-white text-center mb-8">Quick Overview</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="hidden md:block absolute top-1/2 left-full w-16 lg:w-24 h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent -translate-y-1/2" />
                    )}
                  </div>
                  <div className="md:hidden lg:block">
                    <p className="text-indigo-400 text-sm font-medium">{item.day}</p>
                    <p className="text-white font-semibold">{item.action}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Process Steps */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">DETAILED PROCESS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Step-by-Step Guide to
              <span className="gradient-text"> Getting Started</span>
            </h2>
          </div>

          <div className="space-y-8">
            {processSteps.map((step, index) => (
              <div key={index} className="glass-card rounded-3xl p-8 md:p-10 hover-lift">
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <step.icon className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black border-2 border-indigo-500 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{step.step}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                        <p className="text-indigo-400">{step.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">{step.duration}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 mb-6">{step.description}</p>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <Settings className="w-4 h-4 text-indigo-400" />
                          What We Do
                        </h4>
                        <ul className="space-y-2">
                          {step.details.map((detail, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {step.channels && (
                        <div>
                          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <MessageCircle className="w-4 h-4 text-indigo-400" />
                            Available Channels
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {step.channels.map((channel, idx) => (
                              <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
                                <channel.icon className="w-4 h-4 text-indigo-400" />
                                <span className="text-gray-300 text-sm">{channel.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {step.deliverables && (
                        <div>
                          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-indigo-400" />
                            Deliverables
                          </h4>
                          <ul className="space-y-2">
                            {step.deliverables.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
                                <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-24 bg-gradient-to-b from-black via-indigo-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">EXPECTATIONS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You Can Expect
              <span className="gradient-text"> From Us</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: 'First Month',
                items: [
                  'Complete financial assessment',
                  'Payment strategy implementation',
                  'First optimized payment cycle',
                  'Initial savings identification',
                ],
              },
              {
                icon: BarChart3,
                title: '3 Months',
                items: [
                  'Significant reduction in late fees',
                  'Improved payment discipline',
                  'Clear financial visibility',
                  'Strategy refinements',
                ],
              },
              {
                icon: RefreshCw,
                title: '6 Months & Beyond',
                items: [
                  'Established payment routines',
                  'Measurable cost savings',
                  'Improved credit health',
                  'Long-term financial stability',
                ],
              },
            ].map((period, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 hover-lift">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6">
                  <period.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{period.title}</h3>
                <ul className="space-y-3">
                  {period.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-400">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection faqs={faqs} />

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
                Ready to Begin Your Journey?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Start with a free consultation and discover how we can help you manage 
                your credit card payments effectively.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  Start Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+1234567890"
                  className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Us Now
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-white/70 text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  No Obligations
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  100% Confidential
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Expert Guidance
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
