import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useRegisterMutation, useSocialLoginMutation, useLoginWithPhoneMutation, useVerifyOtpMutation } from "../store/api/authApi";
import { useDispatch } from 'react-redux';
import { login, setUserId, setMobile, setToken } from '../store/slices/authSlice';
import { toast } from 'sonner';
import Facebook from '../assets/images/popup/facebook.png';
import Google from '../assets/images/popup/Google.png';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    email: ''
  });
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState(null);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [userId, setLocalUserId] = useState(null);

  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [loginWithPhone, { isLoading: isSendingOTP }] = useLoginWithPhoneMutation();
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [socialLogin] = useSocialLoginMutation();
  const dispatch = useDispatch();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(null);
  };

  const handleOTPChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError(null);

      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleGetOTP = async () => {
    const cleanPhoneNumber = formData.phoneNumber.replace(/\D/g, '');
    if (cleanPhoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    try {
      setError(null);
      const response = await loginWithPhone({ phone: cleanPhoneNumber }).unwrap();
      setLocalUserId(response?.data?.id);
      dispatch(setUserId(response?.data?.id));
      setShowOTPInput(true);
      toast.success("OTP sent to your phone number");
    } catch (error) {
      console.error("Failed to send OTP:", error);
      setError(error?.data?.message || "Failed to send OTP. Please try again.");
      toast.error(error?.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    if (!otpValue || otpValue.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }
    if (!userId) {
      setError("User ID is missing. Please try again.");
      toast.error("User ID is missing. Please try again.");
      return;
    }

    try {
      setError(null);
      const response = await verifyOtp({
        body: {
          otp: otpValue,
          deviceToken: "web",
        },
        userId,
      }).unwrap();

      dispatch(setToken(response.data.token));
      dispatch(setMobile(response.data.phone));
      toast.success("Phone number verified successfully");

      if (formData.firstName && formData.lastName && formData.gender && formData.email) {
        await handleCreateAccount(response.data.token);
      } else {
        setError("Please fill in all required fields to complete registration");
        toast.error("Please fill in all required fields to complete registration");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      setError(error?.data?.message || "Failed to verify OTP. Please try again.");
      toast.error(error?.data?.message || "Failed to verify OTP. Please try again.");
    }
  };

  const handleCreateAccount = async (verifiedToken) => {
    try {
      const response = await register({
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        gender: formData.gender,
        phone: formData.phoneNumber.replace(/\D/g, ''),
        token: verifiedToken,
      }).unwrap();

      dispatch(login({
        userId: response.data._id,
        phone: response.data.phone,
        token: response.data.token,
        completeProfile: response.data.completeProfile,
      }));
      toast.success("Account created successfully");
      onClose();
    } catch (error) {
      console.error("Registration error:", error);
      setError(error?.data?.message || "Failed to create account. Please try again.");
      toast.error(error?.data?.message || "Failed to create account. Please try again.");
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      const socialData = {
        firstName: formData.firstName || "User",
        lastName: formData.lastName,
        phone: formData.phoneNumber.replace(/\D/g, ''),
        email: formData.email,
      };
      const response = await socialLogin(socialData).unwrap();
      dispatch(login({
        userId: response.data._id,
        phone: response.data.phone,
        token: response.data.token,
        completeProfile: response.data.completeProfile,
      }));
      toast.success("Social login successful");
      onClose();
    } catch (error) {
      console.error("Social login error:", error);
      setError(error?.data?.message || "Social login failed. Please try again.");
      toast.error(error?.data?.message || "Social login failed. Please try again.");
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.gender && formData.email;
  const isOTPComplete = otp.every((digit) => digit !== '');

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        gender: '',
        phoneNumber: '',
        email: ''
      });
      setOtp(['', '', '', '']);
      setError(null);
      setShowOTPInput(false);
      setLocalUserId(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 sm:p-6 md:p-8 relative w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[600px] max-h-[90vh] mx-2 overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-[-50px] sm:right-[-50px] md:-top-[60px] md:-right-[60px] bg-white w-10 h-10 sm:w-[50px] sm:h-[50px] md:w-[69px] md:h-[69px] rounded-full shadow-md flex items-center justify-center hover:bg-gray-200 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-[#000000] mb-4 sm:mb-6">Let's Create Your Profile</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="w-full h-10 sm:h-[50px] md:h-[55px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-transparent mb-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="w-full h-10 sm:h-[50px] md:h-[55px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full h-10 sm:h-[50px] md:h-[55px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5534] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex flex-col sm:flex-row sm:space-x-4 justify-start">
                <button
                  onClick={() => handleInputChange('gender', 'Male')}
                  className={`px-4 h-9 sm:h-[40px] rounded-lg border transition-colors flex items-center mb-2 sm:mb-0 ${
                    formData.gender === 'Male'
                      ? ' text-[#FF5534] border-[#FF5534]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-[#FF5534]'
                  }`}
                >
                  <span className="text-[20px] sm:text-[24px] md:text-[30px]">♂ </span>Male
                </button>
                <button
                  onClick={() => handleInputChange('gender', 'Female')}
                  className={`px-4 h-9 sm:h-[40px] rounded-lg border transition-colors flex items-center ${
                    formData.gender === 'Female'
                      ? ' text-[#FF5534] border-[#FF5534]'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-[#FF5534]'
                  }`}
                >
                  <span className="text-[20px] sm:text-[24px] md:text-[30px]">♀</span> Female
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Number</label>
              {!showOTPInput ? (
                <div className="flex max-w-[400px] mx-auto w-full h-10 sm:h-[50px] md:h-[55px] border border-[#B4B4B4] rounded-lg overflow-hidden">
                  <span className="flex items-center px-2 sm:px-3 border-r border-[#B4B4B4] text-[#1D1D1D] bg-transparent text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Enter Mobile Number"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="flex-1 px-2 sm:px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:border-transparent"
                  />
                </div>
              ) : (
                <div className="flex justify-center space-x-2 sm:space-x-4 mb-4 sm:mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      className="w-10 h-10 sm:w-[45px] sm:h-[45px] md:w-[55px] md:h-[55px] border border-[#B4B4B4] rounded-lg text-center text-base sm:text-lg font-semibold focus:outline-none focus:ring-1 focus:ring-[#FF5534] focus:border-transparent"
                    />
                  ))}
                </div>
              )}
              <p className="text-xs sm:text-sm text-gray-600 mt-1 text-center">
                You'll receive a 4-digit code to verify the number
              </p>
            </div>

            {error && (
              <p className={`text-xs sm:text-sm text-center ${error.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                {error}
              </p>
            )}

            <div className="flex justify-center">
              {!showOTPInput ? (
                <button
                  onClick={handleGetOTP}
                  disabled={!formData.phoneNumber.trim() || isSendingOTP}
                  className={`w-[250px] sm:w-[308px] h-10 sm:h-[44px] py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                    formData.phoneNumber.trim() && !showOTPInput && !isSendingOTP
                      ? 'bg-[#FF553459] text-white hover:bg-[#E54728]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  {isSendingOTP ? "Sending OTP..." : "Get OTP"}
                </button>
              ) : (
                <button
                  onClick={handleVerifyOTP}
                  disabled={!isOTPComplete || isVerifying || isRegistering}
                  className={`w-[250px] sm:w-[308px] h-10 sm:h-[44px] py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                    isOTPComplete && isFormValid && !isVerifying && !isRegistering
                      ? 'bg-[#FF553459] text-white hover:bg-[#E54728]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  {isVerifying || isRegistering ? "Processing..." : "Verify OTP & Register"}
                </button>
              )}
            </div>

            <div className="flex items-center space-x-4 my-4 sm:my-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="text-gray-500 text-xs sm:text-sm">Or</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={onSwitchToLogin}
                className="text-[#FF5534] text-center py-2 hover:underline text-xs sm:text-sm md:text-base"
              >
                Already have an account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;