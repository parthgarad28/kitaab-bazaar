import { useLanguage } from "@/contexts/LanguageContext";
import { mockListings } from "@/data/mockListings";
import ListingCard from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, MessageCircle, CreditCard, ArrowRight, Search, Users, TrendingUp, IndianRupee } from "lucide-react";
import { useEffect, useRef } from "react";

const Index = () => {
  const { t, lang } = useLanguage();

  const steps = [
    { icon: BookOpen, title: t("general.step1"), desc: t("general.step1Desc") },
    { icon: MessageCircle, title: t("general.step2"), desc: t("general.step2Desc") },
    { icon: CreditCard, title: t("general.step3"), desc: t("general.step3Desc") },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-32 bg-[#0F0F0F]">
        {/* Animated Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="bubble bubble-1" />
          <div className="bubble bubble-2" />
          <div className="bubble bubble-3" />
          <div className="bubble bubble-4" />
          <div className="bubble bubble-5" />
        </div>

        {/* Announcement badge */}
        <div className="container relative text-center">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 text-orange-400 text-sm font-medium mb-8">
            <TrendingUp className="h-4 w-4" />
            India's Student Marketplace — Now Launching! 🚀
          </div>

          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 animate-fade-in ${lang === "hi" ? "font-hindi" : ""}`}>
            <span className="text-white">Buy & </span>
            <span className="text-orange-500">&</span>
            <span className="text-white"> Sell Student </span>
            <span className="text-orange-500">Essentials</span>
          </h1>

          <p className={`text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in ${lang === "hi" ? "font-hindi" : ""}`}>
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Button asChild size="lg" className="font-bold gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl transition-all hover:scale-105">
              <Link to="/browse">
                <Search className="h-5 w-5" />
                Start Browsing
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold gap-2 border-orange-500/30 text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 px-8 py-6 text-lg rounded-xl transition-all hover:scale-105">
              <Link to="/sell">
                Sell Now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-16">
            {[
              { icon: Users, value: "4 Cr+", label: "Students in India" },
              { icon: TrendingUp, value: "80%", label: "Cheaper Than Market" },
              { icon: IndianRupee, value: "₹0", label: "Investment to Start" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all">
                <stat.icon className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl md:text-3xl font-black text-orange-500">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-8">Browse Categories</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { key: "books", emoji: "📚", label: "Books" },
            { key: "notes", emoji: "📝", label: "Notes" },
            { key: "stationery", emoji: "✏️", label: "Stationery" },
          ].map((cat) => (
            <Link
              key={cat.key}
              to={`/browse?category=${cat.key}`}
              className="flex flex-col items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-6 md:p-8 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all hover:-translate-y-2 group"
            >
              <span className="text-4xl md:text-5xl group-hover:scale-110 transition-transform">{cat.emoji}</span>
              <span className="text-base md:text-lg font-bold text-white">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-orange-500/10 hover:border-orange-500/30 transition-all hover:-translate-y-2">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/30 mb-4">
                <step.icon className="h-8 w-8 text-orange-500" />
              </div>
              <div className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-orange-500 text-white text-sm font-bold mb-4">
                {i + 1}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">Featured Listings</h2>
          <Button asChild variant="ghost" className="text-orange-500 font-semibold gap-1 hover:text-orange-400">
            <Link to="/browse">
              View All
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