import React, { useState, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";
import axios from "axios";

const PayPalCheckout = () => {
  const [orderId, setOrderId] = useState(null);
  const [clientToken, setClientToken] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch the PayPal client token on component mount
  useEffect(() => {
    const fetchClientToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/advance/generate-client-token"
        );
        setClientToken(response?.data?.clientToken);
      } catch (err) {
        setErrorMessage("Error fetching client token");
      }
    };
    fetchClientToken();
  }, []);

  // Function to create the order
  const createOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/advance/create-order"
      );
      if (response.data && response.data.id) {
        setOrderId(response.data.id); // Set orderId correctly
        return response.data.id;
      }
    } catch (err) {
      setErrorMessage("Error creating order");
    }
  };

  // Function to capture the order
  const captureOrder = async (orderID) => {
    console.log(orderID, "orderID123");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/advance/capture-order",
        {
          orderID: orderID?.orderId,
        }
      );
      if (response.data.capture.status === "COMPLETED") {
        setSuccess(true);
      }
    } catch (err) {
      setErrorMessage("Error capturing payment");
    }
  };

  return (
    <>
      {clientToken && clientToken !== null ? (
        <PayPalScriptProvider
          options={{
            "client-id":
              "AS7L_i-AZe_D_TdUzLVMJ_vowsz_mZhzodSYCpDpw2o4ZrJAswPCQcp_7EHjSrUy8u5h2J2daZ2__vXd",
            components: "buttons,hosted-fields",
            intent: "capture",
            dataClientToken: clientToken,
          }}
        >
          {success ? (
            <div>Payment Successful!</div>
          ) : (
            <PayPalHostedFieldsProvider createOrder={createOrder}>
              <div>
                <label>Card Number</label>
                <PayPalHostedField
                  id="card-number"
                  hostedFieldType="number"
                  options={{
                    selector: "#card-number",
                    placeholder: "4111 1111 1111 1111",
                  }}
                />
              </div>
              <div>
                <label>CVV</label>
                <PayPalHostedField
                  id="cvv"
                  hostedFieldType="cvv"
                  options={{ selector: "#cvv", placeholder: "123" }}
                />
              </div>
              <div>
                <label>Expiration Date</label>
                <PayPalHostedField
                  id="expiration-date"
                  hostedFieldType="expirationDate"
                  options={{
                    selector: "#expiration-date",
                    placeholder: "MM/YY",
                  }}
                />
              </div>

              <SubmitButton onApprove={captureOrder} />
            </PayPalHostedFieldsProvider>
          )}
          {errorMessage && <div>{errorMessage}</div>}
        </PayPalScriptProvider>
      ) : (
        <div>Loading PayPal...</div> // Show loading while fetching client token
      )}
    </>
  );
};

const SubmitButton = ({ onApprove }) => {
  const hostedFields = usePayPalHostedFields();

  const handleClick = async () => {
    try {
      const orderID = await hostedFields.cardFields.submit(); // Get the order ID
      if (orderID) {
        await onApprove(orderID); // Call onApprove with the order ID
      } else {
        console.error("Failed to get order ID.");
        setErrorMessage("Error processing payment");
      }
    } catch (err) {
      console.error("Payment submission error:", err);
      setErrorMessage("Error processing payment");
    }
  };

  return <button onClick={handleClick}>Pay Now</button>;
};

export default PayPalCheckout;
