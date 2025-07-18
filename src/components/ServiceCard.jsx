import { useState } from "react";
import { useGetServicesByCategoryQuery } from "../store/api/productsApi";
import useCart from "../hooks/useCart";
import CircularLoader from "./CircularLoader";
import { toast } from "sonner";

const ServiceCard = ({ subCategories }) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);

  const {
    addToCartSingleServices,
    serviceApiSuccess
  } = useCart();

  const handleAddOptionClick = (item) => {
    setSelectedSubCategory({
      mainCategoryId: item.mainCategoryId?._id,
      categoryId: item.categoryId?._id,
      subCategoryId: item._id,
    });
    setIsLoadingAdd(true);
    setTimeout(() => {
      setIsPopupOpen(true);
      setIsLoadingAdd(false);
    }, 1000); // Simulate API delay
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedSubCategory(null);
  };

  const handleAddToCart = async (item) => {
    try {
      console.log(item, "utemsdds");
      setIsLoadingAdd(true);

      const response = await addToCartSingleServices(
        item._id,
        1,
        item.location?.[0]?.sector || "67beed95c3e00990a579d596"
      );

      console.log(response, "fromresponse");

      if (response?.status === 200) {
        toast.info("Service Added to Cart");
        closePopup();
      } else {
        toast.error("Failed to add service to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoadingAdd(false);
    }
  };



  const { data: servicesData, isLoading, error } = useGetServicesByCategoryQuery(
    selectedSubCategory || {},
    { skip: !selectedSubCategory }
  );

  const filteredServices = servicesData?.data?.filter(
    (service) => service.subCategoryId?._id === selectedSubCategory?.subCategoryId
  ) || [];

  return (
    <div className="w-full max-w-3xl mt-5">
      {subCategories?.map((item, index) => (
        <><div key={item?._id || `separator-${index}`} id={item.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")} className="mb-6">
          {item?.type === "separator" ? (
            <div className="category-header">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{item?.name}</h2>
              <img
                src={item?.image}
                alt={item?.name || "Category Image"}
                className="w-full h-48 object-cover rounded-lg" />
            </div>
          ) : (
            <div className="subcategory-item bg-white rounded-lg p-5 shadow-md border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-semibold text-[#000] flex flex-col">
                    {item?.name}
                    <span className="text-[#000] ml-2 text-[14px] font-normal text-start">⭐ 4.9 (500 Reviews)</span>
                  </h3>
                  <p className="text-[#000000] text-[14px] mt-2" dangerouslySetInnerHTML={{ __html: item?.description || "No description available" }} />
                </div>
                <img
                  src={item?.image}
                  alt={item?.name || "Service Image"}
                  className="w-20 h-20 object-cover rounded-lg ml-4" />
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  className="px-4 py-1 border border-[#000000] rounded-[10px] text-[#000000]"
                  onClick={() => handleAddOptionClick(item)}
                  disabled={!item?._id}
                >
                  Add Option
                </button>
                <button
                  className="px-4 py-1 border border-[#FF5534] text-[#FF5534] rounded-[10px]"
                  onClick={() => handleAddOptionClick(item)}
                  disabled={!item?._id}
                >
                  Add
                </button>
              </div>
            </div>
          )}
        </div><div className="border-b-4 border-[#EFEFEF] mb-3"></div></>
      ))}

      {(isPopupOpen) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md h-[500px] overflow-y-scroll border border-gray-300 flex flex-col">
            <img
              src={subCategories.find(item => item._id === selectedSubCategory?.subCategoryId)?.image}
              alt="Service Header"
              className="w-full h-[120px] object-cover rounded-t-lg"
            />
            <div className="p-4 flex flex-col gap-4 flex-1 overflow-y-auto">
              <div>
                <h2 className="text-[15px] font-semibold text-gray-800">{subCategories.find(item => item._id === selectedSubCategory?.subCategoryId)?.name}</h2>
                <p className="text-[13px] text-gray-600">✨ 4.9 (500 Reviews)</p>
              </div>

              {isLoadingAdd ? (
                <p className="text-[14px] flex justify-center"><CircularLoader /></p>
              ) : error ? (
                <p className="text-red-500 text-[14px]">Error loading options: {error.message}</p>
              ) : isLoading ? (
                <p className="text-[14px] flex justify-center"><CircularLoader /></p>
              ) : filteredServices.length > 0 ? (
                filteredServices.map((service, index) => (
                  <div
                    key={service?._id}
                    className="bg-white border border-gray-200 rounded-lg p-3 flex justify-between items-start relative shadow-sm"
                  >
                    <div className="flex-1">
                      <h3 className="text-[14px] font-semibold text-gray-800">
                        {service?.title || "Untitled"} – ₹{service?.location?.[0]?.discountPrice || "N/A"}/-
                      </h3>
                      <p className="text-[12px] text-gray-500 mt-1">30 min</p>
                      <div
                        className="text-[13px] text-gray-600 mt-2 leading-[18px]"
                        dangerouslySetInnerHTML={{ __html: service?.description || "No description available" }}
                      />
                    </div>

                    <div className="flex flex-col items-center justify-between ml-3 h-full">
                      <img
                        src={service?.images?.[0]?.img}
                        alt={service?.title || "Service"}
                        className="w-[60px] h-[60px] object-cover rounded-lg"
                      />
                      <button
                        className="mt-2 px-6 py-[6px] bg-[#ff5c39] text-white text-sm font-medium rounded hover:bg-[#e94f2f] transition"
                        disabled={!service?.location?.[0]?.discountPrice || isLoadingAdd}
                        onClick={() => handleAddToCart(service)}
                      >
                        {isLoadingAdd ? "Adding..." : "Add"}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-[14px] flex justify-center"><CircularLoader size={20} /></p>
              )}
            </div>
            <div className="p-4 border-t border-gray-200">
              <button
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 text-sm"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ServiceCard;