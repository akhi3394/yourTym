import React from "react";
import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CircularLoader from "./CircularLoader";
import useCart from "../hooks/useCart";

const CartSidebar = ({ cartItems, onUpdateQuantity, onRemoveItem, loading, error }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.total || 0), 0);
  const navigate = useNavigate(); // Initialize navigate
  const {
    cartError,
    serviceAddError,
    cartLoading,
    fetchingCart
  } = useCart();

  const handleViewCart = () => {
    navigate('/checkout', { state: { cartItems } }); // Navigate to checkout with cartItems state
  };
  return (
    <div className="w-[300px] h-[494px] bg-white border-l border-gray-200 flex flex-col rounded-[10px]">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Cart</h2>
      </div>

      <div className="h-[394px] overflow-y-auto custom-scrollbar p-4">
        {(cartLoading || fetchingCart || loading) ? (
          <div className="text-center text-gray-500 mt-8 flex justify-center">
            <CircularLoader size={20} />
          </div>
        ) : (error || serviceAddError) ? (
          <div className="text-center text-red-500 mt-8">
            <p>{serviceAddError?.message ?? error ?? cartError?.message }</p> <br/>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="border-b border-gray-100 pb-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium text-sm text-gray-900 flex-1 pr-2">
                    {item.title}
                  </h4>
                  <button
                    onClick={() => onRemoveItem(item.serviceId || item.packageId)}
                    className="text-gray-400 hover:text-red-500 text-xs"
                  >
                    ✕
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 bg-blue-100 rounded-full px-3 py-1">
                    <button
                      onClick={() => onUpdateQuantity(item.serviceId || item.packageId, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-50"
                      // disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.serviceId || item.packageId, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-sm font-semibold">₹{item.total}</span>
                </div>

                {item.isPackageService && (
                  <button className="text-xs text-primary mt-2 hover:underline">
                    Edit
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t border-gray-200 mt-auto">
          <button
            onClick={handleViewCart} // Add onClick handler
            className="w-full text-[#ffffff] bg-[#FF5534] font-semibold py-3 rounded-lg transition-colors flex justify-between px-3"
          >
            <span>₹{total}</span> <span>View Cart</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;