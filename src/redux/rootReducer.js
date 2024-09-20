import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import PayPalToPayPalSlice from "./slice/PayPalToPayPalSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  payPaltoPaypal:PayPalToPayPalSlice
  // Add other slices here
});

export default rootReducer;
