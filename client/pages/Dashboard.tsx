import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  CreditCard, 
  TrendingUp, 
  DollarSign,
  Plus,
  Search,
  Filter,
  Download,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  PieChart
} from "lucide-react";

export default function Dashboard() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    organization: string;
    plan: string;
  } | null>(null);

  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Load members data
    const storedMembers = localStorage.getItem('members');
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    }
  }, []);

  const text = {
    bn: {
      title: "ড্যাশবোর্ড",
      welcome: "স্বাগতম",
      totalMembers: "মোট সদস্য",
      totalLoans: "মোট ঋণ",
      totalSavings: "মোট সঞ্চয়",
      monthlyCollection: "মাসিক আদায়",
      recentTransactions: "সাম্প্রতিক লেনদেন",
      quickActions: "দ্রুত কার্যক্রম",
      addMember: "নতুন সদস্য",
      newLoan: "নতুন ঋণ",
      deposit: "জমা",
      withdraw: "উত্তোলন",
      viewAll: "সব দেখুন",
      amount: "পরিমাণ",
      date: "তারিখ",
      type: "ধরন",
      member: "সদস্য",
      comingSoon: "শীঘ্��ই আসছে",
      placeholder: "এই পৃষ্ঠাটি এখনো তৈরি হয়নি। আরও বৈশিষ্ট্য যোগ করতে আপনার প্রয়োজন অনুযায়ী নির্দেশনা দিন।"
    },
    en: {
      title: "Dashboard",
      welcome: "Welcome",
      totalMembers: "Total Members",
      totalLoans: "Total Loans",
      totalSavings: "Total Savings", 
      monthlyCollection: "Monthly Collection",
      recentTransactions: "Recent Transactions",
      quickActions: "Quick Actions",
      addMember: "Add Member",
      newLoan: "New Loan",
      deposit: "Deposit",
      withdraw: "Withdraw",
      viewAll: "View All",
      amount: "Amount",
      date: "Date",
      type: "Type",
      member: "Member",
      comingSoon: "Coming Soon",
      placeholder: "This page is not yet built. Please provide guidance to add more features as needed."
    }
  };

  const t = text[language];

  // Calculate actual stats
  const totalSavings = members.reduce((sum, member) => sum + (member.savings || 0), 0);
  const totalLoans = members.reduce((sum, member) => sum + (member.loanAmount || 0), 0);

  const stats = [
    {
      title: t.totalMembers,
      value: members.length.toString(),
      change: members.length > 0 ? "+100%" : "0%",
      icon: <Users className="h-6 w-6" />,
      positive: true
    },
    {
      title: t.totalLoans,
      value: totalLoans > 0 ? `৳${totalLoans.toLocaleString()}` : "৳0",
      change: totalLoans > 0 ? "+100%" : "0%",
      icon: <CreditCard className="h-6 w-6" />,
      positive: true
    },
    {
      title: t.totalSavings,
      value: totalSavings > 0 ? `৳${totalSavings.toLocaleString()}` : "৳0",
      change: totalSavings > 0 ? "+100%" : "0%",
      icon: <TrendingUp className="h-6 w-6" />,
      positive: true
    },
    {
      title: t.monthlyCollection,
      value: "৳0",
      change: "0%",
      icon: <DollarSign className="h-6 w-6" />,
      positive: false
    }
  ];

  // Recent member activities (empty for new users)
  const recentTransactions = members.length > 0 ?
    members.slice(0, 5).map((member, index) => ({
      id: index + 1,
      member: member.name,
      type: language === 'bn' ? "সদস্য যোগ" : "Member Added",
      amount: `৳${member.savings || 0}`,
      date: member.joinDate || new Date().toLocaleDateString('bn-BD')
    })) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-primary">সমিতি ম্যানেজার</span>
          </div>
          
          <div className="ml-auto flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
            >
              {language === 'bn' ? 'EN' : 'বাং'}
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {t.welcome}, {userData?.name || 'ব্যবহারকারী'}
          </h1>
          <p className="text-muted-foreground">
            {userData?.organization && (
              <span className="mr-4">
                {language === 'bn' ? 'প্রতিষ্ঠান: ' : 'Organization: '}{userData.organization}
              </span>
            )}
            {language === 'bn' ? 'আজকের তারিখ: ১৫ জানুয়ারি, ২০২৪' : 'Today: January 15, 2024'}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="text-muted-foreground">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.positive ? "text-success" : "text-destructive"}>
                    {stat.change}
                  </span>{" "}
                  {language === 'bn' ? 'গত মাস থেকে' : 'from last month'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions / Members */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {members.length > 0 ? t.recentTransactions : (language === 'bn' ? 'সদস্য তালিকা' : 'Member List')}
                </CardTitle>
                {members.length > 0 && (
                  <Button variant="outline" size="sm">
                    {t.viewAll}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {members.length > 0 ? (
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between border-b pb-3">
                      <div>
                        <p className="font-medium">{transaction.member}</p>
                        <p className="text-sm text-muted-foreground">{transaction.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{transaction.amount}</p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {language === 'bn' ? 'কোনো সদস্য নেই' : 'No Members Yet'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === 'bn' ? 'আপনার প্রথম সদস্য যোগ করে শুরু করুন' : 'Add your first member to get started'}
                  </p>
                  <Button asChild>
                    <Link to="/add-member">
                      <Plus className="h-4 w-4 mr-2" />
                      {language === 'bn' ? 'প্রথম সদস্য যোগ করুন' : 'Add First Member'}
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>{t.quickActions}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                {t.addMember}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                {t.newLoan}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                {t.deposit}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                {t.withdraw}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                {language === 'bn' ? 'রিপোর্ট' : 'Reports'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder Notice */}
        <Card className="mt-8 border-dashed border-2 border-muted-foreground/25">
          <CardContent className="text-center py-12">
            <div className="mx-auto mb-4 h-12 w-12 bg-muted rounded-full flex items-center justify-center">
              <PieChart className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t.comingSoon}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t.placeholder}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
