import React, { useState } from 'react';

import { categories, packages, cleanupServices, facialServices } from '../data/womenSalonData';
import CategoryGrid from '../components/CategoryGrid';
import ProductsYTPromise from '../components/ProductsYTPromise';
import PackageCard from '../components/PackageCard';
import ServiceCard from '../components/ServiceCard';
import CartSidebar from '../components/CartSidebar';
import EditPackageModal from '../components/EditPackageModal';

const MenProductPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [editingPackage, setEditingPackage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleCategoryClick = (category) => {
    // Scroll to the respective section
    const sectionId = category.title.toLowerCase().replace(/\s+/g, '-').replace('&', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setShowEditModal(true);
  };

  const handleSavePackage = (updatedPackage) => {
    console.log('Updated package:', updatedPackage);
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCartItems(prev =>
        prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems(prev => [
        ...prev,
        {
          ...item,
          quantity: 1,
          type: item.services ? 'package' : 'service'
        }
      ]);
    }
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleAddOption = (service) => {
    console.log('Add option for:', service);
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen mx-10">
      <div className="max-w-[1280px] mx-auto flex h-screen mt-[150px] gap-3">
        {/* Left Sidebar */}
        <div className="w-[450px] h-[500px] bg-[#DBE9FF] rounded-[10px] ">
          <div className="rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mx-6 my-4">Men's classic salon</h2>
            <p className="text-sm text-gray-600 ml-6">Select a service</p>
            
            <CategoryGrid
              categories={categories}
              onCategoryClick={handleCategoryClick}
            />
          </div>
          
          <ProductsYTPromise/>
        </div>

        {/* Center Content */}
        <div className="flex-1 bg-white overflow-y-auto custom-scrollbar p-6 rounded-[10px]">
          {/* Packages Section */}
          <div id="packages" className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Create a custom packages</h2>
            </div>
            
            <div className="space-y-4">
              {packages.map(pkg => (
                <PackageCard
                  key={pkg.id}
                  package={pkg}
                  onEditPackage={handleEditPackage}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>

          {/* Cleanup Section */}
          <div id="cleanup-facials" className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Cleanup</h3>
            <div className="space-y-4">
              {cleanupServices.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onAddOption={handleAddOption}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>

          {/* Facial Section */}
          <div id="facial" className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Facial</h3>
            <div className="space-y-4">
              {facialServices.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  onAddOption={handleAddOption}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>

          {/* Placeholder sections for other categories */}
          <div id="waxing" className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Waxing</h3>
            <div className="text-center py-8 text-gray-500">
              <p>Waxing services coming soon!</p>
            </div>
          </div>

          <div id="bleach-detain" className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Bleach & Detain</h3>
            <div className="text-center py-8 text-gray-500">
              <p>Bleach & Detain services coming soon!</p>
            </div>
          </div>

          <div id="massage" className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Massage</h3>
            <div className="text-center py-8 text-gray-500">
              <p>Massage services coming soon!</p>
            </div>
          </div>

          <div id="hair-care" className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Hair Care</h3>
            <div className="text-center py-8 text-gray-500">
              <p>Hair Care services coming soon!</p>
            </div>
          </div>

          <div id="threading-face-waxing" className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Threading & Face Waxing</h3>
            <div className="text-center py-8 text-gray-500">
              <p>Threading & Face Waxing services coming soon!</p>
            </div>
          </div>

          <div id="pedicure" className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Pedicure</h3>
            <div className="text-center py-8 text-gray-500">
              <p>Pedicure services coming soon!</p>
            </div>
          </div>

          <div id="manicure" className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Manicure</h3>
            <div className="text-center py-8 text-gray-500">
              <p>Manicure services coming soon!</p>
            </div>
          </div>
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

export default MenProductPage;