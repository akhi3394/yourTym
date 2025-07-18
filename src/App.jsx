import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAppSelector } from "./hooks/useAppSelector";
import { Navigate } from "react-router-dom";

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

import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsandConditions from "./pages/TermsandCondition";
import MenProductPremiumPage from "./components/MenProductPremiumPage";
import MenProductClassicPage from "./components/MenProductClassicPage";
import BookingDetail from "./pages/BookingDetail";
import ScrollToTop from "./components/ScrollToTop";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/" />;
};

const App = () => (
  <TooltipProvider>
    <Sonner />
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/women" element={<ProtectedRoute><WomenPage /></ProtectedRoute>} />
          <Route path="/women/products" element={<ProtectedRoute><WomenProductsPage /></ProtectedRoute>} />
          <Route path="/men" element={<MenPage />} />
          <Route path="/men/classic" element={<ProtectedRoute><MenProductClassicPage /></ProtectedRoute>} />
          <Route path="/men/premium" element={<ProtectedRoute><MenProductPremiumPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckOutPage /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path="/benifits" element={<ProtectedRoute><Benifits /></ProtectedRoute>} />
          <Route path="/booking-help" element={<ProtectedRoute><BookingHelp /></ProtectedRoute>} />
          <Route path="/my-booking" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/my-booking/:orderId" element={<ProtectedRoute><BookingDetail/></ProtectedRoute>} />
          <Route path="/my-address" element={<ProtectedRoute><MyAddress /></ProtectedRoute>} />
          <Route path="/favourite-booking" element={<ProtectedRoute><FavoriteBooking /></ProtectedRoute>} />
          <Route path="/about-us" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          <Route path="/privacy-policy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
          <Route path="/terms-and-conditions" element={<ProtectedRoute><TermsandConditions /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
