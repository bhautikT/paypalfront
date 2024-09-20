import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateOrder } from '../../Api/services/PaypalTopaypalService';

function PapPaTopaypal() {
  const dispatch = useDispatch();
  const {loading} =useSelector((state)=>state.payPaltoPaypal)

  const Createorder = async () => {
    const data = "";
    const res = await dispatch(CreateOrder(data));
    console.log(res);
    window.open(res?.payload?.data, "_blank");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Pay with PayPal Accounts</h1>
        <p className="text-gray-600 mb-6">
          Securely pay with your PayPal account. Click the button below to proceed.
        </p>
        <button
          onClick={Createorder}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-300"
        >
          {loading ? 'loading...' :'Pay with PayPal'}
        </button>
      </div>
    </div>
  );
}

export default PapPaTopaypal;
