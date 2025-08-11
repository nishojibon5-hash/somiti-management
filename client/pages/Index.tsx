import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  CreditCard, 
  Shield, 
  BarChart3, 
  Globe, 
  CheckCircle,
  Star,
  ArrowRight,
  Download,
  Lock,
  Zap,
  Trophy,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Index() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  const text = {
    bn: {
      title: "সমিতি ম্যানেজার",
      subtitle: "আধুনিক সমিতি ও ক্ষুদ্রঋণ ব্যবস্থাপনা সফটওয়্যার",
      description: "বাংলাদেশের সবচেয়ে উন্নত ও নিরাপদ সমিতি ব্যবস্থাপনা সমাধান। সহজ, নিরাপদ এবং কার্যকর।",
      getStarted: "শুরু করুন",
      learnMore: "আরও জানুন",
      features: "বৈশিষ্ট্যসমূহ",
      pricing: "মূল্য তালিকা",
      contact: "যোগাযোগ",
      free: "ফ্রি",
      pro: "প্রো",
      premium: "প্রিমিয়াম",
      freeDesc: "ছোট সমিতির জন্য আদর্শ",
      proDesc: "ক্রমবর্ধমান ব্যবসার জন্য",
      premiumDesc: "বড় প্রতিষ্ঠানের জন্য সম্পূর্ণ সমাধান",
      member: "সদস্য",
      monthly: "মাসিক",
      yearly: "বার্ষিক",
      trustedBy: "বিশ্বস্ত প্রতিষ্ঠানসমূহ",
      whyChoose: "কেন আমাদের বেছে নিবেন?",
      secureData: "নিরাপদ ডেটা সংরক্ষণ",
      multiLanguage: "বহুভাষিক সাপোর্ট",
      cloudBased: "ক্লাউড ভিত্তিক",
      support247: "২৪/৭ সাপোর্ট"
    },
    en: {
      title: "Somiti Manager",
      subtitle: "Modern Cooperative & Microfinance Management Software",
      description: "Bangladesh's most advanced and secure cooperative management solution. Simple, secure, and effective.",
      getStarted: "Get Started",
      learnMore: "Learn More",
      features: "Features",
      pricing: "Pricing",
      contact: "Contact",
      free: "Free",
      pro: "Pro",
      premium: "Premium",
      freeDesc: "Perfect for small cooperatives",
      proDesc: "For growing businesses",
      premiumDesc: "Complete solution for large organizations",
      member: "members",
      monthly: "Monthly",
      yearly: "Yearly",
      trustedBy: "Trusted by Organizations",
      whyChoose: "Why Choose Us?",
      secureData: "Secure Data Storage",
      multiLanguage: "Multi-language Support",
      cloudBased: "Cloud Based",
      support247: "24/7 Support"
    }
  };

  const t = text[language];

  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: language === 'bn' ? "সদস্য ব্যবস্থাপনা" : "Member Management",
      description: language === 'bn' ? "সম্পূর্ণ সদস্য তথ্য ও লেনদেন ব্যবস্থাপনা" : "Complete member information and transaction management"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: language === 'bn' ? "ঋণ ব্যবস্থাপনা" : "Loan Management",
      description: language === 'bn' ? "স্বয়ংক্রিয় ঋণ প্রক্রিয়া ও পরিশোধ ট্র্যাকিং" : "Automated loan processing and repayment tracking"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: language === 'bn' ? "রিপোর্ট ও বিশ্লেষণ" : "Reports & Analytics",
      description: language === 'bn' ? "বিস্তারিত আর্থিক রিপোর্ট ও ডেটা বিশ্লেষণ" : "Detailed financial reports and data analytics"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: language === 'bn' ? "নিরাপত্তা" : "Security",
      description: language === 'bn' ? "ব্যাংক স্তরের নিরাপত্তা ও এনক্রিপশন" : "Bank-level security and encryption"
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: language === 'bn' ? "মোবাইল অ্যাপ" : "Mobile App",
      description: language === 'bn' ? "অ্যান্ড্রয়েড ও আইওএস অ্যাপ্লিকেশন" : "Android and iOS applications"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: language === 'bn' ? "ব্যাকআপ সিস্টেম" : "Backup System",
      description: language === 'bn' ? "স্বয়ংক্রিয় ডেটা ব্যাকআপ ও রিকভারি" : "Automatic data backup and recovery"
    }
  ];

  const pricingPlans = [
    {
      name: t.free,
      price: language === 'bn' ? "বিনামূল্যে" : "Free",
      description: t.freeDesc,
      features: [
        language === 'bn' ? "৫ জন সদস্য পর্যন্ত" : "Up to 5 members",
        language === 'bn' ? "মৌলিক লেনদেন ব্যবস্থাপনা" : "Basic transaction management",
        language === 'bn' ? "সঞ্চয় ও ঋণ হিসাব" : "Savings & loan accounts",
        language === 'bn' ? "মৌলিক রিপোর্ট" : "Basic reports",
        language === 'bn' ? "ইমেইল সাপোর্ট" : "Email support"
      ],
      popular: false,
      cta: language === 'bn' ? "বিনামূল্যে শুরু করুন" : "Start Free"
    },
    {
      name: t.pro,
      price: language === 'bn' ? "৳২,৫০০/মাস" : "৳2,500/month",
      description: t.proDesc,
      features: [
        language === 'bn' ? "৫০০ জন সদস্য পর্যন্ত" : "Up to 500 members",
        language === 'bn' ? "উন্নত লেনদেন ব্যবস্থাপনা" : "Advanced transaction management",
        language === 'bn' ? "ভাউচার প্রিন্টিং" : "Voucher printing",
        language === 'bn' ? "বিস্তারিত রিপোর্ট" : "Detailed reports",
        language === 'bn' ? "ফোন ও ইমেইল সাপোর্ট" : "Phone & email support",
        language === 'bn' ? "সদস্য পোর্টাল" : "Member portal"
      ],
      popular: true,
      cta: language === 'bn' ? "প্রো শুরু করুন" : "Start Pro"
    },
    {
      name: t.premium,
      price: language === 'bn' ? "৳৫,০০০/মাস" : "৳5,000/month",
      description: t.premiumDesc,
      features: [
        language === 'bn' ? "৫০০০+ সদস্য" : "5000+ members",
        language === 'bn' ? "সম্পূর্ণ ফিচার সেট" : "Complete feature set",
        language === 'bn' ? "কাস্টম রিপোর্ট" : "Custom reports",
        language === 'bn' ? "এপিআই এক্সেস" : "API access",
        language === 'bn' ? "২৪/৭ প্রাধিমিক সাপোর্ট" : "24/7 priority support",
        language === 'bn' ? "ডেডিকেটেড একাউন্ট ম্যানেজার" : "Dedicated account manager"
      ],
      popular: false,
      cta: language === 'bn' ? "প্রিমিয়াম শুরু করুন" : "Start Premium"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-primary">{t.title}</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              {t.features}
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              {t.pricing}
            </a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              {t.contact}
            </a>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            >
              {language === 'bn' ? 'EN' : 'বাং'}
            </Button>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Link to="/login">{language === 'bn' ? 'লগইন' : 'Login'}</Link>
            </Button>
            <Button size="sm">
              <Link to="/signup">{t.getStarted}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            {language === 'bn' ? 'বাংলাদেশের #১ সমিতি সফটওয়্যার' : 'Bangladesh\'s #1 Cooperative Software'}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {t.subtitle}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8">
              <Link to="/signup" className="flex items-center">
                {t.getStarted}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              {t.learnMore}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.whyChoose}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'bn' 
                ? 'আধুনিক প্রযুক্তি ও বাংলাদেশী ব্যাংকিং চাহিদার সমন্বয়ে তৈরি'
                : 'Built with modern technology and Bangladeshi banking needs in mind'
              }
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.pricing}</h2>
            <p className="text-xl text-muted-foreground">
              {language === 'bn' 
                ? 'আপনার প্রয়োজন অনুযায়ী প্যাকেজ বেছে নিন'
                : 'Choose the plan that fits your needs'
              }
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary shadow-2xl scale-105' : 'shadow-lg'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    {language === 'bn' ? 'জনপ্রিয়' : 'Popular'}
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary my-4">{plan.price}</div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-success mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-6" 
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">১০০০+</div>
              <div className="text-lg opacity-90">{language === 'bn' ? 'সমিতি' : 'Cooperatives'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">৫০,০০০+</div>
              <div className="text-lg opacity-90">{language === 'bn' ? 'সদস্য' : 'Members'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">৯৯.৯%</div>
              <div className="text-lg opacity-90">{language === 'bn' ? 'আপটাইম' : 'Uptime'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">২৪/৭</div>
              <div className="text-lg opacity-90">{language === 'bn' ? 'সাপোর্ট' : 'Support'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-primary">{t.title}</span>
              </div>
              <p className="text-muted-foreground">
                {language === 'bn' 
                  ? 'বাংলাদেশের সবচেয়ে বিশ্বস্ত সমিতি ব্যব���্থাপনা সমাধান।'
                  : 'Bangladesh\'s most trusted cooperative management solution.'
                }
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{language === 'bn' ? 'পণ্য' : 'Product'}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>{language === 'bn' ? 'বৈশিষ্ট্যসমূহ' : 'Features'}</li>
                <li>{language === 'bn' ? 'মূল্য তালিকা' : 'Pricing'}</li>
                <li>{language === 'bn' ? 'সিকিউরিটি' : 'Security'}</li>
                <li>{language === 'bn' ? 'ইন্টিগ্রেশন' : 'Integrations'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{language === 'bn' ? 'সাপোর্ট' : 'Support'}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>{language === 'bn' ? 'সাহায্য কেন্দ্র' : 'Help Center'}</li>
                <li>{language === 'bn' ? 'ডকুমেন্টেশন' : 'Documentation'}</li>
                <li>{language === 'bn' ? 'ট্রেনিং' : 'Training'}</li>
                <li>{language === 'bn' ? 'যোগাযোগ' : 'Contact'}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">{language === 'bn' ? 'যোগাযোগ' : 'Contact'}</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>+৮৮০ ১৭ ১২৩৪ ৫৬৭৮</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>info@somitimanager.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{language === 'bn' ? 'ঢাকা, বাংলাদেশ' : 'Dhaka, Bangladesh'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 {t.title}. {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
