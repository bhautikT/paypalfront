import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CancelSubscription from "./CancelSubscription";
import { resetAdvancePaypal } from "../../../redux/slice/advacncePaymentSlice";

const SucccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const captureOrderData = useSelector(
    (state) => state.advancePaypal.captureOrder
  );
  console.log(captureOrderData, "captureOrderData");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <div>
          <h1 className="text-2xl font-bold text-green-500 mb-4">
            Payment Confirmation Successful!
          </h1>
          <button
            onClick={() => {
              navigate("/");
              dispatch(resetAdvancePaypal());
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            Go Back to Home
          </button>
          <CancelSubscription OrdercaptureId={captureOrderData} />
        </div>
      </div>
    </div>
  );
};

export default SucccessPage;
