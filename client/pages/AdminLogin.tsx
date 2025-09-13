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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Crown, Eye, EyeOff, Shield, AlertTriangle } from "lucide-react";

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    adminCode: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const text = {
    bn: {
      title: "সমিতি ম্যানেজার",
      adminLogin: "এডমিন লগইন",
      welcome: "সিস্টেম এডমিনিস্ট্রেটর প্রবেশ",
      subtitle: "সিস্টেম নিয়ন্ত্রণের জন্য আপনার এডমিন পরিচয়পত্র ব্যবহার করুন",
      email: "এডমিন ইমেইল",
      password: "পাসওয়ার্ড",
      adminCode: "এডমিন কোড",
      loginButton: "এডমিন প্যানেলে প্রবেশ",
      backToMain: "মূল সাইটে ফিরুন",
      securityNotice: "নিরাপত্তা বিজ্ঞপ্তি",
      securityMessage:
        "এই এডমিন প্যানেল উচ্চ নিরাপত্তা সহ সুরক্ষিত। অননুমোদিত প্রবেশের চেষ্টা লগ করা হবে।",
      invalidCredentials: "ভুল পরিচয়পত্র",
      accessDenied: "প্রবেশ অস্বীকৃত",
    },
    en: {
      title: "Somiti Manager",
      adminLogin: "Admin Login",
      welcome: "System Administrator Access",
      subtitle: "Use your administrator credentials to access system controls",
      email: "Admin Email",
      password: "Password",
      adminCode: "Admin Code",
      loginButton: "Access Admin Panel",
      backToMain: "Back to Main Site",
      securityNotice: "Security Notice",
      securityMessage:
        "This admin panel is secured with high security. Unauthorized access attempts will be logged.",
      invalidCredentials: "Invalid Credentials",
      accessDenied: "Access Denied",
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

    if (!formData.email || !formData.password || !formData.adminCode) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description:
          language === "bn" ? "সব ক্ষেত্র পূরণ করুন" : "Please fill all fields",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate admin authentication
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo admin credentials
      const validAdmin = {
        email: "admin@somitimanager.com",
        password: "admin123",
        adminCode: "SM2024",
      };

      if (
        formData.email === validAdmin.email &&
        formData.password === validAdmin.password &&
        formData.adminCode === validAdmin.adminCode
      ) {
        // Store admin session
        await storage.set("adminLoggedIn", true);
        await storage.set("adminSession", {
          email: formData.email,
          loginTime: new Date().toISOString(),
          role: "super_admin",
        });

        toast({
          title: language === "bn" ? "সফল!" : "Success!",
          description:
            language === "bn"
              ? "এডমিন প্যানেলে স্বাগতম"
              : "Welcome to Admin Panel",
        });

        navigate("/admin-dashboard");
      } else {
        toast({
          variant: "destructive",
          title: t.accessDenied,
          description: t.invalidCredentials,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description: language === "bn" ? "লগইন ব্যর্থ হয়েছে" : "Login failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="h-12 w-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <Crown className="h-7 w-7 text-white" />
            </div>
            <div className="text-center">
              <span className="font-bold text-2xl text-white">{t.title}</span>
              <p className="text-purple-200 text-sm">{t.adminLogin}</p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <Alert className="mb-6 border-amber-400 bg-amber-50 dark:bg-amber-950">
          <Shield className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800 dark:text-amber-200">
            <strong>{t.securityNotice}:</strong> {t.securityMessage}
          </AlertDescription>
        </Alert>

        <Card className="shadow-2xl border-purple-200 bg-white/95 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-purple-800">
              {t.welcome}
            </CardTitle>
            <CardDescription className="text-purple-600">
              {t.subtitle}
            </CardDescription>
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
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder={
                    language === "bn"
                      ? "admin@somitimanager.com"
                      : "admin@somitimanager.com"
                  }
                  className="border-purple-200 focus:border-purple-400"
                  required
                />
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
                        ? "আপনার এডমিন পাসওয়ার্ড"
                        : "Your admin password"
                    }
                    className="border-purple-200 focus:border-purple-400"
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
                <Label htmlFor="adminCode">{t.adminCode}</Label>
                <Input
                  id="adminCode"
                  type="text"
                  value={formData.adminCode}
                  onChange={(e) =>
                    handleInputChange("adminCode", e.target.value)
                  }
                  placeholder={
                    language === "bn" ? "বিশেষ এডমিন কোড" : "Special admin code"
                  }
                  className="border-purple-200 focus:border-purple-400"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    {language === "bn" ? "যাচাই হচ্ছে..." : "Authenticating..."}
                  </div>
                ) : (
                  <>
                    <Crown className="h-4 w-4 mr-2" />
                    {t.loginButton}
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-sm mt-6">
              <Link to="/" className="text-purple-600 hover:underline">
                ← {t.backToMain}
              </Link>
            </div>

            {/* Demo Credentials */}
            <Card className="mt-6 bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  {language === "bn" ? "ডেমো পরিচয়পত্র" : "Demo Credentials"}
                </h4>
                <div className="text-sm text-blue-700 space-y-1">
                  <p>
                    <strong>Email:</strong> admin@somitimanager.com
                  </p>
                  <p>
                    <strong>Password:</strong> admin123
                  </p>
                  <p>
                    <strong>Admin Code:</strong> SM2024
                  </p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
