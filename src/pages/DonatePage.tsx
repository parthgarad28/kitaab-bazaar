import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Heart, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const DonatePage = () => {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    bookDetails: "",
    numberOfBooks: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("donations").insert({
        donor_name: formData.name,
        donor_phone: formData.phone,
        donor_email: formData.email,
        book_details: formData.bookDetails,
        number_of_books: parseInt(formData.numberOfBooks) || 1,
        pickup_address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        user_id: user?.id || null,
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success(lang === "hi" ? "दान अनुरोध सफल!" : "Donation request submitted!");
    } catch (err: any) {
      toast.error(err.message || (lang === "hi" ? "कुछ गलत हो गया" : "Something went wrong"));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className={`text-2xl font-extrabold text-foreground mb-2 ${lang === "hi" ? "font-hindi" : ""}`}>
            {lang === "hi" ? "धन्यवाद! 🙏" : "Thank You! 🙏"}
          </h2>
          <p className={`text-muted-foreground ${lang === "hi" ? "font-hindi" : ""}`}>
            {lang === "hi"
              ? "आपका दान अनुरोध प्राप्त हुआ। हम जल्द ही पिकअप की व्यवस्था करेंगे।"
              : "Your donation request has been received. We will arrange pickup soon."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container max-w-2xl py-8">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-3">
            <Heart className="h-7 w-7 text-primary" />
          </div>
          <h1 className={`text-2xl md:text-3xl font-extrabold text-foreground mb-2 ${lang === "hi" ? "font-hindi" : ""}`}>
            {lang === "hi" ? "किताबें दान करें" : "Donate Your Books"}
          </h1>
          <p className={`text-muted-foreground text-sm max-w-lg mx-auto ${lang === "hi" ? "font-hindi" : ""}`}>
            {lang === "hi"
              ? "अपनी पुरानी किताबें Kitaab Kart को दान करें। हम पिकअप की व्यवस्था करेंगे और डिलीवरी का खर्च हम उठाएंगे!"
              : "Donate your old books to Kitaab Kart. We'll arrange pickup and cover all delivery costs!"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-card border border-border rounded-xl p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className={lang === "hi" ? "font-hindi" : ""}>
                {lang === "hi" ? "आपका नाम" : "Your Name"}
              </Label>
              <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={lang === "hi" ? "पूरा नाम" : "Full name"} className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="phone" className={lang === "hi" ? "font-hindi" : ""}>
                {lang === "hi" ? "फोन नंबर" : "Phone Number"}
              </Label>
              <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="mt-1.5" required />
            </div>
          </div>

          <div>
            <Label htmlFor="email">{lang === "hi" ? "ईमेल" : "Email"}</Label>
            <Input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" className="mt-1.5" />
          </div>

          <div>
            <Label htmlFor="bookDetails" className={lang === "hi" ? "font-hindi" : ""}>
              {lang === "hi" ? "किताबों का विवरण" : "Book Details"}
            </Label>
            <Textarea id="bookDetails" value={formData.bookDetails} onChange={(e) => setFormData({ ...formData, bookDetails: e.target.value })} placeholder={lang === "hi" ? "किताबों के नाम, विषय, कक्षा आदि" : "Book names, subjects, class/grade etc."} className="mt-1.5 min-h-[100px]" required />
          </div>

          <div>
            <Label htmlFor="numBooks" className={lang === "hi" ? "font-hindi" : ""}>
              {lang === "hi" ? "किताबों की संख्या (लगभग)" : "Number of Books (approx.)"}
            </Label>
            <Input id="numBooks" type="number" min="1" value={formData.numberOfBooks} onChange={(e) => setFormData({ ...formData, numberOfBooks: e.target.value })} placeholder="5" className="mt-1.5" required />
          </div>

          <div>
            <Label htmlFor="address" className={lang === "hi" ? "font-hindi" : ""}>
              {lang === "hi" ? "पिकअप पता" : "Pickup Address"}
            </Label>
            <Textarea id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder={lang === "hi" ? "पूरा पता जहाँ से किताबें उठानी हैं" : "Full address for book pickup"} className="mt-1.5" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city" className={lang === "hi" ? "font-hindi" : ""}>
                {lang === "hi" ? "शहर" : "City"}
              </Label>
              <Input id="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder={lang === "hi" ? "जैसे: दिल्ली" : "e.g. Delhi"} className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="pincode" className={lang === "hi" ? "font-hindi" : ""}>
                {lang === "hi" ? "पिनकोड" : "Pincode"}
              </Label>
              <Input id="pincode" value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value })} placeholder="110001" className="mt-1.5" required />
            </div>
          </div>

          <Button type="submit" size="lg" disabled={submitting} className="w-full gradient-primary text-primary-foreground border-0 font-bold gap-2">
            {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Heart className="h-5 w-5" />}
            {submitting ? (lang === "hi" ? "भेजा जा रहा है..." : "Submitting...") : (lang === "hi" ? "दान अनुरोध भेजें" : "Submit Donation Request")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DonatePage;
