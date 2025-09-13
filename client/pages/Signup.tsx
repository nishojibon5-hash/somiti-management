import { useState } from "react";
import { storage } from "@/lib/storage";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Users, Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    plan: "",
    agreeTerms: false,
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const text = {
    bn: {
      title: "সমিতি ম্যানেজার",
      signup: "সাইন আপ",
      createAccount: "নতুন অ্যাকাউন্ট তৈরি করুন",
      subtitle: "আজই শুরু করুন আপনার সমিতি ব্যবস্থাপনা",
      organizationName: "প্রত���ষ্ঠানের নাম",
      fullName: "পূর্ণ নাম",
      email: "ইমেইল",
      phone: "ফোন নম্বর",
      password: "পাসওয়ার্ড",
      confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
      plan: "প্ল্যান নির্বাচন করুন",
      free: "ফ্রি",
      pro: "প্রো",
      premium: "প্রিমিয়াম",
      agreeTerms: "আমি শর্তাবলী ও গোপনীয়তা নীতি মেনে নিই",
      signupButton: "সাইন আপ করুন",
      haveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
      login: "লগইন করুন",
    },
    en: {
      title: "Somiti Manager",
      signup: "Sign Up",
      createAccount: "Create New Account",
      subtitle: "Start managing your cooperative today",
      organizationName: "Organization Name",
      fullName: "Full Name",
      email: "Email",
      phone: "Phone Number",
      password: "Password",
      confirmPassword: "Confirm Password",
      plan: "Select Plan",
      free: "Free",
      pro: "Pro",
      premium: "Premium",
      agreeTerms: "I agree to the Terms & Privacy Policy",
      signupButton: "Sign Up",
      haveAccount: "Already have an account?",
      login: "Login",
    },
  };

  const t = text[language];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.organizationName ||
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.plan
    ) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description:
          language === "bn"
            ? "সকল ক্ষেত্র পূরণ করুন"
            : "Please fill all fields",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description:
          language === "bn" ? "পাসওয়ার্ড মিলছে না" : "Passwords do not match",
      });
      return;
    }

    if (!formData.agreeTerms) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description:
          language === "bn"
            ? "শর্তাবলী মেনে নিন"
            : "Please agree to terms and conditions",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store user data using persistent storage
      await storage.set("userLoggedIn", true);
      await storage.set("userData", {
        name: formData.fullName,
        email: formData.email,
        organization: formData.organizationName,
        plan: formData.plan,
      });

      // Show success message
      toast({
        title: language === "bn" ? "সফল!" : "Success!",
        description:
          language === "bn"
            ? "আপনার অ্যাকাউন্ট তৈরি হয়েছে"
            : "Your account has been created successfully",
      });

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description:
          language === "bn"
            ? "রেজিস্ট্রেশন ব্যর্থ হয়েছে"
            : "Registration failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl text-primary">{t.title}</span>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t.createAccount}</CardTitle>
            <CardDescription>{t.subtitle}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
              >
                {language === "bn" ? "EN" : "বাং"}
              </Button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="organization">{t.organizationName}</Label>
                <Input
                  id="organization"
                  type="text"
                  value={formData.organizationName}
                  onChange={(e) =>
                    handleInputChange("organizationName", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "আপনার প্রতিষ্ঠানের নাম"
                      : "Enter organization name"
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">{t.fullName}</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "আপনার পূর্ণ নাম"
                      : "Enter your full name"
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={
                    language === "bn" ? "আপনার ইমেইল" : "Enter your email"
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">{t.phone}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder={
                    language === "bn"
                      ? "+৮৮০ ১৭ ১২৩৪ ৫৬৭৮"
                      : "+880 17 1234 5678"
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">{t.plan}</Label>
                <Select
                  value={formData.plan}
                  onValueChange={(value) => handleInputChange("plan", value)}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        language === "bn"
                          ? "প্ল্যান নির্বাচন করুন"
                          : "Select a plan"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">
                      {t.free} - {language === "bn" ? "বিনামূল্যে" : "Free"}
                    </SelectItem>
                    <SelectItem value="pro">
                      {t.pro} - ৳২,৫০০/{language === "bn" ? "মাস" : "month"}
                    </SelectItem>
                    <SelectItem value="premium">
                      {t.premium} - ৳৫,০০০/{language === "bn" ? "মাস" : "month"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t.password}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder={
                      language === "bn"
                        ? "আপনার পাসওয়ার্ড"
                        : "Enter your password"
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  placeholder={
                    language === "bn"
                      ? "পাসওয়ার্ড নিশ্চিত করুন"
                      : "Confirm your password"
                  }
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    handleInputChange("agreeTerms", checked as boolean)
                  }
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  {t.agreeTerms}
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-background border-t-transparent rounded-full mr-2"></div>
                    {language === "bn" ? "অপেক্ষা করুন..." : "Please wait..."}
                  </div>
                ) : (
                  t.signupButton
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t.haveAccount} </span>
              <Link to="/login" className="text-primary hover:underline">
                {t.login}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
