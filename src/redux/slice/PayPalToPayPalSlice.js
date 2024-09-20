import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { CreateOrder } from "../../Api/services/PaypalTopaypalService";


const payPaltoPaypalSlice = createSlice({
  name: "PayPalToPayPal",
  initialState: {
    Createorderdata: null,
    loading:false,
    error: null,
  },
  extraReducers: (builder) => {
    //signin user
    builder
      .addCase(CreateOrder.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(CreateOrder.fulfilled, (state, action) => {
        if (action?.payload?.success === false) {
          toast.error("error login");
        }
        return {
          ...state,
          Createorderdata: action?.payload,
          loading: false,
        };
      })
      .addCase(CreateOrder.rejected, (state, action) => {
        toast.error(action.payload);
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      });
   

  },
});

export default payPaltoPaypalSlice.reducer;
