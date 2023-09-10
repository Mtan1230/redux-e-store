import { configureStore, createSlice } from "@reduxjs/toolkit";

const storeSlice = createSlice({
  name: "store",
  initialState: {
    products: [],
    cart: [],
    cartOpen: false,
    categories: [],
    currentCategory: "",
  },
  reducers: {
    updateProduct: (state, { payload }) => {
      state.products = [...payload.products];
    },
    addToCart: (state, { payload }) => {
      state.cartOpen = true;
      state.cart = [...state.cart, payload.product];
    },
    addMultipleToCart: (state, { payload }) => {
      state.cart = [...state.cart, ...payload.products];
    },
    updateCartQuantity: (state, { payload }) => {
      state.cartOpen = true;
      state.cart = state.cart.map((product) => {
        if (payload._id === product._id) {
          product.purchaseQuantity = payload.purchaseQuantity;
        }
        return product;
      });
    },
    removeFromCart: (state, { payload }) => {
      let newState = state.cart.filter(
        (product) => product._id !== payload._id
      );
      state.cartOpen = newState.length > 0;
      state.cart = newState;
    },
    clearCart: (state) => {
      state.cartOpen = false;
      state.cart = [];
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    updateCategories: (state, { payload }) => {
      state.categories = [...payload.categories];
    },
    updateCurrentCategory: (state, { payload }) => {
      state.currentCategory = payload.currentCategory;
    },
  },
});

export const {
  updateProduct,
  addToCart,
  addMultipleToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  toggleCart,
  updateCategories,
  updateCurrentCategory,
} = storeSlice.actions;

export const store = configureStore({
  reducer: storeSlice.reducer,
});
