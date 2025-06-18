import React from 'react';
import { Check } from 'lucide-react';

const SuccessModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-sm w-full p-8 text-center">
        {/* Success Animation */}
        <div className="relative mb-6">
          {/* Animated Dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 relative">
              <div className="absolute top-4 left-4 w-2 h-2 bg-red-300 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="absolute bottom-8 left-8 w-2 h-2 bg-red-200 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              <div className="absolute bottom-4 right-4 w-2 h-2 bg-[#FF5534] rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              <div className="absolute top-12 left-12 w-1 h-1 bg-red-300 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
              <div className="absolute bottom-12 right-12 w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
          
          {/* Success Icon */}
          <div className="w-20 h-20 bg-[#FF5534] rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Check size={32} className="text-white" />
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-[#FF5534] mb-2">
          Booking Successfully<br />Submitted!
        </h2>
        
        <p className="text-[#FF5534] font-medium mb-4">Order Id:facial456</p>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          Thank you for your booking! Our<br />
          representative will contact you shortly.
        </p>

        {/* Auto close after 3 seconds */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div className="bg-[#FF5534] h-1 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;