import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Heart,
  MapPin,
  HelpCircle,
  Wallet,
  Gift,
  Share,
  CreditCard,
  Info,
  Shield,
  FileText,
  Headphones,
  MessageCircle,
  Star,
  ChevronRight,
} from "lucide-react";
import ReferAndEarnModal from "./ReferAndEarnModal";
import MyPaymentMethodsModal from "./MyPaymentMethods.jsx";
import SupportFaqModal from "./SupportFaqModal.jsx";
import FeedbackModal from "./FeedbackModal.jsx";
import MyRatingModal from "./MyRatingModal.jsx";
import { useGetProfileQuery } from "../store/api/profileApi.js";

// Reusable Menu Item
const MenuItem = ({ icon, title, onClick }) => {
  return (
    <button
      className="flex items-center justify-between w-full p-3 hover:bg-gray-50 transition-colors group"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3">
        <div className="text-red-500">{icon}</div>
        <span className="text-gray-700 group-hover:text-gray-900">{title}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
    </button>
  );
};

const MenuSection = () => {
  const navigate = useNavigate();

  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);

  const { data: profileData } = useGetProfileQuery();
  const referralcode = profileData?.data?.refferalCode;
  const handleShare = async () => {
    const shareData = {
      title: 'Share YourTym',
      text: 'Check out this awesome app!',
      url: 'https://your-tym.vercel.app/',
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('Share failed:', err.message);
      }
    } else {
      // Fallback if Web Share API is not supported
      const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareData.text + " " + shareData.url)}`;
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Bookings Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Bookings</h3>
          </div>
          <div className="divide-y">
            <MenuItem icon={<Calendar className="w-5 h-5" />} title="My booking" onClick={() => navigate("/my-booking")} />
            <MenuItem icon={<Heart className="w-5 h-5" />} title="Favourite booking" onClick={() => navigate("/favourite-booking")} />
            <MenuItem icon={<MapPin className="w-5 h-5" />} title="My Address" onClick={() => navigate("/my-address")} />
            <MenuItem icon={<HelpCircle className="w-5 h-5" />} title="Booking help" onClick={() => navigate("/booking-help")} />
          </div>
        </div>

        {/* Payments Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Payments</h3>
          </div>
          <div className="divide-y">
            <MenuItem icon={<Wallet className="w-5 h-5" />} title="My Wallet" onClick={() => navigate("/wallet")} />
            <MenuItem icon={<Gift className="w-5 h-5" />} title="My Benefits" onClick={() => navigate("/benifits")} />
            <MenuItem icon={<Share className="w-5 h-5" />} title="Refer and Earn" onClick={() => setIsReferModalOpen(true)} />
            {/* <MenuItem icon={<CreditCard className="w-5 h-5" />} title="My Payment Methods" onClick={() => setIsPaymentModalOpen(true)} /> */}
          </div>
        </div>

        {/* More Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">More</h3>
          </div>
          <div className="divide-y">
            <MenuItem icon={<Info className="w-5 h-5" />} title="About Us" onClick={() => navigate("/about-us")} />
            <MenuItem icon={<Shield className="w-5 h-5" />} title="Privacy Policy" onClick={() => navigate("/privacy-policy")} />
            <MenuItem icon={<FileText className="w-5 h-5" />} title="Terms & Condition" onClick={() => navigate("/terms-and-conditions")} />
            <MenuItem icon={<Headphones className="w-5 h-5" />} title="Support" onClick={() => setIsSupportModalOpen(true)} />
            <MenuItem icon={<MessageCircle className="w-5 h-5" />} title="Give us a Feedback" onClick={() => setIsFeedbackOpen(true)} />
            <MenuItem icon={<Star className="w-5 h-5" />} title="My Rating" onClick={() => setIsRatingOpen(true)} />
            <MenuItem icon={<Share className="w-5 h-5" />} title="Share YourTym" onClick={handleShare} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReferAndEarnModal isOpen={isReferModalOpen} onClose={() => setIsReferModalOpen(false)} referralcode={referralcode} />
      <MyPaymentMethodsModal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
      <SupportFaqModal isOpen={isSupportModalOpen} onClose={() => setIsSupportModalOpen(false)} />
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
      <MyRatingModal isOpen={isRatingOpen} onClose={() => setIsRatingOpen(false)} />
    </>
  );
};

export default MenuSection;
