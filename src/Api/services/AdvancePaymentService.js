import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosDefaultSetting from "../AxiosDefault";

// Fetch PayPal Client Token
export const fetchClientToken = createAsyncThunk(
  "paypal/fetchClientToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: "/advance/generate-client-token", // Example endpoint
      });
      return response.data.clientToken;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Error fetching client token"
      );
    }
  }
);

// Create Order
export const advanceCreateOrder = createAsyncThunk(
  "paypal/createOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        url: "/advance/create-order", // Example endpoint
      });
      if (response.data && response.data.id) {
        return response.data.id;
      }
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Error creating order"
      );
    }
  }
);

// Capture Order
export const advanceCaptureOrder = createAsyncThunk(
  "paypal/captureOrder",
  async (orderID, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "POST",
        url: "/advance/capture-order",
        data: { orderID },
      });
      return response.data.capture.result;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Error capturing payment"
      );
    }
  }
);
