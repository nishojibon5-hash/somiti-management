import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/storage";
import {
  Users,
  ArrowLeft,
  User,
  Phone,
  CreditCard,
  MapPin,
  DollarSign,
} from "lucide-react";

export default function AddMember() {
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const text = {
    bn: {
      title: "নতুন সদস্য যোগ করুন",
      subtitle: "সদস্যের প্রয়োজনীয় তথ্য দ��য়ে ফর্মটি পূরণ করুন",
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
      saveAndAdd: "সেভ করে আরেকটি যোগ করুন",
      cancel: "বাতিল",
      required: "আবশ্যক",
    },
    en: {
      title: "Add New Member",
      subtitle: "Fill out the form with required member information",
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
      save: "Save",
      saveAndAdd: "Save & Add Another",
      cancel: "Cancel",
      required: "Required",
    },
  };

  const t = text[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const generateMemberID = () => {
    const currentYear = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `SM${currentYear}${randomNum}`;
  };

  const handleSubmit = async (e: React.FormEvent, saveAndAdd = false) => {
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
            ? "সদস্যের নাম, এনআইডি, মোবা��ল ও কর্���ীর নাম আবশ্যক"
            : "Member name, NID, mobile and worker name are required",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Generate member ID if not provided
      const memberID = formData.memberID || generateMemberID();

      // Create new member object
      const newMember = {
        ...formData,
        memberID,
        joinDate: new Date().toLocaleDateString("bn-BD"),
        status: "active",
        loanAmount: parseFloat(formData.loanAmount) || 0,
        savingsAmount: parseFloat(formData.savingsAmount) || 0,
        dailyInstallment: parseFloat(formData.dailyInstallment) || 0,
        dailySavings: parseFloat(formData.dailySavings) || 0,
        createdAt: new Date().toISOString(),
      };

      // Save using persistent storage
      const existingMembers = await storage.getArray<any>("members");
      const updatedMembers = [...existingMembers, newMember];
      await storage.set("members", updatedMembers);

      toast({
        title: language === "bn" ? "সফল!" : "Success!",
        description:
          language === "bn"
            ? "নতুন সদস্য যোগ করা হয়েছে"
            : "New member added successfully",
      });

      if (saveAndAdd) {
        // Reset form for adding another member
        setFormData({
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
      } else {
        // Navigate to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description:
          language === "bn" ? "সদস্য যোগ করতে ব্যর্থ" : "Failed to add member",
      });
    } finally {
      setIsLoading(false);
    }
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

        <form className="space-y-6" onSubmit={(e) => handleSubmit(e, false)}>
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
                  onChange={(e) =>
                    handleInputChange("memberID", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "স্বয়ংক্রিয়ভাবে তৈরি হবে"
                      : "Auto-generated"
                  }
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
              <Link to="/dashboard">{t.cancel}</Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-foreground border-t-transparent rounded-full mr-2"></div>
                  {language === "bn" ? "সেভ হচ্ছে..." : "Saving..."}
                </div>
              ) : (
                t.saveAndAdd
              )}
            </Button>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full mr-2"></div>
                  {language === "bn" ? "সেভ হচ্ছে..." : "Saving..."}
                </div>
              ) : (
                t.save
              )}
            </Button>
          </div>
        </form>

        {/* Information Card */}
        <Card className="mt-8 bg-muted/30">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              {language === "bn"
                ? "গুরুত্বপূর্ণ তথ্য"
                : "Important Information"}
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {language === "bn"
                  ? "সদস্য আইডি ফাঁকা রাখলে স্বয়ংক্রিয়ভাবে তৈরি হবে"
                  : "Member ID will be auto-generated if left empty"}
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {language === "bn"
                  ? "দৈনিক কিস্তি ও সঞ্চয়ের পরিমাণ সদস্যের সাথে আলোচনা করে নির্ধারণ ক��ুন"
                  : "Daily installment and savings amount should be discussed with the member"}
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                {language === "bn"
                  ? "এলাকার কর্মীর নাম সঠিকভাবে লিখুন যিনি এই সদস্যের দায়িত্বে থাকবেন"
                  : "Enter the correct name of the area worker who will be responsible for this member"}
              </li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
