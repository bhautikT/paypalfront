// src/components/HomePage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Payment Methods
        </h1>
        <p className="text-gray-600 mb-4">
          Choose your preferred payment method below:
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/paypal-to-paypal")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            PayPal to PayPal Account
          </button>
          <button
            onClick={() => navigate("/fastlane-by-paypal")}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            Fastlane By PayPal
          </button>
          {/* Add more buttons as needed for additional methods */}
          <button
            onClick={() => navigate("/advance-checkout")}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            Advanced Checkout and Refund Method
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            Compleate checkout and Refund flow
          </button>
          <button
            onClick={() => navigate("/user-card")}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            Make payment with store card
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
