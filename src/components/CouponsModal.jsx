import React from 'react';
import { X, Tag } from 'lucide-react';
import CircularLoader from './CircularLoader';
import { useGetCouponsQuery } from '../store/api/profileApi';

const CouponsModal = ({ isOpen, onClose, onSelectCoupon }) => {
  const { data: couponsData, isLoading, error } = useGetCouponsQuery(undefined, {
    skip: !isOpen,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[400px] md:w-[500px] rounded-xl p-6 relative max-h-[80vh] overflow-y-auto">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center mb-6">Coupons & Offers</h2>

        {/* Coupons List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <CircularLoader size={20} />
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              Error: {error?.data?.message || 'Failed to load coupons'}
            </div>
          ) : couponsData?.service?.length > 0 ? (
            couponsData.service.map((coupon) => (
              <div
                key={coupon._id}
                className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelectCoupon(coupon)}
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-[#FF5534]" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{coupon.title}</p>
                    <p className="text-sm text-gray-600">Code: {coupon.couponCode}</p>
                    <p className="text-sm text-green-600">Discount: ₹{coupon.discount}</p>
                    <p className="text-xs text-gray-500">
                      Valid until: {new Date(coupon.expirationDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button className="text-[#FF5534] text-sm font-semibold hover:text-[#e54728]">
                  Apply
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No coupons available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponsModal;