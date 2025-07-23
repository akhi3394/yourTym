import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery, useAddFavouriteBookingMutation, useGetProfileQuery } from "../store/api/profileApi";
import Support from '../assets/svgs/support.svg';
import LocationPin from '../assets/svgs/LocationPin.svg';
import free from '../assets/svgs/serviceTotal/FreeService.svg';
import Tip from '../assets/svgs/serviceTotal/tip.svg';
import Coupon from '../assets/svgs/serviceTotal/coupon.svg';
import Wallet from '../assets/svgs/serviceTotal/walletUsed.svg';
import SURG from '../assets/svgs/serviceTotal/surg.svg';
import Cancelation from '../assets/svgs/serviceTotal/cancelcharges.svg';
import Safety from '../assets/svgs/serviceTotal/safety.svg';
import locationIcon from '../assets/svgs/locationIcon.svg';
import time from '../assets/svgs/time.svg';
import CircularLoader from "../components/CircularLoader";
import ReferImg from '../assets/images/refer/ReferinOrders.png';
import Swal from 'sweetalert2';
import { toast } from "sonner";
import ReferAndEarnModal from "../components/ReferAndEarnModal";

const BookingDetail = () => {
    const { orderId } = useParams();
    const [isReferModalOpen, setIsReferModalOpen] = useState(false); // State for modal
    const { data: order, isLoading: singleLoading, error } = useGetOrderByIdQuery(orderId);
    const { data: profileData } = useGetProfileQuery(); // Fetch profile data for referral code
    const [addFavouriteBooking, { isLoading: favouriteLoading }] = useAddFavouriteBookingMutation();
    const referralcode = profileData?.data?.refferalCode; // Extract referral code

    if (!orderId) {
        return <div>Invalid Order ID</div>;
    }

    if (error) return <div>Error loading order details: {error.message}</div>;
    if (!order || !order.data) return <div>No order data available</div>;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            weekday: 'short'
        });
    };

    if (singleLoading) {
        return (
            <div className="flex justify-center items-center">
                <CircularLoader size={30} />
            </div>
        );
    }

    const handleMarkAsFavourite = () => {
        addFavouriteBooking(orderId)
            .unwrap()
            .then(() => {
                toast.success('Successfully added as favourite!');
            })
            .catch((err) => {
                toast.error('Failed to add as favourite');
            });
    };

    return (
        <div className="bg-gray-50 pt-[100px] pb-[80px] px-4 sm:px-6 lg:px-8 min-h-screen">
            <div className="max-w-7xl mx-auto py-8">
                <h1 className="text-2xl font-semibold text-gray-900 mb-8">Booking Details</h1>

                <div className="flex flex-col lg:flex-row gap-6 mt-[50px]">
                    {/* Left Side */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        {/* Order Details */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-2">
                            <div className="text-sm text-[#444444] font-semibold text-center mb-2">Order Id: {order.data.orderId || 'N/A'}</div>
                            <div className="border-b-2 border-dashed mb-3"></div>
                            <div className="flex items-center justify-between space-x-2 mb-3">
                                <span className="px-2 py-1 text-[#FF5534] text-xs rounded">{order.data.orderStatus || 'N/A'}</span>
                                <button
                                    className="text-[#FF5534] border border-[#FF5534] px-3 py-2 rounded-[5px] text-sm hover:text-orange-600"
                                    onClick={handleMarkAsFavourite}
                                    disabled={favouriteLoading}
                                >
                                    {favouriteLoading ? <CircularLoader size={20} /> : 'Mark as a Favourite'}
                                </button>
                            </div>

                            <div className="border-b-2 border-dashed mb-3"></div>

                            {/* Services */}
                            {order.data.services.map((service, index) => (
                                <div key={index} className="flex items-start space-x-4 mb-6">
                                    <img
                                        src={service.serviceId?.images[0]?.img || 'https://via.placeholder.com/64'}
                                        alt={service.serviceId?.title || 'Service'}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">{service.serviceId?.title || 'Service'}</h3>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <span>{service.serviceId?.totalTime || 'N/A'}</span>
                                            <span>•</span>
                                            <span>₹{service.price || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Packages */}
                            {order.data.packages.map((pkg, index) => (
                                <div key={index} className="flex items-start space-x-4 mb-6">
                                    <img
                                        src={pkg.packageId?.images[0]?.img || 'https://via.placeholder.com/64'}
                                        alt={pkg.packageId?.title || 'Package'}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">{pkg.packageId?.title || 'Package'}</h3>
                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <span>{pkg.packageId?.totalTime || 'N/A'}</span>
                                            <span>•</span>
                                            <span>₹{pkg.price || 0}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="border-b-2 border-dashed mb-3"></div>

                            <div className="pt-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={order.data.userId?.image || 'https://via.placeholder.com/40'}
                                            alt={order.data.userId?.fullName || 'Partner'}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <div className="font-medium text-gray-900">{order.data.userId?.fullName || 'Partner Name'}</div>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-orange-500">★</span>
                                                <span className="text-sm text-gray-600">N/A</span>
                                                <span className="text-xs text-gray-500">Job Completed: N/A</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="flex items-center gap-2">
                                        <span className="w-[28px] h-[31px]">
                                            <img src={LocationPin} alt="location" />
                                        </span>
                                        <span className="text-[#444444] text-[16px] underline">Track Partner location</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Address, Timing, Note */}
                        <div className="space-y-3 mb-4">
                            <div className="bg-white p-3 rounded-lg">
                                <div className="text-sm font-medium text-gray-900 mb-1 text-center">Address</div>
                                <div className="border-b-2 border-dashed mb-3"></div>
                                <div className="text-sm text-gray-600 flex gap-2">
                                    <span><img src={locationIcon} alt="location" /></span> {order.data.landMark || 'No landmark'}
                                </div>
                            </div>

                            <div className="bg-white p-3 rounded-lg">
                                <div className="text-sm font-medium text-gray-900 mb-1 text-center">Timing</div>
                                <div className="border-b-2 border-dashed mb-3"></div>
                                <div className="text-sm text-gray-600 flex gap-2">
                                    <span><img src={time} alt="time" /></span> {formatDate(order.data.Date)} {order.data.startTime}-{order.data.endTime}
                                </div>
                            </div>

                            <div className="bg-white p-3 rounded-lg">
                                <div className="text-sm font-medium text-gray-900 mb-2 text-center">Note</div>
                                <div className="border-b-2 border-dashed mb-3"></div>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>• Slot time (30 min) is arrival time of experts.</li>
                                    <li>• Due to safety reasons expert will reach 5-7 PM only forwarding services will be carried in mid-day.</li>
                                    <li>• Free cancellation till 2 hours before the booked slot, post that 15% chargeable</li>
                                </ul>
                            </div>
                        </div>

                        {/* Support Section */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
                            <div className="text-center mb-4">
                                <h3 className="text-sm font-medium text-gray-900 mb-4">Need help with this order?</h3>
                                <p className="border-b border-dashed border-b-2-2"></p>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center justify-start space-x-3 mb-4">
                                    <img
                                        src="https://images.pexels.com/photos/3772615/pexels-photo-3772615.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                                        alt="Support representative"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div className="text-left">
                                        <div className="text-sm font-medium text-gray-900">Report us</div>
                                        <div className="text-xs text-gray-600">About any issues related to</div>
                                        <div className="text-xs text-gray-600">your order</div>
                                    </div>
                                </div>
                                <div>
                                    <img src={Support} alt="support" />
                                </div>
                            </div>

                            <button className="w-full bg-white border border-[#FF5534] text-[#FF5534] hover:bg-orange-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                                Report Order
                            </button>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="w-full lg:w-1/2">
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment summary</h3>

                            <div className="space-y-3 mb-4">
                                {order.data.services.map((service, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">{service.serviceId?.title || 'Unknown Service'}</span>
                                        <span className="text-sm text-gray-900">₹{service.price || 0}</span>
                                    </div>
                                ))}
                                {order.data.packages.map((pkg, index) => (
                                    <div key={index} className="flex justify-between items-center">
                                        <span className="text-sm text-gray-600">{pkg.packageId?.title || 'Unknown Package'}</span>
                                        <span className="text-sm text-gray-900">₹{pkg.price || 0}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-4 mb-4">
                                <div className="flex justify-between items-center font-semibold">
                                    <span className="text-gray-900">Service Total</span>
                                    <span className="text-gray-900">₹{order.data.totalAmount || 0}</span>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm mb-4">
                                {order.data.freeServiceCount > 0 && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <img src={free} alt="free" />
                                            <span className="text-gray-600">Free service</span>
                                        </div>
                                        <span className="text-gray-900">₹0</span>
                                    </div>
                                )}

                                {order.data.tipProvided > 0 && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <img src={Tip} alt="tip" />
                                            <span className="text-gray-600">Tip For Service Provider</span>
                                        </div>
                                        <span className="text-gray-900">₹{order.data.tipProvided}</span>
                                    </div>
                                )}

                                {order.data.coupan > 0 && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <img src={Coupon} alt="coupon" />
                                            <span className="text-gray-600">Coupon Discount</span>
                                        </div>
                                        <span className="text-green-600">₹{order.data.coupan}</span>
                                    </div>
                                )}

                                {order.data.wallet > 0 && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <img src={Wallet} alt="wallet" />
                                            <span className="text-gray-600">Wallet Used</span>
                                        </div>
                                        <span className="text-red-600">₹{order.data.wallet}</span>
                                    </div>
                                )}

                                {order.data.platformFee > 0 && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <img src={SURG} alt="surg" />
                                            <span className="text-gray-600">Platform Fee</span>
                                        </div>
                                        <span className="text-gray-900">₹{order.data.platformFee}</span>
                                    </div>
                                )}

                                {order.data.taxAmount > 0 && (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-2">
                                            <img src={Safety} alt="safety" />
                                            <span className="text-gray-600">Tax Amount</span>
                                        </div>
                                        <span className="text-gray-900">₹{order.data.taxAmount}</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-100 pt-4">
                                <div className="flex justify-between items-center font-bold text-lg">
                                    <span className="text-gray-900">Payable Amount</span>
                                    <span className="text-gray-900">₹{order.data.paidAmount || 0}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 mb-3">
                            <img
                                src={ReferImg}
                                alt="refer"
                                className="cursor-pointer"
                                onClick={() => setIsReferModalOpen(true)} // Open modal on click
                            />
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="font-semibold text-[#2E2E2E] text-base mb-4">How It Works?</h2>
                            <ul className="space-y-3 text-sm text-[#2E2E2E]">
                                <li className="flex items-start">
                                    <span className="mt-1 w-2 h-2 bg-[#FF5A5F] rounded-sm mr-3"></span>
                                    <span>
                                        <strong className="font-semibold text-black">Earn ₹150</strong> on the first successful booking of the referee.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-1 w-2 h-2 bg-[#FF5A5F] rounded-sm mr-3"></span>
                                    <span>
                                        <strong className="font-semibold text-black">Earn ₹50</strong> every time the referee completes a booking.
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="mt-1 w-2 h-2 bg-[#FF5A5F] rounded-sm mr-3"></span>
                                    <span>
                                        The referee also <strong className="font-semibold text-black">Earns ₹100</strong> on the App registration.
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Refer and Earn Modal */}
            <ReferAndEarnModal
                isOpen={isReferModalOpen}
                onClose={() => setIsReferModalOpen(false)}
                referralcode={referralcode}
            />
        </div>
    );
};

export default BookingDetail;