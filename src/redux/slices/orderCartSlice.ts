import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  productsCart: [],
  partsCart: [],
  productsTotalPrice: 0,
  partsTotalPrice: 0,
};

const orderCart = createSlice({
  name: "orderCart",
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<any>) => {
      state.productsCart.push(action.payload);
      state.productsTotalPrice = state.productsCart.reduce(
        (acc: number, product: any) => acc + product.price * product.quantity,
        0
      );
      console.log(state.productsTotalPrice);
    },
    addPartToCart: (state, action: PayloadAction<any>) => {
      state.partsCart.push(action.payload);
    },
    removeProductFromCart: (state, action: PayloadAction<any>) => {
      state.productsCart = state.productsCart.filter(
        (product: any) => product.id !== action.payload
      );
    },
    removePartFromCart: (state, action: PayloadAction<any>) => {
      state.partsCart = state.partsCart.filter(
        (part: any) => part.id !== action.payload
      );
    },

    incrementProductQuantity: (state, action: PayloadAction<any>) => {
      const product = state.productsCart.find(
        (product: any) => product.id === action.payload
      );
      if (product) {
        product.quantity += 1;
      }
    },
    decrementProductQuantity: (state, action: PayloadAction<any>) => {
      const product = state.productsCart.find(
        (product: any) => product.id === action.payload
      );
      if (product) {
        product.quantity -= 1;
      }
    },
    incrementPartQuantity: (state, action: PayloadAction<any>) => {
      const part = state.partsCart.find(
        (part: any) => part.id === action.payload
      );
      if (part) {
        part.quantity += 1;
      }
    },
    decrementPartQuantity: (state, action: PayloadAction<any>) => {
      const part = state.partsCart.find(
        (part: any) => part.id === action.payload
      );
      if (part) {
        part.quantity -= 1;
      }
    },
    resetCart: (state) => {
      state.productsCart = [];
      state.partsCart = [];
    },
  },
});

export const {
  addProductToCart,
  removePartFromCart,
  removeProductFromCart,
  incrementProductQuantity,
  decrementProductQuantity,
  incrementPartQuantity,
  decrementPartQuantity,
  resetCart,
} = orderCart.actions;
export default orderCart.reducer;
