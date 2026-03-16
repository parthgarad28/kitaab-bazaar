import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { mockListings } from "@/data/mockListings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, MessageCircle, Phone, User, Shield } from "lucide-react";
import SellerReviews from "@/components/SellerReviews";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import StarRating from "@/components/StarRating";

const conditionLabels: Record<string, string> = {
  like_new: "listing.like_new",
  new: "listing.like_new",
  good: "listing.good",
  acceptable: "listing.acceptable",
  fair: "listing.acceptable",
  heavily_used: "listing.heavily_used",
};

const conditionColors: Record<string, string> = {
  like_new: "bg-success/10 text-success border-success/20",
  new: "bg-success/10 text-success border-success/20",
  good: "bg-primary/10 text-primary border-primary/20",
  acceptable: "bg-warning/10 text-warning border-warning/20",
  fair: "bg-warning/10 text-warning border-warning/20",
  heavily_used: "bg-destructive/10 text-destructive border-destructive/20",
};

const ListingDetailPage = () => {
  const { id } = useParams();
  const { t, lang } = useLanguage();
  const listing = mockListings.find((l) => l.id === id);
  const [sellerRating, setSellerRating] = useState<{ avg: number; count: number }>({ avg: 0, count: 0 });

  // For mock listings, use a fake seller_id derived from sellerWhatsapp
  const sellerId = listing ? listing.sellerWhatsapp : "";

  useEffect(() => {
    if (!sellerId) return;
    supabase.rpc("get_seller_avg_rating", { p_seller_id: sellerId }).then(({ data }) => {
      if (data && data[0]) {
        setSellerRating({ avg: Number(data[0].avg_rating), count: Number(data[0].review_count) });
      }
    });
  }, [sellerId]);

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
  const conditionLabel = t(conditionLabels[listing.condition] || "listing.good");
  const isTrusted = sellerRating.avg >= 4 && sellerRating.count >= 2;

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
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="secondary" className="capitalize">
                {t(`cat.${listing.category}`)}
              </Badge>
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${conditionColors[listing.condition] || ""}`}>
                {conditionLabel}
              </span>
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
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-bold text-foreground text-sm">{t("listing.posted")} {listing.sellerName}</p>
                    {isTrusted && (
                      <Badge className="bg-success/10 text-success border-success/20 gap-1 text-xs">
                        <Shield className="h-3 w-3" /> {t("review.trustedSeller")}
                      </Badge>
                    )}
                  </div>
                  {sellerRating.count > 0 && (
                    <div className="flex items-center gap-1 mt-1">
                      <StarRating rating={sellerRating.avg} size="sm" />
                      <span className="text-xs text-muted-foreground">({sellerRating.count})</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
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

            {/* Seller Reviews */}
            <div className="border-t border-border pt-6">
              <h2 className="text-lg font-bold text-foreground mb-4">{t("review.title")}</h2>
              <SellerReviews sellerId={sellerId} sellerName={listing.sellerName} listingId={listing.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
