import React from 'react';
import { Star, Clock } from 'lucide-react';

const ServiceCard = ({ service, onAddOption, onAddToCart, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 shadow-sm h-[350px] w-full animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-5 w-1/2 bg-gray-200 rounded mb-2"></div>
          <div className="flex items-center gap-1 mb-3">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-10 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-5 w-16 bg-gray-200 rounded"></div>
            <div className="h-5 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 rounded ml-auto"></div>
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-1/2 bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-1/2 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 shadow-sm h-[350px] w-full flex items-center justify-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-4 shadow-sm">
      <div className="relative h-48">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
          onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
        />
        <div className="absolute top-4 left-4">
          <h3 className="text-2xl font-semibold text-white mb-1">{service.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2">{service.title}</h4>
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{service.rating}</span>
              <span className="text-sm text-gray-500">({service.reviews} Reviews)</span>
            </div>
          </div>
          <div className="w-16 h-16 ml-4">
            <img
              src={service.image}
              alt="Product"
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
            />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            {service.originalPrice > service.price && (
              <span className="text-gray-500 line-through text-lg">₹{service.originalPrice}</span>
            )}
            <span className="font-bold text-green-600 text-xl">₹{service.price}/-</span>
            <div className="flex items-center gap-1 text-gray-500 ml-auto">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{service.totalTime}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => onAddOption(service)}
            className="flex-1 border border-gray-300 text-gray-700 text-sm font-medium py-2.5 px-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Detail
          </button>
          <button
            onClick={() => onAddToCart(service)}
            className="flex-1 bg-[#fff] text-[#FF5534] text-sm font-medium py-2.5 px-4 rounded-lg border border-[#FF5534]"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;