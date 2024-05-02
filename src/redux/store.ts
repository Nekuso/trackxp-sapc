import { configureStore, current } from "@reduxjs/toolkit";
import currentEmployeeReducer from "./slices/employeeSlice";
import branchesReducer from "./slices/branchesSlice";
import uomsReducer from "./slices/uomsSlice";
import rolesReducer from "./slices/rolesSlice";
import brandsReducer from "./slices/brandsSlice";
import orderCartOptionSlice from "./slices/orderCartOptionSlice";
import orderCartSlice from "./slices/orderCartSlice";
import orderServiceCartOptionSlice from "./slices/orderServiceCartOptionSlice";
import orderServiceCartSlice from "./slices/orderServiceCartSlice";
import currentSessionSlice from "./slices/userSessionSlice";
import allEmployeesSlice from "./slices/allEmployeesSlice";

export const store = configureStore({
  reducer: {
    currentEmployee: currentEmployeeReducer,
    branches: branchesReducer,
    uoms: uomsReducer,
    roles: rolesReducer,
    brands: brandsReducer,

    orderCartOptionSlice: orderCartOptionSlice,
    orderServiceCartOptionSlice: orderServiceCartOptionSlice,
    orderCart: orderCartSlice,
    orderServiceCart: orderServiceCartSlice,

    currentSession: currentSessionSlice,
    allEmployees: allEmployeesSlice,
  },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
