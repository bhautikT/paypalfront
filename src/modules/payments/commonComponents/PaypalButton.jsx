// src/components/PayPalButton.js

import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ createSubscription }) => {
  return (
    <PayPalScriptProvider
      options={{
        'client-id': 'AS7L_i-AZe_D_TdUzLVMJ_vowsz_mZhzodSYCpDpw2o4ZrJAswPCQcp_7EHjSrUy8u5h2J2daZ2__vXd',
        'vault': true, // Enable vaulting to save the payment method
        'intent': 'subscription' // Use subscription intent to create a billing agreement
      }}
    >
      <PayPalButtons
        createSubscription={(data, actions) => {
          return actions.subscription.create({
            plan_id: 'P-1234567890' // Replace with your plan ID
          });
        }}
        onApprove={(data, actions) => {
          console.log('Subscription completed:', data);
          // Save the subscription ID in your database
          createSubscription(data.subscriptionID);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
