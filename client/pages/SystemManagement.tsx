import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft,
  Settings,
  Shield,
  Database,
  Bell,
  Globe,
  Mail,
  Phone,
  AlertTriangle,
  CheckCircle,
  Server,
  HardDrive,
  Cpu,
  Wifi,
  Lock,
  Key,
  UserCheck,
  FileText,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";

export default function SystemManagement() {
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    autoBackup: true,
    emailNotifications: true,
    smsNotifications: false,
    newUserRegistration: true,
    guestAccess: false,
    sessionTimeout: 30,
    maxFileSize: 10,
    supportEmail: "support@somitimanager.com",
    supportPhone: "+880171234567",
  });
  const { toast } = useToast();

  const text = {
    bn: {
      title: "সিস্টেম ব্যবস্থাপনা",
      subtitle: "উন্নত সিস্টেম নিয়ন্ত্রণ ও কনফিগারেশন",
      general: "সাধারণ",
      security: "নিরাপত্তা",
      notifications: "বিজ্ঞপ্তি",
      backup: "ব্যাকআপ",
      monitoring: "মনিটরিং",
      maintenanceMode: "রক্ষণাবেক্ষণ মোড",
      maintenanceDesc: "সিস্টেম রক্ষণাবেক্ষণের জন্য সাময়িকভাবে বন্ধ ���রুন",
      autoBackup: "স্বয়ংক্রিয় ব্যাকআপ",
      autoBackupDesc: "প্রতিদিন স্বয়ংক্রিয়ভাবে ডেটা ব্যাকআপ নিন",
      newUserRegistration: "নতুন ব্যবহারকারী নিবন্ধন",
      newUserDesc: "নতুন ব্যবহারকারীদের নিবন্ধনের অনুমতি দিন",
      emailNotifications: "ইমেইল বিজ্ঞপ্তি",
      emailDesc: "সিস্টেম ইভেন্টের জন্য ইমেইল পাঠান",
      smsNotifications: "এসএমএস বিজ্ঞপ্তি",
      smsDesc: "গুরুত্বপূর্ণ সতর্কতার জন্য এসএমএস পাঠান",
      sessionTimeout: "সেশন টাইমআউট (মিনিট)",
      maxFileSize: "সর্বোচ্চ ফাইল সাইজ (MB)",
      supportEmail: "সাপোর্ট ইমেইল",
      supportPhone: "সাপোর্ট ফোন",
      systemHealth: "সিস্টেম স্বাস্থ্য",
      serverStatus: "সার্ভার স্থিতি",
      databaseStatus: "ডেট���বেস স্থিতি",
      storageUsage: "স্টোরেজ ব্যবহার",
      memoryUsage: "মেমোরি ব্যবহার",
      cpuUsage: "সিপিইউ ব্যবহার",
      networkStatus: "নেটওয়ার্ক স্থিতি",
      online: "অনলাইন",
      healthy: "স্বাস্থ্যকর",
      low: "কম",
      normal: "স্বাভাবিক",
      securitySettings: "নিরাপত্তা সেটিংস",
      passwordPolicy: "পাসওয়ার্ড নীতি",
      twoFactorAuth: "দুই-ফ্যাক্টর প্রমাণীকরণ",
      encryptionLevel: "এনক্রিপশন স্তর",
      accessControl: "অ্যাক্সেস নিয়ন্ত্রণ",
      auditLogging: "অডিট লগিং",
      save: "সংরক্ষণ করুন",
      reset: "রিসেট করুন",
      export: "এক্সপোর্ট করুন",
      import: "ইমপোর্ট করুন",
      refresh: "রিফ্রেশ করুন",
      enabled: "সক্রিয়",
      disabled: "নিষ্ক্রিয়",
      high: "উচ্চ",
      medium: "মাঝারি",
      settingsSaved: "সেটিংস সংরক্ষিত হয়েছে",
      warningTitle: "সতর্কতা",
      maintenanceWarning:
        "রক্ষণাবেক্ষণ মোড সক্রিয় করলে সব ব্যবহারকারী সিস্টেম ব্যবহার করতে পারবে না।",
    },
    en: {
      title: "System Management",
      subtitle: "Advanced system controls and configuration",
      general: "General",
      security: "Security",
      notifications: "Notifications",
      backup: "Backup",
      monitoring: "Monitoring",
      maintenanceMode: "Maintenance Mode",
      maintenanceDesc: "Temporarily disable system for maintenance",
      autoBackup: "Auto Backup",
      autoBackupDesc: "Automatically backup data daily",
      newUserRegistration: "New User Registration",
      newUserDesc: "Allow new users to register",
      emailNotifications: "Email Notifications",
      emailDesc: "Send emails for system events",
      smsNotifications: "SMS Notifications",
      smsDesc: "Send SMS for critical alerts",
      sessionTimeout: "Session Timeout (minutes)",
      maxFileSize: "Max File Size (MB)",
      supportEmail: "Support Email",
      supportPhone: "Support Phone",
      systemHealth: "System Health",
      serverStatus: "Server Status",
      databaseStatus: "Database Status",
      storageUsage: "Storage Usage",
      memoryUsage: "Memory Usage",
      cpuUsage: "CPU Usage",
      networkStatus: "Network Status",
      online: "Online",
      healthy: "Healthy",
      low: "Low",
      normal: "Normal",
      securitySettings: "Security Settings",
      passwordPolicy: "Password Policy",
      twoFactorAuth: "Two-Factor Auth",
      encryptionLevel: "Encryption Level",
      accessControl: "Access Control",
      auditLogging: "Audit Logging",
      save: "Save Changes",
      reset: "Reset",
      export: "Export",
      import: "Import",
      refresh: "Refresh",
      enabled: "Enabled",
      disabled: "Disabled",
      high: "High",
      medium: "Medium",
      settingsSaved: "Settings saved successfully",
      warningTitle: "Warning",
      maintenanceWarning:
        "Enabling maintenance mode will prevent all users from accessing the system.",
    },
  };

  const t = text[language];

  const handleSettingChange = (key: string, value: any) => {
    setSystemSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    // In a real system, this would save to backend
    localStorage.setItem("systemSettings", JSON.stringify(systemSettings));

    toast({
      title: language === "bn" ? "সফল!" : "Success!",
      description: t.settingsSaved,
    });
  };

  const systemMetrics = {
    serverStatus: "online",
    databaseStatus: "healthy",
    storageUsage: 45,
    memoryUsage: 68,
    cpuUsage: 23,
    networkStatus: "online",
    uptime: "45 days",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin-dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === "bn" ? "ফিরে যান" : "Back"}
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-purple-600">
                সমি���ি ম্যানেজার
              </span>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
            >
              {language === "bn" ? "EN" : "বাং"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="general">{t.general}</TabsTrigger>
            <TabsTrigger value="security">{t.security}</TabsTrigger>
            <TabsTrigger value="notifications">{t.notifications}</TabsTrigger>
            <TabsTrigger value="backup">{t.backup}</TabsTrigger>
            <TabsTrigger value="monitoring">{t.monitoring}</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {language === "bn" ? "সাধারণ সেটিংস" : "General Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Maintenance Mode */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">{t.maintenanceMode}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t.maintenanceDesc}
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) =>
                      handleSettingChange("maintenanceMode", checked)
                    }
                  />
                </div>

                {systemSettings.maintenanceMode && (
                  <Alert className="border-amber-200 bg-amber-50">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle className="text-amber-800">
                      {t.warningTitle}
                    </AlertTitle>
                    <AlertDescription className="text-amber-700">
                      {t.maintenanceWarning}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Auto Backup */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">{t.autoBackup}</Label>
                    <p className="text-sm text-muted-foreground">
                      {t.autoBackupDesc}
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) =>
                      handleSettingChange("autoBackup", checked)
                    }
                  />
                </div>

                {/* New User Registration */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">
                      {t.newUserRegistration}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t.newUserDesc}
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.newUserRegistration}
                    onCheckedChange={(checked) =>
                      handleSettingChange("newUserRegistration", checked)
                    }
                  />
                </div>

                {/* Session Timeout */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">{t.sessionTimeout}</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={systemSettings.sessionTimeout}
                      onChange={(e) =>
                        handleSettingChange(
                          "sessionTimeout",
                          parseInt(e.target.value),
                        )
                      }
                      min="5"
                      max="120"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxFileSize">{t.maxFileSize}</Label>
                    <Input
                      id="maxFileSize"
                      type="number"
                      value={systemSettings.maxFileSize}
                      onChange={(e) =>
                        handleSettingChange(
                          "maxFileSize",
                          parseInt(e.target.value),
                        )
                      }
                      min="1"
                      max="100"
                    />
                  </div>
                </div>

                {/* Support Contact */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supportEmail">{t.supportEmail}</Label>
                    <Input
                      id="supportEmail"
                      type="email"
                      value={systemSettings.supportEmail}
                      onChange={(e) =>
                        handleSettingChange("supportEmail", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supportPhone">{t.supportPhone}</Label>
                    <Input
                      id="supportPhone"
                      type="tel"
                      value={systemSettings.supportPhone}
                      onChange={(e) =>
                        handleSettingChange("supportPhone", e.target.value)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  {t.securitySettings}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t.passwordPolicy}</span>
                      <Badge className="bg-green-100 text-green-800">
                        {t.high}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t.twoFactorAuth}</span>
                      <Badge className="bg-green-100 text-green-800">
                        {t.enabled}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t.encryptionLevel}</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        AES-256
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t.accessControl}</span>
                      <Badge className="bg-green-100 text-green-800">
                        {t.enabled}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t.auditLogging}</span>
                      <Badge className="bg-green-100 text-green-800">
                        {t.enabled}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-medium">API Rate Limiting</span>
                      <Badge className="bg-blue-100 text-blue-800">
                        1000/hour
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  {language === "bn"
                    ? "বিজ্ঞপ্তি সেটিংস"
                    : "Notification Settings"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">
                      {t.emailNotifications}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t.emailDesc}
                    </p>
                  </div>
                  <Switch
                    checked={systemSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("emailNotifications", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="font-medium">{t.smsNotifications}</Label>
                    <p className="text-sm text-muted-foreground">{t.smsDesc}</p>
                  </div>
                  <Switch
                    checked={systemSettings.smsNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("smsNotifications", checked)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backup */}
          <TabsContent value="backup" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Database className="h-5 w-5 mr-2" />
                    {language === "bn"
                      ? "ব্যাকআপ ব্যবস্থাপনা"
                      : "Backup Management"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>
                      {language === "bn"
                        ? "স্বয়ংক্রিয় ব্যাকআপ"
                        : "Auto Backup"}
                    </span>
                    <Badge className="bg-green-100 text-green-800">
                      {t.enabled}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>
                      {language === "bn"
                        ? "ব্যাকআপ ফ্রিকোয়েন্সি"
                        : "Backup Frequency"}
                    </span>
                    <Badge variant="secondary">
                      {language === "bn" ? "দৈনিক" : "Daily"}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>
                      {language === "bn" ? "শেষ ব্যাকআপ" : "Last Backup"}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      2 hours ago
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      {t.export}
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      {t.import}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    {language === "bn" ? "ব্যাকআপ ইতিহাস" : "Backup History"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-2 border rounded"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {language === "bn"
                              ? "দৈনিক ব্যাকআপ"
                              : "Daily Backup"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(
                              Date.now() - index * 24 * 60 * 60 * 1000,
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Monitoring */}
          <TabsContent value="monitoring" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Server className="h-5 w-5 mr-2" />
                    {t.systemHealth}
                  </div>
                  <Button size="sm" variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    {t.refresh}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Server className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">
                          {t.serverStatus}
                        </span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {t.online}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Database className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">
                          {t.databaseStatus}
                        </span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {t.healthy}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wifi className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">
                          {t.networkStatus}
                        </span>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {t.online}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {t.cpuUsage}
                        </span>
                        <span className="text-sm">
                          {systemMetrics.cpuUsage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${systemMetrics.cpuUsage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {t.memoryUsage}
                        </span>
                        <span className="text-sm">
                          {systemMetrics.memoryUsage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${systemMetrics.memoryUsage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          {t.storageUsage}
                        </span>
                        <span className="text-sm">
                          {systemMetrics.storageUsage}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${systemMetrics.storageUsage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium text-green-800">
                          System Uptime
                        </span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">
                        {systemMetrics.uptime}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                {t.reset}
              </Button>
              <Button onClick={handleSaveSettings}>{t.save}</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
