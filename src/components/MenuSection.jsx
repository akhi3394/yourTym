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
  X,
} from "lucide-react";
import ReferAndEarnModal from "./ReferAndEarnModal";
import MyPaymentMethodsModal from "./MyPaymentMethods.jsx";
import SupportFaqModal from "./SupportFaqModal.jsx";
import FeedbackModal from "./FeedbackModal.jsx";
import MyRatingModal from "./MyRatingModal.jsx";
import { useGetProfileQuery } from "../store/api/profileApi.js";



// Reusable Menu Item
const MenuItem = ({ icon, title, path, onClick }) => {

  return (
    <button
      className="flex items-center justify-between w-full p-3 hover:bg-gray-50 transition-colors group"
      onClick={() => {
        if (onClick) return onClick();
        navigate(path);
      }}
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
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); // ✅ State
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const { data: profileData, isLoading, error } = useGetProfileQuery();
  console.log(profileData?.data?.refferalCode, "fromfreffrominnerer")
  const navigate = useNavigate();
  const referralcode = profileData?.data?.refferalCode

  return (
    <>
      <div className="space-y-6">
        {/* Bookings Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Bookings</h3>
          </div>
          <div className="divide-y">
            <MenuItem icon={<Calendar className="w-5 h-5" />} title="My booking" path="/my-booking" />
            <MenuItem icon={<Heart className="w-5 h-5" />} title="Favourite booking" path="/favourite-booking" />
            <MenuItem icon={<MapPin className="w-5 h-5" />} title="My Address" path="/my-address" />
            <MenuItem icon={<HelpCircle className="w-5 h-5" />} title="Booking help" path="/booking-help" />
          </div>
        </div>

        {/* Payments Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">Payments</h3>
          </div>
          <div className="divide-y">
            <MenuItem icon={<Wallet className="w-5 h-5" />} title="My Wallet" path="/wallet" />
            <MenuItem icon={<Gift className="w-5 h-5" />} title="My Benefits" path="/benifits" />
            <MenuItem
              icon={<Share className="w-5 h-5" />}
              title="Refer and Earn"
              onClick={() => setIsReferModalOpen(true)}
            />
            <MenuItem
              icon={<CreditCard className="w-5 h-5" />}
              title="My Payment Methods"
              onClick={() => setIsPaymentModalOpen(true)}
            />
          </div>
        </div>

        {/* More Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-800">More</h3>
          </div>
          <div className="divide-y">
            <MenuItem icon={<Info className="w-5 h-5" />} title="About Us" path="/about-us" />
            <MenuItem icon={<Shield className="w-5 h-5" />} title="Privacy Policy" path="/privacy-policy" />
            <MenuItem icon={<FileText className="w-5 h-5" />} title="Terms & Condition" path="/terms-and-conditions" />
            <MenuItem
              icon={<Headphones className="w-5 h-5" />}
              title="Support"
              onClick={() => setIsSupportModalOpen(true)}
            />
            <MenuItem
              icon={<MessageCircle className="w-5 h-5" />}
              title="Give us a Feedback"
              onClick={() => setIsFeedbackOpen(true)}
            />
            <MenuItem
              icon={<Star className="w-5 h-5" />}
              title="My Rating"
              onClick={() => setIsRatingOpen(true)}
            />
            <MenuItem icon={<Share className="w-5 h-5" />} title="Share YYGM" path="/share-yygm" />
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
