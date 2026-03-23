import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen } from "lucide-react";
import { toast } from "sonner";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const loginMessage = searchParams.get("message");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success(lang === "hi" ? "सफलतापूर्वक लॉगिन हुआ!" : "Logged in successfully!");
        navigate(redirectTo);
      }
    } else {
      const { error } = await signUp(email, password, displayName);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success(lang === "hi" ? "अकाउंट बनाया गया! ईमेल चेक करें।" : "Account created! Check your email to confirm.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary mx-auto mb-3">
            <BookOpen className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">
            Kitaab<span className="text-gradient">Kart</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {isLogin
              ? (lang === "hi" ? "अपने अकाउंट में लॉगिन करें" : "Sign in to your account")
              : (lang === "hi" ? "नया अकाउंट बनाएं" : "Create a new account")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-card border border-border rounded-xl p-6">
          {!isLogin && (
            <div>
              <Label htmlFor="name" className={lang === "hi" ? "font-hindi" : ""}>
                {lang === "hi" ? "नाम" : "Full Name"}
              </Label>
              <Input
                id="name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={lang === "hi" ? "आपका नाम" : "Your name"}
                className="mt-1.5"
                required
              />
            </div>
          )}

          <div>
            <Label htmlFor="email">{lang === "hi" ? "ईमेल" : "Email"}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1.5"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">{lang === "hi" ? "पासवर्ड" : "Password"}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5"
              required
              minLength={6}
            />
          </div>

          <Button type="submit" className="w-full gradient-primary text-primary-foreground border-0 font-bold" disabled={loading}>
            {loading
              ? "..."
              : isLogin
                ? (lang === "hi" ? "लॉगिन करें" : "Sign In")
                : (lang === "hi" ? "अकाउंट बनाएं" : "Sign Up")}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            {isLogin
              ? (lang === "hi" ? "अकाउंट नहीं है?" : "Don't have an account?")
              : (lang === "hi" ? "पहले से अकाउंट है?" : "Already have an account?")}
            {" "}
            <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold hover:underline">
              {isLogin
                ? (lang === "hi" ? "साइन अप करें" : "Sign Up")
                : (lang === "hi" ? "लॉगिन करें" : "Sign In")}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
