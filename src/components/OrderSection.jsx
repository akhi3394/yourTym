import Support from '../assets/svgs/support.svg';
import LocationPin from '../assets/svgs/LocationPin.svg';
import free from '../assets/svgs/serviceTotal/FreeService.svg'
import Tip from '../assets/svgs/serviceTotal/tip.svg'
import Coupon from '../assets/svgs/serviceTotal/coupon.svg'
import Wallet from '../assets/svgs/serviceTotal/walletUsed.svg'
import SURG from '../assets/svgs/serviceTotal/surg.svg'
import Cancelation from '../assets/svgs/serviceTotal/cancelcharges.svg'
import Safety from '../assets/svgs/serviceTotal/safety.svg'
import locationIcon from '../assets/svgs/locationIcon.svg'
import time from '../assets/svgs/time.svg'

export default function OrderSection() {
    return (
        <div className="space-y-6 mt-[50px]">
            {/* Order Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-2">
                <div className="text-sm text-[#444444] font-semibold text-center mb-2">Order Id: 1669297452</div>
                <div className="border-b-2 border-dashed mb-3"></div>
                <div className="flex items-center justify-between space-x-2 mb-3">
                    <span className="px-2 py-1 text-[#FF5534] text-xs rounded">Open</span>
                    <button className="text-[#FF5534] border border-[#FF5534] px-3 py-2 rounded-[5px] text-sm hover:text-orange-600">Mark as a Favourite</button>
                </div>

                <div className="border-b-2 border-dashed mb-3"></div>

                <div className="flex items-start space-x-4 mb-6">
                    <img
                        src="https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop"
                        alt="Massage service"
                        className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Neck & Shoulder Massage</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <span>13 Mins</span>
                            <span>•</span>
                            <span>₹ (₹)</span>
                        </div>
                    </div>
                </div>
                <div className="border-b-2 border-dashed mb-3"></div>

                <div className="pt-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                            <img
                                src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop"
                                alt="Sumon"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                                <div className="font-medium text-gray-900">Sumon</div>
                                <div className="flex items-center space-x-1">
                                    <span className="text-orange-500">★</span>
                                    <span className="text-sm text-gray-600">5</span>
                                    <span className="text-xs text-gray-500">Job Completed: 105</span>
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
            <div className="space-y-3 mb-4">
                <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-900 mb-1 text-center">Address</div>
                    <div className="border-b-2 border-dashed mb-3"></div>
                    <div className="text-sm text-gray-600 flex gap-2">
                        <span><img src={locationIcon} alt="location" /></span> gHLag.sector.1.Mansour</div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-900 mb-1 text-center">Timing</div>
                    <div className="border-b-2 border-dashed mb-3"></div>

                    <div className="text-sm text-gray-600 flex gap-2">
                       <span><img src={time} alt="location" /></span> 1st May, 2023 Mon at 10:30-17:00</div>
                </div>

                <div className="bg-white p-3 rounded-lg">
                    <div className="text-sm font-medium text-gray-900 mb-2  text-center">Note</div>
                    <div className="border-b-2 border-dashed mb-3"></div>

                    <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Slot time (30 min) is arrival time of experts.</li>
                        <li>• Due to safety reasons expert will reach 5-7 PM only forwarding services will be carried in mid-day.</li>
                        <li>• Free cancellation till 2 hours before the booked slot, post that 15G chargeable</li>
                    </ul>
                </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment summary</h3>

                <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Extra cleaning (Dexa + )</span>
                        <span className="text-sm text-gray-900">₹1,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Chargla (Grasha + Chehupa + )</span>
                        <span className="text-sm text-gray-900">₹1,000</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Full Arms + Bleach + )</span>
                        <span className="text-sm text-gray-900">₹1,000</span>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-4">
                    <div className="flex justify-between items-center font-semibold">
                        <span className="text-gray-900 ">Service Total</span>
                        <span className='flex gap-3'>
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
                            <span className="text-gray-600">Tip For Service Provider</span>
                        </div>
                        <span className="text-gray-900">₹20</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <span className="0">
                                <img src={Coupon} alt="coupon" />
                            </span>
                            <span className="text-gray-600">Coupon Discount (Freebl)</span>
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
                            <span className="text-gray-600">Safety & Hygiene kit Charges</span>
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

            {/* Support Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-4 ">Need help with this order?</h3>
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
                    <div className="">
                        <img src={Support} alt="support" />
                    </div>
                </div>

                <button className="w-full bg-white border border-[#FF5534] text-[#FF5534] hover:bg-orange-50 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                    Report Order
                </button>
            </div>
        </div>
    );
}