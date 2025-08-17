import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { storage } from '../App.native';

const { width } = Dimensions.get('window');

interface Member {
  memberID: string;
  memberName: string;
  nidNumber: string;
  mobileNumber: string;
  workerName: string;
  loanAmount: string;
  savingsAmount: string;
  dailyInstallment: string;
  dailySavings: string;
}

export default function Dashboard() {
  const navigation = useNavigation();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [members, setMembers] = useState<Member[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const text = {
    bn: {
      title: 'সমিতি ম্যানেজার',
      welcome: 'স্বাগতম, আহমেদ আলী',
      organization: 'প্রতিষ্ঠান: আল-আমিন সমিতি',
      todayDate: 'আজকের তারিখ: ১৫ জানুয়ারি, ২০২৪',
      totalMembers: 'মোট সদস্য',
      totalLoan: 'মোট ঋণ',
      totalSavings: 'মোট সঞ্চয়',
      todayCollection: 'আজকের আদায়',
      recentTransactions: 'সাম্প্রতিক লেনদেন',
      quickActions: 'দ্রুত কার্যক্রম',
      addMember: 'নতুন সদস্য',
      dailyCollection: 'দৈনিক কালেকশন',
      collectionsList: 'কালেকশন তালিকা',
      monthlyCalendar: 'মাসিক ক্যালেন্ডার',
      newLoan: 'নতুন ঋণ',
      backupSystem: 'ব্যাকআপ সিস্টেম',
      adminPanel: 'এডমিন প্যানেল',
      viewAll: 'সব দেখুন',
      savings: 'সঞ্চয়',
      worker: 'কর্মী',
      daily: 'দৈনিক',
      lastMonth: 'গত মাস থেকে',
    },
    en: {
      title: 'Somiti Manager',
      welcome: 'Welcome, Ahmed Ali',
      organization: 'Organization: Al-Amin Somiti',
      todayDate: 'Today: 15 January, 2024',
      totalMembers: 'Total Members',
      totalLoan: 'Total Loan',
      totalSavings: 'Total Savings',
      todayCollection: "Today's Collection",
      recentTransactions: 'Recent Transactions',
      quickActions: 'Quick Actions',
      addMember: 'Add Member',
      dailyCollection: 'Daily Collection',
      collectionsList: 'Collections List',
      monthlyCalendar: 'Monthly Calendar',
      newLoan: 'New Loan',
      backupSystem: 'Backup System',
      adminPanel: 'Admin Panel',
      viewAll: 'View All',
      savings: 'Savings',
      worker: 'Worker',
      daily: 'Daily',
      lastMonth: 'from last month',
    },
  };

  const t = text[language];

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const storedMembers = await storage.getItem('members');
      if (storedMembers) {
        setMembers(JSON.parse(storedMembers));
      }
    } catch (error) {
      console.error('Error loading members:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMembers();
    setRefreshing(false);
  };

  const calculateStats = () => {
    const totalMembers = members.length;
    const totalLoan = members.reduce((sum, member) => 
      sum + (parseFloat(member.loanAmount) || 0), 0
    );
    const totalSavings = members.reduce((sum, member) => 
      sum + (parseFloat(member.savingsAmount) || 0), 0
    );
    const todayCollection = 0; // Would be calculated from daily collections

    return {
      totalMembers,
      totalLoan: totalLoan.toLocaleString(),
      totalSavings: totalSavings.toLocaleString(),
      todayCollection: todayCollection.toLocaleString(),
    };
  };

  const stats = calculateStats();

  const quickActions = [
    {
      title: t.addMember,
      icon: 'person-add',
      route: 'AddMember',
      color: '#2563eb',
    },
    {
      title: t.dailyCollection,
      icon: 'payments',
      route: 'DailyCollection',
      color: '#16a34a',
    },
    {
      title: t.collectionsList,
      icon: 'list-alt',
      route: 'CollectionsList',
      color: '#ea580c',
    },
    {
      title: t.monthlyCalendar,
      icon: 'calendar-month',
      route: 'MonthlyCollections',
      color: '#9333ea',
    },
    {
      title: t.newLoan,
      icon: 'account-balance',
      route: 'AddMember', // Would be a separate loan screen
      color: '#dc2626',
    },
    {
      title: t.backupSystem,
      icon: 'backup',
      route: 'BackupRestore',
      color: '#0891b2',
    },
    {
      title: t.adminPanel,
      icon: 'admin-panel-settings',
      route: 'AdminLogin',
      color: '#7c3aed',
    },
  ];

  const handleLogout = async () => {
    await storage.removeItem('userLoggedIn');
    navigation.navigate('Index' as never);
  };

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
            style={styles.headerButton}
            onPress={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
          >
            <Text style={styles.headerButtonText}>
              {language === 'bn' ? 'EN' : 'বাং'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="notifications" size={20} color="#6b7280" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="settings" size={20} color="#6b7280" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>{t.welcome}</Text>
          <Text style={styles.welcomeSubtitle}>
            <Text style={styles.organization}>{t.organization}</Text>
            {'\n'}{t.todayDate}
          </Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>{t.totalMembers}</Text>
                <Icon name="people" size={24} color="#6b7280" />
              </View>
              <Text style={styles.statValue}>{stats.totalMembers}</Text>
              <Text style={styles.statChange}>
                <Text style={styles.statIncrease}>+100%</Text> {t.lastMonth}
              </Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>{t.totalLoan}</Text>
                <Icon name="credit-card" size={24} color="#6b7280" />
              </View>
              <Text style={styles.statValue}>৳{stats.totalLoan}</Text>
              <Text style={styles.statChange}>
                <Text style={styles.statIncrease}>+100%</Text> {t.lastMonth}
              </Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>{t.totalSavings}</Text>
                <Icon name="trending-up" size={24} color="#6b7280" />
              </View>
              <Text style={styles.statValue}>৳{stats.totalSavings}</Text>
              <Text style={styles.statChange}>
                <Text style={styles.statIncrease}>+100%</Text> {t.lastMonth}
              </Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statHeader}>
                <Text style={styles.statTitle}>{t.todayCollection}</Text>
                <Icon name="payments" size={24} color="#6b7280" />
              </View>
              <Text style={styles.statValue}>৳{stats.todayCollection}</Text>
              <Text style={styles.statChange}>
                <Text style={styles.statDecrease}>0%</Text> {t.lastMonth}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.contentContainer}>
          {/* Recent Transactions */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t.recentTransactions}</Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => navigation.navigate('MembersList' as never)}
              >
                <Text style={styles.viewAllText}>{t.viewAll}</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.transactionsList}>
              {members.slice(0, 5).map((member, index) => (
                <View key={member.memberID} style={styles.transactionItem}>
                  <View style={styles.transactionLeft}>
                    <Text style={styles.memberName}>{member.memberName}</Text>
                    <Text style={styles.memberID}>আইডি: {member.memberID}</Text>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={styles.amount}>৳{member.savingsAmount || '0'}</Text>
                    <Text style={styles.amountType}>{t.savings}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.quickActions}</Text>
            <View style={styles.actionsGrid}>
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.actionCard, { borderLeftColor: action.color }]}
                  onPress={() => navigation.navigate(action.route as never)}
                >
                  <Icon name={action.icon} size={24} color={action.color} />
                  <Text style={styles.actionTitle}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
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
    gap: 8,
  },
  headerButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 36,
  },
  headerButtonText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    backgroundColor: '#ffffff',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  organization: {
    marginRight: 16,
  },
  statsContainer: {
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statChange: {
    fontSize: 11,
    color: '#6b7280',
  },
  statIncrease: {
    color: '#16a34a',
  },
  statDecrease: {
    color: '#dc2626',
  },
  contentContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    gap: 24,
  },
  section: {
    backgroundColor: '#ffffff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  viewAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#2563eb',
  },
  viewAllText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  transactionLeft: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  memberID: {
    fontSize: 12,
    color: '#6b7280',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: 2,
  },
  amountType: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionsGrid: {
    gap: 8,
    marginTop: 8,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 12,
  },
});
