import React, { useState, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalHostedFieldsProvider,
  PayPalHostedField,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PayPalCheckout = () => {
  const [orderId, setOrderId] = useState(null);
  const [clientToken, setClientToken] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

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

  const createOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/advance/create-order"
      );
      if (response.data && response.data.id) {
        setOrderId(response.data.id);
        setLoading(false);

        return response.data.id;
      }
    } catch (err) {
      setErrorMessage("Error creating order");
      setLoading(false);
    }
  };

  const captureOrder = async (orderID) => {
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/advance/capture-order",
        {
          orderID: orderID?.orderId,
        }
      );
      console.log(response, "reeeee");
      if (response?.data?.capture?.result?.status === "COMPLETED") {
        setSuccess(true);
        setLoading(false); // Set loading to false
        navigate("/successPage");
      }
    } catch (err) {
      setErrorMessage("Error capturing payment");
      setLoading(false); // Set loading to false
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          $100.00 USD
        </p>
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
              <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
                Payment Successful!
              </div>
            ) : (
              <PayPalHostedFieldsProvider createOrder={createOrder}>
                <div className="space-y-6">
                  <div className="p-2">
                    <label
                      htmlFor="card-number"
                      className="block text-gray-300 text-sm mb-2"
                    >
                      Card Number
                    </label>
                    <PayPalHostedField
                      id="card-number"
                      hostedFieldType="number"
                      options={{
                        selector: "#card-number",
                        placeholder: "Card Number",
                        styles: {
                          input: {
                            backgroundColor: "#1f2937",
                            color: "#ffffff",
                            fontSize: "16px",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #ffffff",
                          },
                          ":focus": {
                            borderColor: "#f59e0b",
                          },
                          "::placeholder": {
                            color: "#9ca3af",
                          },
                        },
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-2">
                    <div>
                      <label
                        htmlFor="expiration-date"
                        className="block text-gray-300 text-sm mb-2"
                      >
                        Expiry Date (MM/YY)
                      </label>
                      <PayPalHostedField
                        id="expiration-date"
                        hostedFieldType="expirationDate"
                        options={{
                          selector: "#expiration-date",
                          placeholder: "MM/YY",
                          styles: {
                            input: {
                              backgroundColor: "#1f2937",
                              color: "#ffffff",
                              fontSize: "16px",
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #4b5563",
                            },
                            ":focus": {
                              borderColor: "#f59e0b",
                            },
                            "::placeholder": {
                              color: "#9ca3af",
                            },
                          },
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cvv"
                        className="block text-gray-300 text-sm mb-2"
                      >
                        CVV
                      </label>
                      <PayPalHostedField
                        id="cvv"
                        hostedFieldType="cvv"
                        options={{
                          selector: "#cvv",
                          placeholder: "CVV",
                          styles: {
                            input: {
                              backgroundColor: "#1f2937",
                              color: "#ffffff",
                              fontSize: "16px",
                              padding: "12px",
                              borderRadius: "8px",
                              border: "1px solid #4b5563",
                            },
                            ":focus": {
                              borderColor: "#f59e0b",
                            },
                            "::placeholder": {
                              color: "#9ca3af",
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-2">
                    <label
                      htmlFor="email"
                      className="block text-gray-300 text-sm mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-gray-700 text-white p-3 border border-gray-600 rounded-md focus:outline-none"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <SubmitButton onApprove={captureOrder} loading={loading} />
                </div>
              </PayPalHostedFieldsProvider>
            )}
            {errorMessage && (
              <div className="text-red-600 mt-4">{errorMessage}</div>
            )}
          </PayPalScriptProvider>
        ) : (
          <div className="text-gray-500 text-center">Loading PayPal...</div>
        )}
      </div>
    </div>
  );
};

const SubmitButton = ({ onApprove, loading }) => {
  const hostedFields = usePayPalHostedFields();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleClick = async () => {
    try {
      const orderID = await hostedFields.cardFields.submit();
      if (orderID) {
        await onApprove(orderID);
      } else {
        console.error("Failed to get order ID.");
        setErrorMessage("Error processing payment");
      }
    } catch (err) {
      console.error("Payment submission error:", err);
      setErrorMessage("Error processing payment");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 transition duration-200"
      disabled={loading}
    >
      {loading ? <span>Loading...</span> : <span>Pay Now</span>}
    </button>
  );
};

export default PayPalCheckout;
