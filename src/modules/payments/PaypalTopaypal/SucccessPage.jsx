import React from "react";
import { useNavigate } from "react-router-dom";

const SucccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <div>
          <h1 className="text-2xl font-bold text-green-500 mb-4">
            Payment Confirmation Successful!
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SucccessPage;
