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
  PieChart,
  Calendar,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { storage } from "@/lib/storage";

export default function Dashboard() {
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
    organization: string;
    plan: string;
  } | null>(null);

  const [members, setMembers] = useState<any[]>([]);
  const [dailyCollections, setDailyCollections] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const ud = await storage.get<any>("userData");
      if (ud) setUserData(ud);
      const ms = await storage.getArray<any>("members");
      setMembers(ms);
      const dc = await storage.getArray<any>("dailyCollections");
      setDailyCollections(dc);
    })();
  }, []);

  const text = {
    bn: {
      title: "ড্যাশবোর্ড",
      welcome: "স্বাগতম",
      totalMembers: "মোট সদস্য",
      totalLoans: "মোট ঋণ",
      totalSavings: "মোট সঞ্চয়",
      monthlyCollection: "আজকের আদায়",
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
      comingSoon: "শীঘ্রই আসছে",
      placeholder:
        "এই পৃষ্ঠাটি এখনো তৈরি হয়নি। আরও বৈশিষ্ট্য যোগ করতে আপনার প্রয়োজন অনুযায়ী ���ির্দেশনা দিন।",
    },
    en: {
      title: "Dashboard",
      welcome: "Welcome",
      totalMembers: "Total Members",
      totalLoans: "Total Loans",
      totalSavings: "Total Savings",
      monthlyCollection: "Today's Collection",
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
      placeholder:
        "This page is not yet built. Please provide guidance to add more features as needed.",
    },
  };

  const t = text[language];

  // Calculate actual stats
  const totalSavings = members.reduce(
    (sum, member) => sum + (member.savingsAmount || member.savings || 0),
    0,
  );
  const totalLoans = members.reduce(
    (sum, member) => sum + (member.loanAmount || 0),
    0,
  );

  // Today's collections
  const today = new Date().toISOString().split("T")[0];
  const todaysCollections = dailyCollections.filter(
    (collection) => collection.collectionDate === today,
  );
  const todaysTotalCollection = todaysCollections.reduce(
    (sum, collection) => sum + collection.totalAmount,
    0,
  );

  // Worker statistics
  const uniqueWorkers = [
    ...new Set(members.map((member) => member.workerName)),
  ].filter(Boolean);
  const activeWorkersToday = [
    ...new Set(todaysCollections.map((collection) => collection.workerName)),
  ].filter(Boolean);

  const stats = [
    {
      title: t.totalMembers,
      value: members.length.toString(),
      change: members.length > 0 ? "+100%" : "0%",
      icon: <Users className="h-6 w-6" />,
      positive: true,
    },
    {
      title: t.totalLoans,
      value: totalLoans > 0 ? `৳${totalLoans.toLocaleString()}` : "৳0",
      change: totalLoans > 0 ? "+100%" : "0%",
      icon: <CreditCard className="h-6 w-6" />,
      positive: true,
    },
    {
      title: t.totalSavings,
      value: totalSavings > 0 ? `৳${totalSavings.toLocaleString()}` : "৳0",
      change: totalSavings > 0 ? "+100%" : "0%",
      icon: <TrendingUp className="h-6 w-6" />,
      positive: true,
    },
    {
      title: language === "bn" ? "আজকের আদায়" : "Today's Collection",
      value:
        todaysTotalCollection > 0
          ? `৳${todaysTotalCollection.toLocaleString()}`
          : "৳0",
      change: todaysTotalCollection > 0 ? "+100%" : "0%",
      icon: <DollarSign className="h-6 w-6" />,
      positive: todaysTotalCollection > 0,
    },
  ];

  // Recent member activities (empty for new users)
  const recentTransactions =
    members.length > 0
      ? members.slice(0, 5).map((member, index) => ({
          id: index + 1,
          member: member.memberName || member.name,
          memberID: member.memberID,
          workerName: member.workerName,
          type: language === "bn" ? "সদস্য যোগ" : "Member Added",
          amount: `৳${member.savingsAmount || member.savings || 0}`,
          dailyAmount: member.dailyInstallment
            ? `৳${member.dailyInstallment}`
            : "৳0",
          date: member.joinDate || new Date().toLocaleDateString("bn-BD"),
        }))
      : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-primary">
              সমিতি ম্যানেজার
            </span>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
            >
              {language === "bn" ? "EN" : "বাং"}
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
            {t.welcome}, {userData?.name || "ব্যবহারকারী"}
          </h1>
          <p className="text-muted-foreground">
            {userData?.organization && (
              <span className="mr-4">
                {language === "bn" ? "প্রতিষ্ঠান: " : "Organization: "}
                {userData.organization}
              </span>
            )}
            {language === "bn"
              ? "আজকের তারিখ: ১৫ জানুয়ারি, ২০২৪"
              : "Today: January 15, 2024"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="text-muted-foreground">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      stat.positive ? "text-success" : "text-destructive"
                    }
                  >
                    {stat.change}
                  </span>{" "}
                  {language === "bn" ? "গত মাস থেকে" : "from last month"}
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
                  {members.length > 0
                    ? t.recentTransactions
                    : language === "bn"
                      ? "সদস্য তালিকা"
                      : "Member List"}
                </CardTitle>
                {members.length > 0 && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/members">{t.viewAll}</Link>
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {members.length > 0 ? (
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{transaction.member}</p>
                          <p className="text-sm text-muted-foreground">
                            {language === "bn" ? "আইডি: " : "ID: "}
                            {transaction.memberID}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-success">
                            {transaction.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {language === "bn" ? "সঞ্চয়" : "Savings"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {language === "bn" ? "কর্মী: " : "Worker: "}
                          {transaction.workerName}
                        </span>
                        <span className="text-primary">
                          {language === "bn" ? "দৈনিক: " : "Daily: "}
                          {transaction.dailyAmount}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    {language === "bn" ? "কোনো সদস্য নেই" : "No Members Yet"}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {language === "bn"
                      ? "আপনার প্রথম সদস্য যোগ করে শুরু করুন"
                      : "Add your first member to get started"}
                  </p>
                  <Button asChild>
                    <Link to="/add-member">
                      <Plus className="h-4 w-4 mr-2" />
                      {language === "bn"
                        ? "প্রথম সদস্য যোগ করুন"
                        : "Add First Member"}
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
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/add-member">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addMember}
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/daily-collection">
                  <DollarSign className="h-4 w-4 mr-2" />
                  {language === "bn" ? "দৈনিক কালেকশন" : "Daily Collection"}
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/collections">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  {language === "bn" ? "কালেকশন তালিকা" : "Collection List"}
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/monthly-collections">
                  <Calendar className="h-4 w-4 mr-2" />
                  {language === "bn" ? "মাসিক ক্যালেন্ডার" : "Monthly Calendar"}
                </Link>
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                {t.newLoan}
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                asChild
              >
                <Link to="/backup-restore">
                  <Download className="h-4 w-4 mr-2" />
                  {language === "bn" ? "ব্যাকআপ সিস্টেম" : "Backup System"}
                </Link>
              </Button>
              <Button
                className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-white"
                asChild
              >
                <Link to="/admin-dashboard">
                  <Shield className="h-4 w-4 mr-2" />
                  {language === "bn" ? "এডমিন প্যানেল" : "Admin Panel"}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Section for New Users */}
        {members.length === 0 && (
          <Card className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border-dashed border-2 border-primary/20">
            <CardContent className="text-center py-12">
              <div className="mx-auto mb-6 h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">
                {language === "bn"
                  ? "স্বাগতম আপনার সমিতিতে!"
                  : "Welcome to Your Cooperative!"}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                {language === "bn"
                  ? "আপনার সমিতি ব্যবস্থাপনা শুরু করতে প্রথমে কিছু সদস্য যোগ করুন। প্রতিটি সদস্যের সম্পূর্ণ তথ্য সংরক্ষণ করা হবে।"
                  : "Start managing your cooperative by adding members first. All member information will be stored securely."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button size="lg" asChild>
                  <Link to="/add-member">
                    <Plus className="h-5 w-5 mr-2" />
                    {language === "bn"
                      ? "প্রথম সদস্য যোগ করুন"
                      : "Add First Member"}
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  {language === "bn" ? "���াহায্য দেখুন" : "View Help"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Features Preview for New Users */}
        {members.length === 0 && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <Users className="h-10 w-10 mx-auto text-primary mb-4" />
              <h4 className="font-semibold mb-2">
                {language === "bn" ? "সদস্য ব্যবস্থাপনা" : "Member Management"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === "bn"
                  ? "সদস্যদের সম্পূর্ণ তথ্য, ছবি এবং পরিচয়পত্র সংরক্ষণ করুন"
                  : "Store complete member information, photos and identity documents"}
              </p>
            </Card>

            <Card className="text-center p-6">
              <CreditCard className="h-10 w-10 mx-auto text-accent mb-4" />
              <h4 className="font-semibold mb-2">
                {language === "bn" ? "সঞ্চয় ও ঋণ" : "Savings & Loans"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === "bn"
                  ? "সদস্যদের সঞ্চয় এবং ঋণের হিসাব রাখুন এবং ট্র্যাক করুন"
                  : "Track member savings and loan accounts with detailed records"}
              </p>
            </Card>

            <Card className="text-center p-6">
              <BarChart3 className="h-10 w-10 mx-auto text-success mb-4" />
              <h4 className="font-semibold mb-2">
                {language === "bn"
                  ? "রিপোর্ট ও বিশ্লেষ��"
                  : "Reports & Analytics"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === "bn"
                  ? "বিস্তারিত আর্থিক রিপোর্ট এবং পারফরমেন্স বিশ্লেষণ দেখুন"
                  : "Generate detailed financial reports and performance analytics"}
              </p>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
