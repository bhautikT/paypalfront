import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CardForm = () => {
  const [cardDetails, setCardDetails] = useState({
    number: "",
    type: "visa", // or 'mastercard', 'amex'
    expireMonth: "",
    expireYear: "",
    cvv: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/cardMethod/store-card",
        cardDetails
      );
      if (response.data.success) {
        toast.success("Card stored successfully");
      } else {
        toast.error("Error storing card");
      }
    } catch (error) {
      console.error("Error storing card:", error);
      toast.error("Error storing card");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Store Card</h2>

        <div className="mb-4">
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            value={cardDetails.number}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="expireMonth"
            placeholder="Expiry Month"
            value={cardDetails.expireMonth}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="expireYear"
            placeholder="Expiry Year"
            value={cardDetails.expireYear}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={cardDetails.cvv}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={cardDetails.firstName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={cardDetails.lastName}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Store Card
        </button>
      </form>
    </div>
  );
};

export default CardForm;
