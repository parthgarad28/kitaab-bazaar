import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import StarRating from "./StarRating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, User } from "lucide-react";
import { toast } from "sonner";

interface SellerReviewsProps {
  sellerId: string;
  sellerName: string;
  listingId?: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  reviewer_id: string;
}

const SellerReviews = ({ sellerId, sellerName, listingId }: SellerReviewsProps) => {
  const { user } = useAuth();
  const { t, lang } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [isBanned, setIsBanned] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const [reviewsRes, ratingRes, bannedRes] = await Promise.all([
      supabase.from("seller_reviews").select("*").eq("seller_id", sellerId).order("created_at", { ascending: false }),
      supabase.rpc("get_seller_avg_rating", { p_seller_id: sellerId }),
      supabase.rpc("is_seller_banned", { p_seller_id: sellerId }),
    ]);

    if (reviewsRes.data) setReviews(reviewsRes.data as Review[]);
    if (ratingRes.data && ratingRes.data[0]) {
      setAvgRating(Number(ratingRes.data[0].avg_rating));
      setReviewCount(Number(ratingRes.data[0].review_count));
    }
    if (bannedRes.data !== null) setIsBanned(bannedRes.data as boolean);
  };

  useEffect(() => { fetchData(); }, [sellerId]);

  const handleSubmit = async () => {
    if (!user || newRating === 0) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("seller_reviews").insert({
        seller_id: sellerId,
        reviewer_id: user.id,
        listing_id: listingId || null,
        rating: newRating,
        comment: newComment.trim() || null,
      } as any);
      if (error) throw error;
      toast.success(lang === "hi" ? "समीक्षा सबमिट हो गई!" : "Review submitted!");
      setNewRating(0);
      setNewComment("");
      setShowForm(false);
      fetchData();
    } catch (err: any) {
      toast.error(err.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const isTrusted = avgRating >= 4 && reviewCount >= 2;
  const canReview = user && user.id !== sellerId;

  return (
    <div className="space-y-4">
      {/* Rating summary */}
      <div className="flex items-center gap-3 flex-wrap">
        <StarRating rating={avgRating} size="lg" />
        <span className="text-lg font-bold text-foreground">{avgRating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviewCount} {t("review.reviews")})</span>
        {isTrusted && !isBanned && (
          <Badge className="bg-success/10 text-success border-success/20 gap-1">
            <Shield className="h-3 w-3" /> {t("review.trustedSeller")}
          </Badge>
        )}
        {isBanned && (
          <Badge variant="destructive" className="gap-1">
            <AlertTriangle className="h-3 w-3" /> {t("review.banned")}
          </Badge>
        )}
      </div>

      {/* Write review */}
      {canReview && !showForm && (
        <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
          {t("review.write")}
        </Button>
      )}
      {showForm && (
        <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
          <StarRating rating={newRating} interactive onRate={setNewRating} />
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={t("review.placeholder")}
            className="min-h-[80px]"
            maxLength={500}
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSubmit} disabled={submitting || newRating === 0}>
              {t("review.submit")}
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setShowForm(false)}>
              {lang === "hi" ? "रद्द करें" : "Cancel"}
            </Button>
          </div>
        </div>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("review.noReviews")}</p>
      ) : (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div key={review.id} className="p-3 rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 mb-1">
                <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-3 w-3 text-muted-foreground" />
                </div>
                <StarRating rating={review.rating} size="sm" />
                <span className="text-xs text-muted-foreground ml-auto">
                  {new Date(review.created_at).toLocaleDateString()}
                </span>
              </div>
              {review.comment && (
                <p className="text-sm text-foreground mt-1">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerReviews;
