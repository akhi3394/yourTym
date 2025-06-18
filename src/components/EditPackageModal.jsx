import React, { useState } from 'react';
import { X, Star, ChevronDown } from 'lucide-react';

const EditPackageModal = ({ isOpen, onClose }) => {
  const [selectedServices, setSelectedServices] = useState({
    fullLegsWaxing: { selected: true, option: 'Honey' },
    fullArmsWaxing: { selected: false, option: 'Honey' },
    fullBodyWaxing: { selected: false, option: 'Honey' },
    fullBodyBleach: { selected: true, option: 'Honey' },
    fullLegsBleach: { selected: false, option: '' },
    faceNeckBleach: { selected: false, option: '' },
    fullBodyBleachLong: { selected: false, option: '' }
  });

  if (!isOpen) return null;

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        selected: !prev[serviceId].selected
      }
    }));
  };

  const handleOptionChange = (serviceId, option) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        option: option
      }
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-white px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
      
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-md">
                    PACKAGE
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">4.9</span>
                    <span className="text-xs text-gray-500">(500 Reviews)</span>
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mt-1">Complete wax (ALL in One )</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Package Description */}
          <div className="mt-4 text-sm text-gray-600">
            <p><span className="font-medium">Waxing</span> - Full legs ,Full arms,full body ,honey wax , Roll-on</p>
            <p><span className="font-medium">Bleach + Massage</span> - Olivia , Oxylife Bleach</p>
          </div>
        </div>

        {/* Services List */}
        <div className="overflow-y-auto custom-scrollbar max-h-[60vh]">
          {/* Waxing Section */}
          <div className="px-6 py-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Waxing</h3>
            
            {/* Full Legs Waxing */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={selectedServices.fullLegsWaxing.selected}
                  onChange={() => handleServiceToggle('fullLegsWaxing')}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Full Legs Waxing (Honey) - 30 Min</span>
                    <div className="relative">
                      <select
                        value={selectedServices.fullLegsWaxing.option}
                        onChange={(e) => handleOptionChange('fullLegsWaxing', e.target.value)}
                        className="appearance-none bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="Honey">Honey...</option>
                        <option value="Wax">Wax...</option>
                        <option value="Sugar">Sugar...</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm">₹ 399/-</span>
                    <span className="text-green-600 font-semibold">₹ 299/-</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Arms + Underarms Waxing */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={selectedServices.fullArmsWaxing.selected}
                  onChange={() => handleServiceToggle('fullArmsWaxing')}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Full arms + Underarms waxing - 30 Min</span>
                    <div className="relative">
                      <select
                        value={selectedServices.fullArmsWaxing.option}
                        onChange={(e) => handleOptionChange('fullArmsWaxing', e.target.value)}
                        className="appearance-none bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="Honey">Honey...</option>
                        <option value="Wax">Wax...</option>
                        <option value="Sugar">Sugar...</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm">₹ 399/-</span>
                    <span className="text-green-600 font-semibold">₹ 299/-</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Body Waxing */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={selectedServices.fullBodyWaxing.selected}
                  onChange={() => handleServiceToggle('fullBodyWaxing')}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Full body waxing (Honey) - 1 hr 40 min</span>
                    <div className="relative">
                      <select
                        value={selectedServices.fullBodyWaxing.option}
                        onChange={(e) => handleOptionChange('fullBodyWaxing', e.target.value)}
                        className="appearance-none bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                      >
                        <option value="Honey">Honey...</option>
                        <option value="Wax">Wax...</option>
                        <option value="Sugar">Sugar...</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm">₹ 2099/-</span>
                    <span className="text-green-600 font-semibold">₹ 1199/-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Olivia Herb Bleach Section */}
          <div className="px-6 py-4 border-t border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Olivia Herb Bleach</h3>
            
            {/* Full Body Waxing (Honey) */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={selectedServices.fullBodyBleach.selected}
                  onChange={() => handleServiceToggle('fullBodyBleach')}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="font-medium text-gray-900">Full body waxing (Honey) - 30 min</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm">₹ 2099/-</span>
                    <span className="text-green-600 font-semibold">₹ 399/-</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Legs */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={selectedServices.fullLegsBleach.selected}
                  onChange={() => handleServiceToggle('fullLegsBleach')}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="font-medium text-gray-900">Full Legs - 40 min</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm">₹ 2099/-</span>
                    <span className="text-green-600 font-semibold">₹ 549/-</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Face + Neck */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={selectedServices.faceNeckBleach.selected}
                  onChange={() => handleServiceToggle('faceNeckBleach')}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="font-medium text-gray-900">Face + Neck - 20 min</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm">₹ 2099/-</span>
                    <span className="text-green-600 font-semibold">₹ 299/-</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Body - 120 min */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  checked={selectedServices.fullBodyBleachLong.selected}
                  onChange={() => handleServiceToggle('fullBodyBleachLong')}
                  className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="font-medium text-gray-900">Full Body - 120 min</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm">₹ 2099/-</span>
                    <span className="text-green-600 font-semibold">₹ 1299/-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-3  items-center">
           <p>₹6,997</p>
            <button
              onClick={onClose}
              className="flex-1 bg-[#FF5534]  text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
            > 
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPackageModal;