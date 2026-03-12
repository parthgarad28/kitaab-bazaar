import { Listing } from "@/data/mockListings";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const conditionColors = {
  new: "bg-success/10 text-success border-success/20",
  good: "bg-primary/10 text-primary border-primary/20",
  fair: "bg-warning/10 text-warning border-warning/20",
};

const categoryIcons: Record<string, string> = {
  books: "📚",
  notes: "📝",
  stationery: "✏️",
};

const ListingCard = ({ listing }: { listing: Listing }) => {
  const { lang, t } = useLanguage();

  const title = lang === "hi" ? listing.titleHi : listing.title;
  const conditionLabel =
    listing.condition === "new" ? t("listing.new") :
    listing.condition === "good" ? t("listing.good") : t("listing.fair");

  return (
    <Link
      to={`/listing/${listing.id}`}
      className="group block rounded-xl border border-border bg-card overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-primary-soft to-muted flex items-center justify-center overflow-hidden">
        <span className="text-5xl">{categoryIcons[listing.category]}</span>
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${conditionColors[listing.condition]}`}>
            {conditionLabel}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="text-xs font-semibold capitalize">
            {t(`cat.${listing.category}`)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-foreground text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {listing.location}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-extrabold text-primary">₹{listing.price}</span>
          <span className="text-xs text-muted-foreground">{listing.postedAt}</span>
        </div>
      </div>
    </Link>
  );
};

export default ListingCard;
