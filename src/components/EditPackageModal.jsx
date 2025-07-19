import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react';

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
  function cleanAndFormatDescription(htmlString) {
    // Replace multiple &nbsp; with line breaks
    let formatted = htmlString.replace(/(&nbsp;\s*){2,}/gi, '\n');

    // Replace remaining &nbsp; with single space
    formatted = formatted.replace(/&nbsp;/gi, ' ');

    // Remove HTML tags
    formatted = formatted.replace(/<[^>]*>/g, '');

    return formatted;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {/* {packagesData && packagesData[0]?.mainCategoryId?.image && (
          <img
            src={packagesData[0].mainCategoryId.image}
            alt={packagesData[0].mainCategoryId.name || 'Main Category Image'}
            className="w-full h-32 object-cover mb-4 rounded"
          />
        )} */}
        {/* <h2 className="text-xl font-semibold mb-4">{packageTitle}</h2> */}
        {/* <p className="text-lg font-medium mb-4">Total Price: ₹{packagePrice}</p> */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] text-green-600 font-semibold border border-green-600 rounded px-1">
            PACKAGE
          </span>
          <div className="flex items-center ml-auto gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold">4.5</span>
            <span className="text-[10px] text-gray-500">
              (500 Reviews)
            </span>
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          {packagesData && packagesData
            .filter(pkg => pkg._id === selectedPackageId)
            .map((pkg, pkgIdx) => (
              <div key={pkg._id} className="mb-4">
                <h3 className="text-lg font-bold mb-2">{pkg.title}</h3>
                <div className="flex justify-between">
                  <div
                    className="text-[14px] font-medium mb-2 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: pkg.description || "no description" }}
                  />
                  <img src={pkg.images[0].img} alt="image" className='w-[100px] h-[100px] bg-cover rounded-[10px]' />
                </div>

                {pkg.services?.map((service, sIdx) =>
                  service.category?.subCategory?.map((subCat, scIdx) => (
                    <div key={`${pkgIdx}-${sIdx}-${scIdx}`} className="mb-2">
                      <h4 className="text-[14px] font-semibold mb-1">{subCat.subCategoryId?.name || 'Unknown'}</h4>
                      {subCat.services?.map((serviceItem, siIdx) => (
                        <div key={serviceItem._id} className="flex items-center mb-2 ml-4">
                          <input
                            type="checkbox"
                            id={serviceItem._id}
                            checked={selectedServices.includes(serviceItem._id)}
                            onChange={() => handleCheckboxChange(serviceItem._id, serviceItem.location?.[0]?.discountActive ? serviceItem.location[0].discountPrice : serviceItem.location?.[0]?.originalPrice || 0)}
                            className="mr-2"
                          />
                          <label htmlFor={serviceItem._id} className="flex-1 text-[14px]">
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
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4  border border-[#000000] rounded-[10px] text-[#000000] text-[14px]"
          >
            Cancel
          </button>
          <div className="flex gap-5 items-center">
            <p className="text-[14px] font-medium mb-4">₹{packagePrice}</p>
            <button
              onClick={handleSave}
              className="px-4 py-2 border border-[#FF5534] text-[#FF5534] rounded-[10px] text-[14px]"
            >
              Save
            </button>
          </div>
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