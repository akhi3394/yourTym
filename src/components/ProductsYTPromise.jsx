import React from 'react';
import ytPromise from '../assets/images/ytpromise/handinMedal.png'

const ProductsYTPromise = () => {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Yourtym Promise</h3>
      </div>
      <div className="flex justify-between items-center gap-5">
        <div className="flex flex-col gap-y-4"> {/* Vertical gap between points */}
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-sm">✓</span>
            <span className="text-sm text-gray-700">4.5+ Rated Beauticians</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-sm">✓</span>
            <span className="text-sm text-gray-700">Luxury Salon Experience</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-500 text-sm">✓</span>
            <span className="text-sm text-gray-700">Premium Branded Products</span>
          </div>
        </div>
        <div className="flex items-center">
          <img src={ytPromise} alt="ytpromise" />
        </div>
      </div>
    </div>
  );
};

export default ProductsYTPromise;
