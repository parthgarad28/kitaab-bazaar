import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "react-router-dom";
import { BookOpen, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/browse", label: t("nav.browse") },
    { to: "/sell", label: t("nav.sell") },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-extrabold text-foreground">
            Kitaab<span className="text-gradient">Kart</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                isActive(link.to)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="gap-1.5 text-muted-foreground"
          >
            <Globe className="h-4 w-4" />
            {t("general.language")}
          </Button>
          <Button variant="outline" size="sm">{t("nav.login")}</Button>
          <Button size="sm" className="gradient-primary text-primary-foreground border-0">
            {t("nav.signup")}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-card p-4 md:hidden animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  isActive(link.to)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-border mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLang(lang === "en" ? "hi" : "en")}
                className="gap-1.5 flex-1"
              >
                <Globe className="h-4 w-4" />
                {t("general.language")}
              </Button>
              <Button variant="outline" size="sm" className="flex-1">{t("nav.login")}</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
