import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "hi";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  "nav.home": { en: "Home", hi: "होम" },
  "nav.browse": { en: "Browse", hi: "खोजें" },
  "nav.sell": { en: "Sell", hi: "बेचें" },
  "nav.login": { en: "Login", hi: "लॉगिन" },
  "nav.signup": { en: "Sign Up", hi: "साइन अप" },

  // Hero
  "hero.title": { en: "Buy & Sell Student Essentials", hi: "छात्र आवश्यकताएं खरीदें और बेचें" },
  "hero.subtitle": { en: "India's marketplace for affordable second-hand books, notes & stationery", hi: "सस्ती पुरानी किताबें, नोट्स और स्टेशनरी के लिए भारत का बाज़ार" },
  "hero.cta": { en: "Start Browsing", hi: "ब्राउज़ करें" },
  "hero.sell": { en: "Sell Now", hi: "अभी बेचें" },

  // Categories
  "cat.books": { en: "Books", hi: "किताबें" },
  "cat.notes": { en: "Notes", hi: "नोट्स" },
  "cat.stationery": { en: "Stationery", hi: "स्टेशनरी" },
  "cat.all": { en: "All Categories", hi: "सभी श्रेणियां" },

  // Listings
  "listing.condition": { en: "Condition", hi: "स्थिति" },
  "listing.price": { en: "Price", hi: "कीमत" },
  "listing.contact": { en: "Contact Seller", hi: "विक्रेता से संपर्क करें" },
  "listing.whatsapp": { en: "Chat on WhatsApp", hi: "WhatsApp पर चैट करें" },
  "listing.like_new": { en: "Like New", hi: "नए जैसी" },
  "listing.good": { en: "Good Condition", hi: "अच्छी स्थिति" },
  "listing.acceptable": { en: "Acceptable", hi: "स्वीकार्य" },
  "listing.heavily_used": { en: "Heavily Used", hi: "बहुत इस्तेमाल किया" },
  "listing.new": { en: "Like New", hi: "नए जैसी" },
  "listing.fair": { en: "Acceptable", hi: "स्वीकार्य" },

  // Reviews
  "review.title": { en: "Seller Reviews", hi: "विक्रेता समीक्षाएं" },
  "review.write": { en: "Write a Review", hi: "समीक्षा लिखें" },
  "review.submit": { en: "Submit Review", hi: "समीक्षा भेजें" },
  "review.placeholder": { en: "Share your experience with this seller...", hi: "इस विक्रेता के साथ अपना अनुभव साझा करें..." },
  "review.avgRating": { en: "Average Rating", hi: "औसत रेटिंग" },
  "review.reviews": { en: "reviews", hi: "समीक्षाएं" },
  "review.trustedSeller": { en: "Trusted Seller", hi: "विश्वसनीय विक्रेता" },
  "review.banned": { en: "Seller Banned", hi: "विक्रेता प्रतिबंधित" },
  "review.noReviews": { en: "No reviews yet", hi: "अभी कोई समीक्षा नहीं" },
  "listing.posted": { en: "Posted by", hi: "द्वारा पोस्ट" },

  // Browse
  "browse.title": { en: "Browse Listings", hi: "लिस्टिंग ब्राउज़ करें" },
  "browse.search": { en: "Search books, notes, stationery...", hi: "किताबें, नोट्स, स्टेशनरी खोजें..." },
  "browse.filter": { en: "Filters", hi: "फ़िल्टर" },
  "browse.sort": { en: "Sort by", hi: "इसके अनुसार क्रमबद्ध करें" },
  "browse.results": { en: "results found", hi: "परिणाम मिले" },
  "browse.noResults": { en: "No listings found", hi: "कोई लिस्टिंग नहीं मिली" },
  "browse.priceRange": { en: "Price Range", hi: "मूल्य सीमा" },
  "browse.location": { en: "Location", hi: "स्थान" },
  "browse.subject": { en: "Subject", hi: "विषय" },

  // Sell
  "sell.title": { en: "Sell Your Items", hi: "अपनी चीज़ें बेचें" },
  "sell.itemTitle": { en: "Title", hi: "शीर्षक" },
  "sell.description": { en: "Description", hi: "विवरण" },
  "sell.category": { en: "Category", hi: "श्रेणी" },
  "sell.condition": { en: "Condition", hi: "स्थिति" },
  "sell.price": { en: "Price (₹)", hi: "कीमत (₹)" },
  "sell.whatsapp": { en: "WhatsApp Number", hi: "WhatsApp नंबर" },
  "sell.photo": { en: "Upload Photos", hi: "फोटो अपलोड करें" },
  "sell.submit": { en: "Post Listing", hi: "लिस्टिंग पोस्ट करें" },
  "sell.success": { en: "Listing posted successfully!", hi: "लिस्टिंग सफलतापूर्वक पोस्ट हुई!" },

  // Footer
  "footer.tagline": { en: "Making education affordable for every Indian student", hi: "हर भारतीय छात्र के लिए शिक्षा को सस्ता बनाना" },
  "footer.about": { en: "About", hi: "हमारे बारे में" },
  "footer.contact": { en: "Contact", hi: "संपर्क" },
  "footer.privacy": { en: "Privacy Policy", hi: "गोपनीयता नीति" },
  "footer.terms": { en: "Terms of Use", hi: "उपयोग की शर्तें" },

  // General
  "general.language": { en: "हिंदी", hi: "English" },
  "general.featured": { en: "Featured Listings", hi: "विशेष लिस्टिंग" },
  "general.howItWorks": { en: "How It Works", hi: "यह कैसे काम करता है" },
  "general.step1": { en: "List Your Item", hi: "अपनी वस्तु लिस्ट करें" },
  "general.step1Desc": { en: "Upload photos, add details & set your price", hi: "फ़ोटो अपलोड करें, विवरण जोड़ें और कीमत तय करें" },
  "general.step2": { en: "Connect with Buyers", hi: "खरीदारों से जुड़ें" },
  "general.step2Desc": { en: "Chat via WhatsApp or in-app messaging", hi: "WhatsApp या ऐप चैट से बात करें" },
  "general.step3": { en: "Complete the Deal", hi: "सौदा पूरा करें" },
  "general.step3Desc": { en: "Pay via UPI or meet for cash exchange", hi: "UPI से भुगतान करें या मिलकर लेनदेन करें" },
  "general.viewAll": { en: "View All", hi: "सभी देखें" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("en");

  const t = (key: string) => {
    return translations[key]?.[lang] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
