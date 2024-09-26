import React, { useState } from 'react';
import axios from 'axios';

const CardForm = () => {
  const [cardDetails, setCardDetails] = useState({
    number: '',
    type: 'visa', // or 'mastercard', 'amex'
    expireMonth: '',
    expireYear: '',
    cvv: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/v1/cardMethod/store-card', cardDetails);
      if (response.data.success) {
        alert('Card stored successfully');
      } else {
        alert('Error storing card');
      }
    } catch (error) {
      console.error('Error storing card:', error);
      alert('Error storing card');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="number" placeholder="Card Number" value={cardDetails.number} onChange={handleChange} />
      <input type="text" name="expireMonth" placeholder="Expiry Month" value={cardDetails.expireMonth} onChange={handleChange} />
      <input type="text" name="expireYear" placeholder="Expiry Year" value={cardDetails.expireYear} onChange={handleChange} />
      <input type="text" name="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={handleChange} />
      <input type="text" name="firstName" placeholder="First Name" value={cardDetails.firstName} onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" value={cardDetails.lastName} onChange={handleChange} />
      <button type="submit">Store Card</button>
    </form>
  );
};

export default CardForm;
