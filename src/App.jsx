// import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WomenPage from "./pages/WomenPage";
import MenPage from "./pages/MenPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    {/* <Toaster /> */}
    <Sonner />
    <BrowserRouter>
      <div className="w-full min-h-screen bg-[#F5F5F5]">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/men" element={<MenPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
