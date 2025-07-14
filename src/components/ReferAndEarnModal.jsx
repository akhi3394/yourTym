import React, { useState } from "react";
import { X, Copy } from "lucide-react";
import refer from '../assets/images/refer/referProfile.png';
import { useGetProfileQuery } from "../store/api/profileApi";

const ReferAndEarnModal = ({ isOpen, onClose, referralcode }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  if (!isOpen) return null;

  // Function to copy referral code to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(referralcode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset notification after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Function to handle WhatsApp sharing
  const handleReferNow = () => {
    const message = `Join YourTym and use my referral code ${referralcode} to earn ₹100 on registration!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[400px] md:w-[500px] rounded-xl p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center mb-6">Refer and Earn</h2>

        {/* Illustration + Code Box */}
        <div className="bg-gray-50 rounded-xl px-6 py-5 flex flex-col items-center">
          <img
            src={refer}
            alt="Refer illustration"
            className="w-52 mb-4"
          />

          <p className="text-sm font-medium text-gray-600">Refer and Earn</p>
          <p className="text-[18px] font-bold text-red-500 mb-4">Upto ₹10,000</p>

          <div className="flex items-center justify-between w-full border rounded-lg px-3 py-2 bg-white text-sm">
            <span className="text-gray-800 font-semibold">Your referral code</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-black">{referralcode}</span>
              <button onClick={handleCopyCode}>
                <Copy className="w-4 h-4 text-gray-500 hover:text-[#ff4d30] cursor-pointer" />
              </button>
            </div>
          </div>

          {/* Copy Success Notification */}
          {copySuccess && (
            <div className="mt-2 text-sm text-green-600">
              Referral code copied to clipboard!
            </div>
          )}

          <button
            onClick={handleReferNow}
            className="mt-4 bg-[#ff4d30] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#e54728] transition-colors"
          >
            Refer Now
          </button>
        </div>

        {/* Description */}
        <div className="mt-6 space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 mt-1 bg-red-500 rounded-full" />
            <p><strong>Earn ₹150</strong> on the first successful booking of the referee.</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 mt-1 bg-red-500 rounded-full" />
            <p><strong>Earn ₹50</strong> every time the referee completes a booking.</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 mt-1 bg-red-500 rounded-full" />
            <p>The referee also <strong>Earns ₹100</strong> on the App registration.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferAndEarnModal;