import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import toast from 'react-hot-toast';

const PayPalButton = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
    <PayPalScriptProvider options={{ "client-id": "AS7L_i-AZe_D_TdUzLVMJ_vowsz_mZhzodSYCpDpw2o4ZrJAswPCQcp_7EHjSrUy8u5h2J2daZ2__vXd" }}>
      <PayPalButtons 
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: "1.00" // Replace with dynamic amount
              }
            }]
          });
        }}
        onApprove={(data, actions) => {
          console.log(actions,'actions',data,'data')
           actions.order.capture().then(details => {
            toast.success(`Transaction completed by ${details.payer.name.given_name}`);
          });
        }}
        onError={(err) => {
          console.error('Transaction error: ', err);
          toast.error('Transaction failed');
        }}
      />
    </PayPalScriptProvider>
    </div>
  );
}

export default PayPalButton;
