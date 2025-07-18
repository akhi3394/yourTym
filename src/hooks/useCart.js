import { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddToCartPackageCustomiseMutation,
  useAddToCartPackageEditMutation,
  useAddToCartPackageNormalMutation,
  useAddToCartSingleServiceMutation,
  useRemoveFromCartMutation,
  useUpdateCartPackageEditMutation,
  useUpdateCustomizePackageInCartMutation,
  useGetCartQuery,
  useUpdateCartServiceQuantityMutation,
  useRemovePackageFromCartMutation,
  useUpdateCartPackageQuantityMutation,
} from "../store/api/productsApi";

const useCart = () => {
  const dispatch = useDispatch();
  const { token, isAuthenticated } = useSelector((state) => state.auth);
  const [addToCartSingleService, { error: serviceAddError, isSuccess: serviceApiSuccess }] = useAddToCartSingleServiceMutation();
  const [addToCartPackageCustomise, { error: packageAddError }] = useAddToCartPackageCustomiseMutation();
  const [updateCustomizePackageInCart] = useUpdateCustomizePackageInCartMutation();
  const [addToCartPackageEdit] = useAddToCartPackageEditMutation();
  const [updateCartPackageEdit] = useUpdateCartPackageEditMutation();
  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateCartServiceQuantity] = useUpdateCartServiceQuantityMutation();
  const [updateCartPackageQuantity] = useUpdateCartPackageQuantityMutation()
  const [removePackageFromCart] = useRemovePackageFromCartMutation(); // Use the new mutation
  const { data: cartData, isLoading: cartLoading, error: cartError, isFetching: fetchingCart } = useGetCartQuery(undefined, {
    skip: !isAuthenticated,
  });

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cartData && !cartLoading && !cartError) {
      setCartItems(cartData);
    } else if (cartError) {
      setError(cartError?.message || "Failed to load cart");
    }
  }, [cartData, cartLoading, cartError]);

  const addToCartPackage = useCallback(
    async (packageId, quantity = 1, isCustomized = false, selectedServices = []) => {
      setLoading(true);
      setError(null);
      try {
        let result;
        const payload = { packageId: packageId, quantity };
        result = await addToCartPackageCustomise({
          ...payload,
          packageServices: selectedServices,
        }).unwrap();

        setCartItems((prev) => [
          ...prev,
          { ...result, quantity, isPackageService: true, _id: result._id || packageId },
        ]);
      } catch (err) {
        setError(err?.data?.message || "Failed to add package to cart");
      } finally {
        setLoading(false);
      }
    },
    [addToCartPackageCustomise]
  );

  const addToCartSingleServices = useCallback(
    async (serviceId, quantity = 1, serviceTypeId) => {
      setLoading(true);
      setError(null);
      try {
        const result = await addToCartSingleService({
          _id: serviceId,
          quantity,
          serviceTypeId,
        }).unwrap();

        setCartItems((prev) => [
          ...prev,
          { ...result, quantity, isPackageService: false, _id: result._id || serviceId },
        ]);

        return { status: 200, data: result }; // ✅ Return a success object
      } catch (err) {
        setError(serviceAddError?.message || "Failed to add service to cart");
        return { status: 500, error: err }; // ✅ Return failure
      } finally {
        setLoading(false);
      }
    },
    [addToCartSingleService]
  );



  const removeSingleService = useCallback(
    async (serviceId) => {
      setLoading(true);
      setError(null);
      try {
        await removeFromCart({
          serviceId,
          isPackageService: false,
        }).unwrap();
        setCartItems((prev) => prev.filter((item) => item.serviceId !== serviceId));
      } catch (err) {
        setError(err?.data?.message || "Failed to remove service from cart");
      } finally {
        setLoading(false);
      }
    },
    [removeFromCart]
  );

  const removeCartPackage = useCallback(
    async (cartItemId) => {
      console.log(cartItemId, "fromuseCart")
      setLoading(true);
      setError(null);
      try {
        // Find the cart item to get the packageId
        const cartItem = cartItems.find((item) => (item.serviceId || item.packageId) === cartItemId);
        if (!cartItem || !cartItem.isPackageService) {
          throw new Error("Package not found in cart");
        }
        await removePackageFromCart({ packageId: cartItem.packageId }).unwrap();
        setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
      } catch (err) {
        setError(err?.data?.message || "Failed to remove package from cart");
      } finally {
        setLoading(false);
      }
    },
    [removePackageFromCart, cartItems]
  );

  const updateCartPackage = useCallback(
    async (packageId, selectedServices = [], selectedAddOnServices = [], quantity, mainCategoryId) => {
      setLoading(true);
      setError(null);
      try {
        let result;
        const payload = { packageId: mainCategoryId, quantity, mainCategoryId };
        if (selectedServices.length > 0 || selectedAddOnServices.length > 0) {
          result = await updateCartPackageEdit({
            ...payload,
            selectedServices,
            selectedAddOnServices,
          }).unwrap();
        } else {
          result = await updateCustomizePackageInCart({
            ...payload,
            selectedServices,
          }).unwrap();
        }
        setCartItems((prev) =>
          prev.map((item) =>
            item.packageId === packageId ? { ...item, ...result, quantity } : item
          )
        );
      } catch (err) {
        setError(err?.data?.message || "Failed to update package in cart");
      } finally {
        setLoading(false);
      }
    },
    [updateCustomizePackageInCart, updateCartPackageEdit]
  );

  // service quantity update
  const updateQuantity = useCallback(
    async (itemId, quantity) => {
      console.log(itemId, "itemIdfromuseCart", quantity, "quantity")
      setLoading(true);
      setError(null);
      try {
        const result = await updateCartServiceQuantity({ Services: itemId, quantity: quantity }).unwrap();
        setCartItems((prev) =>
          prev.map((item) =>
            item._id === itemId ? { ...item, quantity, total: item.price * quantity } : item
          )
        );
      } catch (err) {
        setError(err?.data?.message || "Failed to update quantity");
      } finally {
        setLoading(false);
      }
    },
    [updateCartServiceQuantity]
  );

  const updatePackageQuantity = useCallback(
    async (itemId, quantity) => {
      console.log(itemId, "itemIdfromuseCart", quantity, "quantity")
      setLoading(true);
      setError(null);
      try {
        const result = await updateCartPackageQuantity({ packageId: itemId, quantity: quantity }).unwrap();
        setCartItems((prev) =>
          prev.map((item) =>
            item._id === itemId ? { ...item, quantity, total: item.price * quantity } : item
          )
        );
      } catch (err) {
        setError(err?.data?.message || "Failed to update quantity");
      } finally {
        setLoading(false);
      }
    },
    [updateCartPackageQuantity]
  );
  const isInCartorNot = useCallback(
    (serviceId) => cartItems.some((item) => item.serviceId === serviceId && !item.isPackageService),
    [cartItems]
  );

  return {
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
    serviceAddError,
    packageAddError,
    serviceApiSuccess
  };
};

export default useCart;