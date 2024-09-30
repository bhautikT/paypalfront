import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const StoredCards = () => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/v1/cardMethod/list-cards"
        );
        setCards(response?.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/cardMethod/make-payment/v2",
        {
          cardId: selectedCard,
          amount,
        }
      );
      if (response.data.success) {
        toast.success("Payment successful!");
      } else {
        toast.error("Payment failed");
      }
    } catch (error) {
      console.error("Error making payment:", error);
      toast.error("Error making payment");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Select a Stored Card
        </h2>
        <div className="space-y-4 mb-4">
          {cards &&
            cards?.data?.map((card) => (
              <div
                key={card._id}
                className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors ${
                  selectedCard === card._id
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => setSelectedCard(card._id)}
              >
                <input
                  type="radio"
                  name="card"
                  value={card._id}
                  checked={selectedCard === card._id}
                  onChange={() => setSelectedCard(card._id)}
                  className="mr-4"
                />
                <div>
                  <p className="text-lg font-semibold">{`${card.brand.toUpperCase()} ****${
                    card.last4
                  }`}</p>
                  <p className="text-sm text-gray-500">{`Expires ${card.expiryMonth}/${card.expiryYear}`}</p>
                </div>
              </div>
            ))}
        </div>
        <input
          type="text"
          placeholder="Enter Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handlePayment}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Make Payment
        </button>
      </div>
    </div>
  );
};

export default StoredCards;
