import { createAsyncThunk } from "@reduxjs/toolkit";
import AxiosDefaultSetting from "../AxiosDefault";

//get create order service data
export const CreateOrder = createAsyncThunk("paypal/paypaltopaypal", async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosDefaultSetting({
        method: "GET",
        url: `/payment/createpayment`,
        data: data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  });
