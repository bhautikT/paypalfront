import React from 'react'
import { useDispatch } from 'react-redux'
import { CreateOrder } from '../../Api/services/PaypalTopaypalService';

function PapPaTopaypal() {
  const dispatch=useDispatch();   
  const Createorder= async()=>{
    const data = "";
    const res = await dispatch(CreateOrder(data));
    console.log(res);
    window.open(res?.payload?.data, "_blank");
  }
  return (
    <div>
        <h1>Pay with paypal accounts</h1>
        <button onClick={Createorder}>Pay</button>
    </div>
  )
}

export default PapPaTopaypal
  