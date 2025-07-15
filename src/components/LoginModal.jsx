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

  // Handle phone number input: allow only digits, limit to 10, and validate Indian number
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError(null); // Clear error on valid input change
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
    // Validate Indian phone number (starts with 6, 7, 8, or 9)
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
      setPhoneNumber(""); // Clear phone number
      setShowOTPModal(true); // Open OTPModal
    } catch (error) {
      setError(error?.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  // Clear error when modal closes
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setPhoneNumber("");
    }
  }, [isOpen]);

  const handleSocialLogin = async (provider) => {
    try {
      const socialData = {
        firstName: "User", // Replace with actual data from social auth provider
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

  // Check if phone number is exactly 10 digits to enable button
  const isButtonEnabled = phoneNumber.length === 10 && !isLoading;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#FFFFFF] rounded-[10px] p-8 max-w-[814px] w-full mx-4 relative">
          <div>
            <button
              onClick={onClose}
              className="absolute -top-[60px] -right-[70px] bg-white w-[69px] h-[69px] rounded-full shadow-md flex items-center justify-center hover:bg-gray-200 transition-all"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

            <div className="space-y-4">
              <div className="flex max-w-[570px] mx-auto w-full h-[55px] border border-[#B4B4B4] rounded-lg overflow-hidden">
                <div className="flex items-center px-3 border-r border-[#B4B4B4] text-[#1D1D1D] bg-transparent">
                  +91
                </div>
                <input
                  type="tel"
                  placeholder="Enter Mobile Number"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  maxLength={10} // Restrict input to 10 characters
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
                className="w-full text-[#FF5534] font-extrabold text-center py-2 hover:underline"
              >
                Create New Account?
              </button>

              <div className="text-center">
                <p className="text-[16px] text-[#444444] font-extrabold mb-4">
                  Login with Social Media
                </p>
                <div className="flex justify-center space-x-4">
                  <img
                    src={Facebook}
                    alt="Facebook"
                    className="w-[39px] h-[39px] cursor-pointer"
                    onClick={() => handleSocialLogin("facebook")}
                  />
                  <img
                    src={Google}
                    alt="Google"
                    className="w-[39px] h-[39px] cursor-pointer"
                    onClick={() => handleSocialLogin("google")}
                  />
                </div>
              </div>
            </div>
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