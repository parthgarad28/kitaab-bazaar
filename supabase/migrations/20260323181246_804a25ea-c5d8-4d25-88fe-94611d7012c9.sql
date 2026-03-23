CREATE TABLE public.donations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  donor_name TEXT NOT NULL,
  donor_phone TEXT NOT NULL,
  donor_email TEXT,
  book_details TEXT NOT NULL,
  number_of_books INTEGER NOT NULL DEFAULT 1,
  pickup_address TEXT NOT NULL,
  city TEXT NOT NULL,
  pincode TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a donation" ON public.donations FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Users can view their own donations" ON public.donations FOR SELECT TO authenticated USING (auth.uid() = user_id);