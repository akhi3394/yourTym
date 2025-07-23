import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { usePlaceOrderMutation } from '../store/api/productsApi';
import { useGetProfileQuery } from '../store/api/profileApi';
import CircularLoader from './CircularLoader';
import RazorpayPayment from './RazorpayPayment';

const PaymentModal = ({ isOpen, onClose, onPayment, amount, orderId, isCheckoutLoading }) => {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState(null);
  const [placeOrder, { isLoading: isPlaceOrderLoading }] = usePlaceOrderMutation();
  const { data: profileData, isLoading: profileLoading, error: profileError } = useGetProfileQuery();

  useEffect(() => {
    if (!orderId) {
      console.warn("Order ID is not provided to PaymentModal");
    }
  }, [orderId]);

  const handlePlaceOrder = async (paymentMode) => {
    if (!paymentMode) return;

    if (paymentMode === 'Cod') {
      const body = {
        paymentStatus: 'Pending',
        paymentMode: 'Cod',
        transctionId: `COD_${Date.now()}`,
      };
      try {
        await placeOrder({ orderId, body }).unwrap();
        onPayment(paymentMode);
        onClose();
      } catch (error) {
        console.error("Failed to place COD order:", error);
      }
    } else if (paymentMode === 'Upi') {
      // UPI payment is handled by RazorpayPayment component
      onClose(); // Close modal to show Razorpay
    }
  };

  const handleRazorpaySuccess = async (response) => {
    if (!orderId) {
      console.error("Order ID is missing for placeOrder");
      onFailure("Missing order ID");
      return;
    }
    const body = {
      paymentStatus: 'Paid',
      paymentMode: 'Upi',
      transctionId: response.razorpay_payment_id,
    };
    try {
      await placeOrder({ orderId, body }).unwrap();
      onPayment('Upi');
    } catch (error) {
      console.error("Failed to confirm UPI order:", error);
      onFailure(error);
    }
  };

  const handleRazorpayFailure = (error) => {
    console.error("Razorpay payment failed:", error);
    onFailure(error);
  };

  // Define onFailure function to handle errors
  const onFailure = (error) => {
    console.error("Payment failure:", error);
    // Optionally notify parent component or show error to user
    onClose();
  };

  if (!isOpen) return null;

  const isLoading = isPlaceOrderLoading || isCheckoutLoading;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Select Payment Method</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6">
          {/* Amount */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount to be paid</span>
              <span className="text-xl font-semibold text-gray-900">₹{amount}</span>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mb-6">
            <div className="space-y-4">
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedPaymentMode === 'Cod'
                    ? 'border-[#FF5534] bg-red-50'
                    : 'border-gray-200 hover:border-[#FF5534]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Cod"
                  checked={selectedPaymentMode === 'Cod'}
                  onChange={() => setSelectedPaymentMode('Cod')}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                    selectedPaymentMode === 'Cod' ? 'border-[#FF5534] bg-[#FF5534]' : 'border-gray-300'
                  }`}
                >
                  {selectedPaymentMode === 'Cod' && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Cash on Delivery (COD)</p>
                  <p className="text-sm text-gray-600">Pay when you receive the service</p>
                </div>
              </label>
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedPaymentMode === 'Upi'
                    ? 'border-[#FF5534] bg-red-50'
                    : 'border-gray-200 hover:border-[#FF5534]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="Upi"
                  checked={selectedPaymentMode === 'Upi'}
                  onChange={() => setSelectedPaymentMode('Upi')}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                    selectedPaymentMode === 'Upi' ? 'border-[#FF5534] bg-[#FF5534]' : 'border-gray-300'
                  }`}
                >
                  {selectedPaymentMode === 'Upi' && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">UPI (Razorpay)</p>
                  <p className="text-sm text-gray-600">Secure online payment</p>
                </div>
              </label>
            </div>
          </div>

          {/* Pay Button or Razorpay */}
          {selectedPaymentMode === 'Upi' ? (
            <RazorpayPayment
              amount={amount}
              prefill={{
                name: profileData?.data?.fullName || '',
                email: profileData?.data?.email || '',
                contact: profileData?.data?.phone || ''
              }}
              metadata={{ orderId }}
              onSuccess={handleRazorpaySuccess}
              onFailure={handleRazorpayFailure}
              onClose={onClose}
              showModalAfterSuccess={false}
              buttonText={isLoading ? 'Processing...' : 'Proceed to Pay'}
              buttonClassName={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                isLoading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-[#FF5534] text-white hover:bg-red-600'
              }`}
            />
          ) : (
            <button
              onClick={() => handlePlaceOrder(selectedPaymentMode)}
              disabled={isLoading || !selectedPaymentMode}
              className="w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <CircularLoader size={20} />
                  <span className="ml-2">Processing...</span>
                </div>
              ) : (
                selectedPaymentMode === 'Cod' ? 'Proceed to Order' : 'Select a Payment Method'
              )}
              <style jsx>{`
                button {
                  background-color: ${isLoading || !selectedPaymentMode ? '#d1d5db' : '#FF5534'};
                  color: ${isLoading || !selectedPaymentMode ? '#9ca3af' : '#ffffff'};
                  cursor: ${isLoading || !selectedPaymentMode ? 'not-allowed' : 'pointer'};
                }
                button:hover {
                  background-color: ${isLoading || !selectedPaymentMode ? '#d1d5db' : '#e64a2e'};
                }
              `}</style>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;