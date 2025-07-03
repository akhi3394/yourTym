import React, { useState, useEffect, useMemo } from 'react';
import { X, Star, ChevronDown } from 'lucide-react';

const EditPackageModal = ({ isOpen, onClose, packages, onSave, services: womensServices }) => {
  const [selectedServices, setSelectedServices] = useState({});
  const [totalPrice, setTotalPrice] = useState({ original: 0, discount: 0 });

  // Group services by category outside render logic
  const groupedServices = useMemo(() => {
    if (!packages?.services) return {};
    const serviceMap = {};
    packages.services.forEach((service) => {
      const categoryName = service.category?.categoryId?.name || 'Other';
      if (!serviceMap[categoryName]) serviceMap[categoryName] = [];
      serviceMap[categoryName].push(service);
    });
    return serviceMap;
  }, [packages]);

  useEffect(() => {
    if (packages && womensServices) {
      // Initialize selectedServices with all services from the package, checked by default
      const initialServices = {};
      packages.services.forEach((service) => {
        const serviceData = womensServices.find(s => s._id === service._id);
        initialServices[service._id] = {
          selected: true,
          option: serviceData?.title || '',
        };
      });
      setSelectedServices(initialServices);

      // Initialize total price with package's default values, adjusted by services
      const priceCalc = packages.services.reduce((acc, service) => {
        const serviceData = womensServices.find(s => s._id === service._id) || {};
        const discountPrice = serviceData.price || 0;
        return {
          original: acc.original, // No originalPrice in womensServices, keep package's originalPrice
          discount: acc.discount + discountPrice,
        };
      }, { original: packages.originalPrice || 0, discount: packages.discountPrice || 0 });
      setTotalPrice(priceCalc);
    }
  }, [packages, womensServices]);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => {
      const current = prev[serviceId] || { selected: false };
      const updated = {
        ...prev,
        [serviceId]: {
          ...current,
          selected: !current.selected,
        },
      };
      if (!updated[serviceId].selected) {
        console.log(`Unchecked service with _id: ${serviceId}`);
      }
      // Recalculate total price
      const newTotal = Object.entries(updated).reduce((acc, [id, { selected }]) => {
        if (selected) {
          const service = packages.services.find(s => s._id === id);
          const serviceData = womensServices.find(s => s._id === service._id) || {};
          const discountPrice = serviceData.price || 0;
          return {
            original: acc.original, // No originalPrice adjustment
            discount: acc.discount + discountPrice,
          };
        }
        return acc;
      }, { original: packages.originalPrice || 0, discount: 0 });
      setTotalPrice(newTotal);
      return updated;
    });
  };

  const handleOptionChange = (serviceId, option) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        option,
      },
    }));
  };

  const handleSave = () => {
    const selectedServiceIds = Object.entries(selectedServices)
      .filter(([_, { selected }]) => selected)
      .map(([id]) => id);
    onSave({ ...packages, selectedServices: selectedServiceIds });
  };

  if (!isOpen) return null;

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
                    <span className="text-xs font-medium">{packages?.rating || 0}</span>
                    <span className="text-xs text-gray-500">
                      ({packages?.reviews || 0} Reviews)
                    </span>
                  </div>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mt-1">{packages?.title || 'Untitled Package'}</h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {packages?.description && (
              <p>{packages.description.replace(/<br\s*\/?>/gi, '').replace(/<\/?p>/gi, '')}</p>
            )}
          </div>
        </div>

        {/* Services List */}
        <div className="overflow-y-auto custom-scrollbar max-h-[60vh]">
          {Object.entries(groupedServices).map(([category, services], index) => (
            <div key={index} className="px-6 py-4 border-t border-gray-100 first:border-t-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
              {services.map((service) => {
                const serviceData = womensServices.find(s => s._id === service._id) || {};
                const relatedServices = womensServices.filter(s => s.title === service.title);
                const options = relatedServices.length > 1
                  ? Array.from(new Set(relatedServices.map(s => s.title)))
                  : [];
                const discountPrice = serviceData.price || 0;
                const originalPrice = packages.originalPrice / packages.services.length || 0; // Approximate split

                return (
                  <div key={service._id} className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        checked={selectedServices[service._id]?.selected || false}
                        onChange={() => handleServiceToggle(service._id)}
                        className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">
                            {service.title} - {serviceData.timeInMin ? `${Math.floor(serviceData.timeInMin / 60)} hr ${serviceData.timeInMin % 60} min` : 'N/A'}
                          </span>
                          {options.length > 1 && (
                            <div className="relative">
                              <select
                                value={selectedServices[service._id]?.option || options[0]}
                                onChange={(e) => handleOptionChange(service._id, e.target.value)}
                                className="appearance-none bg-gray-50 border border-gray-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                              >
                                {options.map((opt, idx) => (
                                  <option key={idx} value={opt}>{opt}</option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-gray-400 line-through text-sm">₹ {originalPrice.toFixed(2)} /-</span>
                          <span className="text-green-600 font-semibold">₹ {discountPrice.toFixed(2)} /-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-3 items-center">
            <p className="text-lg font-semibold">
              ₹ {totalPrice.discount.toFixed(2)} <span className="text-gray-500 text-sm line-through ml-2">₹ {totalPrice.original.toFixed(2)} /-</span>
            </p>
            <button
              onClick={handleSave}
              className="flex-1 bg-[#FF5534] text-white py-3 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors"
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