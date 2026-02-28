import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Shield, 
  Lock, 
  Scale, 
  Users, 
  Clock, 
  HelpCircle,
  CheckCircle,
  FileText,
  TrendingUp,
  Phone,
  MessageCircle,
  AlertCircle,
  Banknote
} from 'lucide-react';

// FAQ Categories with questions
const faqCategories = [
  {
    id: 'legal',
    title: 'Legal & Compliance',
    icon: Scale,
    color: 'from-indigo-500 to-purple-500',
    questions: [
      {
        question: 'Is this service legal?',
        answer: `Absolutely, yes. Our credit card bill management service operates fully within the legal framework. We are a registered financial consulting firm that helps individuals manage their credit card payments more effectively. We don't engage in any debt settlement negotiations that would require special licensing, nor do we make payments on your behalf without proper authorization. Our role is purely advisory and organizational — helping you understand your payment obligations, create structured payment plans, and maintain financial discipline. All our practices comply with consumer protection laws and financial services regulations.`
      },
      {
        question: 'Are you a registered company?',
        answer: `Yes, FinanceFlow is a legally registered financial consulting firm. We operate transparently with all necessary business registrations and comply with local and international financial advisory regulations. Our company details, registration numbers, and compliance certifications are available upon request. We believe in complete transparency, which is why we maintain proper documentation and adhere to all regulatory requirements governing financial consulting services.`
      },
      {
        question: 'Do you have any certifications?',
        answer: `Our team consists of certified financial professionals with credentials from recognized financial institutions. Our advisors hold certifications in financial planning, credit management, and consumer finance. We continuously update our knowledge base to stay current with financial regulations and best practices. While we're not a bank or lending institution (and don't claim to be), our expertise in credit management and financial planning is backed by proper qualifications and ongoing professional development.`
      },
      {
        question: 'What regulations do you follow?',
        answer: `We adhere to consumer protection regulations, data privacy laws (including GDPR compliance for international clients), and financial advisory standards. Our services are designed to empower consumers with knowledge and tools rather than making financial decisions on their behalf. We maintain ethical standards that prioritize client welfare and transparent communication. Any advice we provide is clearly labeled as informational guidance rather than licensed financial advice where applicable.`
      }
    ]
  },
  {
    id: 'security',
    title: 'Data Security & Privacy',
    icon: Lock,
    color: 'from-indigo-500 to-purple-500',
    questions: [
      {
        question: 'Is my personal data secure with you?',
        answer: `Your data security is our highest priority. We employ SSL encryption for all data transmission and storage. Our systems are hosted on secure, certified cloud infrastructure with multiple layers of protection including firewalls, intrusion detection systems, and regular security audits. We never store sensitive financial information like full credit card numbers or CVV codes. Access to client data is strictly limited to authorized personnel on a need-to-know basis, and all team members undergo background checks and sign confidentiality agreements.`
      },
      {
        question: 'Do you share my information with third parties?',
        answer: `No, we never sell, rent, or share your personal information with third parties for marketing purposes. Your data is used exclusively for providing our services to you. The only exceptions are: (1) when legally required by court order or regulatory authority, (2) with service providers who help us operate (like secure cloud hosting), who are contractually bound to protect your data, and (3) with your explicit written consent. You maintain full control over your information and can request deletion at any time.`
      },
      {
        question: 'How long do you retain my data?',
        answer: `We retain your data only as long as necessary to provide our services and comply with legal requirements. Active client data is maintained throughout our engagement plus a standard retention period (typically 3-5 years) for legal and tax compliance. After this period, data is securely deleted using industry-standard data destruction methods. You can request early deletion of your data at any time, subject to legal retention requirements. We provide a clear data retention policy document to all clients upon request.`
      },
      {
        question: 'What happens to my data if I stop using your service?',
        answer: `When you discontinue our services, we initiate a data transition process. You'll receive all your financial planning documents and records. Personal data enters our standard retention period for compliance purposes, after which it's securely deleted. You can request immediate deletion of non-essential data. We provide a formal confirmation when your data has been removed from our systems. Your privacy continues to be protected even after our business relationship ends.`
      }
    ]
  },
  {
    id: 'credit-score',
    title: 'Credit Score Impact',
    icon: TrendingUp,
    color: 'from-indigo-500 to-purple-500',
    questions: [
      {
        question: 'Does using your service impact my credit score?',
        answer: `Our service itself does not directly impact your credit score — we don't report to credit bureaus, and using our consulting service is not recorded on your credit file. In fact, our goal is to help you improve your credit health. By helping you make timely payments, reduce credit utilization, and avoid late fees, we often help clients see positive improvements in their credit scores over time. We never advise actions that would negatively impact your creditworthiness.`
      },
      {
        question: 'Will you perform a credit check on me?',
        answer: `No, we do not perform hard credit inquiries. When you share your credit card information for bill management purposes, we only need to see your statements and payment schedules — not run credit checks. This means engaging with our service creates no "hard inquiry" on your credit report. We may ask you to share your credit score or report for analysis purposes, but this is voluntary and doesn't involve us pulling your credit.`
      },
      {
        question: 'How can your service help improve my credit score?',
        answer: `While we don't guarantee credit score improvements (as scores depend on many factors), our structured approach typically helps in several ways: (1) Payment history improvement through timely payment planning, (2) Credit utilization optimization by strategic payment scheduling, (3) Avoiding late payment marks through reminder systems and planning, (4) Reducing overall debt through efficient payment strategies. Many clients report seeing positive changes in their credit profiles within 3-6 months of following our recommended plans.`
      },
      {
        question: 'What if I already have a poor credit score?',
        answer: `We welcome clients at all credit score levels. In fact, those with challenging credit situations often benefit most from our structured approach. We don't judge your financial past — we focus on building a better financial future. Our team has experience helping clients recover from difficult situations, and we'll create a realistic, achievable plan tailored to your current circumstances. Remember, credit recovery is a journey, and we're here to guide you through it step by step.`
      }
    ]
  },
  {
    id: 'eligibility',
    title: 'Eligibility & Who Can Apply',
    icon: Users,
    color: 'from-indigo-500 to-purple-500',
    questions: [
      {
        question: 'Who can use your services?',
        answer: `Our services are designed for anyone managing credit card payments who wants better financial organization. This includes: salaried professionals juggling multiple cards, business owners managing business expenses, freelancers with irregular income patterns, young professionals new to credit management, families looking to streamline household finances, and anyone feeling overwhelmed by credit card payments. We serve clients globally, with services available in English. You must be 18+ and the legal holder of the credit cards being managed.`
      },
      {
        question: 'Do I need a minimum income to qualify?',
        answer: `No, we don't have minimum income requirements. Our service is designed to help people at various income levels manage their credit card payments more effectively. Whether you're a high-income professional seeking optimization or someone with modest income looking to avoid late fees and penalties, our flexible service plans can accommodate your needs. During consultation, we'll understand your financial situation and recommend an appropriate plan.`
      },
      {
        question: 'Can business owners use this service?',
        answer: `Absolutely! We have dedicated service tracks for business owners and entrepreneurs. Managing business credit cards alongside personal cards can be complex, and we help create clear separation and management strategies. We understand the unique challenges of business finance — irregular cash flows, seasonal variations, and the need to maintain good credit for business purposes. Our business-focused plans address these specific needs.`
      },
      {
        question: 'Is this service available internationally?',
        answer: `Yes, we serve clients globally. Our service is particularly suited for English-speaking clients worldwide. We have experience working with credit card systems from various countries and understand different banking practices. For international clients, consultations are conducted via video call and email, and our digital-first approach ensures seamless service regardless of location. Time zone differences are accommodated with flexible scheduling.`
      },
      {
        question: 'What if I have multiple credit cards?',
        answer: `Managing multiple credit cards is actually one of our core specialties. Many clients come to us specifically because they're juggling 3, 5, or even 10+ credit cards and struggling to keep track. We help consolidate your payment schedules, prioritize cards based on interest rates and due dates, and create a unified management strategy. Our multi-card management approach often helps clients discover they were paying unnecessary fees simply due to organizational challenges.`
      }
    ]
  },
  {
    id: 'processing',
    title: 'Processing Time & Timeline',
    icon: Clock,
    color: 'from-indigo-500 to-purple-500',
    questions: [
      {
        question: 'How long does the onboarding process take?',
        answer: `Our onboarding is designed to be quick and efficient. Initial consultation typically takes 30-45 minutes, either via phone or video call. After consultation, we'll request some basic documentation (credit card statements, payment schedules). Once we receive your information, our team prepares your personalized payment plan within 24-48 hours. Most clients are fully onboarded and have their management plan in place within 3-5 business days from initial contact.`
      },
      {
        question: 'When will I see results?',
        answer: `Results timeline varies based on your starting situation and goals. Immediate results include organized payment schedules and clarity on due dates (within first week). Short-term results include reduced late fees and penalty avoidance (within first billing cycle, typically 30 days). Medium-term results include improved payment patterns and potential credit utilization optimization (2-3 months). Long-term results include established financial discipline and potential credit score improvements (3-6 months). We set realistic expectations during consultation.`
      },
      {
        question: 'How quickly can I get a consultation?',
        answer: `We prioritize quick response times. After you submit an inquiry, our team typically responds within 2-4 business hours during working days. Consultations can usually be scheduled within 24-48 hours of your inquiry. For urgent situations (like imminent payment deadlines), we offer priority scheduling. Our WhatsApp support enables even faster initial communication for quick questions before formal consultation.`
      },
      {
        question: 'What is the minimum commitment period?',
        answer: `We offer flexible commitment options. Our standard plans start with a 3-month minimum engagement, which allows enough time to implement strategies and see meaningful results. However, we also offer month-to-month plans for those who prefer flexibility (at a slightly different rate). There are no long-term lock-in contracts, and you can adjust or cancel your plan with 30 days notice. We believe in earning your continued business through results, not contractual obligations.`
      }
    ]
  },
  {
    id: 'charges',
    title: 'Service Charges & Pricing',
    icon: Banknote,
    color: 'from-indigo-500 to-purple-500',
    questions: [
      {
        question: 'What are your service charges?',
        answer: `Our pricing is transparent and competitive. We offer tiered plans based on the complexity of your needs: Basic Plan for single card management with standard support, Standard Plan for 2-5 cards with priority support and advanced strategies, and Premium Plan for 5+ cards with dedicated advisor and comprehensive financial planning. Exact pricing is provided during consultation as it depends on your specific requirements. We never have hidden fees, and all costs are clearly explained before you commit.`
      },
      {
        question: 'Is the initial consultation free?',
        answer: `Yes, your first consultation is completely free with no obligation. During this 30-45 minute session, we'll understand your situation, explain how we can help, and answer all your questions. You'll receive preliminary recommendations even if you decide not to proceed with our paid services. We believe you should have complete information to make an informed decision, which is why we invest in this free consultation.`
      },
      {
        question: 'Are there any hidden fees?',
        answer: `Absolutely not. Transparency is a core value at FinanceFlow. Your service fee covers all standard services within your chosen plan. We clearly outline what's included and any optional add-ons with their costs. You'll never receive surprise charges on your bill. If any additional services are needed beyond your plan, we'll discuss costs upfront and get your approval before proceeding. What we quote is what you pay.`
      },
      {
        question: 'What payment methods do you accept?',
        answer: `We accept multiple payment methods for your convenience: bank transfers, credit/debit cards, and digital payment platforms. For recurring monthly fees, we can set up automatic payments to ensure uninterrupted service. International clients can pay via wire transfer or international card payments. We provide proper invoices for all transactions, which can be useful for tax purposes if you're a business owner using our services for business card management.`
      },
      {
        question: 'Do you offer refunds?',
        answer: `We stand behind our service quality. If you're unsatisfied within the first 14 days of starting a paid plan, we offer a full refund, no questions asked. After 14 days, refunds are prorated based on the remaining service period. We're confident that once you experience our systematic approach, you'll see the value. Our high client retention rate reflects our commitment to delivering results that justify your investment.`
      },
      {
        question: 'Is this worth the investment?',
        answer: `Consider this: the average credit card late fee is $25-40 per occurrence, and interest charges on missed payments compound quickly. Most clients save significantly more in avoided fees, penalties, and interest charges than they pay for our service. Beyond monetary savings, you gain peace of mind, time savings from organized finances, and often improved credit health. During your free consultation, we can provide a personalized cost-benefit analysis based on your specific situation.`
      }
    ]
  }
];

// General questions for a separate section
const generalQuestions = [
  {
    question: 'What exactly is credit card bill management service?',
    answer: `Credit card bill management is a professional service that helps you organize, track, and optimize your credit card payments. We analyze your credit cards, payment due dates, interest rates, and spending patterns to create a strategic payment plan. Our service includes payment reminders, optimization strategies to minimize interest, guidance on credit utilization, and ongoing support to maintain financial discipline. Think of us as your personal financial organizer focused specifically on credit card management.`
  },
  {
    question: 'How is this different from talking to my bank?',
    answer: `Banks serve their own interests — they profit from your interest payments and fees. We work exclusively for you. Our recommendations are unbiased and focused on your financial well-being, not selling you more products. We also provide a holistic view across all your cards (from multiple banks), something no single bank can offer. Our personalized attention and ongoing support goes beyond what bank customer service typically provides.`
  },
  {
    question: 'Do you make payments on my behalf?',
    answer: `No, we don't handle your money or make payments on your behalf. This is intentional — it keeps your funds secure and under your control at all times. What we do is create detailed payment plans, send reminders, track your payment status, and provide guidance. You maintain full control of your bank accounts and make payments yourself (or through your bank's auto-pay features, which we help you set up). This approach protects both parties and ensures transparency.`
  },
  {
    question: 'Can you negotiate with credit card companies for me?',
    answer: `Our primary service is management and planning, not negotiation. However, we can guide you on how to approach credit card companies for rate reductions, fee waivers, or payment arrangements. We'll help you prepare what to say, when to call, and what to ask for. For complex debt negotiation situations, we can refer you to licensed debt counselors or attorneys who specialize in that area. Our role is to empower you with knowledge and strategies.`
  },
  {
    question: 'What if I miss a payment despite your planning?',
    answer: `Life happens, and we understand that. If you miss a payment, we'll help you take immediate corrective action — contacting the credit card company for potential fee reversal (first-time courtesy is often available), adjusting your plan to account for the missed payment, and implementing additional safeguards to prevent recurrence. Our goal is progress, not perfection. We'll work with you through challenges without judgment.`
  }
];

// FAQ Accordion Item Component
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem = ({ question, answer, isOpen, onClick, index }: FAQItemProps) => (
  <div className="glass-card rounded-2xl overflow-hidden">
    <button
      onClick={onClick}
      className={`w-full px-6 py-5 flex items-center justify-between text-left transition-colors duration-300 ${
        isOpen ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30' : ''
      }`}
    >
      <div className="flex items-center space-x-4">
        <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300 ${
          isOpen 
            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white' 
            : 'bg-white/10 text-gray-400'
        }`}>
          {index + 1}
        </span>
        <span className={`font-semibold transition-colors ${isOpen ? 'text-white' : 'text-gray-300'}`}>
          {question}
        </span>
      </div>
      <ChevronRight className={`w-5 h-5 transition-all duration-300 flex-shrink-0 ml-4 ${
        isOpen ? 'rotate-90 text-indigo-400' : 'text-gray-400'
      }`} />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
    }`}>
      <div className="px-6 pb-6 pl-[76px]">
        <p className="text-gray-400 leading-relaxed">{answer}</p>
      </div>
    </div>
  </div>
);

// Category Section Component
interface CategorySectionProps {
  category: typeof faqCategories[0];
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
  baseIndex: number;
}

const CategorySection = ({ category, openIndex, setOpenIndex, baseIndex }: CategorySectionProps) => {
  const Icon = category.icon;
  
  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">{category.title}</h2>
          <p className="text-gray-500 text-sm">{category.questions.length} questions</p>
        </div>
      </div>
      <div className="space-y-4">
        {category.questions.map((item, idx) => {
          const globalIndex = baseIndex + idx;
          return (
            <FAQItem
              key={idx}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === globalIndex}
              onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
              index={idx}
            />
          );
        })}
      </div>
    </div>
  );
};

// Category Slider Component
interface CategorySliderProps {
  categories: typeof faqCategories;
  activeCategory: string | null;
  setActiveCategory: (id: string) => void;
}

const CategorySlider = ({ categories, activeCategory, setActiveCategory }: CategorySliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const maxIndex = Math.max(0, categories.length - slidesPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(categoryId);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight - 20,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-indigo-400 font-semibold mb-4 block">BROWSE BY CATEGORY</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Select a Topic to <span className="gradient-text">Explore</span>
          </h2>
        </div>
          
        <div className="relative overflow-hidden" ref={sliderRef}>
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div 
                  key={category.id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <button
                    onClick={() => handleCategoryClick(category.id)}
                    className={`w-full glass-card rounded-2xl p-6 transition-all duration-300 hover-lift ${
                      activeCategory === category.id
                        ? 'ring-2 ring-indigo-500/50 bg-gradient-to-br from-indigo-900/30 to-purple-900/30'
                        : ''
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-center text-white text-lg mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-gray-400 text-center">
                      {category.questions.length} questions
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-indigo-500 w-8'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate base indices for each category
  let currentIndex = 0;
  const categoryBaseIndices: { [key: string]: number } = {};
  faqCategories.forEach(cat => {
    categoryBaseIndices[cat.id] = currentIndex;
    currentIndex += cat.questions.length;
  });

  // Filter categories based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  const filteredGeneralQuestions = generalQuestions.filter(
    q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
         q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center pt-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in-down">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-gray-300">Got Questions? We Have Answers</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Frequently Asked
              <span className="block gradient-text">Questions</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto animate-fade-in-up delay-200">
              Transparency is our foundation. Find honest, detailed answers to all your questions 
              about our credit card bill management service.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto relative animate-fade-in-up delay-300">
              <input
                type="text"
                placeholder="Search your question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 glass-card rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Slider */}
      <CategorySlider 
        categories={faqCategories} 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Trust Badges */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, text: 'SSL Secured Platform' },
              { icon: Lock, text: 'GDPR-Aligned Data Practices' },
              { icon: FileText, text: 'Privacy-First Infrastructure' },
              { icon: CheckCircle, text: 'Confidential Client Handling' }
            ].map((badge, index) => (
              <div key={index} className="glass-card rounded-2xl p-6 text-center hover-lift">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <badge.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-sm text-gray-300 font-semibold">{badge.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-24 bg-gradient-to-b from-black via-indigo-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">ALL QUESTIONS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Find Answers to Your
              <span className="gradient-text"> Questions</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse through our comprehensive FAQ sections to find detailed answers.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {(searchQuery ? filteredCategories : faqCategories).map((category) => (
              <div key={category.id} id={category.id}>
                <CategorySection
                  category={category}
                  openIndex={openIndex}
                  setOpenIndex={setOpenIndex}
                  baseIndex={categoryBaseIndices[category.id]}
                />
              </div>
            ))}

            {/* General Questions */}
            {(searchQuery ? filteredGeneralQuestions.length > 0 : true) && (
              <div className="mb-16" id="general">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">General Questions</h2>
                    <p className="text-gray-500 text-sm">{generalQuestions.length} questions</p>
                  </div>
                </div>
                <div className="space-y-4">
                  {(searchQuery ? filteredGeneralQuestions : generalQuestions).map((item, idx) => {
                    const globalIndex = currentIndex + idx;
                    return (
                      <FAQItem
                        key={idx}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === globalIndex}
                        onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                        index={idx}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Results Message */}
            {searchQuery && filteredCategories.length === 0 && filteredGeneralQuestions.length === 0 && (
              <div className="glass-card rounded-2xl text-center py-16 px-8">
                <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No questions found</h3>
                <p className="text-gray-400 mb-6">
                  We couldn't find any questions matching "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn-primary px-6 py-3 rounded-full text-white font-semibold"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still Have Questions CTA */}
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
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Our team is here to help. Get personalized answers to your specific 
                questions through a free consultation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-4 rounded-full bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  Contact Us
                  <ChevronRight className="w-5 h-5" />
                </Link>
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 text-white/70 text-sm flex-wrap">
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Free Consultation
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  No Obligation
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Quick Response
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Assurances Section */}
      <section className="py-24 bg-gradient-to-b from-black via-purple-950/10 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold mb-4 block">KEY ASSURANCES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What You Can Always
              <span className="gradient-text"> Count On</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These are the core principles that guide everything we do at FinanceFlow.
            </p>
          </div>
            
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Scale,
                title: 'Fully Legal & Compliant',
                description: 'Our services operate within all legal frameworks. We are a registered consulting firm with proper business credentials.'
              },
              {
                icon: Lock,
                title: 'Your Data is Sacred',
                description: 'SSL encryption, GDPR-aligned practices, strict access controls. Your information is protected at every level.'
              },
              {
                icon: TrendingUp,
                title: 'Credit Score Protected',
                description: 'We don\'t run credit checks or report to bureaus. Our goal is to help improve your credit health, not harm it.'
              }
            ].map((card, index) => (
              <div key={index} className="glass-card rounded-2xl p-8 hover-lift group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 flex items-center justify-center mb-6 group-hover:from-indigo-500/40 group-hover:to-purple-600/40 transition-colors">
                  <card.icon className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{card.title}</h3>
                <p className="text-gray-400">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default FAQ;
