import { useLanguage } from "@/contexts/LanguageContext";
import { mockListings } from "@/data/mockListings";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, MessageCircle, CreditCard, ArrowRight, Search } from "lucide-react";

const Index = () => {
  const { t, lang } = useLanguage();

  const steps = [
    { icon: BookOpen, title: t("general.step1"), desc: t("general.step1Desc") },
    { icon: MessageCircle, title: t("general.step2"), desc: t("general.step2Desc") },
    { icon: CreditCard, title: t("general.step3"), desc: t("general.step3Desc") },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_70%)]" />
        <div className="container relative text-center">
          <h1 className={`text-3xl md:text-5xl lg:text-6xl font-black text-primary-foreground leading-tight mb-4 animate-fade-in ${lang === "hi" ? "font-hindi" : ""}`}>
            {t("hero.title")}
          </h1>
          <p className={`text-base md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 animate-fade-in ${lang === "hi" ? "font-hindi" : ""}`} style={{ animationDelay: "0.1s" }}>
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <Button asChild size="lg" variant="secondary" className="font-bold gap-2 shadow-elevated text-foreground">
              <Link to="/browse">
                <Search className="h-4 w-4" />
                {t("hero.cta")}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold gap-2 border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 hover:text-primary-foreground">
              <Link to="/sell">
                {t("hero.sell")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container -mt-8 relative z-10">
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { key: "books", emoji: "📚", label: t("cat.books") },
            { key: "notes", emoji: "📝", label: t("cat.notes") },
            { key: "stationery", emoji: "✏️", label: t("cat.stationery") },
          ].map((cat) => (
            <Link
              key={cat.key}
              to={`/browse?category=${cat.key}`}
              className="flex flex-col items-center gap-2 rounded-xl bg-card border border-border p-4 md:p-6 shadow-card hover:shadow-elevated transition-all hover:-translate-y-1"
            >
              <span className="text-3xl md:text-4xl">{cat.emoji}</span>
              <span className={`text-sm md:text-base font-bold text-foreground ${lang === "hi" ? "font-hindi" : ""}`}>
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mt-16">
        <h2 className={`text-2xl md:text-3xl font-extrabold text-foreground text-center mb-10 ${lang === "hi" ? "font-hindi" : ""}`}>
          {t("general.howItWorks")}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="text-center p-6 rounded-xl bg-card border border-border shadow-card">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="inline-flex items-center justify-center h-6 w-6 rounded-full gradient-primary text-primary-foreground text-xs font-bold mb-3">
                {i + 1}
              </div>
              <h3 className={`text-base font-bold text-foreground mb-2 ${lang === "hi" ? "font-hindi" : ""}`}>
                {step.title}
              </h3>
              <p className={`text-sm text-muted-foreground ${lang === "hi" ? "font-hindi" : ""}`}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl md:text-3xl font-extrabold text-foreground ${lang === "hi" ? "font-hindi" : ""}`}>
            {t("general.featured")}
          </h2>
          <Button asChild variant="ghost" className="text-primary font-semibold gap-1">
            <Link to="/browse">
              {t("general.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockListings.slice(0, 4).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
