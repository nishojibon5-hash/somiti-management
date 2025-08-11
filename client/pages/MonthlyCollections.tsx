import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Search,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function MonthlyCollections() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [members, setMembers] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Load members and collections data
    const storedMembers = localStorage.getItem('members');
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    }

    const storedCollections = localStorage.getItem('dailyCollections');
    if (storedCollections) {
      setCollections(JSON.parse(storedCollections));
    }

    // Auto-select member from URL parameter
    const memberParam = searchParams.get('member');
    if (memberParam) {
      setSelectedMember(memberParam);
    }
  }, [searchParams]);

  const text = {
    bn: {
      title: "মাসিক কালেকশন ক্যালেন্ডার",
      subtitle: "সদস্য-ভিত্তিক মাসিক কালেকশনের বিস্তারিত তালিকা",
      selectMember: "সদস্য নির্বাচন করুন",
      selectMonth: "মাস নির্বাচন করুন",
      collectionSummary: "কালেকশন সামারি",
      totalDays: "মোট দিন",
      collectedDays: "আদায়ের দিন",
      missedDays: "মিসিং দিন",
      totalAmount: "মোট পরিমাণ",
      avgDaily: "দৈনিক গড়",
      collected: "আদায় হয়েছে",
      missed: "মিসিং",
      savings: "সঞ্চয়",
      installment: "কিস্তি",
      total: "মোট",
      date: "তারিখ",
      day: "দিন",
      noMember: "কোনো সদস্য নির্বাচিত নয়",
      selectMemberFirst: "প্রথমে একজন সদস্য নির্বাচন করুন",
      noCollections: "এই মাসে কোনো কালেকশন নেই",
      months: [
        "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
        "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"
      ],
      days: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"]
    },
    en: {
      title: "Monthly Collection Calendar",
      subtitle: "Member-wise detailed monthly collection list",
      selectMember: "Select Member",
      selectMonth: "Select Month",
      collectionSummary: "Collection Summary",
      totalDays: "Total Days",
      collectedDays: "Collection Days",
      missedDays: "Missed Days",
      totalAmount: "Total Amount",
      avgDaily: "Daily Average",
      collected: "Collected",
      missed: "Missed",
      savings: "Savings",
      installment: "Installment",
      total: "Total",
      date: "Date",
      day: "Day",
      noMember: "No member selected",
      selectMemberFirst: "Please select a member first",
      noCollections: "No collections found for this month",
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ],
      days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    }
  };

  const t = text[language];

  // Get days in selected month
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  // Filter collections for selected member and month
  const monthlyCollections = collections.filter(collection => {
    if (!selectedMember || collection.memberID !== selectedMember) return false;
    
    const collectionDate = new Date(collection.collectionDate);
    return collectionDate.getMonth() === selectedMonth && 
           collectionDate.getFullYear() === selectedYear;
  });

  // Create calendar data
  const calendarData = [];
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayData = monthlyCollections.find(c => c.collectionDate === dateStr);
    const dayOfWeek = new Date(selectedYear, selectedMonth, day).getDay();
    
    calendarData.push({
      day,
      date: dateStr,
      dayOfWeek,
      dayName: t.days[dayOfWeek],
      collection: dayData || null,
      hasCollection: !!dayData
    });
  }

  // Calculate statistics
  const stats = {
    totalDays: daysInMonth,
    collectedDays: monthlyCollections.length,
    missedDays: daysInMonth - monthlyCollections.length,
    totalSavings: monthlyCollections.reduce((sum, c) => sum + c.savingsAmount, 0),
    totalInstallments: monthlyCollections.reduce((sum, c) => sum + c.installmentAmount, 0),
    totalAmount: monthlyCollections.reduce((sum, c) => sum + c.totalAmount, 0)
  };

  const selectedMemberData = members.find(m => m.memberID === selectedMember);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/collections">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === 'bn' ? 'ফিরে যান' : 'Back'}
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary-foreground" />
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
      <main className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-2 block">{t.selectMember}</label>
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger>
                <SelectValue placeholder={language === 'bn' ? 'সদস্য নির্বাচন করুন' : 'Select a member'} />
              </SelectTrigger>
              <SelectContent>
                {members.map((member) => (
                  <SelectItem key={member.memberID} value={member.memberID}>
                    {member.memberName} - {member.memberID}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">{t.selectMonth}</label>
            <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {t.months.map((month, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {month} {selectedYear}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">{language === 'bn' ? 'বছর' : 'Year'}</label>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedYear(prev => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold min-w-[80px] text-center">{selectedYear}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedYear(prev => prev + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {selectedMember ? (
          <div className="space-y-6">
            {/* Member Info & Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Member Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    {language === 'bn' ? 'সদস্য তথ্য' : 'Member Info'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedMemberData && (
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold">{selectedMemberData.memberName}</p>
                        <p className="text-sm text-muted-foreground">{selectedMemberData.memberID}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{language === 'bn' ? 'কর্মী' : 'Worker'}</p>
                        <p className="font-medium">{selectedMemberData.workerName}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-muted-foreground">{language === 'bn' ? 'দৈনিক সঞ্চয়' : 'Daily Savings'}</p>
                          <p className="font-medium">৳{selectedMemberData.dailySavings || 0}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{language === 'bn' ? 'দৈনিক কিস্তি' : 'Daily Installment'}</p>
                          <p className="font-medium">৳{selectedMemberData.dailyInstallment || 0}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Collection Summary */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DollarSign className="h-5 w-5 mr-2" />
                    {t.collectionSummary} - {t.months[selectedMonth]} {selectedYear}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{stats.collectedDays}</p>
                      <p className="text-sm text-muted-foreground">{t.collectedDays}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-destructive">{stats.missedDays}</p>
                      <p className="text-sm text-muted-foreground">{t.missedDays}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">৳{stats.totalSavings.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{t.savings}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">৳{stats.totalInstallments.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{t.installment}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{t.totalAmount}:</span>
                      <span className="text-2xl font-bold">৳{stats.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Calendar View */}
            <Card>
              <CardHeader>
                <CardTitle>{language === 'bn' ? 'দৈনিক কালেকশন ক্যালেন্ডার' : 'Daily Collection Calendar'}</CardTitle>
              </CardHeader>
              <CardContent>
                {monthlyCollections.length > 0 ? (
                  <div className="space-y-3">
                    {calendarData.map((dayData) => (
                      <div
                        key={dayData.day}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                          dayData.hasCollection 
                            ? 'bg-success/5 border-success/20' 
                            : 'bg-muted/20 border-muted-foreground/20'
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {dayData.hasCollection ? (
                              <CheckCircle className="h-5 w-5 text-success" />
                            ) : (
                              <XCircle className="h-5 w-5 text-muted-foreground" />
                            )}
                            <div>
                              <p className="font-medium">
                                {dayData.day} {t.months[selectedMonth]}
                              </p>
                              <p className="text-sm text-muted-foreground">{dayData.dayName}</p>
                            </div>
                          </div>
                        </div>

                        {dayData.hasCollection && dayData.collection ? (
                          <div className="flex items-center space-x-6 text-right">
                            <div>
                              <p className="text-sm text-muted-foreground">{t.savings}</p>
                              <p className="font-semibold text-success">৳{dayData.collection.savingsAmount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.installment}</p>
                              <p className="font-semibold text-primary">৳{dayData.collection.installmentAmount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{t.total}</p>
                              <p className="font-bold text-lg">৳{dayData.collection.totalAmount}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-right">
                            <Badge variant="secondary" className="text-muted-foreground">
                              {t.missed}
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{t.noCollections}</h3>
                    <p className="text-muted-foreground">
                      {t.months[selectedMonth]} {selectedYear} {language === 'bn' ? 'মাসে কোনো কালেকশন রেকর্ড পাওয়া যায়নি' : 'No collection records found'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          /* No Member Selected */
          <Card className="border-dashed border-2 border-muted-foreground/25">
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.noMember}</h3>
              <p className="text-muted-foreground mb-6">{t.selectMemberFirst}</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
