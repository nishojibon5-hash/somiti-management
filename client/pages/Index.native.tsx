import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function Index() {
  const navigation = useNavigation();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  const text = {
    bn: {
      title: 'সমিতি ম্যানেজার',
      subtitle: 'আধুনিক সমিতি ও ক্ষুদ্রঋণ ব্যবস্থাপনা সফটওয়্যার',
      description: 'বাংলাদেশের সবচেয়ে ��ন্নত ও নিরাপদ সমিতি ব্যবস্থাপনা সমাধান। সহজ, নিরাপদ এবং কার্যকর।',
      getStarted: 'শুরু করুন',
      learnMore: 'আরও জানুন',
      features: 'বৈশিষ্ট্যসমূহ',
      pricing: 'মূল্য তালিকা',
      login: 'লগইন',
      admin: 'এডমিন',
    },
    en: {
      title: 'Somiti Manager',
      subtitle: 'Modern Cooperative & Microfinance Management Software',
      description: "Bangladesh's most advanced and secure cooperative management solution. Simple, secure, and effective.",
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      features: 'Features',
      pricing: 'Pricing',
      login: 'Login',
      admin: 'Admin',
    },
  };

  const t = text[language];

  const features = [
    {
      icon: 'people',
      title: language === 'bn' ? 'সদস্য ব্যবস্থাপনা' : 'Member Management',
      description: language === 'bn' ? 'সম্পূর্ণ সদস্য তথ্য ও লেনদেন ব্যবস্থাপনা' : 'Complete member information and transaction management',
    },
    {
      icon: 'credit-card',
      title: language === 'bn' ? 'ঋণ ব্যবস্থাপনা' : 'Loan Management',
      description: language === 'bn' ? 'স্বয়ংক্রিয় ঋণ প্রক্রিয়া ও পরিশোধ ট্র্যাকিং' : 'Automated loan processing and repayment tracking',
    },
    {
      icon: 'bar-chart',
      title: language === 'bn' ? 'রিপোর্ট ও বিশ্লেষণ' : 'Reports & Analytics',
      description: language === 'bn' ? 'বিস্তারিত আর্থিক রিপোর্ট ও ডেটা বিশ্লেষণ' : 'Detailed financial reports and data analytics',
    },
    {
      icon: 'security',
      title: language === 'bn' ? 'নিরাপত্তা' : 'Security',
      description: language === 'bn' ? 'ব্যাংক স্তরের নিরাপত্তা ও এনক্রিপশন' : 'Bank-level security and encryption',
    },
    {
      icon: 'phone-android',
      title: language === 'bn' ? 'মোবাইল অ্যাপ' : 'Mobile App',
      description: language === 'bn' ? 'অ্যান্ড্রয়েড ও আইওএস অ্যাপ্লিকেশন' : 'Android and iOS applications',
    },
    {
      icon: 'backup',
      title: language === 'bn' ? 'ব্���াকআপ সিস্টেম' : 'Backup System',
      description: language === 'bn' ? 'স্বয়ংক্রিয় ডেটা ব্যাকআপ ও রিকভারি' : 'Automatic data backup and recovery',
    },
  ];

  const pricingPlans = [
    {
      name: language === 'bn' ? 'ফ্রি' : 'Free',
      price: language === 'bn' ? 'বিনামূল্যে' : 'Free',
      description: language === 'bn' ? 'ছোট সমিতির জন্য আদর্শ' : 'Perfect for small cooperatives',
      features: [
        language === 'bn' ? '৫ জন সদস্য পর্যন্ত' : 'Up to 5 members',
        language === 'bn' ? 'মৌলিক লেনদেন ব্যবস্থাপনা' : 'Basic transaction management',
        language === 'bn' ? 'সঞ্চয় ও ঋণ হিসাব' : 'Savings & loan accounts',
      ],
      popular: false,
    },
    {
      name: language === 'bn' ? 'প্রো' : 'Pro',
      price: language === 'bn' ? '৳২,৫০০/মাস' : '৳2,500/month',
      description: language === 'bn' ? 'ক্রমবর্ধমান ব্যবসার জন্য' : 'For growing businesses',
      features: [
        language === 'bn' ? '৫০০ জন সদস্য পর্যন্��' : 'Up to 500 members',
        language === 'bn' ? 'উন্নত লেনদেন ব্যবস্থাপনা' : 'Advanced transaction management',
        language === 'bn' ? 'ভাউচার প্রিন্টিং' : 'Voucher printing',
        language === 'bn' ? 'বিস্তারিত রিপোর্ট' : 'Detailed reports',
      ],
      popular: true,
    },
    {
      name: language === 'bn' ? 'প্রিমিয়াম' : 'Premium',
      price: language === 'bn' ? '৳৫,০০০/মাস' : '৳5,000/month',
      description: language === 'bn' ? 'বড় প্রতিষ্ঠানের জন্য সম্পূর্ণ সমাধান' : 'Complete solution for large organizations',
      features: [
        language === 'bn' ? '৫০০০+ সদস্য' : '5000+ members',
        language === 'bn' ? 'সম্পূর্ণ ফিচার সেট' : 'Complete feature set',
        language === 'bn' ? 'কাস্টম রিপোর্ট' : 'Custom reports',
        language === 'bn' ? '২৪/৭ প্রাধিমিক সাপোর্ট' : '24/7 priority support',
      ],
      popular: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2563eb" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logo}>
            <Icon name="people" size={20} color="#ffffff" />
          </View>
          <Text style={styles.logoText}>{t.title}</Text>
        </View>
        
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => navigation.navigate('AdminLogin' as never)}
          >
            <Icon name="admin-panel-settings" size={16} color="#7c3aed" />
            <Text style={styles.adminText}>{t.admin}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.langButton}
            onPress={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
          >
            <Text style={styles.langText}>{language === 'bn' ? 'EN' : 'বাং'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {language === 'bn' ? 'বাংলাদেশের #১ সমি���ি সফটওয়্যার' : "Bangladesh's #1 Cooperative Software"}
            </Text>
          </View>
          
          <Text style={styles.heroTitle}>{t.subtitle}</Text>
          <Text style={styles.heroDescription}>{t.description}</Text>
          
          <View style={styles.heroButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={() => navigation.navigate('Signup' as never)}
            >
              <Text style={styles.primaryButtonText}>{t.getStarted}</Text>
              <Icon name="arrow-forward" size={18} color="#ffffff" style={styles.buttonIcon} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>{t.learnMore}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'bn' ? 'কেন আমাদের বেছে নিবেন?' : 'Why Choose Us?'}
          </Text>
          <Text style={styles.sectionDescription}>
            {language === 'bn'
              ? 'আধুনিক প্রযুক্তি ও বাংলাদেশী ব্যাংকিং চাহিদার সমন্বয়ে তৈরি'
              : 'Built with modern technology and Bangladeshi banking needs in mind'}
          </Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Icon name={feature.icon} size={24} color="#2563eb" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Pricing Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t.pricing}</Text>
          <Text style={styles.sectionDescription}>
            {language === 'bn' ? 'আপনার প্রয়োজন অনুযায়ী প্যাকেজ বেছে নিন' : 'Choose the plan that fits your needs'}
          </Text>
          
          <View style={styles.pricingGrid}>
            {pricingPlans.map((plan, index) => (
              <View key={index} style={[styles.pricingCard, plan.popular && styles.popularCard]}>
                {plan.popular && (
                  <View style={styles.popularBadge}>
                    <Text style={styles.popularBadgeText}>
                      {language === 'bn' ? 'জনপ্রিয়' : 'Popular'}
                    </Text>
                  </View>
                )}
                
                <Text style={styles.planName}>{plan.name}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planDescription}>{plan.description}</Text>
                
                <View style={styles.planFeatures}>
                  {plan.features.map((feature, featureIndex) => (
                    <View key={featureIndex} style={styles.planFeature}>
                      <Icon name="check" size={16} color="#16a34a" />
                      <Text style={styles.planFeatureText}>{feature}</Text>
                    </View>
                  ))}
                </View>
                
                <TouchableOpacity style={[styles.planButton, plan.popular && styles.popularButton]}>
                  <Text style={[styles.planButtonText, plan.popular && styles.popularButtonText]}>
                    {language === 'bn' ? 'শুরু করুন' : 'Get Started'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>১০০০+</Text>
              <Text style={styles.statLabel}>{language === 'bn' ? 'সমিতি' : 'Cooperatives'}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>৫০,০০০+</Text>
              <Text style={styles.statLabel}>{language === 'bn' ? 'সদস্য' : 'Members'}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>৯৯.৯%</Text>
              <Text style={styles.statLabel}>{language === 'bn' ? 'আপটাইম' : 'Uptime'}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>২৪/৭</Text>
              <Text style={styles.statLabel}>{language === 'bn' ? 'সাপোর্ট' : 'Support'}</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLogo}>
              <View style={styles.logo}>
                <Icon name="people" size={20} color="#ffffff" />
              </View>
              <Text style={styles.footerLogoText}>{t.title}</Text>
            </View>
            <Text style={styles.footerDescription}>
              {language === 'bn'
                ? 'বাংলাদেশের সবচেয়ে বিশ্বস্ত সমিতি ব্যবস্থাপনা সমাধান।'
                : "Bangladesh's most trusted cooperative management solution."}
            </Text>
          </View>
          
          <View style={styles.footerBottom}>
            <Text style={styles.footerCopyright}>
              © 2024 {t.title}. {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Buttons */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity
          style={styles.loginFab}
          onPress={() => navigation.navigate('Login' as never)}
        >
          <Icon name="login" size={20} color="#ffffff" />
          <Text style={styles.fabText}>{t.login}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    backgroundColor: '#2563eb',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  adminButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
    marginRight: 8,
  },
  adminText: {
    fontSize: 12,
    color: '#7c3aed',
    marginLeft: 4,
  },
  langButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 6,
  },
  langText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 16,
    lineHeight: 36,
  },
  heroDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  heroButtons: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#f9fafb',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  pricingGrid: {
    gap: 16,
  },
  pricingCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    position: 'relative',
  },
  popularCard: {
    borderColor: '#2563eb',
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: '50%',
    marginLeft: -30,
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    textAlign: 'center',
    marginBottom: 8,
  },
  planDescription: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  planFeatures: {
    marginBottom: 24,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  planFeatureText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
    flex: 1,
  },
  planButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  popularButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  planButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  popularButtonText: {
    color: '#ffffff',
  },
  statsSection: {
    backgroundColor: '#2563eb',
    paddingVertical: 40,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    width: '50%',
    marginBottom: 20,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  footer: {
    backgroundColor: '#1f2937',
    paddingVertical: 40,
  },
  footerContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  footerLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  footerLogoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  footerDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
  footerBottom: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#374151',
    alignItems: 'center',
  },
  footerCopyright: {
    fontSize: 12,
    color: '#9ca3af',
  },
  floatingButtons: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  loginFab: {
    backgroundColor: '#16a34a',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  fabText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});
