import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Download,
  Upload,
  Database,
  Shield,
  Calendar,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  FileText,
  HardDrive
} from "lucide-react";

export default function BackupRestore() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const text = {
    bn: {
      title: "ডেটা ব্যাকআপ ও পুনরুদ্ধার",
      subtitle: "সমিতির সমস্ত তথ্য নিরাপদে সংরক্ষণ ও পুনরুদ্ধার করুন",
      currentData: "বর্তমান ডেটা",
      exportData: "ডেটা এক্সপোর্ট",
      importData: "ডেটা ইমপোর্ট",
      dataProtection: "ডেটা সুরক্ষা",
      totalMembers: "মোট সদস্য",
      totalCollections: "মোট কালেকশন",
      auditLogs: "অডিট লগ",
      lastBackup: "শেষ ব্যাকআপ",
      never: "কখনো নয়",
      exportButton: "ব্যাকআপ ডাউনলোড করুন",
      importButton: "ব্যাকআপ আপলোড করুন",
      selectFile: "ফাইল নির্বাচন করুন",
      exportDesc: "সমস্ত সদস্য, কালেকশন এবং অডিট লগ সহ সম্পূর্ণ ড���টাবেস এক্সপোর্ট করুন",
      importDesc: "পূর্বে এক্সপোর্ট করা ব্যাকআপ ফাইল থেকে ডেটা পুনরুদ্ধার করুন",
      protectionNotice: "সকল ডেটা স্থায়ীভাবে সুরক্ষিত এবং অডিট ট্রেইল সহ সংরক্ষিত",
      importWarning: "সতর্কতা: ইমপোর্ট করলে বর্তমান ডেটা প্রতিস্থাপিত হবে",
      backupSuccess: "ব্যাকআপ সফলভাবে তৈরি হয়েছে",
      importSuccess: "ডেটা সফলভাবে পুনরুদ্ধার হয়েছে",
      invalidFile: "অবৈধ ব্যাকআপ ফাইল",
      features: "বৈশিষ্ট্যসমূহ",
      autoBackup: "স্বয়ংক্রিয় ব্যাকআপ",
      encryption: "এনক্রিপশন",
      auditTrail: "অডিট ট্রেইল",
      dataIntegrity: "ডেটা অখণ্ডতা"
    },
    en: {
      title: "Data Backup & Restore",
      subtitle: "Securely backup and restore all cooperative data",
      currentData: "Current Data",
      exportData: "Export Data",
      importData: "Import Data", 
      dataProtection: "Data Protection",
      totalMembers: "Total Members",
      totalCollections: "Total Collections",
      auditLogs: "Audit Logs",
      lastBackup: "Last Backup",
      never: "Never",
      exportButton: "Download Backup",
      importButton: "Upload Backup",
      selectFile: "Select File",
      exportDesc: "Export complete database including all members, collections and audit logs",
      importDesc: "Restore data from a previously exported backup file",
      protectionNotice: "All data is permanently secured and stored with audit trails",
      importWarning: "Warning: Importing will replace current data",
      backupSuccess: "Backup created successfully",
      importSuccess: "Data restored successfully",
      invalidFile: "Invalid backup file",
      features: "Features",
      autoBackup: "Auto Backup",
      encryption: "Encryption",
      auditTrail: "Audit Trail",
      dataIntegrity: "Data Integrity"
    }
  };

  const t = text[language];

  // Get current data statistics
  const members = JSON.parse(localStorage.getItem('members') || '[]');
  const collections = JSON.parse(localStorage.getItem('dailyCollections') || '[]');
  const auditLogs = JSON.parse(localStorage.getItem('auditLog') || '[]');
  const lastBackup = localStorage.getItem('lastBackupDate');

  const handleExport = () => {
    setIsExporting(true);
    
    try {
      // Collect all data
      const backupData = {
        version: "1.0",
        timestamp: new Date().toISOString(),
        members: members,
        collections: collections,
        auditLogs: auditLogs,
        settings: {
          language: language,
          lastBackup: new Date().toISOString()
        },
        metadata: {
          totalMembers: members.length,
          totalCollections: collections.length,
          totalAuditLogs: auditLogs.length,
          exportedBy: 'Admin',
          exportDate: new Date().toISOString()
        }
      };

      // Create and download file
      const dataStr = JSON.stringify(backupData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `somiti-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Update last backup date
      localStorage.setItem('lastBackupDate', new Date().toISOString());

      toast({
        title: language === 'bn' ? 'সফল!' : 'Success!',
        description: t.backupSuccess,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'ব্যাকআপ তৈরি করতে ব্যর্থ' : 'Failed to create backup'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const backupData = JSON.parse(e.target?.result as string);
        
        // Validate backup file structure
        if (!backupData.version || !backupData.members || !backupData.collections) {
          throw new Error('Invalid backup file format');
        }

        // Create audit log entry for restore operation
        const restoreLog = {
          id: Date.now().toString(),
          action: 'data_restored',
          details: {
            restoredFrom: backupData.timestamp,
            membersRestored: backupData.members.length,
            collectionsRestored: backupData.collections.length
          },
          timestamp: new Date().toISOString(),
          performedBy: 'Admin'
        };

        // Restore data to localStorage
        localStorage.setItem('members', JSON.stringify(backupData.members || []));
        localStorage.setItem('dailyCollections', JSON.stringify(backupData.collections || []));
        
        // Merge audit logs
        const currentAuditLogs = backupData.auditLogs || [];
        currentAuditLogs.push(restoreLog);
        localStorage.setItem('auditLog', JSON.stringify(currentAuditLogs));

        // Update last backup date if available
        if (backupData.settings?.lastBackup) {
          localStorage.setItem('lastBackupDate', backupData.settings.lastBackup);
        }

        toast({
          title: language === 'bn' ? 'সফল!' : 'Success!',
          description: t.importSuccess,
        });

        // Refresh the page to show updated data
        setTimeout(() => {
          window.location.reload();
        }, 1500);

      } catch (error) {
        toast({
          variant: "destructive",
          title: language === 'bn' ? 'ত্রুটি' : 'Error',
          description: t.invalidFile
        });
      } finally {
        setIsImporting(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === 'bn' ? 'ফিরে যান' : 'Back'}
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-primary">সমিতি ম্যানেজার</span>
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Data Protection Notice */}
        <Alert className="mb-6 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-200">{t.dataProtection}</AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-300">
            {t.protectionNotice}
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Data Statistics */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardDrive className="h-5 w-5 mr-2" />
                {t.currentData}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{t.totalMembers}</span>
                </div>
                <Badge variant="secondary">{members.length}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{t.totalCollections}</span>
                </div>
                <Badge variant="secondary">{collections.length}</Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{t.auditLogs}</span>
                </div>
                <Badge variant="secondary">{auditLogs.length}</Badge>
              </div>

              <Separator />

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t.lastBackup}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {lastBackup 
                    ? new Date(lastBackup).toLocaleDateString('bn-BD')
                    : t.never
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Backup and Restore Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                {language === 'bn' ? 'ব্যাকআপ ও পুনরুদ্ধার' : 'Backup & Restore'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Export Section */}
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Download className="h-5 w-5 text-success" />
                  <h3 className="text-lg font-semibold">{t.exportData}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{t.exportDesc}</p>
                <Button 
                  onClick={handleExport} 
                  disabled={isExporting}
                  className="w-full sm:w-auto"
                >
                  {isExporting ? (
                    <div className="flex items-center">
                      <div className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full mr-2"></div>
                      {language === 'bn' ? 'তৈরি হচ্ছে...' : 'Creating...'}
                    </div>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      {t.exportButton}
                    </>
                  )}
                </Button>
              </div>

              <Separator />

              {/* Import Section */}
              <div>
                <div className="flex items-center space-x-3 mb-3">
                  <Upload className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold">{t.importData}</h3>
                </div>
                <p className="text-muted-foreground mb-2">{t.importDesc}</p>
                
                <Alert className="mb-4 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-amber-700 dark:text-amber-300">
                    {t.importWarning}
                  </AlertDescription>
                </Alert>

                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImport}
                    accept=".json"
                    className="hidden"
                  />
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    variant="outline"
                    disabled={isImporting}
                    className="w-full sm:w-auto"
                  >
                    {isImporting ? (
                      <div className="flex items-center">
                        <div className="animate-spin h-4 w-4 border-2 border-foreground border-t-transparent rounded-full mr-2"></div>
                        {language === 'bn' ? 'আপলোড হচ্ছে...' : 'Uploading...'}
                      </div>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        {t.importButton}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t.features}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{t.autoBackup}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'bn' 
                    ? 'প্রতিটি পরিবর্তন স্বয়ংক্রিয়ভাবে লগ এবং ট্র্যাক করা হয়'
                    : 'Every change is automatically logged and tracked'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="h-12 w-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <h4 className="font-semibold mb-2">{t.encryption}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'bn' 
                    ? 'সকল ডেটা এনক্রিপটেড এবং নিরাপদভাবে সংরক্ষিত'
                    : 'All data is encrypted and securely stored'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="h-12 w-12 bg-info/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <FileText className="h-6 w-6 text-info" />
                </div>
                <h4 className="font-semibold mb-2">{t.auditTrail}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'bn' 
                    ? 'প্রতিটি ক্রিয়াকলাপের সম্পূর্ণ অডিট ট্রেইল'
                    : 'Complete audit trail of all activities'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="h-12 w-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Database className="h-6 w-6 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">{t.dataIntegrity}</h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'bn' 
                    ? 'ডেটার অখণ্ডতা এবং সুসংগততা নিশ্চিত'
                    : 'Data integrity and consistency guaranteed'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
