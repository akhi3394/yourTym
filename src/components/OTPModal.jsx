import React, { useState } from 'react';
import { X } from 'lucide-react';

const OTPModal = ({ isOpen, onClose, phoneNumber, onVerified }) => {
  const [otp, setOtp] = useState(['', '', '', '']);

  const handleOTPChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleLogin = () => {
    if (otp.every(digit => digit !== '')) {
      onVerified();
    }
  };

  const isOTPComplete = otp.every(digit => digit !== '');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold text-center mb-2">
          Enter OTP Sent to {phoneNumber}
        </h2>

        <p className="text-sm text-gray-600 text-center mb-6">
          Enter 4 - digit verification code sent to your number.
        </p>

        <div className="flex justify-center space-x-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-transparent"
            />
          ))}
        </div>

        <button
          onClick={handleLogin}
          disabled={!isOTPComplete}
          className={`w-full py-3 rounded-lg font-medium transition-all mb-4 ${
            isOTPComplete
              ? 'bg-[#FF5534] text-white hover:bg-[#E54728]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
          }`}
        >
          Login
        </button>

        <div className="flex items-center space-x-4 my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="text-gray-500 text-sm">Or</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <div className="text-center space-y-2">
          <button className="text-[#FF5534] hover:underline">Resend OTP</button>
          <br />
          <button className="text-gray-600 hover:underline">Edit phone number</button>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
