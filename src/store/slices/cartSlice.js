import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartData: null,
  isLoading: false,
  error: null,
  services: [],
  totalAmount: 0,
  paidAmount: 0,
  tipProvided: 0,
  tip: false,
  freeServiceUsed: false,
  coupanUsed: false,
  offerUsed: false,
  walletUsed: false,
  wallet: 0,
  offer: 0,
  coupan: 0,
  freeServiceCount: 0,
  additionalFee: 0,
  taxAmount: 0,
  platformFee: 0,
  totalItem: 0,
  freeService: [],
  packages: [],
  charges: []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartData: (state, action) => {
      const cartData = action.payload;
      state.cartData = cartData;
      state.services = cartData.services || [];
      state.totalAmount = cartData.totalAmount || 0;
      state.paidAmount = cartData.paidAmount || 0;
      state.tipProvided = cartData.tipProvided || 0;
      state.tip = cartData.tip || false;
      state.freeServiceUsed = cartData.freeServiceUsed || false;
      state.coupanUsed = cartData.coupanUsed || false;
      state.offerUsed = cartData.offerUsed || false;
      state.walletUsed = cartData.walletUsed || false;
      state.wallet = cartData.wallet || 0;
      state.offer = cartData.offer || 0;
      state.coupan = cartData.coupan || 0;
      state.freeServiceCount = cartData.freeServiceCount || 0;
      state.additionalFee = cartData.additionalFee || 0;
      state.taxAmount = cartData.taxAmount || 0;
      state.platformFee = cartData.platformFee || 0;
      state.totalItem = cartData.totalItem || 0;
      state.freeService = cartData.freeService || [];
      state.packages = cartData.packages || [];
      state.charges = cartData.Charges || [];
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearCart: (state) => {
      return initialState;
    },
    updateServiceQuantity: (state, action) => {
      const { serviceId, quantity } = action.payload;
      const service = state.services.find(s => s.serviceId === serviceId);
      if (service) {
        service.quantity = quantity;
        service.total = service.price * quantity;
        // Recalculate totals
        state.totalAmount = state.services.reduce((sum, s) => sum + s.total, 0);
        state.totalItem = state.services.reduce((sum, s) => sum + s.quantity, 0);
      }
    },
    removeService: (state, action) => {
      const serviceId = action.payload;
      state.services = state.services.filter(s => s.serviceId !== serviceId);
      state.totalAmount = state.services.reduce((sum, s) => sum + s.total, 0);
      state.totalItem = state.services.reduce((sum, s) => sum + s.quantity, 0);
    }
  }
});

export const { 
  setCartData, 
  setLoading, 
  setError, 
  clearCart, 
  updateServiceQuantity, 
  removeService 
} = cartSlice.actions;

export default cartSlice.reducer; 