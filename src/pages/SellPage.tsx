import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload, X, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const MAX_PHOTOS = 5;

const SellPage = () => {
  const { t, lang } = useLanguage();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    whatsapp: "",
    location: "",
  });

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      const message = lang === "hi" ? "कृपया अपनी किताब लिस्ट करने के लिए लॉगिन करें" : "Please login to list your book";
      navigate(`/auth?redirect=/sell&message=${encodeURIComponent(message)}`);
    }
  }, [user, loading, navigate, lang]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = MAX_PHOTOS - imageFiles.length;
    if (remaining <= 0) {
      toast.error(lang === "hi" ? `अधिकतम ${MAX_PHOTOS} फोटो अपलोड कर सकते हैं` : `Maximum ${MAX_PHOTOS} photos allowed`);
      return;
    }
    const toAdd = files.slice(0, remaining);
    for (const file of toAdd) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(lang === "hi" ? "फाइल 5MB से छोटी होनी चाहिए" : "File must be under 5MB");
        return;
      }
    }
    setImageFiles((prev) => [...prev, ...toAdd]);
    setImagePreviews((prev) => [...prev, ...toAdd.map((f) => URL.createObjectURL(f))]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    try {
      let imageUrl: string | null = null;

      if (imageFiles.length > 0) {
        // Upload first image as main image_url
        const file = imageFiles[0];
        const fileExt = file.name.split(".").pop();
        const filePath = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("listing-images")
          .upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("listing-images")
          .getPublicUrl(filePath);
        imageUrl = publicUrl;

        // Upload additional images (for future use)
        for (let i = 1; i < imageFiles.length; i++) {
          const f = imageFiles[i];
          const ext = f.name.split(".").pop();
          const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
          await supabase.storage.from("listing-images").upload(path, f);
        }
      }

      const { error } = await supabase.from("listings").insert({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        price: parseInt(formData.price),
        seller_whatsapp: formData.whatsapp,
        seller_name: user.user_metadata?.display_name || user.email || "Unknown",
        location: formData.location,
        image_url: imageUrl,
      });

      if (error) throw error;

      toast.success(t("sell.success"));
      setFormData({ title: "", description: "", category: "", condition: "", price: "", whatsapp: "", location: "" });
      setImageFiles([]);
      setImagePreviews([]);
      navigate("/browse");
    } catch (err: any) {
      toast.error(err.message || (lang === "hi" ? "कुछ गलत हो गया" : "Something went wrong"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen">
      <div className="container max-w-2xl py-8">
        <h1 className={`text-2xl md:text-3xl font-extrabold text-foreground mb-2 ${lang === "hi" ? "font-hindi" : ""}`}>
          {t("sell.title")}
        </h1>
        <p className="text-muted-foreground mb-8 text-sm">
          {lang === "hi" ? "अपनी पुरानी किताबें, नोट्स या स्टेशनरी बेचें और पैसे कमाएं!" : "Sell your old books, notes or stationery and earn money!"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Photo Upload */}
          <div>
            <Label className={lang === "hi" ? "font-hindi" : ""}>{t("sell.photo")} ({imageFiles.length}/{MAX_PHOTOS})</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageSelect}
            />
            <div className="mt-2 flex flex-wrap gap-3">
              {imagePreviews.map((preview, i) => (
                <div key={i} className="relative">
                  <img src={preview} alt={`Preview ${i + 1}`} className="rounded-xl h-24 w-24 object-cover border border-border" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {imageFiles.length < MAX_PHOTOS && (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="h-24 w-24 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <Camera className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1">
                    {lang === "hi" ? "जोड़ें" : "Add"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className={lang === "hi" ? "font-hindi" : ""}>{t("sell.itemTitle")}</Label>
            <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder={lang === "hi" ? "जैसे: HC Verma Physics भाग 1" : "e.g. HC Verma Physics Vol 1"} className="mt-1.5" required />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="desc" className={lang === "hi" ? "font-hindi" : ""}>{t("sell.description")}</Label>
            <Textarea id="desc" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder={lang === "hi" ? "अपनी वस्तु के बारे में विवरण दें" : "Describe your item in detail"} className="mt-1.5 min-h-[100px]" required />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className={lang === "hi" ? "font-hindi" : ""}>{t("sell.category")}</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder={t("sell.category")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="books">{t("cat.books")} 📚</SelectItem>
                  <SelectItem value="notes">{t("cat.notes")} 📝</SelectItem>
                  <SelectItem value="stationery">{t("cat.stationery")} ✏️</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className={lang === "hi" ? "font-hindi" : ""}>{t("sell.condition")}</Label>
              <Select value={formData.condition} onValueChange={(v) => setFormData({ ...formData, condition: v })}>
                <SelectTrigger className="mt-1.5"><SelectValue placeholder={t("sell.condition")} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="like_new">{t("listing.like_new")}</SelectItem>
                  <SelectItem value="good">{t("listing.good")}</SelectItem>
                  <SelectItem value="acceptable">{t("listing.acceptable")}</SelectItem>
                  <SelectItem value="heavily_used">{t("listing.heavily_used")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className={lang === "hi" ? "font-hindi" : ""}>{t("sell.price")}</Label>
              <Input id="price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="₹" className="mt-1.5" required />
            </div>
            <div>
              <Label htmlFor="location" className={lang === "hi" ? "font-hindi" : ""}>{t("browse.location")}</Label>
              <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder={lang === "hi" ? "जैसे: दिल्ली" : "e.g. Delhi"} className="mt-1.5" required />
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <Label htmlFor="whatsapp" className={lang === "hi" ? "font-hindi" : ""}>{t("sell.whatsapp")}</Label>
            <Input id="whatsapp" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} placeholder="+91 XXXXX XXXXX" className="mt-1.5" required />
          </div>

          <Button type="submit" size="lg" disabled={submitting} className="w-full gradient-primary text-primary-foreground border-0 font-bold gap-2">
            {submitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
            {submitting ? (lang === "hi" ? "अपलोड हो रहा है..." : "Uploading...") : t("sell.submit")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SellPage;
