import React from "react";
import { Star, Clock, ShoppingCart, Trash2 } from "lucide-react";

const ServiceCard = React.memo(
  ({ service, onAddToCart, onRemoveFromCart, isInCart, isLoading, error }) => {
    if (isLoading) {
      return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 shadow-sm h-[500px] w-full animate-pulse">
          <div className="h-52 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-200 rounded mb-3"></div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
              <div className="h-4 w-16 bg-gray-200 rounded ml-auto"></div>
            </div>
            <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 shadow-sm h-[500px] w-full flex items-center justify-center">
          <p className="text-red-500 text-sm">{error.message || error}</p>
        </div>
      );
    }

    const {
      _id,
      title,
      images,
      description,
      rating,
      sellCount,
      totalTime,
      location,
    } = service;

    const imageUrl = images?.[0]?.img || "https://via.placeholder.com/150";
    const originalPrice = location?.[0]?.originalPrice || 0;
    const discountPrice = location?.[0]?.discountPrice || originalPrice;
    const discountActive = location?.[0]?.discountActive || false;

    const formattedTime = totalTime || "00 hr 00 min";

    const handleAddToCartClick = () => {
      onAddToCart(service);
    };

    const handleRemoveFromCartClick = () => {
      onRemoveFromCart(_id);
    };

    // ✅ Description cleaner — Remove HTML tags
    const cleanDescription = description
      ? description.replace(/<[^>]+>/g, "").split("\n").filter(Boolean)
      : [];

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 shadow-md w-full flex flex-col justify-between">
        {/* Top Image */}
        <div className="relative h-[200px]">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
          />
        </div>

        {/* Content */}
        <div className="flex items-start justify-between gap-4 p-4 flex-1">
          <div className="flex-1">
            <h3 className="text-[24px] leading-[30px] font-bold text-[#704E20] mb-1">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-[#444] text-[14px] mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{rating || 0}</span>
              <span>({sellCount || 0} Reviews)</span>
            </div>

            <div className="flex items-center gap-3 mb-2">
              {discountActive && originalPrice > discountPrice && (
                <span className="text-gray-500 line-through text-[14px]">
                  ₹ {originalPrice}
                </span>
              )}
              <span className="text-[#16A34A] text-[16px] font-bold">
                ₹ {discountPrice}/-
              </span>
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <Clock className="w-4 h-4" />
                <span>{formattedTime}</span>
              </div>
            </div>

            <ul className="text-[13px] text-[#444] space-y-1 mb-4 list-disc pl-4">
              {cleanDescription.length > 0 ? (
                cleanDescription.map((line, index) => (
                  <li key={index}>{line}</li>
                ))
              ) : (
                <li>No description available</li>
              )}
            </ul>
          </div>

          {/* Product Thumbnail */}
          <div className="w-[90px] h-[90px]">
            <img
              src={imageUrl}
              alt="Product"
              className="w-full h-full object-cover rounded-md border border-gray-300"
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            />
          </div>
        </div>

        {/* Bottom Action Button */}
        <div className="flex justify-end p-4">
          {!isInCart ? (
            <button
              onClick={handleAddToCartClick}
              className="bg-[#FF5534] rounded-lg px-5 py-2 text-sm text-white hover:bg-[#e04a2e] flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" /> Add
            </button>
          ) : (
            <button
              onClick={handleRemoveFromCartClick}
              className="bg-red-500 rounded-lg px-5 py-2 text-sm text-white hover:bg-red-600 flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Remove
            </button>
          )}
        </div>
      </div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;

