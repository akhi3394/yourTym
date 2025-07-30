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
        <div className="bg-[#FFFFFF] rounded-[10px] p-6 sm:p-8 w-full max-w-[500px] sm:max-w-[570px] mx-4 relative">
          <button
            onClick={onClose}
            className="absolute top-[-50px] right-[-50px] sm:-top-[60px] sm:-right-[70px] bg-white w-[50px] h-[50px] sm:w-[69px] sm:h-[69px] rounded-full shadow-md flex items-center justify-center hover:bg-gray-200 transition-all"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Login</h2>

          <div className="space-y-4">
            <div className="flex max-w-[400px] mx-auto w-full h-[50px] sm:h-[55px] border border-[#B4B4B4] rounded-lg overflow-hidden">
              <div className="flex items-center px-3 border-r border-[#B4B4B4] text-[#1D1D1D] bg-transparent">
                +91
              </div>
              <input
                type="tel"
                placeholder="Enter Mobile Number"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                maxLength={10}
                className="flex-1 px-3 py-2 focus:outline-none focus:ring-1 focus:border-transparent"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <p className="text-sm text-[#444444] text-center">
              You'll receive a 4-digit code to verify the number
            </p>

            <button
              onClick={handleGetOTP}
              disabled={!isButtonEnabled}
              className={`max-w-[246px] mx-auto w-full flex justify-center h-[44px] py-3 rounded-lg font-medium transition-all ${
                isButtonEnabled
                  ? "bg-[#FF5534FA] text-white hover:bg-[#E54728]"
                  : "bg-[#FF553459] text-[#FFFFFF] cursor-not-allowed opacity-50"
              }`}
            >
              {isLoading ? "Sending..." : "Get OTP"}
            </button>

            <div className="flex items-center space-x-4 my-6">
              <div className="flex-1 border-t border-dashed border-[#444444]"></div>
              <span className="text-gray-500 text-sm">Or</span>
              <div className="flex-1 border-t border-dashed border-[#444444]"></div>
            </div>

            <button
              onClick={onSwitchToSignup}
              className="w-full text-[#FF5534] font-extrabold text-center py-2 hover:underline text-sm sm:text-base"
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
