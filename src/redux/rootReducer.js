import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  // Add other slices here
});

export default rootReducer;
