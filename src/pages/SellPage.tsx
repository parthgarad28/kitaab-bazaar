import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SellPage = () => {
  const { t, lang } = useLanguage();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    price: "",
    whatsapp: "",
    location: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t("sell.success"));
    setFormData({ title: "", description: "", category: "", condition: "", price: "", whatsapp: "", location: "" });
  };

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
            <Label className={lang === "hi" ? "font-hindi" : ""}>{t("sell.photo")}</Label>
            <div className="mt-2 border-2 border-dashed border-border rounded-xl p-8 text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
              <Camera className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                {lang === "hi" ? "फोटो जोड़ने के लिए क्लिक करें" : "Click to add photos"}
              </p>
            </div>
          </div>

          {/* Title */}
          <div>
            <Label htmlFor="title" className={lang === "hi" ? "font-hindi" : ""}>{t("sell.itemTitle")}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder={lang === "hi" ? "जैसे: HC Verma Physics भाग 1" : "e.g. HC Verma Physics Vol 1"}
              className="mt-1.5"
              required
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="desc" className={lang === "hi" ? "font-hindi" : ""}>{t("sell.description")}</Label>
            <Textarea
              id="desc"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={lang === "hi" ? "अपनी वस्तु के बारे में विवरण दें" : "Describe your item in detail"}
              className="mt-1.5 min-h-[100px]"
              required
            />
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
                  <SelectItem value="new">{t("listing.new")}</SelectItem>
                  <SelectItem value="good">{t("listing.good")}</SelectItem>
                  <SelectItem value="fair">{t("listing.fair")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className={lang === "hi" ? "font-hindi" : ""}>{t("sell.price")}</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="₹"
                className="mt-1.5"
                required
              />
            </div>
            <div>
              <Label htmlFor="location" className={lang === "hi" ? "font-hindi" : ""}>{t("browse.location")}</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder={lang === "hi" ? "जैसे: दिल्ली" : "e.g. Delhi"}
                className="mt-1.5"
                required
              />
            </div>
          </div>

          {/* WhatsApp */}
          <div>
            <Label htmlFor="whatsapp" className={lang === "hi" ? "font-hindi" : ""}>{t("sell.whatsapp")}</Label>
            <Input
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="+91 XXXXX XXXXX"
              className="mt-1.5"
              required
            />
          </div>

          <Button type="submit" size="lg" className="w-full gradient-primary text-primary-foreground border-0 font-bold gap-2">
            <Upload className="h-5 w-5" />
            {t("sell.submit")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SellPage;
