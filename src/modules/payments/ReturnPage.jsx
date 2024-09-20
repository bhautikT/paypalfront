// src/components/ReturnUrl.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { capturePAyment } from '../../Api/services/PaypalTopaypalService';

const ReturnUrl = () => {
  const { loading } = useSelector((state) => state.payPaltoPaypal);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const orderId = params.get('token');

    // Call the backend to capture the payment
    const capturePayment = async () => {
      await dispatch(capturePAyment(orderId));
    };

    if (orderId) {
      capturePayment();
    }
  }, [location.search, dispatch]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        {loading ? (
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <h1 className="text-xl font-semibold text-gray-700">
              Processing your payment...
            </h1>
            <p className="text-gray-500 mt-2">
              Please do not close this window or refresh the page.
            </p>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-green-500 mb-4">
              Payment Confirmation Successful!
            </h1>
            <button
              onClick={() => navigate('/')}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
            >
              Go Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReturnUrl;
