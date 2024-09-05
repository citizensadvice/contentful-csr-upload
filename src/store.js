import { combineReducers, configureStore } from "@reduxjs/toolkit";

import screenReducer from "./state/screenSlice";
import suppliersReducer from "./state/supplierSlice";
import uploadErrorsReducer from "./state/uploadErrorsSlice";
import appStatusReducer from "./state/appStatusSlice";
import contentfulSuppliersReducer from "./state/contentfulSupplierSlice";
import scheduleTimeReducer from "./state/scheduleTimeSlice";
import contentfulErrorReducer from "./state/contentfulErrorsSlice";

// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  screen: screenReducer,
  suppliers: suppliersReducer,
  uploadErrors: uploadErrorsReducer,
  appStatus: appStatusReducer,
  contentfulSuppliers: contentfulSuppliersReducer,
  scheduleTime: scheduleTimeReducer,
  contentfulErrors: contentfulErrorReducer,
});

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const store = configureStore({
  reducer: rootReducer,
});
