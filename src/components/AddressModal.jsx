import React, { useState, useEffect } from "react";
import { X, MapPin } from "lucide-react";
import { useAddNewAddressMutation } from "../store/api/productsApi";

const AddressModal = ({ isOpen, onClose, onSave, selectedAddress }) => {
  const [formData, setFormData] = useState({
    area: "",
    details: "",
    houseNumber: "",
    apartment: "",
    landmark: "",
    type: "Home",
  });
  const [isLocationEditable, setIsLocationEditable] = useState(true); // Controls whether area/details are editable
  const [addNewAddress, { isLoading, error }] = useAddNewAddressMutation();

  useEffect(() => {
    if (selectedAddress) {
      setFormData(selectedAddress);
      setIsLocationEditable(false); // If an address is pre-selected, make location non-editable initially
    }
  }, [selectedAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the payload for the API
    const addressPayload = {
      houseFlat: formData.houseNumber,
      appartment: formData.apartment,
      landMark: formData.landmark,
      houseType: formData.type.toLowerCase(),
    };

    try {
      const response = await addNewAddress(addressPayload).unwrap();
      console.log("Address saved successfully:", response);
      onSave(formData); // Pass form data to parent
      onClose(); // Close modal
    } catch (err) {
      console.error("Failed to save address:", err);
      alert(error?.data?.message || "Failed to save address");
    }
  };

  const handleChangeLocation = () => {
    setIsLocationEditable(true); // Enable editing of area and details
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Address</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Map Placeholder */}
        <div className="p-6 pb-4">
          <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 overflow-hidden">
            <div className="absolute inset-0 bg-opacity-20 bg-gray-200"></div>
            <div className="absolute top-4 left-4 w-6 h-6 bg-blue-500 rounded-full"></div>
            <div className="absolute top-8 right-8 w-6 h-6 bg-yellow-500 rounded-full"></div>
            <div className="absolute bottom-12 left-12 w-6 h-6 bg-green-500 rounded-full"></div>
            <div className="absolute bottom-8 right-12 w-6 h-6 bg-purple-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-12 h-12 bg-[#FF5534] rounded-full flex items-center justify-center shadow-lg">
                <MapPin size={24} className="text-white" />
              </div>
            </div>
          </div>

          {/* Location Inputs or Display */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            {isLocationEditable ? (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Area*"
                  value={formData.area}
                  onChange={(e) =>
                    setFormData({ ...formData, area: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5534] focus:border-[#FF5534] outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Full Address*"
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5534] focus:border-[#FF5534] outline-none"
                  required
                />
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {formData.area || "No area provided"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formData.details || "No address details provided"}
                  </p>
                </div>
                <button
                  onClick={handleChangeLocation}
                  className="text-[#FF5734] font-medium text-sm hover:text-red-600"
                >
                  Change
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-0">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="House/Flat Number*"
              value={formData.houseNumber}
              onChange={(e) =>
                setFormData({ ...formData, houseNumber: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:border-[#FF5733] outline-none"
              required
            />
            <input
              type="text"
              placeholder="Apartment/Society/Building Name"
              value={formData.apartment}
              onChange={(e) =>
                setFormData({ ...formData, apartment: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:border-[#FF5733] outline-none"
            />
            <input
              type="text"
              placeholder="Landmark (Optional)"
              value={formData.landmark}
              onChange={(e) =>
                setFormData({ ...formData, landmark: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF5733] focus:border-[#FF5733] outline-none"
            />
          </div>

          {/* Save As */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-900 mb-3">Save as</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "Home" })}
                className={`px-4 py-2 rounded-lg border font-medium text-sm ${
                  formData.type === "Home"
                    ? "bg-[#FF5733] text-white border-[#FF5733]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#FF5733]"
                }`}
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, type: "Other" })}
                className={`px-4 py-2 rounded-lg border font-medium text-sm ${
                  formData.type === "Other"
                    ? "bg-[#FF5733] text-white border-[#FF5733]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#FF5733]"
                }`}
              >
                Other
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-6 bg-[#FF5733] text-white py-3 rounded-lg font-medium hover:bg-red-600 transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Saving..." : "Save and Proceed to slots"}
          </button>

          {/* Error Message */}
          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error?.data?.message || "Failed to save address"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
