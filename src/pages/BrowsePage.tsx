import { useLanguage } from "@/contexts/LanguageContext";
import { mockListings } from "@/data/mockListings";
import ListingCard from "@/components/ListingCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const BrowsePage = () => {
  const { t, lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCat);

  const categories = [
    { key: "", label: t("cat.all") },
    { key: "books", label: t("cat.books"), emoji: "📚" },
    { key: "notes", label: t("cat.notes"), emoji: "📝" },
    { key: "stationery", label: t("cat.stationery"), emoji: "✏️" },
  ];

  const filtered = useMemo(() => {
    return mockListings.filter((l) => {
      const matchesCategory = !selectedCategory || l.category === selectedCategory;
      const matchesSearch = !search || 
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.titleHi.includes(search) ||
        l.subject.toLowerCase().includes(search.toLowerCase()) ||
        l.location.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container py-6">
          <h1 className={`text-2xl md:text-3xl font-extrabold text-foreground mb-4 ${lang === "hi" ? "font-hindi" : ""}`}>
            {t("browse.title")}
          </h1>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("browse.search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          {/* Category Pills */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedCategory === cat.key
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
              >
                {cat.emoji && <span>{cat.emoji}</span>}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="container py-6">
        <p className="text-sm text-muted-foreground mb-4">
          {filtered.length} {t("browse.results")}
        </p>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl mb-4 block">🔍</span>
            <p className={`text-lg font-semibold text-muted-foreground ${lang === "hi" ? "font-hindi" : ""}`}>
              {t("browse.noResults")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowsePage;
