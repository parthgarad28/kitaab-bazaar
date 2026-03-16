
-- Seller reviews table
CREATE TABLE public.seller_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL,
  reviewer_id UUID NOT NULL,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(reviewer_id, listing_id)
);

ALTER TABLE public.seller_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone" ON public.seller_reviews FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can create reviews" ON public.seller_reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = reviewer_id AND auth.uid() != seller_id);
CREATE POLICY "Users can update their own reviews" ON public.seller_reviews FOR UPDATE TO authenticated USING (auth.uid() = reviewer_id);
CREATE POLICY "Users can delete their own reviews" ON public.seller_reviews FOR DELETE TO authenticated USING (auth.uid() = reviewer_id);

-- Seller strikes table
CREATE TABLE public.seller_strikes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL,
  reason TEXT NOT NULL,
  strike_number INTEGER NOT NULL DEFAULT 1,
  ban_until TIMESTAMP WITH TIME ZONE,
  is_permanent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.seller_strikes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Strikes are viewable by the seller" ON public.seller_strikes FOR SELECT TO authenticated USING (auth.uid() = seller_id);

-- Function to get seller average rating
CREATE OR REPLACE FUNCTION public.get_seller_avg_rating(p_seller_id UUID)
RETURNS TABLE(avg_rating NUMERIC, review_count BIGINT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(AVG(rating)::NUMERIC, 0), COUNT(*)
  FROM public.seller_reviews
  WHERE seller_id = p_seller_id;
$$;

-- Function to check if seller is banned
CREATE OR REPLACE FUNCTION public.is_seller_banned(p_seller_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.seller_strikes
    WHERE seller_id = p_seller_id
    AND (is_permanent = true OR (ban_until IS NOT NULL AND ban_until > now()))
  );
$$;

-- Function to auto-check and ban low-rated sellers (called after review insert)
CREATE OR REPLACE FUNCTION public.check_seller_rating_ban()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_avg NUMERIC;
  v_count BIGINT;
BEGIN
  SELECT AVG(rating), COUNT(*) INTO v_avg, v_count
  FROM public.seller_reviews WHERE seller_id = NEW.seller_id;
  
  -- Only auto-ban if there are at least 3 reviews and avg < 1.5
  IF v_count >= 3 AND v_avg < 1.5 THEN
    INSERT INTO public.seller_strikes (seller_id, reason, strike_number, is_permanent)
    VALUES (NEW.seller_id, 'Auto-ban: Average rating below 1.5', 
      COALESCE((SELECT MAX(strike_number) FROM public.seller_strikes WHERE seller_id = NEW.seller_id), 0) + 1,
      true)
    ON CONFLICT DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER after_review_check_ban
AFTER INSERT ON public.seller_reviews
FOR EACH ROW
EXECUTE FUNCTION public.check_seller_rating_ban();
