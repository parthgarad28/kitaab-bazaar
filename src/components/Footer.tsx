import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <BookOpen className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-extrabold text-foreground">
                Kitaab<span className="text-gradient">Kart</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/browse" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("nav.browse")}</Link>
              <Link to="/sell" className="text-sm text-muted-foreground hover:text-primary transition-colors">{t("nav.sell")}</Link>
              <span className="text-sm text-muted-foreground">{t("footer.about")}</span>
              <span className="text-sm text-muted-foreground">{t("footer.contact")}</span>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-3">Legal</h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">{t("footer.privacy")}</span>
              <span className="text-sm text-muted-foreground">{t("footer.terms")}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 text-primary fill-primary" /> for Indian students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
