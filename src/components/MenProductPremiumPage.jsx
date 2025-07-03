import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryGrid from "../components/CategoryGrid";
import ProductsYTPromise from "../components/ProductsYTPromise";
import PackageCard from "../components/PackageCard";
import ServiceCard from "../components/ServiceCard";
import CartSidebar from "../components/CartSidebar";
import EditPackageModal from "../components/EditPackageModal";
import packageImage from "../assets/images/package.png";
import {
  useGetAllCategoriesQuery,
  useGetAllServicesQuery,
  useGetPackagesByMainCategoryQuery,
} from "../store/api/productsApi";
import useCart from "../hooks/useCart";

const MenProductPremiumPage = () => {
  const [editingPackage, setEditingPackage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("packages");
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const MAIN_CATEGORY_ID = "680f7ee387a593819687d9fd"; // Men's Premium ID

  const {
    cartItems,
    loading,
    error,
    addToCartPackage,
    removeCartPackage,
    updateCartPackage,
    updateQuantity,
    addToCartSingleServices,
    removeSingleService,
  } = useCart();

  const { data: categoriesData, isLoading: categoriesLoading } =
    useGetAllCategoriesQuery(undefined, { skip: !isAuthenticated });
  const { data: packagesData, isLoading: packagesLoading } =
    useGetPackagesByMainCategoryQuery(MAIN_CATEGORY_ID, {
      skip: !isAuthenticated,
    });
  const { data: servicesData, isLoading: servicesLoading, error: servicesError } =
    useGetAllServicesQuery(undefined, { skip: !isAuthenticated });

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const mensCategory = useMemo(() => {
    return (
      categoriesData?.data?.find(
        (item) => item.category?._id === MAIN_CATEGORY_ID
      ) || null
    );
  }, [categoriesData]);

  const subCategories = useMemo(() => {
    const apiSubCategories =
      mensCategory?.subCategories?.map((subCategory) => ({
        _id: subCategory._id,
        name: subCategory.name,
        image: subCategory.image || "https://via.placeholder.com/150",
        sectionId: subCategory.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      })) || [];
    return [
      {
        _id: "package-static",
        name: "Package",
        image: packageImage,
        sectionId: "packages",
      },
      ...apiSubCategories,
    ];
  }, [mensCategory]);

  const subCategoriesString = useMemo(() => {
    return subCategories.map((subCategory) => subCategory.name).join(", ");
  }, [subCategories]);

  const mensServices = useMemo(() => {
    if (!servicesData?.data) return [];
    return servicesData.data.flatMap((item) =>
      item.services.filter((service) => service.mainCategoryId === MAIN_CATEGORY_ID)
    );
  }, [servicesData, MAIN_CATEGORY_ID]);

  const packages = useMemo(() => {
    if (!packagesData?.data) return [];
    return packagesData.data.map((pkg) => {
      const priceInfo = pkg.services?.reduce(
        (acc, service) => {
          service.category.subCategory.forEach((subCat) => {
            subCat.services?.forEach((nestedService) => {
              const { discountPrice, originalPrice, discountActive } =
                nestedService.location?.[0] || {};
              acc.discountPrice += discountPrice || originalPrice || 0;
              acc.originalPrice += originalPrice || 0;
              acc.discountActive = acc.discountActive || discountActive || false;
            });
          });
          return acc;
        },
        { discountPrice: 0, originalPrice: 0, discountActive: false }
      );

      return {
        _id: pkg._id,
        title: pkg.title || "Untitled Package",
        description: pkg.description || "<p>No description available</p>",
        timeInMin: pkg.timeInMin || 0,
        image: pkg.images?.[0]?.img || "https://via.placeholder.com/150",
        rating: pkg.rating || 0,
        reviews: pkg.reviews || 0,
        services: pkg.services?.flatMap((s) =>
          s.category?.subCategory?.flatMap((subCat) =>
            subCat.services?.map((nestedService) => ({
              _id: nestedService._id,
              title:
                nestedService.subCategoryId?.name?.trim() ||
                nestedService.title ||
                "Unnamed Service",
              category: {
                categoryId: {
                  _id: s.category?.categoryId?._id || "unknown",
                  name: s.category?.categoryId?.name || "Unknown Category",
                },
              },
            }))
          ) || []
        ) || [],
        discountPrice: priceInfo.discountPrice,
        originalPrice: priceInfo.originalPrice,
        discountActive: priceInfo.discountActive,
      };
    });
  }, [packagesData]);

  const filteredPackages = useMemo(() => {
    return selectedCategory === "packages"
      ? packages
      : packages.filter((pkg) =>
          pkg.services.some((s) =>
            s.category.categoryId.name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^a-z0-9-]/g, "") === selectedCategory
          )
      );
  }, [packages, selectedCategory]);

  const handleSubCategoryClick = (subCategory) => {
    const sectionId =
      subCategory.sectionId ||
      subCategory.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    setSelectedCategory(sectionId);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setShowEditModal(true);
  };

  const handleSavePackage = (updatedPackage) => {
    if (updatedPackage.selectedServices) {
      updateCartPackage(
        updatedPackage._id,
        updatedPackage.selectedServices,
        [],
        updatedPackage.quantity || 1
      );
    }
    setShowEditModal(false);
  };

  const handleAddToCart = (item) => {
    const isCustomized = item.packageType === "Customize";
    if (item.hasOwnProperty("services")) {
      addToCartPackage(item._id, 1, isCustomized, item.selectedServices);
    } else {
      addToCartSingleServices(item._id, 1, item.location?.[0]?.sector || "67beed95c3e00990a579d596");
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      if (cartItems.find((item) => item._id === itemId)?.isPackageService) {
        removeCartPackage(itemId);
      } else {
        removeSingleService(itemId);
      }
      return;
    }
    updateQuantity(itemId, newQuantity);
  };

   const handleRemoveItem = (itemId) => {
  console.log(itemId ,"removecart")
    const item = cartItems?.find((item) => (item.serviceId || item.packageId) === itemId);
    if (item) {
      if (item.isPackageService) {
        removeCartPackage(itemId);
      } else {
        removeSingleService(itemId);
      }
    } else {
      console.warn(`Item with ID ${itemId} not found in cart`);
    }
  };



  const handleAddOption = (service) => {
    console.log("Add option for:", service);
  };

  const handleRemovePackage = (itemId) => {
    removeCartPackage(itemId?._id);
  };

  const isInCart = (serviceId) => cartItems.some((item) => item.serviceId === serviceId);
  const isInCartPackage = (packageId) => cartItems.some((item) => item.packageId === packageId);

  return (
    <div className="min-h-screen mx-10">
      <div className="max-w-[1280px] mx-auto flex h-screen mt-[150px] gap-3">
        <div className="w-[450px] h-[500px] bg-[#DBE9FF] rounded-[10px]">
          <div className="rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mx-6 my-4">
              Men's Premium Salon
            </h2>
            <CategoryGrid
              subCategories={subCategories}
              onSubCategoryClick={handleSubCategoryClick}
              selectedCategory={selectedCategory}
              isLoading={categoriesLoading}
            />
          </div>
          <ProductsYTPromise />
        </div>

        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar p-6 rounded-[10px]">
          <div id="packages" className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {selectedCategory === "packages"
                ? "Create a custom package"
                : `Packages for ${selectedCategory
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}`}
            </h2>
            <div className="space-y-4">
              {packagesLoading ? (
                <PackageCard isLoading={true} />
              ) : filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <PackageCard
                    key={pkg._id}
                    package={pkg}
                    onEditPackage={handleEditPackage}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveItem}
                    isInCart={isInCartPackage(pkg._id)}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>
                    No packages available for {selectedCategory.replace(/-/g, " ")}.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div id={selectedCategory} className="mb-8">
            <div className="space-y-4">
              {servicesLoading ? (
                <ServiceCard isLoading={true} />
              ) : servicesError ? (
                <div className="text-center py-8 text-red-500">
                  Error loading services: {servicesError.message}
                </div>
              ) : mensServices.length > 0 ? (
                mensServices
                  .filter((service) => {
                    const sectionId = service.categoryId?.name
                      ?.toLowerCase()
                      ?.replace(/\s+/g, "-")
                      ?.replace(/[^a-z0-9-]/g, "");
                    return sectionId === selectedCategory || selectedCategory === "packages";
                  })
                  .map((service) => (
                    <ServiceCard
                      key={service._id}
                      service={service}
                      onAddOption={handleAddOption}
                      onAddToCart={handleAddToCart}
                      onRemoveFromCart={handleRemoveItem}
                      isInCart={isInCart(service._id)}
                    />
                  ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No services available for {selectedCategory.replace(/-/g, " ")}.
                </div>
              )}
            </div>
          </div>
        </div>

        <CartSidebar
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          loading={loading}
          error={error}
        />
      </div>

      <EditPackageModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        packages={editingPackage}
        onSave={handleSavePackage}
        services={mensServices.map((service) => ({
          _id: service._id,
          title: service.title,
          image: service.images?.[0]?.img || "https://via.placeholder.com/150",
          price: service.location?.[0]?.discountPrice || service.location?.[0]?.originalPrice,
        }))}
      />
    </div>
  );
};

export default MenProductPremiumPage;
