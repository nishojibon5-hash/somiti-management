import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  ArrowLeft, 
  Phone,
  CreditCard,
  Calendar,
  DollarSign,
  TrendingUp,
  MapPin,
  Edit,
  Eye
} from "lucide-react";

export default function MemberProfile() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [member, setMember] = useState<any>(null);
  const [collections, setCollections] = useState<any[]>([]);
  const { memberID } = useParams();

  useEffect(() => {
    // Load member data
    const storedMembers = localStorage.getItem('members');
    if (storedMembers && memberID) {
      const members = JSON.parse(storedMembers);
      const foundMember = members.find((m: any) => m.memberID === memberID);
      setMember(foundMember);
    }

    // Load collections data for this member
    const storedCollections = localStorage.getItem('dailyCollections');
    if (storedCollections && memberID) {
      const allCollections = JSON.parse(storedCollections);
      const memberCollections = allCollections.filter((c: any) => c.memberID === memberID);
      setCollections(memberCollections);
    }
  }, [memberID]);

  const text = {
    bn: {
      title: "সদস্যের প্রোফাইল",
      personalInfo: "ব্যক্তিগত তথ্য",
      financialInfo: "আর্থিক তথ্য",
      collectionHistory: "কালেকশন ইতিহাস",
      memberID: "সদস্য আইডি",
      nidNumber: "জাতীয় পরিচয়পত্র",
      mobile: "মোবাইল",
      worker: "কর্মী",
      joinDate: "যোগদানের তারিখ",
      currentLoan: "বর���তমান ঋণ",
      totalSavings: "মোট সঞ্চয়",
      dailyInstallment: "দৈনিক কিস্তি",
      dailySavings: "দৈনিক সঞ্চয়",
      thisMonth: "এ মাসে",
      lastMonth: "গত মাসে",
      totalCollected: "মোট আদায়",
      savingsCollected: "সঞ্চয় আদায়",
      installmentCollected: "কিস্তি আদায়",
      collectionDays: "আদায়ের দিন",
      noCollections: "কোনো কালেকশন নেই",
      date: "তারিখ",
      savings: "সঞ্চয়",
      installment: "কিস্তি",
      total: "মোট",
      edit: "সম্পাদনা",
      active: "সক্রিয়"
    },
    en: {
      title: "Member Profile",
      personalInfo: "Personal Information",
      financialInfo: "Financial Information",
      collectionHistory: "Collection History",
      memberID: "Member ID",
      nidNumber: "NID Number",
      mobile: "Mobile",
      worker: "Worker",
      joinDate: "Join Date",
      currentLoan: "Current Loan",
      totalSavings: "Total Savings",
      dailyInstallment: "Daily Installment",
      dailySavings: "Daily Savings",
      thisMonth: "This Month",
      lastMonth: "Last Month",
      totalCollected: "Total Collected",
      savingsCollected: "Savings Collected",
      installmentCollected: "Installment Collected",
      collectionDays: "Collection Days",
      noCollections: "No Collections",
      date: "Date",
      savings: "Savings",
      installment: "Installment",
      total: "Total",
      edit: "Edit",
      active: "Active"
    }
  };

  const t = text[language];

  if (!member) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {language === 'bn' ? 'সদস্য পাওয়া যায়নি' : 'Member Not Found'}
          </h3>
          <Button asChild>
            <Link to="/members">
              {language === 'bn' ? 'সদস্য তালিকায় ফিরুন' : 'Back to Members List'}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Calculate monthly statistics
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const thisMonthCollections = collections.filter(collection => {
    const collectionDate = new Date(collection.collectionDate);
    return collectionDate.getMonth() === currentMonth && collectionDate.getFullYear() === currentYear;
  });

  const lastMonthCollections = collections.filter(collection => {
    const collectionDate = new Date(collection.collectionDate);
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    return collectionDate.getMonth() === lastMonth && collectionDate.getFullYear() === lastMonthYear;
  });

  const thisMonthStats = {
    totalAmount: thisMonthCollections.reduce((sum, c) => sum + c.totalAmount, 0),
    savings: thisMonthCollections.reduce((sum, c) => sum + c.savingsAmount, 0),
    installments: thisMonthCollections.reduce((sum, c) => sum + c.installmentAmount, 0),
    days: thisMonthCollections.length
  };

  const lastMonthStats = {
    totalAmount: lastMonthCollections.reduce((sum, c) => sum + c.totalAmount, 0),
    savings: lastMonthCollections.reduce((sum, c) => sum + c.savingsAmount, 0),
    installments: lastMonthCollections.reduce((sum, c) => sum + c.installmentAmount, 0),
    days: lastMonthCollections.length
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/members">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === 'bn' ? 'ফিরে যান' : 'Back'}
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary-foreground" />
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
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              {t.edit}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 max-w-6xl">
        {/* Member Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{member.memberName}</h1>
              <div className="flex items-center space-x-4 mt-1">
                <Badge variant="outline">{t.memberID}: {member.memberID}</Badge>
                <Badge variant="secondary">{t.active}</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                {t.personalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{member.mobileNumber}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <span>{member.nidNumber}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{member.workerName}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{member.joinDate}</span>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                {t.financialInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.currentLoan}:</span>
                <span className="font-semibold text-destructive">৳{(member.loanAmount || 0).toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.totalSavings}:</span>
                <span className="font-semibold text-success">৳{(member.savingsAmount || 0).toLocaleString()}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.dailyInstallment}:</span>
                <span className="font-semibold">৳{member.dailyInstallment || 0}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.dailySavings}:</span>
                <span className="font-semibold">৳{member.dailySavings || 0}</span>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                {language === 'bn' ? 'মাসিক পরিসংখ্যান' : 'Monthly Statistics'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">{t.thisMonth}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.totalCollected}:</span>
                    <span className="font-semibold">৳{thisMonthStats.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.savingsCollected}:</span>
                    <span className="text-success">৳{thisMonthStats.savings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.installmentCollected}:</span>
                    <span className="text-primary">৳{thisMonthStats.installments.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.collectionDays}:</span>
                    <span>{thisMonthStats.days}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-semibold mb-2">{t.lastMonth}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.totalCollected}:</span>
                    <span className="font-semibold">৳{lastMonthStats.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t.collectionDays}:</span>
                    <span>{lastMonthStats.days}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Collection History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              {t.collectionHistory}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {collections.length > 0 ? (
              <div className="space-y-3">
                {collections.slice().reverse().slice(0, 20).map((collection, index) => (
                  <div key={collection.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{new Date(collection.collectionDate).toLocaleDateString('bn-BD')}</p>
                        <p className="text-sm text-muted-foreground">{collection.workerName}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6 text-right">
                      <div>
                        <p className="text-sm text-muted-foreground">{t.savings}</p>
                        <p className="font-semibold text-success">৳{collection.savingsAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.installment}</p>
                        <p className="font-semibold text-primary">৳{collection.installmentAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.total}</p>
                        <p className="font-bold">৳{collection.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {collections.length > 20 && (
                  <div className="text-center pt-4">
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      {language === 'bn' ? 'আরও দেখুন' : 'View More'}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">{t.noCollections}</h3>
                <p className="text-muted-foreground">
                  {language === 'bn' 
                    ? 'এই সদস্যের এখনো কোনো কালেকশন রেকর্ড নেই'
                    : 'No collection records found for this member'
                  }
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
