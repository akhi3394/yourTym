import React, { useState } from "react";
import {
  Phone,
  MapPin,
  Clock,
  CreditCard,
  Tag,
  Minus,
  Plus,
} from "lucide-react";
import AddressModal from "./AddressModal";
import SlotModal from "./SlotModal";
import PaymentModal from "./PaymentModal";
import SuccessModal from "./SuccessModal";

import Support from "../assets/svgs/support.svg";
import LocationPin from "../assets/svgs/LocationPin.svg";
import free from "../assets/svgs/serviceTotal/FreeService.svg";
import Tip from "../assets/svgs/serviceTotal/tip.svg";
import Coupon from "../assets/svgs/serviceTotal/coupon.svg";
import Wallet from "../assets/svgs/serviceTotal/walletUsed.svg";
import SURG from "../assets/svgs/serviceTotal/surg.svg";
import Cancelation from "../assets/svgs/serviceTotal/cancelcharges.svg";
import Safety from "../assets/svgs/serviceTotal/safety.svg";
import locationIcon from "../assets/svgs/locationIcon.svg";
import time from "../assets/svgs/time.svg";

const CheckoutPage = () => {
  const [services, setServices] = useState([
    { id: "1", name: "Head massage", price: 390, quantity: 1 },
    { id: "2", name: "Manicure", price: 607, quantity: 1 },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const updateQuantity = (id, increment) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? {
              ...service,
              quantity: Math.max(0, service.quantity + (increment ? 1 : -1)),
            }
          : service
      )
    );
  };

  const serviceTotal = services.reduce(
    (sum, service) => sum + service.price * service.quantity,
    0
  );
  const tipAmount = 20;
  const couponDiscount = -89;
  const walletUsed = -762;
  const sumoCharges = 20;
  const cancellationCharges = 20;
  const safetyCharges = 49;
  const finalTotal =
    serviceTotal +
    tipAmount +
    couponDiscount +
    walletUsed +
    sumoCharges +
    cancellationCharges +
    safetyCharges;

  const handleAddressSave = (address) => {
    setSelectedAddress(address);
    setShowAddressModal(false);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowSlotModal(false);
  };

  const handlePayment = () => {
    setShowPaymentModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4 mt-[120px]">
      <div className="w-full max-w-7xl flex flex-row gap-6">
        {/* Left Column: Header and Services */}
        <div className="w-1/2 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              Checkout
            </h1>
          </div>

          {/* Services */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`flex items-center justify-between ${
                  index > 0 ? "mt-4 pt-4 border-t" : ""
                }`}
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(service.id, false)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="mx-4 font-medium">{service.quantity}</span>
                    <button
                      onClick={() => updateQuantity(service.id, true)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ₹{service.price * service.quantity}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-gray-600 mb-4">
                Frequently added together
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg mb-3"></div>
                  <p className="text-sm font-medium">
                    Complete wax (All in One)
                  </p>
                  <p className="text-sm text-gray-600">₹699</p>
                  <button className="mt-2 text-[#FF5534] text-sm font-medium border border-[#FF5534] rounded px-3 py-1 hover:bg-red-50">
                    Add
                  </button>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg mb-3"></div>
                  <p className="text-sm font-medium">
                    Complete wax (All in One)
                  </p>
                  <p className="text-sm text-gray-600">₹699</p>
                  <button className="mt-2 text-[#FF5534] text-sm font-medium border border-[#FF5534] rounded px-3 py-1 hover:bg-red-50">
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4">
            <h4 className="font-medium text-gray-900 mb-2">
              Cancellation policy
            </h4>
            <p className="text-xs text-gray-600">
              Free cancellation 6 hours more than 3 hrs before the service or if
              a professional isn't assigned, it can still be charged otherwise.
            </p>
          </div>
        </div>

        {/* Right Column: Contact and Other Sections */}
        <div className="w-1/2 space-y-6">
          {/* Background wrapper for Contact, Address, Time Slot, Payment Method */}
          <div className="bg-[#75A5F112] border border-[#B4B4B4] p-4 mt-[58px] rounded-[10px] space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Phone size={20} className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">
                      Send booking details to
                    </p>
                    <p className="font-medium">+91 9987654321</p>
                  </div>
                </div>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin size={20} className="text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Address</p>
                    {selectedAddress ? (
                      <div>
                        <p className="font-medium">{selectedAddress.area}</p>
                        <p className="text-sm text-gray-600">
                          {selectedAddress.details}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowAddressModal(true)}
                        className="w-full bg-[#FF5534] text-white rounded-lg py-2 px-4 font-medium hover:bg-red-600 transition-colors"
                      >
                        Select an Address
                      </button>
                    )}
                  </div>
                </div>
                {selectedAddress ? (
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <button
                      onClick={() => setShowAddressModal(true)}
                      className="text-[#FF5534] font-medium text-sm hover:text-red-600"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded bg-white"></div>
                )}
              </div>
            </div>

            {/* Time Slot */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock size={20} className="text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Select slot</p>
                    {selectedSlot ? (
                      <div>
                        <p className="font-medium">{selectedSlot.date}</p>
                        <p className="text-sm text-gray-600">
                          {selectedSlot.time}
                        </p>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowSlotModal(true)}
                        className="text-gray-400 text-sm"
                      >
                        Select time slot
                      </button>
                    )}
                  </div>
                </div>
                {selectedSlot ? (
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <button
                      onClick={() => setShowSlotModal(true)}
                      className="text-[#FF5534] font-medium text-sm hover:text-red-600"
                    >
                      Edit
                    </button>
                  </div>
                ) : (
                  <div className="w-6 h-6 border-2 border-gray-300 rounded bg-white"></div>
                )}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard size={20} className="text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="text-gray-400 text-sm"
                    >
                      Select payment method
                    </button>
                  </div>
                </div>
                <div className="w-6 h-6 border-2 border-gray-300 rounded bg-white"></div>
              </div>
            </div>
          </div>

          {/* Coupons */}
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Tag size={20} className="text-[#FF5534] mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Coupons & Offers</p>
                </div>
              </div>
              <p className="text-[#FF5534] font-medium">5 offers →</p>
            </div>
          </div>

          {/* Payment Summary */}

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Payment summary
            </h3>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Extra cleaning (Dexa + )
                </span>
                <span className="text-sm text-gray-900">₹1,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Chargla (Grasha + Chehupa + )
                </span>
                <span className="text-sm text-gray-900">₹1,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Full Arms + Bleach + )
                </span>
                <span className="text-sm text-gray-900">₹1,000</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <div className="flex justify-between items-center font-semibold">
                <span className="text-gray-900 ">Service Total</span>
                <span className="flex gap-3">
                  <span className="text-gray-900 line-through">₹3000 </span>
                  <span>₹3575</span>
                </span>
              </div>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="">
                    <img src={free} alt="free" />
                  </span>
                  <span className="text-gray-600">Free service (Bleach)</span>
                </div>
                <span className="text-gray-900">₹0</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="">
                    <img src={Tip} alt="tip" />
                  </span>
                  <span className="text-gray-600">
                    Tip For Service Provider
                  </span>
                </div>
                <span className="text-gray-900">₹20</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="0">
                    <img src={Coupon} alt="coupon" />
                  </span>
                  <span className="text-gray-600">
                    Coupon Discount (Freebl)
                  </span>
                </div>
                <span className="text-green-600">-₹60</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="">
                    <img src={Wallet} alt="wallet" />
                  </span>
                  <span className="text-gray-600">Wallet Used</span>
                </div>
                <span className="text-red-600">-₹300</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="0">
                    <img src={SURG} alt="surg" />
                  </span>
                  <span className="text-gray-600">BAJAJ Charges</span>
                </div>
                <span className="text-gray-900">₹20</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="">
                    <img src={Cancelation} alt="" />
                  </span>
                  <span className="text-gray-600">Cancellation Charges</span>
                </div>
                <span className="text-gray-900">₹20</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="">
                    <img src={Safety} alt="safety" />
                  </span>
                  <span className="text-gray-600">
                    Safety & Hygiene kit Charges
                  </span>
                </div>
                <span className="text-gray-900">Tax ₹49</span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center font-bold text-lg">
                <span className="text-gray-900">Payble Amount</span>
                <span className="text-gray-900">₹2000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSave={handleAddressSave}
        selectedAddress={selectedAddress}
      />

      <SlotModal
        isOpen={showSlotModal}
        onClose={() => setShowSlotModal(false)}
        onSelect={handleSlotSelect}
        selectedSlot={selectedSlot}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPayment={handlePayment}
        amount={finalTotal}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
};

export default CheckoutPage;
