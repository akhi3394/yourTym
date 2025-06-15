import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: ''
  });

  const dispatch = useDispatch(); // Use this if you're not using a custom typed hook

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
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">Let's Create Your Profile</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-transparent mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="flex space-x-4">
              <button
                onClick={() => handleInputChange('gender', 'Male')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  formData.gender === 'Male'
                    ? 'bg-[#FF5534] text-white border-[#FF5534]'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-[#FF5534]'
                }`}
              >
                ♂ Male
              </button>
              <button
                onClick={() => handleInputChange('gender', 'Female')}
                className={`px-4 py-2 rounded-lg border transition-colors ${
                  formData.gender === 'Female'
                    ? 'bg-[#FF5534] text-white border-[#FF5534]'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-[#FF5534]'
                }`}
              >
                ♀ Female
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number</label>
            <div className="flex">
              <span className="bg-gray-100 px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg text-gray-600">
                +91
              </span>
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-transparent"
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">
              You'll receive 4-digit code to verify the number
            </p>
          </div>

          <button
            onClick={handleCreateAccount}
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-medium transition-all ${
              isFormValid
                ? 'bg-[#FF5534] text-white hover:bg-[#E54728]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
            }`}
          >
            Create Account
          </button>

          <div className="flex items-center space-x-4 my-6">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="text-gray-500 text-sm">Or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <button
            onClick={onSwitchToLogin}
            className="w-full text-[#FF5534] text-center py-2 hover:underline"
          >
            Already have an account?
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
  );
};

export default SignupModal;
