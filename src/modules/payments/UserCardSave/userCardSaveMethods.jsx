import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoredCards = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/v1/cardMethod/list-cards');
        setCards(response?.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/cardMethod/make-payment', {
        cardId: selectedCard,
        amount
      });
      if (response.data.success) {
        alert('Payment successful!');
      } else {
        alert('Payment failed');
      }
    } catch (error) {
      console.error('Error making payment:', error);
      alert('Error making payment');
    }
  };
  console.log(cards,'cards',selectedCard,'selected card')

  return (
    <div>
      <h2>Select a Stored Card</h2>
      {cards && cards?.data?.map((card) => (
        <div key={card.id}>
          <label>
            <input
              type="radio"
              name="card"
              value={card.id}
              onChange={() => setSelectedCard(card._id)}
            />
            {`${card.brand} ****${card.last4}`}
          </label>
        </div>
      ))}
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Make Payment</button>
    </div>
  );
};

export default StoredCards;
