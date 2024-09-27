import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  advanceCaptureOrder,
  fetchClientToken,
} from "../../../Api/services/AdvancePaymentService";

const paypalScriptOptions = {
  "client-id":
    "AaUpVv8WDVM5uezwsQo79K6YBKmqm3EeLSOx5TFTX4RM2_ephwW68aJ4_ASXYPjbI8OyuXchwgkQ7bRl",
  currency: "USD",
};

const PayPalCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { purchaseUnits } = location.state || {};

  console.log(purchaseUnits, "purchaseUnits");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const clientToken = useSelector((state) => state.advancePaypal.clientToken);
  const captureOrderData = useSelector(
    (state) => state.advancePaypal.captureOrder
  );
  const success = captureOrderData?.status === "COMPLETED";

  useEffect(() => {
    dispatch(fetchClientToken());
  }, [dispatch]);

  const createOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/advance/create-order",
        { purchaseUnits } // Pass the purchase units here
      );
      setLoading(false);
      return response.data.id;
    } catch (err) {
      setErrorMessage("Error creating order");
      setLoading(false);
    }
  };

  const captureOrder = async (orderID) => {
    try {
      await dispatch(advanceCaptureOrder(orderID));
      navigate("/successPage");
    } catch (error) {
      setErrorMessage("Error capturing order");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="text-white text-center text-3xl font-semibold mb-4">
          Advanced Checkout Method
        </h1>
        <h2 className="text-orange-400 text-center text-xl font-bold mb-8">
          Debit/Credit Card
        </h2>
        <p className="text-center bg-orange-500 text-white font-bold py-2 px-4 rounded-lg mb-6">
          {purchaseUnits && purchaseUnits?.length > 0
            ? "$" + purchaseUnits[0]?.amount?.value
            : 100.0}{" "}
          USD
        </p>
        {clientToken && clientToken !== null ? (
          <PayPalScriptProvider options={paypalScriptOptions}>
            <PayPalButtons
              createOrder={async (data, actions) => {
                const orderID = await createOrder();
                return orderID;
              }}
              onApprove={async (data, actions) => {
                await captureOrder(data.orderID);
              }}
              style={{ layout: "vertical" }}
            />
            {loading && (
              <div className="text-white text-center">Loading...</div>
            )}
            {errorMessage && (
              <div className="text-red-600 mt-4 text-center">
                {errorMessage}
              </div>
            )}
          </PayPalScriptProvider>
        ) : (
          <div className="text-gray-500 text-center">Loading PayPal...</div>
        )}
      </div>
    </div>
  );
};

export default PayPalCheckout;
