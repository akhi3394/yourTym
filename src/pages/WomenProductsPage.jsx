import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CategoryGrid from '../components/CategoryGrid';
import ProductsYTPromise from '../components/ProductsYTPromise';
import PackageCard from '../components/PackageCard';
import ServiceCard from '../components/ServiceCard';
import CartSidebar from '../components/CartSidebar';
import EditPackageModal from '../components/EditPackageModal';
import packageImage from '../assets/images/package.png';
import {
  useGetAllCategoriesQuery,
  useGetAllPackagesQuery,
  useGetAllServicesQuery,
} from '../store/api/productsApi';

const WomenProductsPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fetch categories for CategoryGrid
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useGetAllCategoriesQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Fetch packages
  const { data: packagesData, isLoading: packagesLoading, error: packagesError } = useGetAllPackagesQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Fetch services
  const { data: servicesData, isLoading: servicesLoading, error: servicesError } = useGetAllServicesQuery(undefined, {
    skip: !isAuthenticated,
  });

  // Debug logs
  console.log('Categories Data:', categoriesData?.data);
  console.log('Services Data:', servicesData);
  console.log('Packages Data:', packagesData);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  // Find "Salon for Women" category
  const womenCategory = useMemo(() => {
    if (!Array.isArray(categoriesData?.data)) {
      console.log('Categories data is not an array:', categoriesData?.data);
      return null;
    }
    return categoriesData.data.find((item) => item.category?.name?.toLowerCase() === 'salon for women');
  }, [categoriesData]);

  // Prepare subcategories for CategoryGrid
  const subCategories = useMemo(() => {
    if (!Array.isArray(categoriesData?.data)) {
      console.log('Categories data is not an array:', categoriesData?.data);
      return [];
    }
    const womenCategoryItem = categoriesData.data.find((item) => item.category?.name?.toLowerCase() === 'salon for women');
    const apiSubCategories = Array.isArray(womenCategoryItem?.subCategories)
      ? womenCategoryItem.subCategories.map((subCategory) => ({
          _id: subCategory._id,
          name: subCategory.name,
          image: subCategory.image || 'https://via.placeholder.com/150',
        }))
      : [];

    console.log('API SubCategories:', apiSubCategories);
    const packageSubCategory = {
      _id: 'package-static',
      name: 'Package',
      image: packageImage,
    };

    return [packageSubCategory, ...apiSubCategories];
  }, [categoriesData]);

  // Group services by category
  const categoryServices = useMemo(() => {
    if (!servicesData?.data) {
      console.log('No services data available');
      return {};
    }
    return servicesData.data.reduce((acc, { category, services }) => {
      if (!category?.categoryId?._id || !category?.categoryId?.name) {
        console.log('Invalid category:', category);
        return acc;
      }
      // Filter for "Salon for Women" services
      if (category.mainCategoryId?.name?.toLowerCase() !== 'salon for women') {
        return acc;
      }
      const sectionId = category.categoryId.name.toLowerCase().replace(/\s+/g, '-').replace(/[/&]/g, '');
      acc[sectionId] = services.map((service) => ({
        _id: service._id,
        title: service.title,
        price: service.location[0]?.discountPrice || 0,
        originalPrice: service.location[0]?.originalPrice || 0,
        image: service.images[0]?.img || 'https://via.placeholder.com/150',
        rating: service.rating || 0,
        reviews: service.reviews || 0,
        totalTime: service.totalTime,
        category: { _id: category.categoryId._id, name: category.categoryId.name },
      }));
      return acc;
    }, {});
  }, [servicesData]);

  // Prepare packages data for "Salon for Women"
  const packages = useMemo(() => {
    if (!packagesData?.data) {
      console.log('No packages data available');
      return [];
    }
    return packagesData.data
      .filter((pkg) => pkg.mainCategoryId?.name?.toLowerCase() === 'salon for women')
      .map((pkg) => {
        const price = pkg.services.reduce((total, pkgService) => {
          const serviceData = pkgService.category?.subCategory
            ?.flatMap((sub) => sub.services)
            ?.find((s) => s._id === pkgService._id);
          return total + (serviceData?.location[0]?.discountPrice || 0);
        }, 0);
        return {
          _id: pkg._id,
          title: pkg.title,
          price,
          image: pkg.images[0]?.img || 'https://via.placeholder.com/150',
          duration: pkg.totalTime,
          rating: pkg.rating || 0,
          reviews: pkg.reviews || 0,
          services: pkg.services.map((s) => ({
            _id: s._id,
            title: s.title,
            category: {
              categoryId: {
                _id: s.category?.categoryId?._id,
                name: s.category?.categoryId?.name,
              },
            },
          })),
        };
      });
  }, [packagesData]);

  // Debug categoryServices and packages
  console.log('SubCategories:', subCategories);
  console.log('Category Services:', categoryServices);
  console.log('Packages:', packages);

  const handleSubCategoryClick = (subCategory) => {
    const sectionId = subCategory.name.toLowerCase().replace(/\s+/g, '-').replace(/[/&]/g, '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('Section not found:', sectionId);
    }
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setShowEditModal(true);
  };

  const handleSavePackage = (updatedPackage) => {
    console.log('Updated package:', updatedPackage);
    setShowEditModal(false);
  };

  const handleAddToCart = (item) => {
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
          ...item,
          quantity: 1,
          type: item.services ? 'package' : 'service',
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
    console.log('Add option for:', service);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const renderSection = (sectionId, title) => (
    <div key={sectionId} id={sectionId} className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {servicesLoading ? (
          <ServiceCard isLoading={true} />
        ) : servicesError ? (
          <ServiceCard error={servicesError.message || 'Failed to load services'} />
        ) : categoryServices[sectionId]?.length > 0 ? (
          categoryServices[sectionId].map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              onAddOption={handleAddOption}
              onAddToCart={handleAddToCart}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Services coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen mx-10">
      <div className="max-w-[1280px] mx-auto flex h-screen mt-[150px] gap-3">
        {/* Left Sidebar */}
        <div className="w-[450px] h-[500px] bg-[#FFE8CF] rounded-[10px]">
          <div className="rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mx-6 my-4">Salon for Women</h2>
            <p className="text-sm text-gray-600 ml-6">Select a service</p>
            <CategoryGrid
              subCategories={subCategories}
              onSubCategoryClick={handleSubCategoryClick}
              isLoading={categoriesLoading}
              error={categoriesError?.message}
            />
          </div>
          <ProductsYTPromise />
        </div>

        {/* Center Content */}
        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar p-6 rounded-[10px]">
          <div id="packages" className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create a custom package</h2>
            </div>
            <div className="space-y-4">
              {packagesLoading ? (
                <PackageCard isLoading={true} />
              ) : packagesError ? (
                <PackageCard error={packagesError.message || 'Failed to load packages'} />
              ) : packages.length > 0 ? (
                packages.map((pkg) => (
                  <PackageCard
                    key={pkg._id}
                    package={pkg}
                    onEditPackage={handleEditPackage}
                    onAddToCart={handleAddToCart}
                  />
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No packages available</p>
                </div>
              )}
            </div>
          </div>

          {/* Dynamically render service sections */}
          {Object.entries(categoryServices).map(([sectionId, services]) =>
            renderSection(sectionId, services[0]?.category?.name || sectionId.replace(/-/g, ' ').toUpperCase())
          )}
        </div>

        {/* Right Cart Sidebar */}
        <CartSidebar
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          total={cartTotal}
        />
      </div>

      {/* Edit Package Modal */}
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