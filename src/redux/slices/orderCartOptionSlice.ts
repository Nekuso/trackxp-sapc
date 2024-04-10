import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  productsData: [],
  partsData: [],
};

const orderCartOptions = createSlice({
  name: "orderOptions",
  initialState: initialState,
  reducers: {
    setProductsData: (state, action: PayloadAction<any>) => {
      state.productsData = action.payload;
    },
    setPartsData: (state, action: PayloadAction<any>) => {
      state.partsData = action.payload;
    },
  },
});

export const { setProductsData } = orderCartOptions.actions;
export const { setPartsData } = orderCartOptions.actions;
export default orderCartOptions.reducer;
