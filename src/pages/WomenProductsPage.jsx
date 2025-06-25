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

const WomenProductsPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("packages");
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const MAIN_CATEGORY_ID = "670f5fb4199de0d397f32f45"; // Salon for Women

  // Fetch queries
  const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoriesQuery(undefined, { skip: !isAuthenticated });
  const { data: packagesData, isLoading: packagesLoading } = useGetPackagesByMainCategoryQuery(MAIN_CATEGORY_ID, { skip: !isAuthenticated });
  const { data: servicesData, isLoading: servicesLoading } = useGetAllServicesQuery(undefined, { skip: !isAuthenticated });

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  // Find "Salon for Women" category
  const womenCategory = useMemo(() => {
    return categoriesData?.data?.find((item) => item.category?._id === MAIN_CATEGORY_ID) || null;
  }, [categoriesData]);

  // Prepare subcategories for CategoryGrid
  const subCategories = useMemo(() => {
    const apiSubCategories = womenCategory?.subCategories?.map((subCategory) => ({
      _id: subCategory._id,
      name: subCategory.name,
      image: subCategory.image || "https://via.placeholder.com/150",
      sectionId: subCategory.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    })) || [];
    return [
      { _id: "package-static", name: "Package", image: packageImage, sectionId: "packages" },
      ...apiSubCategories,
    ];
  }, [womenCategory]);

  // Helper function to extract prices from nested services
  const getServicePrice = (service) => {
    if (service.location?.length > 0) {
      const location = service.location[0];
      return {
        discountPrice: location.discountActive ? location.discountPrice : location.originalPrice || 0,
        originalPrice: location.originalPrice || 0,
        discountActive: location.discountActive || false,
      };
    }
    console.warn(`No location data for service: ${service.title || service._id}`);
    return { discountPrice: 0, originalPrice: 0, discountActive: false };
  };

  // Group services by category
  const categoryServices = useMemo(() => {
    if (!servicesData?.data) return {};

    const result = servicesData.data.reduce((acc, { category, services }) => {
      if (category?.mainCategoryId?._id !== MAIN_CATEGORY_ID || !category?.categoryId?._id) return acc;

      const sectionId = category.categoryId.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
      acc[sectionId] = acc[sectionId] || [];

      acc[sectionId].push(
        ...services.map((service) => {
          const { discountPrice, originalPrice, discountActive } = getServicePrice(service);
          return {
            _id: service._id,
            title: service.subCategoryId?.name?.trim() || service.title || "Unnamed Service",
            discountPrice,
            originalPrice,
            discountActive,
            image: service.images?.[0]?.img || "https://via.placeholder.com/150",
            rating: service.rating || 0,
            reviews: service.reviews || 0,
            totalTime: service.totalTime || "N/A",
            category: {
              _id: category.categoryId._id,
              name: category.categoryId.name,
            },
          };
        })
      );
      return acc;
    }, {});
    return result;
  }, [servicesData]);

  // Prepare packages data
  const packages = useMemo(() => {
    if (!packagesData?.data) return [];

    return packagesData.data.map((pkg) => {
      // Calculate package price from nested services
      const priceInfo = pkg.services?.reduce(
        (acc, service) => {
          if (service.category?.subCategory?.length > 0) {
            service.category.subCategory.forEach((subCat) => {
              subCat.services?.forEach((nestedService) => {
                const { discountPrice, originalPrice, discountActive } = getServicePrice(nestedService);
                acc.discountPrice += discountPrice;
                acc.originalPrice += originalPrice;
                acc.discountActive = acc.discountActive || discountActive;
              });
            });
          }
          return acc;
        },
        { discountPrice: 0, originalPrice: 0, discountActive: false }
      ) || { discountPrice: 0, originalPrice: 0, discountActive: false };

      const filteredServices = pkg.services
        ?.flatMap((s) =>
          s.category?.subCategory?.flatMap((subCat) =>
            subCat.services?.map((nestedService) => ({
              _id: nestedService._id,
              title: nestedService.subCategoryId?.name?.trim() || nestedService.title || "Unnamed Service",
              category: {
                categoryId: {
                  _id: s.category?.categoryId?._id || "unknown",
                  name: s.category?.categoryId?.name || "Unknown Category",
                },
              },
            }))
          ) || []
        )
        .filter((s) => s.title !== "Unnamed Service") || [];

      return {
        _id: pkg._id,
        title: pkg.title || "Untitled Package",
        discountPrice: priceInfo.discountPrice,
        originalPrice: priceInfo.originalPrice,
        discountActive: priceInfo.discountActive,
        image: pkg.images?.[0]?.img || "https://via.placeholder.com/150",
        duration: pkg.totalTime || "N/A",
        rating: pkg.rating || 0,
        reviews: pkg.reviews || 0,
        services: filteredServices,
        type: pkg.type || "Package",
        categories: filteredServices.map((s) =>
          s.category.categoryId.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
        ),
      };
    });
  }, [packagesData]);

  // Filter packages based on selected category
  const filteredPackages = useMemo(() => {
    return selectedCategory === "packages"
      ? packages
      : packages.filter((pkg) => pkg.categories?.includes(selectedCategory));
  }, [packages, selectedCategory]);

  const handleSubCategoryClick = (subCategory) => {
    const sectionId = subCategory.sectionId || subCategory.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    setSelectedCategory(sectionId);
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setShowEditModal(true);
  };

  const handleSavePackage = (updatedPackage) => {
    setShowEditModal(false);
  };

  const handleAddToCart = (item) => {
    console.log("Adding to cart:", item);
    const existingItem = cartItems.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      setCartItems((prev) =>
        prev.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          _id: item._id,
          title: item.title,
          discountPrice: item.discountPrice || 0,
          originalPrice: item.originalPrice || 0,
          discountActive: item.discountActive || false,
          quantity: 1,
          type: item.services ? "package" : "service",
          services: item.services || [],
        },
      ]);
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== itemId));
  };

  const handleAddOption = (service) => {
    console.log("Add option for:", service);
  };

  return (
    <div className="min-h-screen mx-10">
      <div className="max-w-[1280px] mx-auto flex h-screen mt-[150px] gap-3">
        <div className="w-[450px] h-[500px] bg-[#FFE8CF] rounded-[10px]">
          <div className="rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mx-6 my-4">Salon for Women</h2>
            <p className="text-sm text-gray-600 ml-6">Select a service</p>
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
                : `Packages for ${selectedCategory.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}`}
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
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No packages available for {selectedCategory.replace(/-/g, " ")}.</p>
                </div>
              )}
            </div>
          </div>

          {selectedCategory !== "packages" && categoryServices[selectedCategory] && (
            <div
              id={selectedCategory}
              className="mb-8"
            >
              <h3 className="text-lg font-semibold mb-4">
                {categoryServices[selectedCategory][0]?.category?.name || selectedCategory.replace(/-/g, " ").toUpperCase()}
              </h3>
              <div className="space-y-4">
                {servicesLoading ? (
                  <ServiceCard isLoading={true} />
                ) : categoryServices[selectedCategory].map((service) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    onAddOption={handleAddOption}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          )}

          {selectedCategory === "packages" &&
            Object.entries(categoryServices).map(([sectionId, services]) => (
              <div key={sectionId} id={sectionId} className="mb-8">
                <h3 className="text-lg font-semibold mb-4">{services[0]?.category?.name || sectionId.replace(/-/g, " ").toUpperCase()}</h3>
                <div className="space-y-4">
                  {services.map((service) => (
                    <ServiceCard
                      key={service._id}
                      service={service}
                      onAddOption={handleAddOption}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>

        <CartSidebar
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
      </div>

      <EditPackageModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        package={editingPackage}
        onSave={handleSavePackage}
      />
    </div>
  );
};

export default WomenProductsPage;