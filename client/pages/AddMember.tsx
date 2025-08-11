import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  ArrowLeft, 
  Camera, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard,
  Calendar,
  FileText
} from "lucide-react";

export default function AddMember() {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // ব্যক্তিগত তথ্য
    memberID: '',
    name: '',
    fatherName: '',
    motherName: '',
    nid: '',
    birthDate: '',
    gender: '',
    maritalStatus: '',
    
    // যোগাযোগের তথ্য
    phone: '',
    email: '',
    emergencyContact: '',
    presentAddress: '',
    permanentAddress: '',
    
    // পেশাগত তথ্য
    occupation: '',
    monthlyIncome: '',
    
    // সমিতির তথ্য
    membershipType: '',
    joiningFee: '',
    initialSavings: '',
    nomineeInfo: '',
    
    // ব্যাংক তথ্য
    bankName: '',
    accountNumber: '',
    
    // অন্যান্য
    notes: '',
    photo: null as File | null
  });

  const text = {
    bn: {
      title: "নতুন সদস্য যোগ করুন",
      personalInfo: "ব্যক্তিগত তথ্য",
      contactInfo: "যোগাযোগের তথ্য", 
      professionalInfo: "পেশাগত তথ্য",
      membershipInfo: "সদস্যপদের তথ্য",
      bankInfo: "ব্যাংক তথ্য",
      additionalInfo: "অতিরিক্ত তথ্য",
      memberID: "সদস্য আইডি",
      name: "পূর্ণ নাম",
      fatherName: "পিতার নাম",
      motherName: "মাতার নাম",
      nid: "জাতীয় পরিচয়পত্র",
      birthDate: "জন্ম তারিখ",
      gender: "লিঙ্গ",
      male: "পুরুষ",
      female: "মহিলা",
      maritalStatus: "বৈবাহিক অবস্থা",
      single: "অবিবাহিত",
      married: "বিবাহিত",
      phone: "মোবাইল নম্বর",
      email: "ইমেইল",
      emergencyContact: "জরুরি যোগাযোগ",
      presentAddress: "বর্তমান ঠিকানা",
      permanentAddress: "স্থায়ী ঠিকানা",
      occupation: "পেশা",
      monthlyIncome: "মাসিক আয়",
      membershipType: "সদস্যপদের ধরন",
      general: "সাধারণ",
      premium: "প্রিমিয়াম",
      joiningFee: "ভর্তি ফি",
      initialSavings: "প্রাথমিক সঞ্চয়",
      nomineeInfo: "মনোনীত ��্যক্তির তথ্য",
      bankName: "ব্যাংকের নাম",
      accountNumber: "অ্যাকাউন্ট নম্বর",
      notes: "মন্তব্য",
      photo: "ছবি",
      saveAndAdd: "সেভ করে আরেকটি যোগ করুন",
      saveAndView: "সেভ করে দেখুন",
      cancel: "বাতিল",
      uploadPhoto: "ছবি আপলোড করুন"
    },
    en: {
      title: "Add New Member",
      personalInfo: "Personal Information",
      contactInfo: "Contact Information",
      professionalInfo: "Professional Information", 
      membershipInfo: "Membership Information",
      bankInfo: "Bank Information",
      additionalInfo: "Additional Information",
      memberID: "Member ID",
      name: "Full Name",
      fatherName: "Father's Name",
      motherName: "Mother's Name",
      nid: "National ID",
      birthDate: "Date of Birth",
      gender: "Gender",
      male: "Male",
      female: "Female",
      maritalStatus: "Marital Status",
      single: "Single",
      married: "Married",
      phone: "Mobile Number",
      email: "Email",
      emergencyContact: "Emergency Contact",
      presentAddress: "Present Address",
      permanentAddress: "Permanent Address",
      occupation: "Occupation",
      monthlyIncome: "Monthly Income",
      membershipType: "Membership Type",
      general: "General",
      premium: "Premium",
      joiningFee: "Joining Fee",
      initialSavings: "Initial Savings",
      nomineeInfo: "Nominee Information",
      bankName: "Bank Name",
      accountNumber: "Account Number",
      notes: "Notes",
      photo: "Photo",
      saveAndAdd: "Save & Add Another",
      saveAndView: "Save & View",
      cancel: "Cancel",
      uploadPhoto: "Upload Photo"
    }
  };

  const t = text[language];

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateMemberID = () => {
    const currentYear = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `SM${currentYear}${randomNum}`;
  };

  const handleSubmit = async (e: React.FormEvent, saveAndAdd = false) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.phone || !formData.membershipType) {
      toast({
        variant: "destructive",
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'নাম, ফোন ও সদস্যপদের ধরন আবশ্যক' : 'Name, phone, and membership type are required'
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
        joinDate: new Date().toLocaleDateString('bn-BD'),
        status: 'active',
        savings: parseFloat(formData.initialSavings) || 0,
        loanAmount: 0,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const existingMembers = JSON.parse(localStorage.getItem('members') || '[]');
      const updatedMembers = [...existingMembers, newMember];
      localStorage.setItem('members', JSON.stringify(updatedMembers));

      toast({
        title: language === 'bn' ? 'সফল!' : 'Success!',
        description: language === 'bn' ? 'নতুন সদস্য যোগ করা হয়েছে' : 'New member added successfully',
      });

      if (saveAndAdd) {
        // Reset form for adding another member
        setFormData({
          memberID: '',
          name: '',
          fatherName: '',
          motherName: '',
          nid: '',
          birthDate: '',
          gender: '',
          maritalStatus: '',
          phone: '',
          email: '',
          emergencyContact: '',
          presentAddress: '',
          permanentAddress: '',
          occupation: '',
          monthlyIncome: '',
          membershipType: '',
          joiningFee: '',
          initialSavings: '',
          nomineeInfo: '',
          bankName: '',
          accountNumber: '',
          notes: '',
          photo: null
        });
      } else {
        // Navigate to dashboard or member list
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: language === 'bn' ? 'সদস্য যোগ করতে ব্যর্থ' : 'Failed to add member'
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
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground">
            {language === 'bn' ? 'নতুন সদস্যের সম্পূর্ণ তথ্য দিয়ে ফর্মটি পূরণ করুন' : 'Fill out the form with complete member information'}
          </p>
        </div>

        <form className="space-y-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {t.personalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memberID">{t.memberID}</Label>
                <Input 
                  id="memberID"
                  value={formData.memberID}
                  onChange={(e) => handleInputChange('memberID', e.target.value)}
                  placeholder={language === 'bn' ? 'স্বয়ংক্রিয়ভাবে তৈরি হবে' : 'Auto-generated'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">{t.name} *</Label>
                <Input 
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder={language === 'bn' ? 'সদস্যের পূর্ণ নাম' : 'Member full name'}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fatherName">{t.fatherName}</Label>
                <Input 
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  placeholder={language === 'bn' ? 'পিতার নাম' : "Father's name"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motherName">{t.motherName}</Label>
                <Input 
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                  placeholder={language === 'bn' ? 'মাতার নাম' : "Mother's name"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nid">{t.nid}</Label>
                <Input 
                  id="nid"
                  value={formData.nid}
                  onChange={(e) => handleInputChange('nid', e.target.value)}
                  placeholder={language === 'bn' ? 'জাতীয় পরিচয়পত্র নম্বর' : 'National ID number'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">{t.birthDate}</Label>
                <Input 
                  id="birthDate"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">{t.gender}</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'bn' ? 'লিঙ্গ নির্বাচন করুন' : 'Select gender'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t.male}</SelectItem>
                    <SelectItem value="female">{t.female}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">{t.maritalStatus}</Label>
                <Select value={formData.maritalStatus} onValueChange={(value) => handleInputChange('maritalStatus', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'bn' ? 'বৈবাহিক অবস্থা নির্বাচন করুন' : 'Select marital status'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">{t.single}</SelectItem>
                    <SelectItem value="married">{t.married}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                {t.contactInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">{t.phone} *</Label>
                <Input 
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder={language === 'bn' ? '+৮৮০ ১৭ ১২৩৪ ৫৬৭৮' : '+880 17 1234 5678'}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={language === 'bn' ? 'ইমেইল ঠিকানা' : 'Email address'}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="emergencyContact">{t.emergencyContact}</Label>
                <Input 
                  id="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder={language === 'bn' ? 'জরুরি যোগাযোগের নম্বর' : 'Emergency contact number'}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="presentAddress">{t.presentAddress}</Label>
                <Textarea 
                  id="presentAddress"
                  value={formData.presentAddress}
                  onChange={(e) => handleInputChange('presentAddress', e.target.value)}
                  placeholder={language === 'bn' ? 'বর্তমান ঠিকানা' : 'Present address'}
                  rows={2}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="permanentAddress">{t.permanentAddress}</Label>
                <Textarea 
                  id="permanentAddress"
                  value={formData.permanentAddress}
                  onChange={(e) => handleInputChange('permanentAddress', e.target.value)}
                  placeholder={language === 'bn' ? 'স্থায়ী ঠিকানা' : 'Permanent address'}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                {t.professionalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="occupation">{t.occupation}</Label>
                <Input 
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange('occupation', e.target.value)}
                  placeholder={language === 'bn' ? 'পেশা' : 'Occupation'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">{t.monthlyIncome}</Label>
                <Input 
                  id="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  placeholder={language === 'bn' ? 'মাসিক আয় (টাকায়)' : 'Monthly income (BDT)'}
                />
              </div>
            </CardContent>
          </Card>

          {/* Membership Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                {t.membershipInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="membershipType">{t.membershipType} *</Label>
                <Select value={formData.membershipType} onValueChange={(value) => handleInputChange('membershipType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'bn' ? 'সদস্যপদের ধরন নির্বাচন করুন' : 'Select membership type'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">{t.general}</SelectItem>
                    <SelectItem value="premium">{t.premium}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="joiningFee">{t.joiningFee}</Label>
                <Input 
                  id="joiningFee"
                  type="number"
                  value={formData.joiningFee}
                  onChange={(e) => handleInputChange('joiningFee', e.target.value)}
                  placeholder={language === 'bn' ? 'ভর্তি ফি (টাকায়)' : 'Joining fee (BDT)'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="initialSavings">{t.initialSavings}</Label>
                <Input 
                  id="initialSavings"
                  type="number"
                  value={formData.initialSavings}
                  onChange={(e) => handleInputChange('initialSavings', e.target.value)}
                  placeholder={language === 'bn' ? 'প্রাথমিক সঞ্চয় (টাকায়)' : 'Initial savings (BDT)'}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="nomineeInfo">{t.nomineeInfo}</Label>
                <Textarea 
                  id="nomineeInfo"
                  value={formData.nomineeInfo}
                  onChange={(e) => handleInputChange('nomineeInfo', e.target.value)}
                  placeholder={language === 'bn' ? 'মনোনীত ব্যক্তির নাম ও সম্পর্ক' : 'Nominee name and relationship'}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Bank Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                {t.bankInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">{t.bankName}</Label>
                <Input 
                  id="bankName"
                  value={formData.bankName}
                  onChange={(e) => handleInputChange('bankName', e.target.value)}
                  placeholder={language === 'bn' ? 'ব্যাংকের নাম' : 'Bank name'}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">{t.accountNumber}</Label>
                <Input 
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder={language === 'bn' ? 'অ্যাকাউন্ট নম্বর' : 'Account number'}
                />
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                {t.additionalInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">{t.notes}</Label>
                <Textarea 
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder={language === 'bn' ? 'অতিরিক্ত মন্তব্য বা নোট' : 'Additional comments or notes'}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="photo">{t.photo}</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-2">{t.uploadPhoto}</p>
                  <Button variant="outline" size="sm">
                    {language === 'bn' ? 'ছবি বেছে নিন' : 'Choose Photo'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button variant="outline" asChild>
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
                  {language === 'bn' ? 'সেভ হচ্ছে...' : 'Saving...'}
                </div>
              ) : (
                t.saveAndAdd
              )}
            </Button>
            <Button 
              type="button"
              onClick={(e) => handleSubmit(e, false)}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full mr-2"></div>
                  {language === 'bn' ? 'সেভ হচ্ছে...' : 'Saving...'}
                </div>
              ) : (
                t.saveAndView
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
