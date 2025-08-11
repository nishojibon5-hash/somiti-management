import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Users, 
  Building2, 
  DollarSign, 
  TrendingUp, 
  Database, 
  Shield, 
  Bell, 
  FileText, 
  BarChart3,
  Globe,
  Crown,
  UserCheck,
  Calendar,
  Activity,
  AlertTriangle,
  CheckCircle,
  Package,
  CreditCard,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Plus
} from "lucide-react";

export default function AdminDashboard() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [allMembers, setAllMembers] = useState<any[]>([]);
  const [allCollections, setAllCollections] = useState<any[]>([]);
  const [systemUsers, setSystemUsers] = useState<any[]>([]);

  useEffect(() => {
    // Load all data for admin overview
    loadSystemData();
  }, []);

  const loadSystemData = () => {
    // In a real system, this would load data from multiple organizations
    // For demo, we'll simulate multiple organizations
    const demoOrganizations = [
      {
        id: 'org1',
        name: 'আল-আমিন সমিতি',
        plan: 'premium',
        members: 150,
        totalSavings: 450000,
        totalLoans: 800000,
        status: 'active',
        createdAt: '2024-01-15',
        lastActive: '2024-12-31'
      },
      {
        id: 'org2', 
        name: 'বরকত সমিতি',
        plan: 'pro',
        members: 75,
        totalSavings: 180000,
        totalLoans: 300000,
        status: 'active',
        createdAt: '2024-03-20',
        lastActive: '2024-12-30'
      },
      {
        id: 'org3',
        name: 'রহমত সমিতি',
        plan: 'free',
        members: 25,
        totalSavings: 45000,
        totalLoans: 80000,
        status: 'trial',
        createdAt: '2024-11-10',
        lastActive: '2024-12-29'
      }
    ];

    const demoUsers = [
      {
        id: 'user1',
        name: 'আহমেদ আলী',
        email: 'ahmed@example.com',
        role: 'admin',
        organization: 'আল-আমিন সমিতি',
        lastLogin: '2024-12-31',
        status: 'active'
      },
      {
        id: 'user2',
        name: 'ফাতেমা খাতুন',
        email: 'fatema@example.com', 
        role: 'manager',
        organization: 'বরকত সমিতি',
        lastLogin: '2024-12-30',
        status: 'active'
      }
    ];

    setOrganizations(demoOrganizations);
    setSystemUsers(demoUsers);

    // Load existing members and collections (this would be aggregated from all orgs)
    const storedMembers = localStorage.getItem('members');
    if (storedMembers) {
      setAllMembers(JSON.parse(storedMembers));
    }

    const storedCollections = localStorage.getItem('dailyCollections');
    if (storedCollections) {
      setAllCollections(JSON.parse(storedCollections));
    }
  };

  const text = {
    bn: {
      title: "এডমিন ড্যাশবোর্ড",
      subtitle: "সমিতি ম্যানেজার সিস্টেম নিয়ন্ত্রণ কেন্দ্র",
      overview: "সামগ্রিক তথ্য",
      organizations: "সংস্থাসমূহ",
      users: "ব্যবহারকারী",
      reports: "রিপোর্ট",
      settings: "সেটিংস",
      totalOrganizations: "মোট সংস্থা",
      totalUsers: "মোট ব্যবহারকারী",
      totalMembers: "মোট সদস্য",
      totalRevenue: "মোট আয়",
      activeOrganizations: "সক্রিয় সংস্থা",
      systemHealth: "সিস্টেম স্বাস্থ্য",
      recentActivity: "সাম্প্রতিক কার্যকলাপ",
      quickActions: "দ্রুত কার্যক্রম",
      organizationName: "সংস্থার নাম",
      plan: "প্ল্যান",
      members: "সদস্য",
      status: "অবস্থা",
      actions: "কার্যক্রম",
      active: "সক্রিয়",
      trial: "ট্রায়াল",
      suspended: "স্থগিত",
      free: "ফ্রি",
      pro: "প্রো",
      premium: "প্রিমিয়াম",
      addOrganization: "নতুন সংস্থা",
      manageUsers: "ব্যবহারকারী ব্যবস্থাপনা",
      systemSettings: "সিস্টেম সেটিংস",
      backupRestore: "ব্যাকআপ পুনরুদ্ধার",
      auditLogs: "অডিট লগ",
      support: "সাপোর্ট",
      userName: "ব্যবহারকারীর নাম",
      email: "ইমে���ল",
      role: "ভূমিকা",
      organization: "সংস্থা",
      lastLogin: "শেষ লগইন",
      admin: "এডমিন",
      manager: "ম্যানেজার",
      user: "ব্যবহারকারী",
      view: "দেখুন",
      edit: "সম্পাদনা",
      delete: "মুছুন",
      excellent: "চমৎকার",
      good: "ভালো",
      warning: "সতর্কতা"
    },
    en: {
      title: "Admin Dashboard",
      subtitle: "Somiti Manager System Control Center",
      overview: "Overview",
      organizations: "Organizations",
      users: "Users",
      reports: "Reports",
      settings: "Settings",
      totalOrganizations: "Total Organizations",
      totalUsers: "Total Users",
      totalMembers: "Total Members",
      totalRevenue: "Total Revenue",
      activeOrganizations: "Active Organizations",
      systemHealth: "System Health",
      recentActivity: "Recent Activity",
      quickActions: "Quick Actions",
      organizationName: "Organization Name",
      plan: "Plan",
      members: "Members",
      status: "Status",
      actions: "Actions",
      active: "Active",
      trial: "Trial",
      suspended: "Suspended",
      free: "Free",
      pro: "Pro",
      premium: "Premium",
      addOrganization: "Add Organization",
      manageUsers: "Manage Users",
      systemSettings: "System Settings",
      backupRestore: "Backup & Restore",
      auditLogs: "Audit Logs",
      support: "Support",
      userName: "User Name",
      email: "Email",
      role: "Role",
      organization: "Organization",
      lastLogin: "Last Login",
      admin: "Admin",
      manager: "Manager",
      user: "User",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      excellent: "Excellent",
      good: "Good",
      warning: "Warning"
    }
  };

  const t = text[language];

  // Calculate system statistics
  const systemStats = {
    totalOrganizations: organizations.length,
    activeOrganizations: organizations.filter(org => org.status === 'active').length,
    totalUsers: systemUsers.length,
    totalMembers: organizations.reduce((sum, org) => sum + org.members, 0),
    totalRevenue: organizations.reduce((sum, org) => {
      const planRevenue = org.plan === 'premium' ? 5000 : org.plan === 'pro' ? 2500 : 0;
      return sum + planRevenue;
    }, 0),
    totalSavings: organizations.reduce((sum, org) => sum + org.totalSavings, 0),
    totalLoans: organizations.reduce((sum, org) => sum + org.totalLoans, 0)
  };

  const getPlanBadgeColor = (plan: string) => {
    switch (plan) {
      case 'premium': return 'bg-purple-100 text-purple-800';
      case 'pro': return 'bg-blue-100 text-blue-800';
      case 'free': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-purple-600">সমিতি ম্যানেজার</span>
              <span className="text-sm text-muted-foreground ml-2">এডমিন প্যানেল</span>
            </div>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="organizations">{t.organizations}</TabsTrigger>
            <TabsTrigger value="users">{t.users}</TabsTrigger>
            <TabsTrigger value="reports">{t.reports}</TabsTrigger>
            <TabsTrigger value="settings">{t.settings}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.totalOrganizations}</p>
                      <p className="text-3xl font-bold text-purple-600">{systemStats.totalOrganizations}</p>
                    </div>
                    <Building2 className="h-10 w-10 text-purple-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-green-600">
                      +{systemStats.activeOrganizations} {t.active}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.totalMembers}</p>
                      <p className="text-3xl font-bold text-blue-600">{systemStats.totalMembers.toLocaleString()}</p>
                    </div>
                    <Users className="h-10 w-10 text-blue-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">
                      {language === 'bn' ? 'সব সংস্থায়' : 'Across all organizations'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.totalRevenue}</p>
                      <p className="text-3xl font-bold text-green-600">৳{systemStats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-green-600">
                      {language === 'bn' ? 'ম��সিক' : 'Monthly'}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{t.systemHealth}</p>
                      <p className="text-3xl font-bold text-green-600">98%</p>
                    </div>
                    <Activity className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-green-600">{t.excellent}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    {language === 'bn' ? 'সিস্টেম ওভারভিউ' : 'System Overview'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{language === 'bn' ? 'মোট সঞ্চয়' : 'Total Savings'}</span>
                    <span className="font-bold text-green-600">৳{systemStats.totalSavings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'bn' ? 'মোট ঋণ' : 'Total Loans'}</span>
                    <span className="font-bold text-orange-600">৳{systemStats.totalLoans.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'bn' ? 'সক্রিয় সংস্থা' : 'Active Organizations'}</span>
                    <span className="font-bold">{systemStats.activeOrganizations}/{systemStats.totalOrganizations}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Crown className="h-5 w-5 mr-2" />
                    {t.quickActions}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    {t.addOrganization}
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <UserCheck className="h-4 w-4 mr-2" />
                    {t.manageUsers}
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Database className="h-4 w-4 mr-2" />
                    {t.backupRestore}
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    {t.auditLogs}
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link to="/system-management">
                      <Settings className="h-4 w-4 mr-2" />
                      {t.systemSettings}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Organizations Tab */}
          <TabsContent value="organizations" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{t.organizations}</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t.addOrganization}
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-muted/30">
                      <tr>
                        <th className="text-left p-4 font-semibold">{t.organizationName}</th>
                        <th className="text-left p-4 font-semibold">{t.plan}</th>
                        <th className="text-left p-4 font-semibold">{t.members}</th>
                        <th className="text-left p-4 font-semibold">{t.status}</th>
                        <th className="text-left p-4 font-semibold">{language === 'bn' ? 'সঞ্চয়' : 'Savings'}</th>
                        <th className="text-right p-4 font-semibold">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {organizations.map((org) => (
                        <tr key={org.id} className="border-b hover:bg-muted/20">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{org.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {language === 'bn' ? 'তৈরি: ' : 'Created: '}{new Date(org.createdAt).toLocaleDateString('bn-BD')}
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={getPlanBadgeColor(org.plan)}>
                              {t[org.plan as keyof typeof t] || org.plan}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold">{org.members}</span>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusBadgeColor(org.status)}>
                              {t[org.status as keyof typeof t] || org.status}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="font-semibold text-green-600">৳{org.totalSavings.toLocaleString()}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2 justify-end">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{t.users}</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {language === 'bn' ? 'নতুন ব্যবহারকারী' : 'Add User'}
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b bg-muted/30">
                      <tr>
                        <th className="text-left p-4 font-semibold">{t.userName}</th>
                        <th className="text-left p-4 font-semibold">{t.email}</th>
                        <th className="text-left p-4 font-semibold">{t.role}</th>
                        <th className="text-left p-4 font-semibold">{t.organization}</th>
                        <th className="text-left p-4 font-semibold">{t.lastLogin}</th>
                        <th className="text-right p-4 font-semibold">{t.actions}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {systemUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/20">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <Users className="h-4 w-4 text-primary" />
                              </div>
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                              {t[user.role as keyof typeof t] || user.role}
                            </Badge>
                          </td>
                          <td className="p-4">{user.organization}</td>
                          <td className="p-4">
                            <span className="text-sm text-muted-foreground">
                              {new Date(user.lastLogin).toLocaleDateString('bn-BD')}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2 justify-end">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="text-destructive">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <h2 className="text-2xl font-bold">{t.reports}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="h-12 w-12 mx-auto text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">
                    {language === 'bn' ? 'আর্থিক রিপোর্ট' : 'Financial Reports'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'সব সংস্থার আর্থিক পরিসংখ্যান' : 'Financial statistics across all organizations'}
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 mx-auto text-green-600 mb-4" />
                  <h3 className="font-semibold mb-2">
                    {language === 'bn' ? 'ব্যবহারকারী রিপোর্ট' : 'User Reports'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'ব্যবহারকারী কার্যকলাপ ও এনগেজমেন্ট' : 'User activity and engagement'}
                  </p>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Activity className="h-12 w-12 mx-auto text-purple-600 mb-4" />
                  <h3 className="font-semibold mb-2">
                    {language === 'bn' ? 'সিস্টেম পারফরমেন্স' : 'System Performance'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' ? 'সিস্টেম ব্যবহার ও পারফরমেন্স মেট্রিক্স' : 'System usage and performance metrics'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">{t.settings}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    {language === 'bn' ? 'সিস্টেম কনফিগারেশন' : 'System Configuration'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{language === 'bn' ? 'রক্ষণাবেক্ষণ মো���' : 'Maintenance Mode'}</span>
                    <Badge variant="secondary">{language === 'bn' ? 'বন্ধ' : 'Off'}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'bn' ? 'স্বয়ংক্রিয় ব্যাকআপ' : 'Auto Backup'}</span>
                    <Badge variant="secondary">{language === 'bn' ? 'সক্রিয়' : 'Enabled'}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'bn' ? 'নিরাপত্তা স্তর' : 'Security Level'}</span>
                    <Badge className="bg-green-100 text-green-800">{language === 'bn' ? 'উচ্চ' : 'High'}</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    {language === 'bn' ? 'নিরাপত্তা ব্যবস্থা' : 'Security Settings'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>{language === 'bn' ? 'দুই-ফ্যাক্টর প্রমাণীকরণ' : 'Two-Factor Auth'}</span>
                    <Badge className="bg-green-100 text-green-800">{language === 'bn' ? 'সক্রিয়' : 'Enabled'}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'bn' ? 'এনক্রিপশন' : 'Encryption'}</span>
                    <Badge className="bg-green-100 text-green-800">AES-256</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{language === 'bn' ? 'সেশন টাইমআউট' : 'Session Timeout'}</span>
                    <Badge variant="secondary">30 {language === 'bn' ? 'মিনিট' : 'min'}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
