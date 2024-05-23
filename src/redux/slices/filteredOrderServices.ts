import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  allFilteredOrderServices: [],
};

const allFilteredOrderServices = createSlice({
  name: "allFilteredOrderServices",
  initialState: initialState,
  reducers: {
    setFilteredOrderServices: (state, action: PayloadAction<any>) => {
      state.allFilteredOrderServices = action.payload;
    },
  },
});

export const { setFilteredOrderServices } = allFilteredOrderServices.actions;
export default allFilteredOrderServices.reducer;
