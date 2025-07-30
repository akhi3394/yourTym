import { X } from "lucide-react";
import OTPModal from "./OTPModal";
import Facebook from "../assets/images/popup/facebook.png";
import Google from "../assets/images/popup/Google.png";
import { useLoginWithPhoneMutation, useSocialLoginMutation } from "../store/api/authApi";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserId } from "../store/slices/authSlice";

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [userId, setLocalUserId] = useState(null);
  const [error, setError] = useState(null);

  const [loginWithPhone, { isLoading }] = useLoginWithPhoneMutation();
  const [socialLogin] = useSocialLoginMutation();
  const dispatch = useDispatch();

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError(null);
    }
  };

  const handleGetOTP = async () => {
    if (!phoneNumber) {
      setError("Please enter a phone number");
      return;
    }
    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(phoneNumber)) {
      setError("Please enter a valid Indian mobile number starting with 6, 7, 8, or 9");
      return;
    }
    try {
      setError(null);
      const response = await loginWithPhone({ phone: phoneNumber }).unwrap();
      setLocalUserId(response?.data?.id);
      dispatch(setUserId(response?.data?.id));
      setPhoneNumber("");
      setShowOTPModal(true);
    } catch (error) {
      setError(error?.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setPhoneNumber("");
    }
  }, [isOpen]);

  const handleSocialLogin = async (provider) => {
    try {
      const socialData = {
        firstName: "User",
        lastName: "",
        phone: phoneNumber,
        email: "",
      };
      const response = await socialLogin(socialData).unwrap();
      dispatch(
        login({
          userId: response.data._id,
          phone: response.data.phone,
          token: response.data.token,
          completeProfile: response.data.completeProfile,
        })
      );
      setPhoneNumber("");
      onClose();
    } catch (error) {
      setError(error?.data?.message || "Social login failed. Please try again.");
    }
  };

  if (!isOpen) return null;

  const isButtonEnabled = phoneNumber.length === 10 && !isLoading;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#FFFFFF] rounded-[10px] p-4 sm:p-6 md:p-8 w-full max-w-[90vw] sm:max-w-[500px] md:max-w-[570px] mx-2 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-[-50px] sm:right-[-50px] md:-top-[60px] md:-right-[70px] bg-white w-10 h-10 sm:w-[50px] sm:h-[50px] md:w-[69px] md:h-[69px] rounded-full shadow-md flex items-center justify-center hover:bg-gray-200 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-4 sm:mb-6">Login</h2>

          <div className="space-y-4">
            <div className="flex max-w-[400px] mx-auto w-full h-10 sm:h-[50px] md:h-[55px] border border-[#B4B4B4] rounded-lg overflow-hidden">
              <div className="flex items-center px-2 sm:px-3 border-r border-[#B4B4B4] text-[#1D1D1D] bg-transparent text-sm">
                +91
              </div>
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                maxLength={10}
                className="flex-1 px-2 sm:px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-1 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-xs sm:text-sm text-red-500 text-center">{error}</p>
            )}

            <p className="text-xs sm:text-sm text-[#444444] text-center">
              You'll receive a 4-digit code to verify the number
            </p>

            <button
              onClick={handleGetOTP}
              disabled={!isButtonEnabled}
              className={`max-w-[246px] mx-auto w-full flex justify-center h-10 sm:h-[44px] py-2 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all ${
                isButtonEnabled
                  ? "bg-[#FF5534FA] text-white hover:bg-[#E54728]"
                  : "bg-[#FF553459] text-[#FFFFFF] cursor-not-allowed opacity-50"
              }`}
            >
              {isLoading ? "Sending..." : "Get OTP"}
            </button>

            <div className="flex items-center space-x-4 my-4 sm:my-6">
              <div className="flex-1 border-t border-dashed border-[#444444]"></div>
              <span className="text-gray-500 text-xs sm:text-sm">Or</span>
              <div className="flex-1 border-t border-dashed border-[#444444]"></div>
            </div>

            <button
              onClick={onSwitchToSignup}
              className="w-full text-[#FF5534] font-extrabold text-center py-2 hover:underline text-xs sm:text-sm md:text-base"
            >
              Create New Account?
            </button>
          </div>
        </div>
      </div>

      <OTPModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        phoneNumber={phoneNumber}
        onLoginClose={onClose}
      />
    </>
  );
};

export default LoginModal;