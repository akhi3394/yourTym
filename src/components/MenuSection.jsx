import React from "react";
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

const MenuItem = ({ icon, title, onClick }) => (
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

const MenuSection = () => {
  return (
    <div className="space-y-6">
      {/* Bookings Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Bookings</h3>
        </div>
        <div className="divide-y">
          <MenuItem
            icon={<Calendar className="w-5 h-5" />}
            title="My booking"
          />
          <MenuItem
            icon={<Heart className="w-5 h-5" />}
            title="Favourite booking"
          />
          <MenuItem icon={<MapPin className="w-5 h-5" />} title="My Address" />
          <MenuItem
            icon={<HelpCircle className="w-5 h-5" />}
            title="Booking help"
          />
        </div>
      </div>

      {/* Payments Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">Payments</h3>
        </div>
        <div className="divide-y">
          <MenuItem icon={<Wallet className="w-5 h-5" />} title="My Wallet" />
          <MenuItem icon={<Gift className="w-5 h-5" />} title="My Benefits" />
          <MenuItem
            icon={<Share className="w-5 h-5" />}
            title="Refer and Earn"
          />
          <MenuItem
            icon={<CreditCard className="w-5 h-5" />}
            title="My Payment Methods"
          />
        </div>
      </div>

      {/* More Section */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800">More</h3>
        </div>
        <div className="divide-y">
          <MenuItem icon={<Info className="w-5 h-5" />} title="About Us" />
          <MenuItem
            icon={<Shield className="w-5 h-5" />}
            title="Privacy Policy"
          />
          <MenuItem
            icon={<FileText className="w-5 h-5" />}
            title="Terms & Condition"
          />
          <MenuItem icon={<Headphones className="w-5 h-5" />} title="Support" />
          <MenuItem
            icon={<MessageCircle className="w-5 h-5" />}
            title="Give us a Feedback"
          />
          <MenuItem icon={<Star className="w-5 h-5" />} title="My Rating" />
          <MenuItem icon={<Share className="w-5 h-5" />} title="Share YYGM" />
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
