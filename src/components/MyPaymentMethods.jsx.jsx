import React, { useState } from "react";
import { X } from "lucide-react";

const tabItems = ["App", "Card", "Wallet"];
const activeColor = "#FF5534";

const MyPaymentMethodsModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("Card");
  const [saveCard, setSaveCard] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-md bg-[#F8F9FB] rounded-2xl shadow-lg overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Payment Method</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white mx-4 mt-2 rounded-xl border border-dashed border-gray-300">
          <div className="flex justify-between items-center text-sm font-medium text-gray-600">
            {tabItems.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 m-1 rounded-full border ${
                  activeTab === tab
                    ? `bg-[${activeColor}] text-white border-[${activeColor}]`
                    : "border-gray-300 text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="bg-white mt-4 mx-4 p-4 rounded-2xl space-y-4">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Name on Card</label>
            <input
              type="text"
              value="Lipsum"
              className="w-full border-b border-[#FF5534] focus:outline-none text-gray-800 text-base py-1"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Card Number</label>
            <div className="flex items-center justify-between border-b border-[#FF5534]">
              <input
                type="text"
                value="4560 5644 3224 543"
                className="w-full focus:outline-none text-gray-800 text-base py-1"
              />
              <img
                src="https://img.icons8.com/color/48/mastercard-logo.png"
                alt="mastercard"
                className="w-6 h-6 ml-2"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm text-gray-500 mb-1">Expiry Date</label>
              <input
                type="text"
                value="09 / 20"
                className="w-full border-b border-[#FF5534] focus:outline-none text-base py-1"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm text-gray-500 mb-1">CVV</label>
              <input
                type="text"
                value="467"
                className="w-full border-b border-[#FF5534] focus:outline-none text-base py-1"
              />
            </div>
          </div>

          {/* Save Card */}
          <div className="flex items-center space-x-2 mt-2">
            <button
              type="button"
              onClick={() => setSaveCard(!saveCard)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                saveCard ? "border-[#FF5534]" : "border-gray-300"
              }`}
            >
              {saveCard && <div className="w-2.5 h-2.5 bg-[#FF5534] rounded-full" />}
            </button>
            <span className="text-sm text-gray-700">Save this card details</span>
          </div>
        </form>

        {/* Save Button */}
        <div className="px-6 pt-2 pb-6">
          <button
            className="w-full py-2 rounded-full text-white font-semibold"
            style={{ backgroundColor: "#FF5534" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPaymentMethodsModal;
