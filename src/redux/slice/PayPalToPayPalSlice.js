import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { capturePAyment, CreateOrder } from "../../Api/services/PaypalTopaypalService";


const payPaltoPaypalSlice = createSlice({
  name: "PayPalToPayPal",
  initialState: {
    Createorderdata: null,
    loading:false,
    error: null,
    paymentInfo:null
  },
  extraReducers: (builder) => {
    //create order of payment
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

      //capture order of payment after sucessfull redirect to return page 
      builder
      .addCase(capturePAyment.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(capturePAyment.fulfilled, (state, action) => {
        if (action?.payload?.success === false) {
          toast.error("error login");
        }
        else{
          console.log(action?.payload,'actions');
         toast.success(action?.payload?.message);
        }
        return {
          ...state,
          paymentInfo: action?.payload,
          loading: false,
        };
      })
      .addCase(capturePAyment.rejected, (state, action) => {
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
