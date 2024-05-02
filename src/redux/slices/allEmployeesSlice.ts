import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: any = [];

const allEmployeesSlice = createSlice({
  name: "allEmployees",
  initialState: initialState,
  reducers: {
    setEmployeesData: (state, action: PayloadAction<any>) => {
      console.log(action.payload);
      return (state = action.payload);
    },
  },
});

export const { setEmployeesData } = allEmployeesSlice.actions;
export default allEmployeesSlice.reducer;
