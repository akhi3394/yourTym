import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';
import Facebook from '../assets/images/popup/facebook.png';
import Google from '../assets/images/popup/Google.png';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: ''
  });

  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAccount = () => {
    if (formData.firstName && formData.lastName && formData.gender && formData.phoneNumber) {
      dispatch(
        login({
          name: `${formData.firstName} ${formData.lastName}`,
          phone: formData.phoneNumber,
          gender: formData.gender
        })
      );
      onClose();
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.gender && formData.phoneNumber;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 relative w-full max-w-[1024px]  mx-4 flex justify-center">
        <button
          onClick={onClose}
          className="absolute top-[-60px] right-[-60px] bg-white w-[69px] h-[69px]  rounded-full shadow-md flex items-center justify-center hover:bg-gray-200 transition-all"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="w-[570px]">
          <h2 className="text-2xl font-bold text-center text-[#000000] mb-6">Let's Create Your Profile</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full h-[55px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-transparent mb-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full h-[55px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex space-x-4 justify-start">
                <button
                  onClick={() => handleInputChange('gender', 'Male')}
                  className={`px-4 h-[40px] rounded-lg border transition-colors flex items-center ${
                    formData.gender === 'Male'
                      ? ' text-[#FF5534] border-[#FF5534]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-[#FF5534]'
                  }`}
                >
                  <span className="text-[30px]">♂ </span>Male
                </button>
                <button
                  onClick={() => handleInputChange('gender', 'Female')}
                  className={`px-4 h-[40px] rounded-lg border transition-colors flex items-center ${
                    formData.gender === 'Female'
                      ? ' text-[#FF5534] border-[#FF5534]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-[#FF5534]'
                  }`}
                >
                  <span className="text-[30px]">♀</span> Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
              <div className="flex max-w-[570px] mx-auto w-full h-[55px] border border-[#B4B4B4] rounded-lg overflow-hidden">
                <span className="flex items-center px-3 border-r border-[#B4B4B4] text-[#1D1D1D] bg-transparent">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="flex-1 px-3 py-2 focus:outline-none focus:ring-1  focus:border-transparent"
                />
              </div>
              <p className="text-sm text-gray-600 mt-1 text-center">
                You'll receive 4-digit code to verify the number
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleCreateAccount}
                disabled={!isFormValid}
                className={`w-[308px] h-[44px] py-3 rounded-lg font-medium transition-all ${
                  isFormValid
                    ? 'bg-[#FF553459] text-white hover:bg-[#E54728]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="flex items-center space-x-4 my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500 text-sm">Or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={onSwitchToLogin}
                className="text-[#FF5534] text-center py-2 hover:underline"
              >
                Already have an account?
              </button>
            </div>

            <div className="text-center">
              <p className="text-[16px] text-[#444444] font-extrabold mb-4">Login with Social Media</p>
              <div className="flex justify-center space-x-4">
                <img src={Facebook} alt="Facebook" className="w-[39px] h-[39px]" />
                <img src={Google} alt="Google" className="w-[39px] h-[39px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;