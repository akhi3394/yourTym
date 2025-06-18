import React from "react";
import { X } from "lucide-react";

const ratings = [1, 2, 3]; // simulate multiple ratings

const MyRatingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl w-full max-w-xl overflow-y-auto max-h-[90vh] shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">My rating</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          {ratings.map((_, idx) => (
            <div
              key={idx}
              className="bg-[#F9FAFB] border border-gray-200 rounded-lg p-4 space-y-2"
            >
              <p className="font-semibold text-sm border-b border-dashed border-gray-400 pb-1">
                Order Id : 1669297452
              </p>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-base">Salon at Home</p>
                  <p className="text-sm text-gray-500">08-May, 2023 Mon, 16:30–17:00</p>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-xl font-semibold">4.3</span>
                  <div className="text-yellow-400 flex">
                    {"★".repeat(4)}
                    <span className="text-gray-300">★</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor
                invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
                et justo duo dolores et ea rebum.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRatingModal;
