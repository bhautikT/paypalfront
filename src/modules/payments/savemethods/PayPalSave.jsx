import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';

function PayPalSaveMethod() {
  const [saved, setSaved] = useState(false);

  //save methods
  const handleSaveMethod = async (billingToken) => {
    try {
      // Send the billing token to your backend to save the payment method
      const response = await axios.post('http://localhost:3001/api/v1/payment/execute-payment', {
        billingToken: billingToken,
      });

      console.log('Payment method saved: ', response.data);
      setSaved(true);
    } catch (error) {
      console.error('Error saving payment method: ', error);
    }
  };
  //cancle his subscriptions
  const handleUnsubscribeAndRefund = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/payment/cancelSubscriptionAndRefund', {
        subscriptionId: '',
        paymentId: '', // Use the last payment ID for refund
      });

      console.log('Subscription cancelled and refund processed:', response.data);
    //   setSaved(false);
    //   setSubscriptionId(null);
    //   setLastPaymentId(null);
    } catch (error) {
      console.error('Error cancelling subscription and issuing refund:', error);
    }
  };


  return (
    <PayPalScriptProvider
      options={{
        "client-id": "AS7L_i-AZe_D_TdUzLVMJ_vowsz_mZhzodSYCpDpw2o4ZrJAswPCQcp_7EHjSrUy8u5h2J2daZ2__vXd",
        vault: true,
      }}
    >
      {saved ? (
        <div>Payment method saved for future use!</div>
      ) : (
        <PayPalButtons
          createSubscription={(data, actions) => {
            return actions.subscription.create({
              plan_id: "P-4VD67529EY827261EM3Z6EAY", // Replace with your actual plan ID
            });
          }}
          onApprove={(data, actions) => {
            // Capture the subscription
            return actions.subscription.get().then((details) => {
            console.log(data,details,'data')
              const billingToken = details.id; // Usually, the subscription ID acts like a billing token here.

              console.log('Billing Token:', billingToken);

              if (billingToken) {
                // Send the billingToken to your backend to save the method
                handleSaveMethod(billingToken);
              } else {
                console.log('No Billing Token available for this transaction.');
              }
            }).catch((err) => console.error('Error fetching subscription details:', err));
          }}
          vault={true}
        />
      )}
    </PayPalScriptProvider>
  );
}

export default PayPalSaveMethod;
