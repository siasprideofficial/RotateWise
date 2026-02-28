import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Shield,
  Clock,
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  CreditCard,
  Calculator,
  HeadphonesIcon,
  ChevronRight,
  Zap,
  Lock,
  Award,
  BarChart3,
  ArrowDown,
} from 'lucide-react';

const trustIndicators = [
  { icon: Users, label: '50,000+', sublabel: 'Clients Served' },
  { icon: CreditCard, label: '$100M+', sublabel: 'Bills Managed' },
  { icon: Star, label: '4.9/5', sublabel: 'Client Rating' },
  { icon: Award, label: '10+ Years', sublabel: 'Experience' },
];

const processSteps = [
  {
    step: '01',
    title: 'Free Consultation',
    description: 'Share your credit card details and current financial situation with our experts.',
    icon: HeadphonesIcon,
  },
  {
    step: '02',
    title: 'Analysis & Planning',
    description: 'We analyze your bills and create a customized payment management strategy.',
    icon: Calculator,
  },
  {
    step: '03',
    title: 'Strategy Implementation',
    description: 'Our team implements the optimized payment plan to reduce your financial burden.',
    icon: TrendingUp,
  },
  {
    step: '04',
    title: 'Ongoing Support',
    description: 'Receive continuous monitoring and support to maintain financial health.',
    icon: Shield,
  },
];

const benefits = [
  {
    icon: Clock,
    title: 'Timely Payment Planning',
    description: 'Never miss a payment deadline with our strategic scheduling and reminders.',
  },
  {
    icon: BarChart3,
    title: 'Financial Clarity',
    description: 'Gain complete visibility into your credit card obligations and payment timeline.',
  },
  {
    icon: Zap,
    title: 'Reduced Penalties',
    description: 'Avoid late payment fees and high-interest charges through proactive management.',
  },
  {
    icon: TrendingUp,
    title: 'Improved Credit Health',
    description: 'Maintain and improve your credit score with disciplined payment practices.',
  },
  {
    icon: Lock,
    title: 'Complete Confidentiality',
    description: 'Your financial information is protected with bank-level security protocols.',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Expert Support',
    description: 'Access to dedicated financial advisors whenever you need assistance.',
  },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Business Owner',
    content: 'FinanceFlow helped me consolidate my credit card payments and saved me over $3,000 in late fees annually. Their team is professional and truly cares about your financial well-being.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Software Engineer',
    content: 'I was overwhelmed with multiple credit cards until I found FinanceFlow. Their structured approach gave me complete clarity and peace of mind.',
    rating: 5,
  },
  {
    name: 'Emily Rodriguez',
    role: 'Freelance Designer',
    content: 'As a freelancer with irregular income, managing credit card bills was stressful. FinanceFlow created a flexible payment plan that works perfectly for my situation.',
    rating: 5,
  },
  {
    name: 'David Thompson',
    role: 'Marketing Director',
    content: 'The team at FinanceFlow transformed my financial outlook. Their proactive approach to payment management has eliminated my credit card stress completely.',
    rating: 5,
  },
  {
    name: 'Jennifer Lee',
    role: 'Healthcare Professional',
    content: 'Outstanding service! They helped me organize 5 different credit cards into a manageable system. My credit score has improved significantly since working with them.',
    rating: 5,
  },
  {
    name: 'Robert Martinez',
    role: 'Restaurant Owner',
    content: 'Running a business means juggling many expenses. FinanceFlow\'s bill management service has been a game-changer for keeping my business finances in order.',
    rating: 5,
  },
];

const faqs = [
  {
    question: 'How does credit card bill management service work?',
    answer: 'Our service analyzes your credit card statements, creates optimized payment schedules, and provides ongoing support to ensure timely payments while minimizing interest charges.',
  },
  {
    question: 'Is my financial information secure?',
    answer: 'Absolutely. We use SSL encryption and follow strict data protection protocols aligned with GDPR practices. Your information is handled with complete confidentiality and never shared with third parties.',
  },
  {
    question: 'What are the fees for your services?',
    answer: 'We offer transparent pricing with no hidden fees. After a free consultation, we provide a detailed quote based on your specific needs and the complexity of your situation.',
  },
  {
    question: 'How quickly can I see results?',
    answer: 'Most clients notice improved financial clarity within the first month. Significant savings from avoided penalties typically accumulate over 3-6 months.',
  },
];

// FAQ Accordion Component
function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black via-purple-950/10 to-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-400 font-semibold mb-4 block">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently Asked
            <span className="gradient-text"> Questions</span>
          </h2>
          <p className="text-gray-400">
            Get answers to the most common questions about our services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="glass-card rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full p-6 text-left"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-white font-semibold pr-8">{faq.question}</h3>
                <ChevronRight
                  className={`w-5 h-5 text-indigo-400 transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-90' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
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

        <div className="text-center mt-8">
          <Link to="/contact" className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-2">
            Have more questions? Contact us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Testimonials Slider Component
function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slidesPerView, setSlidesPerView] = useState(3);

  // Responsive slides per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - slidesPerView);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Navigation via dots only

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-400 font-semibold mb-4 block">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands of
            <span className="gradient-text"> Happy Clients</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See what our clients say about their experience with FinanceFlow.
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation via dots only */}

          {/* Slider Track */}
          <div className="overflow-hidden" ref={sliderRef}>
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <div className="glass-card rounded-2xl p-8 h-full hover-lift">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 mb-6 leading-relaxed line-clamp-4">"{testimonial.content}"</p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{testimonial.name}</div>
                        <div className="text-gray-400 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-indigo-500 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-down">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Trusted by 50,000+ Professionals Worldwide</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Take Control of Your
              <span className="block gradient-text">Credit Card Payments</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Expert credit card bill management and financial assistance services. 
              Avoid late fees, optimize payments, and achieve lasting financial clarity.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up delay-300">
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
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up delay-400">
              {trustIndicators.map((item, index) => (
                <div key={index} className="glass-card rounded-2xl p-4 hover-lift">
                  <item.icon className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{item.label}</div>
                  <div className="text-sm text-gray-400">{item.sublabel}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ArrowDown className="w-6 h-6 text-gray-500" />
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* How It Works Section */}
      <section className="py-24 relative" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">HOW IT WORKS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Simple 4-Step Process to
              <span className="gradient-text"> Financial Freedom</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our streamlined process makes credit card bill management effortless. 
              Get started today and experience the difference.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent z-0" />
                )}
                <div className="glass-card rounded-2xl p-6 hover-lift relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-indigo-400 font-bold text-sm">STEP {step.step}</span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gradient-to-b from-black via-indigo-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">WHY CHOOSE US</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Benefits of Smart
              <span className="gradient-text"> Credit Card Management</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover how our professional credit card bill management service can transform your financial life.
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

      {/* Testimonials Section */}
      <TestimonialsSlider />

      {/* FAQ Section */}
      <FAQSection />

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
                Ready to Take Control of Your Finances?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of professionals who have transformed their credit card management. 
                Get your free consultation today.
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
              <div className="mt-8 flex items-center justify-center gap-6 text-white/70 text-sm">
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
