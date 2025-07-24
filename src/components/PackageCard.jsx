import React, { useMemo } from "react";
import { Star, Pencil, Clock, Minus, Plus } from "lucide-react";
import parse from "html-react-parser";

const PackageCard = React.memo(
  ({
    package: pkg = {},
    onEditPackage = () => {},
    onAddToCart = () => {},
    onUpdateQuantity = () => {},
    cartItems = [],
    isLoading = false,
  }) => {
    if (isLoading) {
      return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 shadow-sm h-[260px] w-full animate-pulse flex">
          <div className="flex-1 p-4">
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2" />
            <div className="flex items-center gap-2 mb-3">
              <div className="h-4 w-12 bg-gray-200 rounded" />
              <div className="h-4 w-16 bg-gray-200 rounded ml-auto" />
            </div>
            <div className="h-4 w-3/4 bg-gray-200 rounded mb-1" />
            <div className="h-4 w-full bg-gray-200 rounded mb-1" />
            <div className="h-4 w-2/3 bg-gray-200 rounded mb-3" />
            <div className="flex gap-2">
              <div className="h-8 w-1/2 bg-gray-200 rounded-lg" />
              <div className="h-8 w-1/2 bg-gray-200 rounded-lg" />
            </div>
          </div>
          <div className="w-[140px] flex flex-col items-center justify-center p-2">
            <div className="h-[85px] w-full bg-gray-200 rounded mb-2" />
            <div className="h-8 w-3/4 bg-gray-200 rounded" />
          </div>
        </div>
      );
    }

    const {
      _id = "",
      title = "Untitled Package",
      image = "",
      rating = 0,
      reviews = 0,
      description = "",
      discountPrice = 0,
      timeInMin = 0,
      services = [],
    } = pkg || {};

    // Group services by category and remove duplicates
    const groupedServices = useMemo(() => {
      const serviceMap = {};
      services.forEach((service) => {
        const categoryName = service.category?.categoryId?.name || "Other";
        if (!serviceMap[categoryName]) {
          serviceMap[categoryName] = new Set();
        }
        serviceMap[categoryName].add(service.title);
      });
      return Object.entries(serviceMap).map(([category, titles]) => ({
        category,
        titles: Array.from(titles),
      }));
    }, [services]);

    // Convert timeInMin to hours and minutes
    const duration = useMemo(() => {
      const hours = Math.floor(timeInMin / 60);
      const minutes = timeInMin % 60;
      return `${hours > 0 ? `${hours} hr ` : ""}${minutes > 0 ? `${minutes} min` : ""}`.trim() || "0 min";
    }, [timeInMin]);

    // Find quantity from cart items
    const cartItem = cartItems.find((item) => item.packageId === _id);
    const quantity = cartItem?.quantity || 0;

    const handleAddToCart = () => onAddToCart(pkg);
    const handleEdit = () => onEditPackage(pkg);
    const handleIncrement = () => onUpdateQuantity(_id, quantity + 1);
    const handleDecrement = () => onUpdateQuantity(_id, quantity - 1);
    console.log(cartItem,"cartitempackage")
    console.log(quantity,"quantpackage")
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 shadow-sm flex hover:shadow-md transition-all">
        {/* Left Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          {/* Top Row */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-green-600 font-semibold border border-green-600 rounded px-1">
                PACKAGE
              </span>
              <div className="flex items-center ml-auto gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold">{rating}</span>
                <span className="text-[10px] text-gray-500">
                  ({reviews} Reviews)
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-[16px] font-bold text-black mb-2">{title}</h3>

            {/* Services Grouped by Category */}
            <div className="text-[13px] text-[#4b4b4b] mb-3">
              {groupedServices.map(({ category, titles }, index) => (
                <div key={index} className="mb-2">
                  <strong>{category}:</strong> {titles.join(", ")}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-start gap-4 ">
            <button
              onClick={handleEdit}
              className="flex items-center gap-1 text-[12px] text-black border border-black px-2 py-[5px] rounded-md hover:bg-gray-100"
            >
              Edit Your Package
            </button>

            <div className="flex items-center gap-2 text-xs text-black">
              <Clock className="w-3 h-3" />
              {duration}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-[140px] relative flex flex-col items-center justify-between p-2 mb-2">
          <img
            src={image || "https://via.placeholder.com/140x85"}
            alt={title}
            className="rounded-md w-full h-[85px] object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/140x85";
            }}
          />

          {/* Price */}
          <div className="text-[14px] font-bold text-black mt-2">
            ₹ {discountPrice}
          </div>

          {/* Add / Quantity Controls */}
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="mt-2 border border-[#FF5534] text-[#FF5534] text-[13px] font-semibold px-6 py-[5px] rounded-md hover:bg-[#ff553419]"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-3 bg-blue-100 rounded-full px-3 py-1 mt-2">
              <button
                onClick={handleDecrement}
                className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-50"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-medium w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-50"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

PackageCard.displayName = "PackageCard";

export default PackageCard;