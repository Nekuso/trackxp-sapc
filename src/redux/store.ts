import { configureStore } from "@reduxjs/toolkit";
import currentEmployeeReducer from "./slices/employeeSlice";
import branchesReducer from "./slices/branchesSlice";
import uomsReducer from "./slices/uomsSlice";
import rolesReducer from "./slices/rolesSlice";
import brandsReducer from "./slices/brandsSlice";
import orderCartOptionSlice from "./slices/orderCartOptionSlice";
import orderCartSlice from "./slices/orderCartSlice";

export const store = configureStore({
  reducer: {
    currentEmployee: currentEmployeeReducer,
    branches: branchesReducer,
    uoms: uomsReducer,
    roles: rolesReducer,
    brands: brandsReducer,

    orderCartOptionSlice: orderCartOptionSlice,
    orderCart: orderCartSlice,
  },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
