import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import PayPalToPayPalSlice from "./slice/PayPalToPayPalSlice";
import advacncePaymentSlice from "./slice/advacncePaymentSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  payPaltoPaypal: PayPalToPayPalSlice,
  advancePaypal: advacncePaymentSlice,
  // Add other slices here
});

export default rootReducer;
