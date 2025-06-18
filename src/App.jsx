import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Index from "./pages/Index";
import WomenPage from "./pages/WomenPage";
import WomenProductsPage from "./pages/WomenProductsPage";
import MenPage from "./pages/MenPage";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import CheckOutPage from "./pages/checkOutPage";
import Wallet from "./pages/wallet";
import Benifits from "./pages/Benifits";
import BookingHelp from "./pages/BookingHelp";
import MyBookings from "./pages/MyBookings";
import MyAddress from "./pages/MyAddress";
import FavoriteBooking from "./pages/FavoriteBooking";
import MenProductPage from "./pages/MenProductsPage";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsandConditions from "./pages/TermsandCondition";

const App = () => (
  <TooltipProvider>
    <Sonner />
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/women/products" element={<WomenProductsPage />} />
          <Route path="/men" element={<MenPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<CheckOutPage/>} />
          <Route path="/wallet" element={<Wallet/>} />
          <Route path="/benifits" element={<Benifits/>} />
          <Route path="/booking-help" element={<BookingHelp/>} />
          <Route path="/my-booking" element={<MyBookings />} />
          <Route path="/my-address" element={<MyAddress />} />
          <Route path="/favourite-booking" element={<FavoriteBooking />} />
          <Route path="/men/products" element={<MenProductPage />} />

          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsandConditions />} />
          
          <Route path="/support" element={<MenProductPage />} />
          <Route path="/feedback" element={<MenProductPage />} />
          <Route path="/my-rating" element={<MenProductPage />} />
          

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
