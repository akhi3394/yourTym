import React from "react";
import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ cartItems, onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();
  const handleViewCart = () => navigate("/checkout");

  // Log cartItems for debugging
  console.log("CartSidebar cartItems:", JSON.stringify(cartItems, null, 2));

  // Calculate total
  const total = cartItems.reduce((sum, item) => {
    const price = item.discountPrice || 0;
    const quantity = item.quantity || 1;
    console.log(
      `Item ${item.title || item._id}: ₹${price} x ${quantity} = ₹${
        price * quantity
      }`
    );
    return sum + price * quantity;
  }, 0);

  return (
    <div className="w-[300px] h-[500px] bg-white border-l border-gray-200 flex flex-col rounded-[20px]">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Cart</h2>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const discountPrice = item.discountPrice || 0;
              const originalPrice = item.originalPrice || 0;
              const quantity = item.quantity || 1;
              const displayPrice = (discountPrice * quantity).toFixed(2);
              const displayOriginalPrice = (originalPrice * quantity).toFixed(
                2
              );
              const hasPrice = discountPrice > 0;

              return (
                <div key={item._id} className="border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-sm text-gray-900 flex-1 pr-2">
                      {item.title || "Unnamed Item"}
                    </h4>
                    <button
                      onClick={() => onRemoveItem(item._id)}
                      className="text-gray-400 hover:text-red-500 text-xs"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-blue-100 rounded-full px-3 py-1">
                      <button
                        onClick={() => onUpdateQuantity(item._id, quantity - 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm text-gray-900 text-center w-3">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item._id, quantity + 1)}
                        className="w-6 h-6 rounded-full bg-white flex items-center justify-center hover:bg-gray-50"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-right">
                      {hasPrice ? (
                        <>
                          <span className="text-sm font-semibold">
                            ₹{displayPrice}
                          </span>
                          {item.discountActive &&
                            originalPrice > discountPrice && (
                              <span className="block text-xs text-gray-500 line-through">
                                ₹{displayOriginalPrice}
                              </span>
                            )}
                        </>
                      ) : (
                        <span className="text-xs text-red-500">
                          Price unavailable
                        </span>
                      )}
                    </div>
                  </div>

                  {item.type === "package" && (
                    <button className="text-xs text-blue-600 mt-2 hover:underline">
                      Edit
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleViewCart}
            className="w-full text-white bg-red-500 hover:bg-red-600 font-semibold py-3 rounded-lg transition-colors flex justify-between px-4"
          >
            <span>₹{total.toFixed(2)}</span>
            <span>View Cart</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(CartSidebar);
