import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  ArrowLeft, 
  Plus,
  Search,
  Phone,
  CreditCard,
  MapPin,
  Eye,
  Edit,
  Trash2
} from "lucide-react";

export default function MembersList() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [members, setMembers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // Load members data
    const storedMembers = localStorage.getItem('members');
    if (storedMembers) {
      setMembers(JSON.parse(storedMembers));
    }
  }, []);

  const text = {
    bn: {
      title: "সদস্য তালিকা",
      subtitle: "সকল সদস্যদের তথ্য ও বিস্তারিত",
      totalMembers: "মোট সদস্য",
      search: "সদস্য খুঁজুন",
      memberID: "সদস্য আইডি",
      memberName: "সদস্যের নাম",
      mobile: "মোবাইল",
      worker: "কর্মী",
      loan: "ঋণ",
      savings: "সঞ্চয়",
      dailyAmount: "দৈনিক পরিমাণ",
      actions: "কার্যক্রম",
      view: "দেখুন",
      edit: "সম্পাদনা",
      delete: "মুছুন",
      noMembers: "কোনো সদস্য নেই",
      addFirst: "প্রথম সদস্য যোগ করুন",
      noResults: "কোনো ফলাফল পাওয়া যায়নি",
      active: "সক্রিয়"
    },
    en: {
      title: "Members List",
      subtitle: "All members information and details",
      totalMembers: "Total Members",
      search: "Search members",
      memberID: "Member ID",
      memberName: "Member Name",
      mobile: "Mobile",
      worker: "Worker",
      loan: "Loan",
      savings: "Savings",
      dailyAmount: "Daily Amount",
      actions: "Actions",
      view: "View",
      edit: "Edit",
      delete: "Delete",
      noMembers: "No Members",
      addFirst: "Add First Member",
      noResults: "No results found",
      active: "Active"
    }
  };

  const t = text[language];

  // Filter members based on search term
  const filteredMembers = members.filter(member =>
    (member.memberName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.memberID || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.mobileNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (member.workerName || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Button asChild>
              <Link to="/add-member">
                <Plus className="h-4 w-4 mr-2" />
                {language === 'bn' ? 'নতুন সদস্য' : 'Add Member'}
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

        {/* Stats and Search */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {t.totalMembers}: {members.length}
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

        {/* Members List */}
        {filteredMembers.length > 0 ? (
          <div className="grid gap-4">
            {filteredMembers.map((member, index) => (
              <Card key={member.memberID || index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    {/* Member Basic Info */}
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">{member.memberName}</h3>
                          <Badge variant="outline" className="text-xs">
                            {t.active}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {t.memberID}: {member.memberID}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="h-4 w-4 mr-1" />
                          {member.mobileNumber}
                        </div>
                      </div>
                    </div>

                    {/* Financial Info */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                      <div>
                        <p className="text-sm text-muted-foreground">{t.loan}</p>
                        <p className="font-semibold text-destructive">
                          ৳{(member.loanAmount || 0).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{t.savings}</p>
                        <p className="font-semibold text-success">
                          ৳{(member.savingsAmount || 0).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {language === 'bn' ? 'দৈনিক কিস্তি' : 'Daily Installment'}
                        </p>
                        <p className="font-semibold text-primary">
                          ৳{member.dailyInstallment || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {language === 'bn' ? 'দৈনিক সঞ্চয়' : 'Daily Savings'}
                        </p>
                        <p className="font-semibold text-info">
                          ৳{member.dailySavings || 0}
                        </p>
                      </div>
                    </div>

                    {/* Worker and Actions */}
                    <div className="flex flex-col lg:items-end gap-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {language === 'bn' ? 'কর্মী: ' : 'Worker: '}{member.workerName}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/member/${member.memberID}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/edit-member/${member.memberID}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : members.length === 0 ? (
          /* No Members State */
          <Card className="border-dashed border-2 border-muted-foreground/25">
            <CardContent className="text-center py-12">
              <div className="mx-auto mb-4 h-16 w-16 bg-muted rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t.noMembers}</h3>
              <p className="text-muted-foreground mb-6">
                {language === 'bn' 
                  ? 'আপনার প্রথম সদস্য যোগ করে শুরু করুন'
                  : 'Add your first member to get started'
                }
              </p>
              <Button asChild>
                <Link to="/add-member">
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
                  ? 'অন্য নাম বা আইডি দিয়ে খোঁজ করে দেখুন'
                  : 'Try searching with a different name or ID'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
