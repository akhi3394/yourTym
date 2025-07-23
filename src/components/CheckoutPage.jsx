import React, { useEffect, useState } from 'react';
import { Phone, MapPin, Clock, CreditCard, Tag, Minus, Plus, X } from 'lucide-react';
import AddressModal from './AddressModal';
import SlotModal from './SlotModal';
import PaymentModal from './PaymentModal';
import SuccessModal from './SuccessModal';
import CouponsModal from './CouponsModal';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAddress } from '../store/slices/authSlice';
import { toast } from 'sonner';
import { useCheckoutMutation, useGetFrequentlyAddedServicesQuery, useGetCartQuery } from '../store/api/productsApi';
import CircularLoader from './CircularLoader';
import Support from '../assets/svgs/support.svg';
import LocationPin from '../assets/svgs/LocationPin.svg';
import Coupon from '../assets/svgs/serviceTotal/coupon.svg';
import SURG from '../assets/svgs/serviceTotal/surg.svg';
import Safety from '../assets/svgs/serviceTotal/safety.svg';
import Tick from '../assets/images/cartCheckMark.png';
import useCart from '../hooks/useCart';
import { useGetCouponsQuery } from '../store/api/profileApi';

const CheckoutPage = () => {
  const { token, isAuthenticated, mobile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data: cartData, isLoading: cartLoadingCheckout, error: cartError, isFetching: fetchingCheckout } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });
  const { data: frequentlyAddedServices = [], isLoading: isFrequentlyLoading } = useGetFrequentlyAddedServicesQuery(undefined, {
    skip: !isAuthenticated,
  });
  const { data: couponsData, isLoading: couponLoading, error: couponError } = useGetCouponsQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [checkout, { isLoading: isCheckoutLoading, error: checkoutError }] = useCheckoutMutation();
  const [payableAmount, setPayableAmount] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [showCouponsModal, setShowCouponsModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const {
    cartItems,
    loading,
    error,
    addToCartPackage,
    removeCartPackage,
    updateQuantity,
    addToCartSingleServices,
    removeSingleService,
    isInCartorNot,
    updatePackageQuantity,
    cartLoading,
    fetchingCart
  } = useCart();

  console.log(cartData, "cartdtaafrom cartttt")

  useEffect(() => {
    if (cartData) {
      let total = cartData?.paidAmount || 0;
      if (selectedCoupon) {
        total = Math.max(0, total - selectedCoupon.discount);
      }
      setPayableAmount(total);
    }
    if (cartError) {
      toast.error(cartError?.data?.message || 'Failed to load cart');
    }
    if (couponError) {
      toast.error(couponError?.data?.message || 'Failed to load coupons');
    }
    if (checkoutError) {
      toast.error(checkoutError?.data?.message || 'Failed to initiate checkout');
    }
  }, [cartData, selectedCoupon, cartError, couponError, checkoutError]);

  const tipAmount = cartData?.data?.tipProvided || 0;
  const couponDiscount = selectedCoupon ? selectedCoupon.discount : (cartData?.data?.coupan || 0);
  const walletUsed = cartData?.data?.wallet || 0;
  const platformFee = cartData?.platformFee || 0;
  const taxAmount = cartData?.taxAmount || 0;
  const serviceTotal=cartData?.totalDiscountPrice
  const additionalFee = cartData?.data?.additionalFee || 0;
  const finalTotal = payableAmount;


  console.log(payableAmount, "hhhh")
  console.log(cartData, "ggg")

  const handleAddressSave = (address) => {
    setSelectedAddress(address);
    setShowAddressModal(false);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowSlotModal(false);
  };

  const handleCouponSelect = (coupon) => {
    setSelectedCoupon(coupon);
    setShowCouponsModal(false);
    toast.success(`Coupon "${coupon.couponCode}" applied!`);
  };

  const handleRemoveCoupon = () => {
    setSelectedCoupon(null);
    toast.success('Coupon removed');
  };

  const handlePayment = async () => {
    if (!selectedAddress && !cartData?.data?.appartment) {
      toast.error('Please select an address first');
      return;
    }
    if (!selectedSlot && (!cartData?.data?.Date || !cartData?.data?.startTime)) {
      toast.error('Please select a time slot first');
      return;
    }
    setIsPaymentLoading(true);
    try {
      const response = await checkout({
        couponCode: selectedCoupon?.couponCode,
      }).unwrap();
      setOrderId(response.data.orderId);
      setShowPaymentModal(true);
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to initiate checkout');
      console.error('Checkout error:', error);
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    try {
      const isCustomized = item.packageType === "Customize";
      if (item.hasOwnProperty("services")) {
        addToCartPackage(item._id, 1, isCustomized, item.selectedServices);
      } else {
        addToCartSingleServices(item._id, 1, item.location?.[0]?.sector || "67beed95c3e00990a579d596");
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to add item to cart');
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    try {
      const cartItem = cartItems.find(item => (item.serviceId || item.packageId) === itemId);

      if (!cartItem) {
        toast.error('Item not found in cart');
        return;
      }

      if (newQuantity <= 0) {
        if (cartItem.isPackageService) {
          removeCartPackage(itemId);
        } else {
          removeSingleService(itemId);
        }
        return;
      }

      if (cartItem.isPackageService) {
        updatePackageQuantity(itemId, newQuantity); // for package items
      } else {
        updateQuantity(itemId, newQuantity); // for single service items
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update quantity');
    }
  };


  const handleRemoveItem = (itemId) => {
    try {
      const item = cartItems?.find((item) => (item.serviceId || item.packageId) === itemId);
      if (item) {
        if (item.isPackageService) {
          removeCartPackage(itemId);
        } else {
          removeSingleService(itemId);
        }
      } else {
        console.warn(`Item with ID ${itemId} not found in cart`);
        toast.error('Item not found in cart');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to remove item from cart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center p-4 mt-[120px]">
      <div className="w-full max-w-7xl flex flex-row gap-6">
        {/* Left Column: Header and Services */}
        <div className="w-1/2 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Checkout</h1>
          </div>

          {/* Services */}
          <div className="bg-white rounded-lg p-6 shadow-sm border max-h-[400px] overflow-y-scroll">
            {(cartLoading || loading || cartLoadingCheckout || fetchingCheckout || fetchingCart) ? (
              <div className="flex justify-center items-center h-32">
                <CircularLoader />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 mt-8">
                <p>{error}</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-sm text-gray-900 flex-1 pr-2">
                      {item.title} x{item.quantity}
                    </h4>
                    <button
                      onClick={() => handleRemoveItem(item.serviceId || item.packageId)}
                      className="text-gray-400 hover:text-red-500 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-blue-100 rounded-full px-3 py-1">
                      <button
                        onClick={() => handleUpdateQuantity(item.serviceId || item.packageId, item.quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-50"
                        // disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.serviceId || item.packageId, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-semibold">₹{item.total}</span>
                  </div>
                </div>
              ))
            )}
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-gray-600 mb-4">Frequently added together</p>
              {isFrequentlyLoading ? (
                <div className="flex justify-center items-center h-32">
                  <CircularLoader />
                </div>
              ) : frequentlyAddedServices.length === 0 ? (
                <div className="text-center text-gray-500 mt-8">
                  <p>No frequently added services available</p>
                </div>
              ) : (
                <div className="flex overflow-x-auto space-x-4 pb-4">
                  {frequentlyAddedServices.map((service) => (
                    <div key={service._id} className="border rounded-lg p-4 min-w-[200px] flex-shrink-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg mb-3">
                        <img src={service?.images[0]?.img || 'https://via.placeholder.com/150'} alt={service.title} className="w-16 h-16" />
                      </div>
                      <p className="text-sm font-medium">{service.title}</p>
                      <p className="text-sm text-gray-600">₹{service.location[0]?.originalPrice || 0}</p>
                      <button
                        onClick={() => handleAddToCart(service)}
                        className={`mt-2 text-sm font-medium rounded px-3 py-1 ${isInCartorNot(service._id)
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'text-[#FF5534] border border-[#FF5534] hover:bg-red-50'
                          }`}
                        disabled={isInCartorNot(service._id)}
                      >
                        {isInCartorNot(service._id) ? 'In Cart' : 'Add'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Cancellation policy</h4>
            <p className="text-xs text-gray-600">
              Free cancellation 6 hours more than 3 hrs before the service or if a professional isn't assigned,
              it can still be charged otherwise.
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
                    <p className="text-sm text-gray-600">Send booking details to</p>
                    <p className="font-medium">+91 {mobile}</p>
                  </div>
                </div>
                <div className="w-[36px] h-[15px] bg-green-500 rounded-full flex items-center justify-center">
                  <img src={Tick} alt="checked" />
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl border border-[#D9D9D9] p-5">
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <MapPin size={22} className="text-black" />
                  <p className="text-base font-semibold text-black mb-6">Address</p>
                </div>
                {selectedAddress || cartData?.data?.appartment ? (
                  <div className="w-[36px] h-[35px] bg-green-500 rounded-md flex items-center justify-center">
                    <img src={Tick} alt="checked" />
                  </div>
                ) : (
                  <div className="w-[36px] h-[35px] bg-[#D9D9D9] rounded-md flex items-center justify-center" />
                )}
              </div>
              {selectedAddress || cartData?.data?.appartment ? (
                <>
                  <p className="text-[14px] font-medium text-[#444444] mb-2 mx-3">
                    {cartData?.data?.houseFlat || selectedAddress?.houseFlat}, {cartData?.data?.landMark || selectedAddress?.landMark || ''}, {cartData?.data?.appartment || selectedAddress?.appartment}
                  </p>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="w-full border border-[#FF5534] text-[#FF5534] text-sm font-semibold rounded-lg py-2 hover:bg-[#d7f1fb] transition"
                  >
                    Edit an Address
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowAddressModal(true)}
                  className="w-full bg-[#FF5534] text-white text-sm font-semibold rounded-lg py-2 hover:bg-[#e64a2e] transition"
                >
                  Select an Address
                </button>
              )}
            </div>

            {/* Time Slot */}
            <div className="bg-white rounded-xl border border-[#D9D9D9] p-5">
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <Clock size={22} className="text-black" />
                  <p className="text-base font-semibold text-black mb-6">Time Slot</p>
                </div>
                {selectedSlot || (cartData?.data?.Date && cartData?.data?.startTime) ? (
                  <div className="w-[36px] h-[35px] bg-green-500 rounded-md flex items-center justify-center">
                    <img src={Tick} alt="checked" />
                  </div>
                ) : (
                  <div className="w-[36px] h-[35px] bg-[#D9D9D9] rounded-md flex items-center justify-center" />
                )}
              </div>
              {selectedSlot || (cartData?.data?.Date && cartData?.data?.startTime) ? (
                <>
                  <p className="text-[14px] font-medium text-[#444444] mb-2 mx-6">
                    {cartData?.data?.startTime || selectedSlot?.time} - {cartData?.data?.endTime || selectedSlot?.endTime || ''}
                  </p>
                  <button
                    onClick={() => setShowSlotModal(true)}
                    className="w-full border border-[#FF5534] text-[#FF5534] text-sm font-semibold rounded-lg py-2 hover:bg-[#d7f1fb] transition"
                  >
                    Edit Slot
                  </button>
                </>
              ) : (
                <button
                  onClick={() => selectedAddress || cartData?.data?.appartment ? setShowSlotModal(true) : toast.error('Please select an address first')}
                  className="w-full bg-[#FF5534] text-white text-sm font-semibold rounded-lg py-2 hover:bg-[#e64a2e] transition"
                  disabled={!selectedAddress && !cartData?.data?.appartment}
                >
                  Select a Slot
                </button>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl border border-[#D9D9D9] p-5">
              <div className="flex justify-between">
                <div className="flex gap-3">
                  <CreditCard size={22} className="text-black" />
                  <p className="text-base font-semibold text-black mb-6">Payment Method</p>
                </div>
              </div>
              <button
                onClick={handlePayment}
                className="w-full bg-[#FF5534] text-white text-sm font-semibold rounded-lg py-2 hover:bg-[#e64a2e] transition flex items-center justify-center"
                disabled={isPaymentLoading || isCheckoutLoading || cartItems.length === 0}
              >
                {isPaymentLoading || isCheckoutLoading ? <CircularLoader size={20} /> : 'Select payment method'}
              </button>
            </div>
          </div>

          {/* Coupons */}
          <div className="bg-white rounded-lg p-6 shadow-sm border cursor-pointer" onClick={() => setShowCouponsModal(true)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Tag size={20} className="text-[#FF5534] mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Coupons & Offers</p>
                  {selectedCoupon ? (
                    <p className="text-sm text-green-600">Coupon "{selectedCoupon.couponCode}" applied</p>
                  ) : (
                    <p className="text-sm text-gray-600">Select a coupon to apply</p>
                  )}
                </div>
              </div>
              <p className="text-[#FF5534] font-medium">{couponsData?.service?.length || 0} offers →</p>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment summary</h3>
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <p>No items in cart</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {cartItems.map((item) => (
                    <div key={item._id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{item.title}</span>
                      <span className="text-sm text-gray-900">₹{item.total}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-gray-900">Service Total</span>
                    <span className="text-gray-900">₹{serviceTotal}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span><img src={Coupon} alt="coupon" /></span>
                      <span className="text-gray-600">Coupon Discount</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">₹{couponDiscount}</span>
                      {selectedCoupon && (
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span><img src={SURG} alt="surg" /></span>
                      <span className="text-gray-600">Platform Fee</span>
                    </div>
                    <span className="text-gray-900">₹{platformFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span><img src={Safety} alt="safety" /></span>
                      <span className="text-gray-600">Tax Amount</span>
                    </div>
                    <span className="text-gray-900">₹{taxAmount}</span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span className="text-gray-900">Payable Amount</span>
                    <span className="text-gray-900">₹{payableAmount}</span>
                  </div>
                </div>
              </>
            )}
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
        onPayment={() => {
          setShowPaymentModal(false);
          setShowSuccessModal(true);
        }}
        amount={payableAmount}
        orderId={orderId}
        isCheckoutLoading={isCheckoutLoading}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
      <CouponsModal
        isOpen={showCouponsModal}
        onClose={() => setShowCouponsModal(false)}
        onSelectCoupon={handleCouponSelect}
      />
    </div>
  );
};

export default CheckoutPage;