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
import BookingHelp from "./pages/BookingHelp";
import MyBookings from "./pages/MyBookings";
import MyAddress from "./pages/MyAddress";
import FavoriteBooking from "./pages/FavouriteBooking";

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
          <Route path="/booking-help" element={<BookingHelp />} />
          <Route path="/my-booking" element={<MyBookings />} />
          <Route path="/my-address" element={<MyAddress />} />
          <Route path="/favourite-booking" element={<FavoriteBooking />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
