import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Star, ChevronDown } from 'lucide-react';

const EditPackageModal = ({ isOpen, onClose, packages, onSave, packagesData }) => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [packageTitle, setPackageTitle] = useState('');
  const [packagePrice, setPackagePrice] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState({}); // Track open state of select inputs
  const [subCategorySelections, setSubCategorySelections] = useState({}); // Track subcategory checkbox states

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
                originalPrice: serviceItem.location?.[0]?.originalPrice || 0,
                discountActive: serviceItem.location?.[0]?.discountActive || false,
                subCategoryName: subCat.subCategoryId?.name || 'Unknown',
                subCategoryId: subCat.subCategoryId?._id || 'unknown',
                timeInMin: serviceItem.timeInMin || 0,
                packageId: pkg._id,
                categoryName: service.category?.categoryId?.name || 'Unknown',
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

      // Initialize subcategory selections based on whether all services in a subcategory are selected
      const initialSubCategorySelections = {};
      packagesData.forEach(pkg => {
        pkg.services?.forEach(service => {
          service.category?.subCategory?.forEach(subCat => {
            const subCategoryId = subCat.subCategoryId?._id || 'unknown';
            const subCategoryServices = subCat.services?.map(s => s._id) || [];
            const allSelected = subCategoryServices.length > 0 && subCategoryServices.every(id => initialSelected.includes(id));
            initialSubCategorySelections[subCategoryId] = allSelected;
          });
        });
      });
      setSubCategorySelections(initialSubCategorySelections);
    }
  }, [isOpen, packages, packagesData]);

  const handleSelectToggle = (subCategoryId) => {
    setIsSelectOpen(prev => ({
      ...prev,
      [subCategoryId]: !prev[subCategoryId],
    }));
  };

  const handleCheckboxChange = (subCategoryId, serviceId, price) => {
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

      // Update subcategory checkbox state
      setSubCategorySelections(prev => {
        const updated = { ...prev };
        const subCategoryServices = packagesData
          .flatMap(pkg => pkg.services || [])
          .flatMap(s => s.category?.subCategory || [])
          .find(sc => sc.subCategoryId?._id === subCategoryId)?.services || [];
        const subCategoryServiceIds = subCategoryServices.map(s => s._id);
        updated[subCategoryId] = subCategoryServiceIds.length > 0 && subCategoryServiceIds.every(id => newSelected.includes(id));
        return updated;
      });

      return newSelected;
    });
  };

  const handleSaveSelection = (subCategoryId) => {
    setIsSelectOpen(prev => ({ ...prev, [subCategoryId]: false }));
  };

  const handleSubCategoryCheckboxChange = (subCategoryId, subCategoryServices) => {
    setSubCategorySelections(prev => ({
      ...prev,
      [subCategoryId]: !prev[subCategoryId],
    }));

    setSelectedServices(prev => {
      const newSelected = [...prev];
      const serviceIds = subCategoryServices.map(s => s._id);
      if (!subCategorySelections[subCategoryId]) {
        // Select all services in the subcategory
        serviceIds.forEach(id => {
          if (!newSelected.includes(id)) {
            newSelected.push(id);
          }
        });
      } else {
        // Deselect all services in the subcategory
        serviceIds.forEach(id => {
          const index = newSelected.indexOf(id);
          if (index > -1) {
            newSelected.splice(index, 1);
          }
        });
      }

      // Calculate total package price using unique selected service IDs
      const allServices = packagesData
        .flatMap(pkg => pkg.services || [])
        .flatMap(s => s.category?.subCategory?.flatMap(sc => sc.services || []) || []);
      const uniqueServices = allServices.filter(s => newSelected.includes(s._id));
      const newPrice = uniqueServices.length > 0
        ? uniqueServices.reduce((sum, s) => sum + (s.location?.[0]?.discountActive ? s.location[0].discountPrice : s.location?.[0]?.originalPrice || 0), 0)
        : 0;
      console.log(`Subcategory ${subCategoryId} price: ₹${subCategoryServices.reduce((sum, s) => sum + (s.location?.[0]?.discountActive ? s.location[0].discountPrice : s.location?.[0]?.originalPrice || 0), 0)}`);
      console.log(`Total package price: ₹${newPrice}`);
      setPackagePrice(newPrice);

      return newSelected;
    });
  };
  const handleSave = () => {
    onSave({ packageId: selectedPackageId, serviceIds: selectedServices });
    onClose();
  };

  function cleanAndFormatDescription(htmlString) {
    let formatted = htmlString.replace(/( \s*){2,}/gi, '\n');
    formatted = formatted.replace(/ /gi, ' ');
    formatted = formatted.replace(/<[^>]*>/g, '');
    return formatted;
  }

  // Calculate total price and time for a subcategory
  const calculateSubCategoryPriceAndTime = (services) => {
    const totalPrice = services.reduce((sum, service) => {
      const price = service.location?.[0]?.discountActive
        ? service.location[0].discountPrice
        : service.location?.[0]?.originalPrice || 0;
      return sum + price;
    }, 0);

    const totalOriginalPrice = services.reduce((sum, service) => {
      return sum + (service.location?.[0]?.originalPrice || 0);
    }, 0);

    const totalTime = services.reduce((sum, service) => sum + (service.timeInMin || 0), 0);
    const hours = Math.floor(totalTime / 60);
    const minutes = totalTime % 60;
    const formattedTime = `${hours > 0 ? `${hours} hr ` : ''}${minutes > 0 ? `${minutes} min` : ''}`.trim();

    return { totalPrice, totalOriginalPrice, formattedTime };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
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
              <div key={pkg._id}>
                <h3 className="text-lg font-bold mb-2">{pkg.title}</h3>
                <div className="flex justify-between">
                  <div
                    className="text-[14px] font-medium mb-2 whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: pkg.description || "no description" }}
                  />
                  <img src={pkg.images[0].img} alt="image" className="w-[100px] h-[100px] bg-cover rounded-[10px]" />
                </div>
                <div className="border-t-2 border-dashed mb-5 mt-4"></div>
                {pkg.services?.map((service, sIdx) => {
                  const categoryName = service.category?.categoryId?.name || 'Unknown';
                  return (
                    <div key={`${pkgIdx}-${sIdx}`} className="mb-4">
                      <p className="text-[20px] text-[#000000] font-bold mt-1 mb-5">{categoryName}</p>
                      {service.category?.subCategory?.map((subCat, scIdx) => {
                        const subCategoryId = subCat.subCategoryId?._id || `unknown-${pkgIdx}-${sIdx}-${scIdx}`;
                        const { totalPrice, totalOriginalPrice, formattedTime } = calculateSubCategoryPriceAndTime(subCat.services || []);
                        const selectedServiceTitles = subCat.services
                          .filter(s => selectedServices.includes(s._id))
                          .map(s => s.title);
                        const displayText = selectedServiceTitles.length > 0
                          ? `${selectedServiceTitles[0]}${selectedServiceTitles.length > 1 ? ',...' : ''}`
                          : 'Select';
                        return (
                          <div key={`${pkgIdx}-${sIdx}-${scIdx}`} className="mb-2">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`subcategory-${subCategoryId}`}
                                    checked={subCategorySelections[subCategoryId] || false}
                                    onChange={() => handleSubCategoryCheckboxChange(subCategoryId, subCat.services || [])}
                                    className="mr-2"
                                  />
                                  <label
                                    htmlFor={`subcategory-${subCategoryId}`}
                                    className="text-[14px] font-semibold"
                                  >
                                    {subCat.subCategoryId?.name || 'Unknown'} - {formattedTime}
                                  </label>
                                </div>
                                <div className="text-[12px] mt-1 ml-6">
                                  <span className="text-gray-500 line-through mr-2">₹{totalOriginalPrice}</span>
                                  <span className="font-medium text-[#00CB36]">₹{totalPrice}</span>
                                </div>
                              </div>
                              <div className="relative">
                                <button
                                  onClick={() => handleSelectToggle(subCategoryId)}
                                  className="w-20 rounded-[8px] truncate border border-gray-300 p-1 text-[14px] text-left bg-white focus:outline-none flex items-center justify-between"
                                >
                                  <span>{displayText}</span>
                                  <ChevronDown className="w-4 h-4" />
                                </button>
                                {isSelectOpen[subCategoryId] && (
                                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                    <div className="bg-white rounded-lg p-4 w-[512px] max-h-[80vh] overflow-y-auto shadow-lg">
                                      <h3 className="text-lg font-semibold mb-4">Choose the type of {categoryName}</h3>
                                      {subCat.services?.map((serviceItem) => (
                                        <div key={serviceItem._id} className="flex items-center mb-2">
                                          <input
                                            type="checkbox"
                                            id={serviceItem._id}
                                            checked={selectedServices.includes(serviceItem._id)}
                                            onChange={() =>
                                              handleCheckboxChange(
                                                subCategoryId,
                                                serviceItem._id,
                                                serviceItem.location?.[0]?.discountActive
                                                  ? serviceItem.location[0].discountPrice
                                                  : serviceItem.location?.[0]?.originalPrice || 0
                                              )
                                            }
                                            className="mr-2"
                                          />
                                          <label
                                            htmlFor={serviceItem._id}
                                            className="flex justify-between w-full text-[14px]"
                                          >
                                            <span>{serviceItem.title}</span>
                                            <span className="flex items-center">
                                              {serviceItem.location?.[0]?.discountActive ? (
                                                <>
                                                  <span className="text-gray-500 line-through mr-2">
                                                    ₹{serviceItem.location[0].originalPrice}
                                                  </span>
                                                  <span className="text-[#00CB36]">
                                                    ₹{serviceItem.location[0].discountPrice}
                                                  </span>
                                                </>
                                              ) : (
                                                <span>₹{serviceItem.location?.[0]?.originalPrice || 0}</span>
                                              )}
                                            </span>
                                          </label>
                                        </div>
                                      ))}
                                      <div className="mt-4 flex justify-end">
                                        <button
                                          onClick={() => handleSaveSelection(subCategoryId)}
                                          className="px-4 py-1 border border-[#FF5534] text-[#FF5534] rounded-[10px] text-[14px]"
                                        >
                                          Done
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="border-b border-gray-200" style={{ borderBottomWidth: '5px' }}></div>
                    </div>
                  );
                })}
              </div>
            ))}
        </div>
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 border border-[#000000] rounded-[10px] text-[#000000] text-[14px]"
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