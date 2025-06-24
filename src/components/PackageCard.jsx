import React from 'react';
import { Star } from 'lucide-react';

const PackageCard = ({ package: pkg, onEditPackage, onAddToCart, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm h-[150px] w-full animate-pulse">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-5 w-16 bg-gray-200 rounded"></div>
              <div className="h-4 w-20 bg-gray-200 rounded ml-auto"></div>
            </div>
            <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>
          <div className="flex flex-col items-end justify-between w-20">
            <div className="h-16 w-16 bg-gray-200 rounded-lg"></div>
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm h-[150px] w-full flex items-center justify-center">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 shadow-sm">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded">
              PACKAGE
            </span>
            <div className="flex items-center gap-1 ml-auto">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{pkg.rating}</span>
              <span className="text-xs text-gray-500">({pkg.reviews} Reviews)</span>
            </div>
          </div>
          <h3 className="font-semibold text-base mb-2 text-gray-900">{pkg.title}</h3>
          <div className="text-sm text-gray-600 mb-4 space-y-1">
            {pkg.services?.map((service, index) => (
              <div key={service._id || index}>
                <span className="font-medium">{service.category?.categoryId?.name || 'Service'}</span>
                <span className="text-gray-500"> - {service.title}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={() => onEditPackage(pkg)}
              className="text-xs border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition-colors"
            >
              Edit Your Package
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>⏱</span>
              <span>{pkg.duration}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between w-20">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="w-16 h-16 object-cover rounded-lg"
            onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
          />
          <button
            onClick={() => onAddToCart(pkg)}
            className="text-sm bg-transparent border border-[#FF5534] text-[#FF5534] font-medium px-4 py-1.5 rounded-md transition-colors mt-2"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;