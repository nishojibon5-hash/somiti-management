import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/storage";
import {
  Users,
  ArrowLeft,
  DollarSign,
  Calendar,
  Save,
  Plus,
} from "lucide-react";

export default function DailyCollection() {
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [isLoading, setIsLoading] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    selectedWorker: "",
    memberID: "",
    memberName: "",
    workerName: "",
    savingsAmount: "",
    installmentAmount: "",
    collectionDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  useEffect(() => {
    (async () => {
      const ms = await storage.getArray<any>("members");
      setMembers(ms);
    })();
  }, []);

  const text = {
    bn: {
      title: "দৈনিক কালেকশন",
      subtitle: "সদস্যদের দৈনিক সঞ্চয় ও কিস্তি আদায়",
      selectWorker: "কর্মী নির্বাচন করুন",
      selectMember: "সদস্য নির্বাচন করুন",
      memberName: "সদস্যের নাম",
      workerName: "কর্মীর নাম",
      savingsAmount: "সঞ্চয়ের পরিমাণ",
      installmentAmount: "কিস্তির পরিমাণ",
      collectionDate: "আদায়ের তারিখ",
      notes: "মন্তব্য",
      save: "সংরক্ষণ করুন",
      saveAndAdd: "সেভ করে আরেকটি যোগ করুন",
      cancel: "বাত��ল",
      totalAmount: "মোট পরিমাণ",
      defaultAmounts: "ডিফল্ট পরিমাণ ব্যবহার করুন",
      noMembers: "কোনো সদস্য নেই",
      addMembersFirst: "প্রথমে সদস্য যোগ করুন",
    },
    en: {
      title: "Daily Collection",
      subtitle: "Daily savings and installment collection from members",
      selectWorker: "Select Worker",
      selectMember: "Select Member",
      memberName: "Member Name",
      workerName: "Worker Name",
      savingsAmount: "Savings Amount",
      installmentAmount: "Installment Amount",
      collectionDate: "Collection Date",
      notes: "Notes",
      save: "Save",
      saveAndAdd: "Save & Add Another",
      cancel: "Cancel",
      totalAmount: "Total Amount",
      defaultAmounts: "Use Default Amounts",
      noMembers: "No Members",
      addMembersFirst: "Add Members First",
    },
  };

  const t = text[language];

  // Get unique workers from members
  const uniqueWorkers = [
    ...new Set(members.map((member) => member.workerName)),
  ].filter(Boolean);

  // Filter members based on selected worker
  const filteredMembers = formData.selectedWorker
    ? members.filter((member) => member.workerName === formData.selectedWorker)
    : [];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleWorkerSelect = (workerName: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedWorker: workerName,
      memberID: "",
      memberName: "",
      workerName: workerName,
      savingsAmount: "",
      installmentAmount: "",
    }));
  };

  const handleMemberSelect = (memberID: string) => {
    const selectedMember = members.find(
      (member) => member.memberID === memberID,
    );
    if (selectedMember) {
      setFormData((prev) => ({
        ...prev,
        memberID: memberID,
        memberName: selectedMember.memberName,
        savingsAmount: selectedMember.dailySavings?.toString() || "",
        installmentAmount: selectedMember.dailyInstallment?.toString() || "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent, saveAndAdd = false) => {
    e.preventDefault();

    // Validation
    if (
      !formData.selectedWorker ||
      !formData.memberID ||
      !formData.savingsAmount ||
      !formData.installmentAmount
    ) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description:
          language === "bn"
            ? "কর্মী, সদস্য, সঞ্চয় ও কিস্তির পরিমাণ আবশ্যক"
            : "Worker, member, savings and installment amounts are required",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create new collection record
      const newCollection = {
        id: Date.now().toString(),
        memberID: formData.memberID,
        memberName: formData.memberName,
        workerName: formData.workerName,
        savingsAmount: parseFloat(formData.savingsAmount) || 0,
        installmentAmount: parseFloat(formData.installmentAmount) || 0,
        totalAmount:
          (parseFloat(formData.savingsAmount) || 0) +
          (parseFloat(formData.installmentAmount) || 0),
        collectionDate: formData.collectionDate,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
      };

      // Save using persistent storage
      const existingCollections = await storage.getArray<any>("dailyCollections");
      const updatedCollections = [...existingCollections, newCollection];
      await storage.set("dailyCollections", updatedCollections);

      // Update member's total savings and loan balance
      const updatedMembers = members.map((member) => {
        if (member.memberID === formData.memberID) {
          return {
            ...member,
            savingsAmount:
              (member.savingsAmount || 0) + newCollection.savingsAmount,
            loanAmount: Math.max(
              0,
              (member.loanAmount || 0) - newCollection.installmentAmount,
            ),
          };
        }
        return member;
      });
      await storage.set("members", updatedMembers);

      toast({
        title: language === "bn" ? "সফল!" : "Success!",
        description:
          language === "bn"
            ? "দৈনিক কালেকশন রেকর্ড করা হয়েছে"
            : "Daily collection recorded successfully",
      });

      if (saveAndAdd) {
        // Reset form for adding another collection
        setFormData({
          selectedWorker: "",
          memberID: "",
          memberName: "",
          workerName: "",
          savingsAmount: "",
          installmentAmount: "",
          collectionDate: new Date().toISOString().split("T")[0],
          notes: "",
        });
      } else {
        // Navigate to collection list
        navigate("/collections");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description:
          language === "bn"
            ? "কালেকশন রেকর্ড করতে ব্যর্থ"
            : "Failed to record collection",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const totalAmount =
    (parseFloat(formData.savingsAmount) || 0) +
    (parseFloat(formData.installmentAmount) || 0);

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
                <DollarSign className="h-5 w-5 text-primary-foreground" />
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
            <Button variant="outline" asChild>
              <Link to="/collections">
                {language === "bn" ? "কালেকশন তালিকা" : "View Collections"}
              </Link>
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

        {members.length === 0 ? (
          <Card className="border-dashed border-2 border-muted-foreground/25">
            <CardContent className="text-center py-12">
              <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">{t.noMembers}</h3>
              <p className="text-muted-foreground mb-6">
                {language === "bn"
                  ? "কালেকশন রেকর্ড করতে প্রথমে সদস্য যোগ করুন"
                  : "Add members first to record collections"}
              </p>
              <Button asChild>
                <Link to="/add-member">
                  <Plus className="h-4 w-4 mr-2" />
                  {t.addMembersFirst}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <form className="space-y-6" onSubmit={(e) => handleSubmit(e, false)}>
            {/* Collection Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  {language === "bn"
                    ? "কালেকশন তথ্য"
                    : "Collection Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="workerSelect">{t.selectWorker} *</Label>
                  <Select
                    value={formData.selectedWorker}
                    onValueChange={handleWorkerSelect}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          language === "bn"
                            ? "প্রথমে কর্মী নির্বাচন করুন"
                            : "Select worker first"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueWorkers.map((workerName) => (
                        <SelectItem key={workerName} value={workerName}>
                          {workerName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="memberSelect">{t.selectMember} *</Label>
                  <Select
                    value={formData.memberID}
                    onValueChange={handleMemberSelect}
                    disabled={!formData.selectedWorker}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !formData.selectedWorker
                            ? language === "bn"
                              ? "প্রথমে কর্মী নির্বাচন করুন"
                              : "Select worker first"
                            : language === "bn"
                              ? "সদস্য নির্বাচন করুন"
                              : "Select a member"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredMembers.map((member) => (
                        <SelectItem
                          key={member.memberID}
                          value={member.memberID}
                        >
                          {member.memberName} - {member.memberID}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {formData.selectedWorker && filteredMembers.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      {language === "bn"
                        ? "এই কর্মীর অধীনে কোনো স��স্য নেই"
                        : "No members found under this worker"}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collectionDate">{t.collectionDate}</Label>
                  <Input
                    id="collectionDate"
                    type="date"
                    value={formData.collectionDate}
                    onChange={(e) =>
                      handleInputChange("collectionDate", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="workerName">{t.workerName}</Label>
                  <Input
                    id="workerName"
                    value={formData.selectedWorker}
                    placeholder={
                      language === "bn" ? "নির্বাচিত কর্মী" : "Selected worker"
                    }
                    readOnly
                    className="bg-muted"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Amount Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  {language === "bn" ? "আর্থিক তথ্য" : "Financial Information"}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="savingsAmount">{t.savingsAmount} *</Label>
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
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="installmentAmount">
                    {t.installmentAmount} *
                  </Label>
                  <Input
                    id="installmentAmount"
                    type="number"
                    value={formData.installmentAmount}
                    onChange={(e) =>
                      handleInputChange("installmentAmount", e.target.value)
                    }
                    placeholder={
                      language === "bn"
                        ? "কিস্তির পরিমাণ (টাকা)"
                        : "Installment amount (BDT)"
                    }
                    min="0"
                    step="10"
                    required
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="notes">{t.notes}</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder={
                      language === "bn"
                        ? "অতিরিক্ত মন্তব্য"
                        : "Additional notes"
                    }
                  />
                </div>

                {/* Total Amount Display */}
                {totalAmount > 0 && (
                  <div className="md:col-span-2 p-4 bg-muted rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t.totalAmount}:</span>
                      <span className="text-2xl font-bold text-primary">
                        ৳{totalAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {language === "bn" ? "সঞ্চয়: " : "Savings: "}৳
                      {formData.savingsAmount || 0} +
                      {language === "bn" ? " কিস্তি: " : " Installment: "}৳
                      {formData.installmentAmount || 0}
                    </div>
                  </div>
                )}
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
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {t.saveAndAdd}
                  </>
                )}
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
        )}
      </main>
    </div>
  );
}
