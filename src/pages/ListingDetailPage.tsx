import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockListings } from "@/data/mockListings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, MessageCircle, Phone, User } from "lucide-react";

const ListingDetailPage = () => {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const listing = mockListings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="container py-20 text-center">
        <span className="text-5xl block mb-4">😕</span>
        <p className="text-lg font-semibold text-muted-foreground">Listing not found</p>
        <Button asChild variant="ghost" className="mt-4">
          <Link to="/browse">
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("nav.browse")}
          </Link>
        </Button>
      </div>
    );
  }

  const title = lang === "hi" ? listing.titleHi : listing.title;
  const description = lang === "hi" ? listing.descriptionHi : listing.description;
  const conditionLabel =
    listing.condition === "new" ? t("listing.new") :
    listing.condition === "good" ? t("listing.good") : t("listing.fair");

  const categoryIcons: Record<string, string> = {
    books: "📚", notes: "📝", stationery: "✏️",
  };

  const whatsappUrl = `https://wa.me/${listing.sellerWhatsapp}?text=${encodeURIComponent(
    `Hi! I'm interested in your listing: ${listing.title}`
  )}`;

  return (
    <div className="min-h-screen">
      <div className="container py-6">
        <Button asChild variant="ghost" size="sm" className="mb-4 text-muted-foreground">
          <Link to="/browse">
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t("nav.browse")}
          </Link>
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="aspect-square rounded-xl bg-gradient-to-br from-primary-soft to-muted flex items-center justify-center border border-border">
            <span className="text-8xl">{categoryIcons[listing.category]}</span>
          </div>

          {/* Details */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary" className="capitalize">
                {t(`cat.${listing.category}`)}
              </Badge>
              <Badge variant="outline">{conditionLabel}</Badge>
            </div>

            <h1 className={`text-2xl md:text-3xl font-extrabold text-foreground mb-2 ${lang === "hi" ? "font-hindi" : ""}`}>
              {title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              {listing.location}
              <span>•</span>
              {listing.postedAt}
            </div>

            <p className="text-3xl font-black text-primary mb-6">₹{listing.price}</p>

            <p className={`text-muted-foreground leading-relaxed mb-6 ${lang === "hi" ? "font-hindi" : ""}`}>
              {description}
            </p>

            {/* Subject */}
            <div className="mb-6 p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">{t("browse.subject")}: <span className="font-semibold text-foreground">{listing.subject}</span></p>
            </div>

            {/* Seller */}
            <div className="p-4 rounded-xl border border-border bg-card mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">{t("listing.posted")} {listing.sellerName}</p>
                  <p className="text-xs text-muted-foreground">+{listing.sellerWhatsapp}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="gradient-primary text-primary-foreground border-0 font-bold flex-1 gap-2">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  {t("listing.whatsapp")}
                </a>
              </Button>
              <Button variant="outline" size="lg" className="font-bold flex-1 gap-2">
                <Phone className="h-5 w-5" />
                {t("listing.contact")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
