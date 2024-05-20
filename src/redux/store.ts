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
import allMobileUsersSlice from "./slices/mobileUsersSlice";
import viewOrderCartSlice from "./slices/viewOrderCartSlice";
import viewOrderServiceCartSlice from "./slices/viewOrderServiceCartSlice";
import viewUpdateOrderServiceCartSlice from "./slices/viewUpdateOrderServiceCart";
import progressEntriesSlice from "./slices/progressEntriesSlice";
import currentOrderServiceSlice from "./slices/currentOrderServiceSlice";

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

    currentOrderService: currentOrderServiceSlice,
    viewOrderCart: viewOrderCartSlice,
    viewOrderServiceCart: viewOrderServiceCartSlice,
    viewUpdateOrderServiceCart: viewUpdateOrderServiceCartSlice,
    progressEntries: progressEntriesSlice,

    currentSession: currentSessionSlice,
    allMobileUser: allMobileUsersSlice,
    allEmployees: allEmployeesSlice,
  },
});

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
