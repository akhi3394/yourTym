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
  useGetAllSubCategoriesQuery,
  useGetPackagesByMainCategoryQuery,
  useGetSubCategoryQuery,
} from "../store/api/productsApi";
import useCart from "../hooks/useCart";

const WomenProductsPage = () => {
  const [editingPackage, setEditingPackage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("packages");
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const MAIN_CATEGORY_ID = "670f5fb4199de0d397f32f45";

  const { data: subCategorydata, isLoading } = useGetSubCategoryQuery({
    categoryId: '670f5fb4199de0d397f32f45',
    subCategoryId: '670f61d6199de0d397f32f6a'
  });
  const { data: allsubCategoryData } = useGetAllSubCategoriesQuery();

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
    isInCartorNot,
    updatePackageQuantity,
    cartLoading,
    fetchingCart,
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

  const womenCategory = useMemo(() => {
    return (
      categoriesData?.data?.find(
        (item) => item.category?._id === MAIN_CATEGORY_ID
      ) || null
    );
  }, [categoriesData]);

  const subCategories = useMemo(() => {
    const apiSubCategories =
      womenCategory?.subCategories?.map((subCategory) => ({
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
  }, [womenCategory]);

  const subCategoriesString = useMemo(() => {
    return subCategories.map((subCategory) => subCategory.name).join(", ");
  }, [subCategories]);

  const servicesByCategory = useMemo(() => {
    if (!servicesData?.data) return {};
    return servicesData.data.reduce((acc, item) => {
      const categoryName = item.category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = {
          name: categoryName,
          image: item.category.image,
          services: [],
        };
      }
      acc[categoryName].services = [
        ...acc[categoryName].services,
        ...item.services
          .filter((service) => service.mainCategoryId === MAIN_CATEGORY_ID)
          .map((service) => ({
            ...service,
            category: { name: categoryName, image: item.category.image },
          })),
      ];
      return acc;
    }, {});
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

  const filteredSubCategories = allsubCategoryData?.data?.filter(
    (item) => item.mainCategoryId._id === MAIN_CATEGORY_ID
  ) || [];

  const transformSubCategories = (subCategoryData, womenCategory) => {
    const categoryImageMap = womenCategory?.subCategories?.reduce((acc, subCategory) => {
      acc[subCategory.name] = subCategory.image;
      return acc;
    }, {}) || {};

    const groupedByCategory = subCategoryData.reduce((acc, item) => {
      const categoryName = item.categoryId.name;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(item);
      return acc;
    }, {});

    const result = [];
    Object.keys(groupedByCategory).forEach((categoryName) => {
      result.push({
        type: "separator",
        name: categoryName,
        image: categoryImageMap[categoryName] || "https://dummyimage.com/default.jpg",
      });
      result.push(...groupedByCategory[categoryName]);
    });

    return result;
  };

  const transformedSubCategories = transformSubCategories(filteredSubCategories, womenCategory);

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
    const sectionId = subCategory.name
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
    const isCustomized = updatedPackage.packageType === "Customize";

    if (updatedPackage.serviceIds) {
      addToCartPackage(updatedPackage.packageId, 1, isCustomized, updatedPackage.serviceIds);
    }
    setShowEditModal(false);
  };

  const handleAddToCart = (item, mainCategoryId) => {
    const isCustomized = item.packageType === "Customize";
    if (item.hasOwnProperty("services")) {
      addToCartPackage(item._id, 1, isCustomized, item.selectedServices, mainCategoryId);
    } else {
      addToCartSingleServices(item._id, 1, item.location?.[0]?.sector || "67beed95c3e00990a579d596", MAIN_CATEGORY_ID);
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    try {
      const cartItem = cartItems.find(item => (item.serviceId || item.packageId) === itemId);

      if (!cartItem) {
        toast.error('Item not found in cart');
        return;
      }

      if (newQuantity <= 0) {
        if (cartItem.isPackageService) {
          removeCartPackage(itemId);
        } else {
          removeSingleService(itemId);
        }
        return;
      }

      if (cartItem.isPackageService) {
        updatePackageQuantity(itemId, newQuantity);
      } else {
        updateQuantity(itemId, newQuantity);
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to update quantity');
    }
  };

  const handleRemoveItem = (itemId) => {
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

  const isInCart = (serviceId) => cartItems.some((item) => item.serviceId === serviceId);
  const isInCartPackage = (packageId) => cartItems.some((item) => item.packageId === packageId);

  return (
    <div className="min-h-screen mx-4" style={{ overflowX: 'auto' }}>
      <div className="max-w-[1280px] mx-auto flex mt-[150px] gap-3" style={{ minWidth: '1050px', minHeight: 'calc(100vh - 150px)' }}>
        {/* Category Sidebar */}
        <div className="w-[450px] h-[500px] bg-[#FFE8CF] rounded-[10px]">
          <div className="rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mx-6 my-4">
              Salon for Women
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

        {/* Main Content */}
        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar p-6 rounded-[10px]">
          {/* Package Cards */}
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
                    onUpdateQuantity={handleUpdateQuantity}
                    onAddToCart={handleAddToCart}
                    onRemoveFromCart={handleRemoveItem}
                    isInCart={isInCartPackage(pkg._id)}
                    cartItems={cartItems}
                    mainCategoryId={MAIN_CATEGORY_ID}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No packages available for {selectedCategory.replace(/-/g, " ")}.
                </div>
              )}
            </div>
          </div>

          <ServiceCard subCategories={transformedSubCategories} mainCategoryId={MAIN_CATEGORY_ID} />
        </div>

        {/* Cart Sidebar (Always Visible) */}
        <div className="w-[300px] h-[494px] bg-white border-l border-gray-200 rounded-[10px]">
          <CartSidebar
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            loading={loading}
            error={error}
            mainCategoryId={MAIN_CATEGORY_ID}
          />
        </div>
      </div>

      <EditPackageModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        packages={editingPackage}
        onSave={handleSavePackage}
        packagesData={packagesData?.data}
      />
    </div>
  );
};

export default WomenProductsPage;