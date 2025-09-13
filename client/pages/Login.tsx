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
import { useToast } from "@/hooks/use-toast";
import { Users, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const text = {
    bn: {
      title: "সমিতি ম্যানেজার",
      login: "��গইন",
      email: "ইমেইল",
      password: "পাসওয়ার্ড",
      forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
      noAccount: "অ্যাকাউন্ট নেই?",
      signUp: "সাইন আপ করুন",
      loginButton: "লগইন করুন",
      welcome: "স্বাগতম",
      subtitle: "আপনার অ্যাকাউন্টে প্রবেশ করুন",
    },
    en: {
      title: "Somiti Manager",
      login: "Login",
      email: "Email",
      password: "Password",
      forgotPassword: "Forgot password?",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      loginButton: "Login",
      welcome: "Welcome back",
      subtitle: "Enter your credentials to access your account",
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

    if (!formData.email || !formData.password) {
      toast({
        variant: "destructive",
        title: language === "bn" ? "ত্রুটি" : "Error",
        description:
          language === "bn"
            ? "ইমেইল ও পাসওয়ার্ড দিন"
            : "Please enter email and password",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store user data using persistent storage
      await storage.set("userLoggedIn", true);
      await storage.set("userData", {
        name: "আহমেদ আলী",
        email: formData.email,
        organization: "আল-আমিন সমিতি",
        plan: "pro",
      });

      // Show success message
      toast({
        title: language === "bn" ? "সফল!" : "Success!",
        description:
          language === "bn" ? "সফলভাবে লগইন হয়েছে" : "Successfully logged in",
      });

      // Navigate to dashboard
      navigate("/dashboard");
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
            <CardTitle className="text-2xl">{t.welcome}</CardTitle>
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

              <div className="flex items-center justify-between">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  {t.forgotPassword}
                </Link>
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
                    {language === "bn" ? "অপেক্ষা কর��ন..." : "Please wait..."}
                  </div>
                ) : (
                  t.loginButton
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t.noAccount} </span>
              <Link to="/signup" className="text-primary hover:underline">
                {t.signUp}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
