import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const EditPackageModal = ({ isOpen, onClose, packages, onSave, packagesData }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [packageTitle, setPackageTitle] = useState('');
  const [packagePrice, setPackagePrice] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState('');

  useEffect(() => {
    if (isOpen && packagesData && packagesData.length > 0) {
      const initialPackage = packages || packagesData[0];
      setPackageTitle(initialPackage.title || 'Custom Package');
      setSelectedPackageId(initialPackage._id || packagesData[0]?._id);

      // Extract all services from all packages in packagesData
      const allServices = [];
      packagesData.forEach(pkg => {
        pkg.services?.forEach(service => {
          service.category?.subCategory?.forEach(subCat => {
            subCat.services?.forEach(serviceItem => {
              allServices.push({
                _id: serviceItem._id,
                title: serviceItem.title,
                price: serviceItem.location?.[0]?.discountActive
                  ? serviceItem.location[0].discountPrice
                  : serviceItem.location?.[0]?.originalPrice || 0,
                selected: false,
                subCategoryName: subCat.subCategoryId?.name || 'Unknown',
                packageId: pkg._id,
              });
            });
          });
        });
      });

      // Set initial selected services based on editingPackage or default to empty
      const initialSelected = packages?.services
        ? packages.services
            .flatMap(s => s.category?.subCategory?.flatMap(sc => sc.services || []))
            .filter(s => s?.selected)
            .map(s => s._id)
        : [];
      setSelectedServices(initialSelected);

      // Calculate initial price based on selected services
      const totalPrice = allServices
        .filter(s => initialSelected.includes(s._id))
        .reduce((sum, s) => sum + s.price, 0);
      setPackagePrice(totalPrice);
    }
  }, [isOpen, packages, packagesData]);

  const handleCheckboxChange = (serviceId, price) => {
    setSelectedServices(prev => {
      const newSelected = prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId];
      const newPrice = newSelected.length > 0
        ? packagesData
            .flatMap(pkg => pkg.services || [])
            .flatMap(s => s.category?.subCategory?.flatMap(sc => sc.services || []) || [])
            .filter(s => newSelected.includes(s._id))
            .reduce((sum, s) => sum + (s.location?.[0]?.discountActive ? s.location[0].discountPrice : s.location?.[0]?.originalPrice || 0), 0)
        : 0;
      setPackagePrice(newPrice);
      return newSelected;
    });
  };

  const handleSave = () => {
    onSave({ packageId: selectedPackageId, serviceIds: selectedServices });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {packagesData && packagesData[0]?.mainCategoryId?.image && (
          <img
            src={packagesData[0].mainCategoryId.image}
            alt={packagesData[0].mainCategoryId.name || 'Main Category Image'}
            className="w-full h-32 object-cover mb-4 rounded"
          />
        )}
        <h2 className="text-xl font-semibold mb-4">{packageTitle}</h2>
        <p className="text-lg font-medium mb-4">Total Price: ₹{packagePrice}</p>
        <div className="max-h-64 overflow-y-auto">
          {packagesData && packagesData
            .filter(pkg => pkg._id === selectedPackageId)
            .map((pkg, pkgIdx) => (
              <div key={pkg._id} className="mb-4">
                <h3 className="text-lg font-medium mb-2">{pkg.title}</h3>
                {pkg.services?.map((service, sIdx) =>
                  service.category?.subCategory?.map((subCat, scIdx) => (
                    <div key={`${pkgIdx}-${sIdx}-${scIdx}`} className="mb-2">
                      <h4 className="text-md font-semibold mb-1">{subCat.subCategoryId?.name || 'Unknown'}</h4>
                      {subCat.services?.map((serviceItem, siIdx) => (
                        <div key={serviceItem._id} className="flex items-center mb-2 ml-4">
                          <input
                            type="checkbox"
                            id={serviceItem._id}
                            checked={selectedServices.includes(serviceItem._id)}
                            onChange={() => handleCheckboxChange(serviceItem._id, serviceItem.location?.[0]?.discountActive ? serviceItem.location[0].discountPrice : serviceItem.location?.[0]?.originalPrice || 0)}
                            className="mr-2"
                          />
                          <label htmlFor={serviceItem._id} className="flex-1">
                            {serviceItem.title} - ₹{serviceItem.location?.[0]?.discountActive ? serviceItem.location[0].discountPrice : serviceItem.location?.[0]?.originalPrice || 0}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            ))}
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

EditPackageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  packages: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  packagesData: PropTypes.array,
};

export default EditPackageModal;