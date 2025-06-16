import React, { useState } from 'react';
import { X } from 'lucide-react';

const OTPModal = ({ isOpen, onClose, phoneNumber, onVerified }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOTPChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleLogin = () => {
    if (otp.every((digit) => digit !== '')) {
      onVerified();
    }
  };

  const isOTPComplete = otp.every((digit) => digit !== '');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#FFFFFF] rounded-[10px] p-8 max-w-[814px] h-[484px] w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute -top-[60px] -right-[70px] bg-white w-[69px] h-[69px] rounded-full shadow-md flex items-center justify-center hover:bg-gray-200 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center mb-8">Enter OTP Sent to {phoneNumber}</h2>

        <div className="flex justify-center space-x-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              className="w-[55px] h-[55px] border border-[#B4B4B4] rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-1 focus:ring-[#FF5534] focus:border-transparent"
            />
          ))}
        </div>

        <p className="text-[16px] text-[#444444] text-center mb-6">
          Enter 4-digit verification code sent to your number
        </p>

        <button
          onClick={handleLogin}
          disabled={!isOTPComplete}
          className={`max-w-[246px] mx-auto w-full flex justify-center h-[44px] py-3 rounded-lg font-medium transition-all ${isOTPComplete
            ? 'bg-[#FF5534FA] text-white hover:bg-[#E54728]'
            : 'bg-[#FF553459] text-[#FFFFFF] cursor-not-allowed opacity-50'
            }`}
        >
          Login
        </button>

        {/* Dashed divider */}
        <div className="flex items-center space-x-4 my-6">
          <div className="flex-1 border-t border-dashed border-[#444444]"></div>
          <span className="text-gray-500 text-sm">Or</span>
          <div className="flex-1 border-t border-dashed border-[#444444]"></div>
        </div>

        <div className="text-center space-y-2">
          <button className="text-[#FF5534] font-extrabold hover:underline">Resend OTP</button>
          <br />
          <button
            className="text-[#444444] font-medium hover:underline"
            onClick={onClose}
          >
            Edit Phone Number
          </button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
