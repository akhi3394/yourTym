import React, { useState } from 'react';
import { X, CreditCard } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, onPayment, amount }) => {
  const [selectedPayment, setSelectedPayment] = useState('upi-kotak');

  const suggestedPayments = [
    {
      id: 'upi-kotak',
      name: 'Kotak Mahindra Bank UPI',
      details: 'Account No. xxxx xxxx 6746',
      logo: '🏦'
    },
    {
      id: 'google-pay',
      name: 'Google Pay UPI',
      details: 'rajashekar7@gmail.com',
      logo: '📱'
    },
    {
      id: 'paypal',
      name: 'Pay pal',
      details: 'rajashekar7@gmail.com',
      logo: '💳'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Payment</h2>
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

          {/* Suggested Payments */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-4">Suggested for you</h3>
            
            <div className="space-y-3">
              {suggestedPayments.map((payment) => (
                <label
                  key={payment.id}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedPayment === payment.id
                      ? 'border-[#FF5534] bg-red-50'
                      : 'border-gray-200 hover:border-[#FF5534]'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={payment.id}
                    checked={selectedPayment === payment.id}
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                    selectedPayment === payment.id
                      ? 'border-[#FF5534] bg-[#FF5534]'
                      : 'border-gray-300'
                  }`}>
                    {selectedPayment === payment.id && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{payment.name}</p>
                    <p className="text-sm text-gray-600">{payment.details}</p>
                  </div>
                  <div className="text-2xl ml-4">{payment.logo}</div>
                </label>
              ))}
            </div>
          </div>

          {/* Other Options */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-4">All other option</h3>
            
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:border-[#FF5534]">
              <input
                type="radio"
                name="payment"
                value="upi-other"
                checked={selectedPayment === 'upi-other'}
                onChange={(e) => setSelectedPayment(e.target.value)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                selectedPayment === 'upi-other'
                  ? 'border-[#FF5534] bg-[#FF5534]'
                  : 'border-gray-300'
              }`}>
                {selectedPayment === 'upi-other' && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">UPI</p>
                <p className="text-xs text-gray-500">100% Safe and Secure Transactions</p>
              </div>
              <div className="text-2xl ml-4">🔒</div>
            </label>
          </div>

          {/* Pay Button */}
          <button
            onClick={onPayment}
            className="w-full bg-[#FF5534] text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;