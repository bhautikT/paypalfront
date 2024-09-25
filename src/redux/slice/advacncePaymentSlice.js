import { createSlice } from "@reduxjs/toolkit";
import {
  advanceCaptureOrder,
  advanceCreateOrder,
  fetchClientToken,
} from "../../Api/services/AdvancePaymentService";

const initialState = {
  clientToken: null,
  orderId: null,
  captureOrder: null,
  loading: false,
  error: null,
};

const advancePaypalSlice = createSlice({
  name: "advancePaypal",
  initialState,
  reducers: {
    resetAdvancePaypal: (state) => {
      state.clientToken = null;
      state.orderId = null;
      state.captureOrder = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClientToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClientToken.fulfilled, (state, action) => {
        state.clientToken = action.payload;
        state.loading = false;
      })
      .addCase(fetchClientToken.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(advanceCreateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(advanceCreateOrder.fulfilled, (state, action) => {
        state.orderId = action.payload;
        state.loading = false;
      })
      .addCase(advanceCreateOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(advanceCaptureOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(advanceCaptureOrder.fulfilled, (state, action) => {
        state.captureOrder = action.payload;
        state.loading = false;
      })
      .addCase(advanceCaptureOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { resetAdvancePaypal } = advancePaypalSlice.actions;

export default advancePaypalSlice.reducer;
