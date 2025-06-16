import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { login } from '../store/slices/authSlice';
import OTPModal from './OTPModal';
import Facebook from '../assets/images/popup/facebook.png'
import Google from '../assets/images/popup/Google.png'

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
        <div className="bg-[#FFFFFF] rounded-[10px] p-8 max-w-[814px] w-full mx-4 relative">
          <button
            onClick={onClose}
            className="absolute -top-[60px] -right-[70px] bg-white w-[69px] h-[69px] rounded-full shadow-md flex items-center justify-center hover:bg-gray-200 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold text-center mb-6">login</h2>

          <div className="space-y-4">
            {/* ✅ FIXED: +91 merged inside input */}
            <div className="flex max-w-[570px] mx-auto w-full h-[55px] border border-[#B4B4B4] rounded-lg overflow-hidden">
              <div className="flex items-center px-3 border-r border-[#B4B4B4] text-[#1D1D1D] bg-transparent">
                +91
              </div>
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="flex-1 px-3 py-2 focus:outline-none focus:ring-1  focus:border-transparent"
              />
            </div>

            <p className="text-sm text-[#444444] text-center">
              You'll receive a 4-digit code to verify the number
            </p>

            <button
              onClick={handleGetOTP}
              disabled={!phoneNumber.trim()}
              className={`max-w-[246px] mx-auto w-full flex justify-center h-[44px] py-3 rounded-lg font-medium transition-all ${phoneNumber.trim()
                ? 'bg-[#FF5534FA] text-white hover:bg-[#E54728]'
                : 'bg-[#FF553459] text-[#FFFFFF] cursor-not-allowed opacity-50'
                }`}
            >
              Get OTP
            </button>

            {/* Dashed divider */}
            <div className="flex items-center space-x-4 my-6">
              <div className="flex-1 border-t border-dashed border-[#444444]"></div>
              <span className="text-gray-500 text-sm">Or</span>
              <div className="flex-1 border-t border-dashed border-[#444444]"></div>
            </div>

            <button
              onClick={onSwitchToSignup}
              className="w-full text-[#FF5534] font-extrabold text-center py-2 hover:underline"
            >
              Create New Account?
            </button>

            <div className="text-center">
              <p className="text-[16px] text-[#444444] font-extrabold mb-4">Login with Social Media</p>
              <div className="flex justify-center space-x-4">
                <img src={Facebook} alt="" className='w-[39px] h-[39px]' />
                <img src={Google} alt="" className='w-[39px] h-[39px]' />
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
