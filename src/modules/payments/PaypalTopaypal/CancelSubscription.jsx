import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const CancelSubscription = ({ OrdercaptureId }) => {
  const [captureId, setCaptureId] = useState(
    OrdercaptureId?.purchase_units[0]?.payments?.captures[0]?.id
  );
  const [amount, setAmount] = useState(
    OrdercaptureId?.purchase_units[0]?.payments?.captures[0]?.amount?.value
  );
  const [loading, setLoading] = useState(false);
  const [isRefunded, setIsRefunded] = useState(false);

  const handleCancelSubscription = async () => {
    if (!captureId) {
      toast.error("Please enter a valid capture ID");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/advance/cancel",
        {
          captureId,
          amount: parseFloat(amount) || undefined,
        }
      );

      if (response.data.success) {
        setIsRefunded(true);
        toast.success(
          "Subscription canceled and refund processed successfully"
        );
      } else {
        toast.error(response.data.message || "Failed to cancel subscription");
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
      toast.error("An error occurred while canceling the subscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
      <h2>Cancel Subscription</h2>

      {/* Conditional rendering based on refund status */}
      {isRefunded ? (
        <div className="text-green-500 font-semibold">
          Your payment has been refunded successfully.
        </div>
      ) : (
        <>
          <div>
            <label htmlFor="captureId">PayPal Capture ID:</label>
            <input
              type="text"
              id="captureId"
              value={captureId}
              onChange={(e) => setCaptureId(e.target.value)}
              placeholder="Enter the PayPal Capture ID"
              disabled
            />
          </div>

          <div>
            <label htmlFor="amount">Refund Amount (Optional):</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter the amount to refund"
              disabled
            />
          </div>

          <button
            onClick={handleCancelSubscription}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
          >
            {loading ? "Processing..." : "Cancel Subscription"}
          </button>
        </>
      )}
    </div>
  );
};

export default CancelSubscription;
