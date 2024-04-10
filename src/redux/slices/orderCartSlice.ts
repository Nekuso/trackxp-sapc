import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  productsCart: [
    {
      product_id: 1,
      Inventory_id: 1,
      name: "product1",
      description: "product1 description",
      image: "product1 image",
      uom_name: "product1 uom",
      quantity: 1,
      price: 100,
    },
    {
      product_id: 2,
      Inventory_id: 2,
      name: "product2",
      description: "product2 description",
      image: "product2 image",
      uom_name: "product2 uom",
      quantity: 3,
      price: 200,
    },
  ],
  partsCart: [
    {
      product_id: 1,
      Inventory_id: 1,
      name: "part1",
      description: "part1 description",
      image: "part1 image",
      brand: "part1 brand",
      quantity: 3,
      price: 100,
    },
    {
      product_id: 2,
      Inventory_id: 2,
      name: "part2",
      description: "part2 description",
      image: "part2 image",
      brand: "part2 brand",
      quantity: 1,
      price: 200,
    },
  ],

  get products_total_price() {
    return this.productsCart.reduce(
      (total: number, product: any) => total + product.price * product.quantity,
      0
    );
  },

  get parts_total_price() {
    return this.partsCart.reduce(
      (total: number, part: any) => total + part.price * part.quantity,
      0
    );
  },
};

const orderCart = createSlice({
  name: "orderCart",
  initialState: initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<any>) => {
      state.productsCart.push(action.payload);
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
  addPartToCart,
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
