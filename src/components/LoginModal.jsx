import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { login } from '../store/slices/authSlice';
import OTPModal from './OTPModal';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTPModal, setShowOTPModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleGetOTP = () => {
    if (phoneNumber.trim()) {
      setShowOTPModal(true);
    }
  };

  const handleOTPVerified = () => {
    dispatch(
      login({
        name: 'User',
        phone: phoneNumber,
        gender: 'Not specified',
      })
    );
    setShowOTPModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <div className="space-y-4">
            <div className="flex">
              <span className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                +91
              </span>
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-transparent"
              />
            </div>

            <p className="text-sm text-gray-600 text-center">
              You'll receive a 4-digit code to verify the number
            </p>

            <button
              onClick={handleGetOTP}
              disabled={!phoneNumber.trim()}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                phoneNumber.trim()
                  ? 'bg-[#FF5534] text-white hover:bg-[#E54728]'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
              }`}
            >
              Get OTP
            </button>

            <div className="flex items-center space-x-4 my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500 text-sm">Or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <button
              onClick={onSwitchToSignup}
              className="w-full text-[#FF5534] text-center py-2 hover:underline"
            >
              Create New Account?
            </button>

            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4">Login with Social Media</p>
              <div className="flex justify-center space-x-4">
                <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  f
                </button>
                <button className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                  G
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        phoneNumber={phoneNumber}
        onVerified={handleOTPVerified}
      />
    </>
  );
};

export default LoginModal;
