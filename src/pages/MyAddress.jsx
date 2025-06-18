import React, { useState } from "react";
import {
  Search,
  Calendar,
  Globe,
  ShoppingCart,
  User,
  Trash,
} from "lucide-react";

const MyAddress = () => {
  const [addresses] = useState([
    {
      id: 1,
      type: "Home",
      address: "Sector 9, Vijay Nagar, Ghaziabad, Uttar Pradesh...",
    },
    {
      id: 2,
      type: "Home",
      address: "Sector 9, Vijay Nagar, Ghaziabad, Uttar Pradesh...",
    },
    {
      id: 3,
      type: "Home",
      address: "Sector 9, Vijay Nagar, Ghaziabad, Uttar Pradesh...",
    },
  ]);

  const [selectedAddressType, setSelectedAddressType] = useState("Home");

  return (
    <div className="bg-gray-50 pt-[140px] pb-[80px] px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - My Address */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              My Address
            </h2>

            <div className="space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-white rounded-lg  border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <img
                        src="/circle.svg"
                        alt="Small dot"
                        className="w-3 h-3 mt-2 rounded-full"
                      />

                      <div>
                        <div className="font-medium text-gray-900 mb-1">
                          {address.type}
                        </div>
                        <div className="text-sm text-gray-600">
                          {address.address}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="text-red-500 hover:text-red-700">
                        <img
                          src="/delete.svg"
                          alt="Trash"
                          className="w-4 h-4"
                        />
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-gray-200 flex justify-center">
                    <button
                      className="text-sm text-[#000000] rounded-md hover:text-gray-900 hover:bg-gray-200 bg-[#F5F6FB] h-[50px]"
                      style={{ width: "327px" }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Add New Address */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Add New Address
            </h2>

            {/* Map */}
            <div className="bg-white rounded-t h-48 pb-6 relative overflow-hidden">
              <img
                src="/map.svg"
                alt="Map showing location"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/mapicon.svg"
                  alt="Centered Icon"
                  className="w-6 h-6"
                />
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4 p-4 bg-white">
              <input
                type="text"
                placeholder="House/Flat Number*"
                className="w-full px-4 py-2 border border-[#000000] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />

              <input
                type="text"
                placeholder="Apartment/Society/Building Name"
                className="w-full px-4 py-2 border border-[#000000] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />

              <input
                type="text"
                placeholder="Landmark (Optional)"
                className="w-full px-4 py-2 border border-[#000000] rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />

              {/* Save as */}
              <div className="pt-4">
                <label className="text-sm font-medium text-gray-700 mb-3 block">
                  Save as
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="home"
                      className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${
                        selectedAddressType === "Home"
                          ? "bg-red-100 text-[#FF5534] border border-red-300"
                          : "bg-white text-[#FF5534] border border-[#000000]"
                      }`}
                    >
                      Home
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label
                      htmlFor="other"
                      className={`px-3 py-1 rounded-lg text-sm cursor-pointer ${
                        selectedAddressType === "Other"
                          ? "  border border-[#000000]"
                          : "bg-white text-gray-700 border border-[#000000]"
                      }`}
                    >
                      Other
                    </label>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <button className="w-full bg-[#FF5534] font-bold hover:bg-[#ce4d34] text-white py-3 mt-6 rounded-lg text-sm ">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAddress;
