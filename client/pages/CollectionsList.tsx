import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  DollarSign, 
  ArrowLeft, 
  Plus,
  Search,
  Users,
  Calendar,
  Eye,
  Edit,
  Trash2,
  MapPin
} from "lucide-react";

export default function CollectionsList() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [collections, setCollections] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  useEffect(() => {
    // Load collections data
    const storedCollections = localStorage.getItem('dailyCollections');
    if (storedCollections) {
      setCollections(JSON.parse(storedCollections));
    }
  }, []);

  const text = {
    bn: {
      title: "দৈনিক কালেকশন তালিকা",
      subtitle: "কর্মী অনুযায়ী দৈনিক সঞ্চয় ও কিস্তি আদায়ের রেকর্ড",
      search: "কর্মী বা সদস্যের নাম খুঁজুন",
      selectDate: "তারিখ নির্বাচন করুন",
      totalWorkers: "মোট কর্মী",
      totalCollections: "মোট কালেকশন",
      totalAmount: "মোট পরিমাণ",
      worker: "কর্মী",
      member: "সদস্য",
      savings: "সঞ্চয়",
      installment: "কিস্তি",
      total: "মোট",
      actions: "কার্যক্রম",
      view: "দেখুন",
      edit: "সম্পাদনা", 
      delete: "মুছুন",
      noCollections: "কোনো কালেকশন নেই",
      addFirst: "প্রথম কালেকশন যোগ করুন",
      noResults: "কোনো ফলাফল পাওয়া যায়নি",
      collectionsCount: "টি কালেকশন",
      memberCount: "জন সদস্য",
      today: "আজ",
      yesterday: "গতকাল"
    },
    en: {
      title: "Daily Collections List",
      subtitle: "Worker-wise daily savings and installment collection records",
      search: "Search worker or member name",
      selectDate: "Select Date",
      totalWorkers: "Total Workers",
      totalCollections: "Total Collections",
      totalAmount: "Total Amount",
      worker: "Worker",
      member: "Member",
      savings: "Savings",
      installment: "Installment",
      total: "Total",
      actions: "Actions",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      noCollections: "No Collections",
      addFirst: "Add First Collection",
      noResults: "No results found",
      collectionsCount: " collections",
      memberCount: " members",
      today: "Today",
      yesterday: "Yesterday"
    }
  };

  const t = text[language];

  // Filter collections by date and search term
  const filteredCollections = collections.filter(collection => {
    const matchesDate = collection.collectionDate === selectedDate;
    const matchesSearch = 
      collection.workerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.memberName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDate && matchesSearch;
  });

  // Group collections by worker
  const groupedCollections = filteredCollections.reduce((groups, collection) => {
    const worker = collection.workerName;
    if (!groups[worker]) {
      groups[worker] = [];
    }
    groups[worker].push(collection);
    return groups;
  }, {} as Record<string, any[]>);

  // Calculate statistics
  const totalWorkers = Object.keys(groupedCollections).length;
  const totalCollections = filteredCollections.length;
  const totalAmount = filteredCollections.reduce((sum, collection) => sum + collection.totalAmount, 0);
  const totalSavings = filteredCollections.reduce((sum, collection) => sum + collection.savingsAmount, 0);
  const totalInstallments = filteredCollections.reduce((sum, collection) => sum + collection.installmentAmount, 0);

  const formatDate = (dateString: string) => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    if (dateString === today) return t.today;
    if (dateString === yesterday) return t.yesterday;
    return new Date(dateString).toLocaleDateString('bn-BD');
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
                <DollarSign className="h-5 w-5 text-primary-foreground" />
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
            <Button asChild>
              <Link to="/daily-collection">
                <Plus className="h-4 w-4 mr-2" />
                {language === 'bn' ? 'নতুন কালেকশন' : 'New Collection'}
              </Link>
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

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.totalWorkers}</p>
                  <p className="text-2xl font-bold">{totalWorkers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.totalCollections}</p>
                  <p className="text-2xl font-bold">{totalCollections}</p>
                </div>
                <Calendar className="h-8 w-8 text-info" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.savings}</p>
                  <p className="text-2xl font-bold text-success">৳{totalSavings.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{t.installment}</p>
                  <p className="text-2xl font-bold text-primary">৳{totalInstallments.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10 w-48"
              />
            </div>
            <Badge variant="secondary" className="text-sm">
              {formatDate(selectedDate)}
            </Badge>
          </div>
          
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Collections List */}
        {Object.keys(groupedCollections).length > 0 ? (
          <div className="space-y-6">
            {Object.entries(groupedCollections).map(([workerName, workerCollections]) => {
              const workerTotal = workerCollections.reduce((sum, collection) => sum + collection.totalAmount, 0);
              const workerSavings = workerCollections.reduce((sum, collection) => sum + collection.savingsAmount, 0);
              const workerInstallments = workerCollections.reduce((sum, collection) => sum + collection.installmentAmount, 0);
              
              return (
                <Card key={workerName} className="overflow-hidden">
                  <CardHeader className="bg-muted/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{workerName}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {workerCollections.length}{t.collectionsCount} • {workerCollections.length}{t.memberCount}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">৳{workerTotal.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">
                          {t.savings}: ৳{workerSavings.toLocaleString()} | {t.installment}: ৳{workerInstallments.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0">
                    <div className="space-y-0">
                      {workerCollections.map((collection, index) => (
                        <div key={collection.id}>
                          <div className="p-4 hover:bg-muted/20 transition-colors">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="h-8 w-8 bg-accent/10 rounded-full flex items-center justify-center">
                                  <Users className="h-4 w-4 text-accent" />
                                </div>
                                <div>
                                  <p className="font-medium">{collection.memberName}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {language === 'bn' ? 'আইডি: ' : 'ID: '}{collection.memberID}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-6">
                                <div className="text-center">
                                  <p className="text-sm text-muted-foreground">{t.savings}</p>
                                  <p className="font-semibold text-success">৳{collection.savingsAmount.toLocaleString()}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-sm text-muted-foreground">{t.installment}</p>
                                  <p className="font-semibold text-primary">৳{collection.installmentAmount.toLocaleString()}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-sm text-muted-foreground">{t.total}</p>
                                  <p className="font-bold text-lg">৳{collection.totalAmount.toLocaleString()}</p>
                                </div>
                                
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          {language === 'bn' ? 'ডেটা স��রক্ষা' : 'Data Protection'}
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          {language === 'bn'
                                            ? 'কালেকশন রেকর্ড স্থায়ীভাবে মুছে ফেলা যাবে না। সকল আর্থিক ডেটা অডিট ট্রেইল ও নিরাপত্তার জন্য সুরক্ষিত রাখা হয়।'
                                            : 'Collection records cannot be permanently deleted. All financial data is protected for audit trail and security purposes.'
                                          }
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          {language === 'bn' ? 'বুঝেছি' : 'Understood'}
                                        </AlertDialogCancel>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </div>
                            </div>
                            
                            {collection.notes && (
                              <div className="mt-2 ml-12">
                                <p className="text-sm text-muted-foreground italic">
                                  {language === 'bn' ? 'মন্তব্য: ' : 'Note: '}{collection.notes}
                                </p>
                              </div>
                            )}
                          </div>
                          
                          {index < workerCollections.length - 1 && <Separator />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : collections.length === 0 ? (
          /* No Collections State */
          <Card className="border-dashed border-2 border-muted-foreground/25">
            <CardContent className="text-center py-12">
              <div className="mx-auto mb-4 h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.noCollections}</h3>
              <p className="text-muted-foreground mb-6">
                {language === 'bn' 
                  ? 'আপনার প্রথম দৈনিক কালেকশন রেকর্ড করুন'
                  : 'Record your first daily collection'
                }
              </p>
              <Button asChild>
                <Link to="/daily-collection">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addFirst}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* No Search Results */
          <Card>
            <CardContent className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">{t.noResults}</h3>
              <p className="text-muted-foreground">
                {language === 'bn' 
                  ? 'অন্য তারিখ বা নাম দিয়ে খোঁজ করে দেখুন'
                  : 'Try searching with a different date or name'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
