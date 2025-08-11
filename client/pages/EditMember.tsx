import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Users,
  ArrowLeft,
  User,
  Phone,
  DollarSign,
  MapPin,
  Save,
  AlertTriangle,
} from "lucide-react";

export default function EditMember() {
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { memberID } = useParams();

  const [formData, setFormData] = useState({
    memberID: "",
    memberName: "",
    nidNumber: "",
    mobileNumber: "",
    workerName: "",
    loanAmount: "",
    savingsAmount: "",
    dailyInstallment: "",
    dailySavings: "",
  });

  const [originalData, setOriginalData] = useState<any>(null);

  useEffect(() => {
    // Load members data and find the specific member
    const storedMembers = localStorage.getItem("members");
    if (storedMembers && memberID) {
      const allMembers = JSON.parse(storedMembers);
      setMembers(allMembers);

      const memberToEdit = allMembers.find(
        (member: any) => member.memberID === memberID,
      );
      if (memberToEdit) {
        setOriginalData(memberToEdit);
        setFormData({
          memberID: memberToEdit.memberID || "",
          memberName: memberToEdit.memberName || "",
          nidNumber: memberToEdit.nidNumber || "",
          mobileNumber: memberToEdit.mobileNumber || "",
          workerName: memberToEdit.workerName || "",
          loanAmount: memberToEdit.loanAmount?.toString() || "",
          savingsAmount: memberToEdit.savingsAmount?.toString() || "",
          dailyInstallment: memberToEdit.dailyInstallment?.toString() || "",
          dailySavings: memberToEdit.dailySavings?.toString() || "",
        });
      }
    }
  }, [memberID]);

  const text = {
    bn: {
      title: "সদস্য তথ্য সম্পাদনা",
      subtitle: "সদস্যের তথ্য আপডেট করুন",
      basicInfo: "মৌলিক তথ্য",
      financialInfo: "আর্থিক তথ্য",
      memberID: "সদস্য আইডি",
      memberName: "সদস্যের নাম",
      nidNumber: "জাতীয় পরিচয়পত্র নম্বর",
      mobileNumber: "মোবাইল নম্বর",
      workerName: "এলাকার কর্মীর নাম",
      loanAmount: "ঋণের পরিমাণ",
      savingsAmount: "সঞ্চয়ের পরিমাণ",
      dailyInstallment: "দৈনিক কিস্তির পরিমাণ",
      dailySavings: "দৈনিক সঞ্চয়ের পরিমাণ",
      save: "সংরক্ষণ করুন",
      cancel: "বাতিল",
      required: "আবশ্যক",
      dataProtection: "ডেটা সুরক্ষা",
      protectionNotice:
        "গুরুত্বপূর্ণ: এই সদস্যের তথ্য স্থায়ীভাবে মুছে ফেলা যাবে না। সব পরিবর্তন লগ রাখা হবে।",
      memberNotFound: "সদস্য পাওয়া যায়নি",
      backToList: "সদস্য তালিকায় ফিরুন",
    },
    en: {
      title: "Edit Member Information",
      subtitle: "Update member details",
      basicInfo: "Basic Information",
      financialInfo: "Financial Information",
      memberID: "Member ID",
      memberName: "Member Name",
      nidNumber: "NID Number",
      mobileNumber: "Mobile Number",
      workerName: "Area Worker Name",
      loanAmount: "Loan Amount",
      savingsAmount: "Savings Amount",
      dailyInstallment: "Daily Installment",
      dailySavings: "Daily Savings",
      save: "Save Changes",
      cancel: "Cancel",
      required: "Required",
      dataProtection: "Data Protection",
      protectionNotice:
        "Important: This member's data cannot be permanently deleted. All changes will be logged.",
      memberNotFound: "Member Not Found",
      backToList: "Back to Members List",
    },
  };

  const t = text[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.memberName ||
      !formData.nidNumber ||
      !formData.mobileNumber ||
      !formData.workerName
    ) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description:
          language === "bn"
            ? "সদস্যের নাম, এনআইডি, মোবাইল ও কর্মীর নাম আবশ্যক"
            : "Member name, NID, mobile and worker name are required",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create updated member object
      const updatedMember = {
        ...originalData,
        memberName: formData.memberName,
        nidNumber: formData.nidNumber,
        mobileNumber: formData.mobileNumber,
        workerName: formData.workerName,
        loanAmount: parseFloat(formData.loanAmount) || 0,
        savingsAmount: parseFloat(formData.savingsAmount) || 0,
        dailyInstallment: parseFloat(formData.dailyInstallment) || 0,
        dailySavings: parseFloat(formData.dailySavings) || 0,
        lastModified: new Date().toISOString(),
        modifiedBy: "Admin", // In real app, this would be the current user
      };

      // Update members array
      const updatedMembers = members.map((member) =>
        member.memberID === memberID ? updatedMember : member,
      );

      // Save to localStorage
      localStorage.setItem("members", JSON.stringify(updatedMembers));

      // Log the change for audit trail
      const auditLog = JSON.parse(localStorage.getItem("auditLog") || "[]");
      auditLog.push({
        id: Date.now().toString(),
        action: "member_updated",
        memberID: memberID,
        changes: {
          before: originalData,
          after: updatedMember,
        },
        timestamp: new Date().toISOString(),
        performedBy: "Admin",
      });
      localStorage.setItem("auditLog", JSON.stringify(auditLog));

      toast({
        title: language === "bn" ? "সফল!" : "Success!",
        description:
          language === "bn"
            ? "সদস্যের তথ্য আপডেট করা হয়েছে"
            : "Member information updated successfully",
      });

      // Navigate back to member profile
      navigate(`/member/${memberID}`);
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description:
          language === "bn"
            ? "সদস্যের তথ্য আপডেট করতে ব্যর্থ"
            : "Failed to update member information",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!originalData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">{t.memberNotFound}</h3>
          <Button asChild>
            <Link to="/members">{t.backToList}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to={`/member/${memberID}`}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                {language === "bn" ? "ফিরে যান" : "Back"}
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-primary">
                সমিতি ম্যানেজার
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
      <main className="container mx-auto p-6 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Data Protection Notice */}
        <Card className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-1">
                  {t.dataProtection}
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  {t.protectionNotice}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {t.basicInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memberID">{t.memberID}</Label>
                <Input
                  id="memberID"
                  value={formData.memberID}
                  readOnly
                  className="bg-muted"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="memberName">{t.memberName} *</Label>
                <Input
                  id="memberName"
                  value={formData.memberName}
                  onChange={(e) =>
                    handleInputChange("memberName", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "সদস্যের পূর্ণ নাম লিখুন"
                      : "Enter member full name"
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nidNumber">{t.nidNumber} *</Label>
                <Input
                  id="nidNumber"
                  value={formData.nidNumber}
                  onChange={(e) =>
                    handleInputChange("nidNumber", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "জাতীয় পরিচয়পত্র নম্বর"
                      : "National ID number"
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mobileNumber">{t.mobileNumber} *</Label>
                <Input
                  id="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    handleInputChange("mobileNumber", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "+৮৮০ ১৭ ১২৩৪ ৫৬৭৮"
                      : "+880 17 1234 5678"
                  }
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="workerName">{t.workerName} *</Label>
                <Input
                  id="workerName"
                  value={formData.workerName}
                  onChange={(e) =>
                    handleInputChange("workerName", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "এলাকার দায়িত্বপ্রাপ্ত কর্মীর নাম"
                      : "Area responsible worker name"
                  }
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Financial Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                {t.financialInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">{t.loanAmount}</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={formData.loanAmount}
                  onChange={(e) =>
                    handleInputChange("loanAmount", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "ঋণের পরিমাণ (টাকা)"
                      : "Loan amount (BDT)"
                  }
                  min="0"
                  step="100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="savingsAmount">{t.savingsAmount}</Label>
                <Input
                  id="savingsAmount"
                  type="number"
                  value={formData.savingsAmount}
                  onChange={(e) =>
                    handleInputChange("savingsAmount", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "সঞ্চয়ের পরিমাণ (টাকা)"
                      : "Savings amount (BDT)"
                  }
                  min="0"
                  step="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dailyInstallment">{t.dailyInstallment}</Label>
                <Input
                  id="dailyInstallment"
                  type="number"
                  value={formData.dailyInstallment}
                  onChange={(e) =>
                    handleInputChange("dailyInstallment", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "প্রতিদিন কিস্তির টাকা"
                      : "Daily installment amount"
                  }
                  min="0"
                  step="10"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dailySavings">{t.dailySavings}</Label>
                <Input
                  id="dailySavings"
                  type="number"
                  value={formData.dailySavings}
                  onChange={(e) =>
                    handleInputChange("dailySavings", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "প্রতিদিন সঞ্চয়ের টাকা"
                      : "Daily savings amount"
                  }
                  min="0"
                  step="10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" type="button" asChild>
              <Link to={`/member/${memberID}`}>{t.cancel}</Link>
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full mr-2"></div>
                  {language === "bn" ? "সেভ হচ্ছে..." : "Saving..."}
                </div>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {t.save}
                </>
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
