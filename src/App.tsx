import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index.tsx";
import BrowsePage from "./pages/BrowsePage.tsx";
import SellPage from "./pages/SellPage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import ListingDetailPage from "./pages/ListingDetailPage.tsx";
import DonatePage from "./pages/DonatePage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/sell" element={<SellPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/listing/:id" element={<ListingDetailPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
