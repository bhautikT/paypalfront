import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./ProductList";
import Header from "./Header";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (id, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? (quantity > 0 ? { ...item, quantity } : null) : item
        )
        .filter(Boolean)
    );
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleCheckout = () => {
    const purchaseUnits = [
      {
        items: cart.map((item) => ({
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          unit_amount: {
            currency_code: "USD",
            value: item.price.toFixed(2),
          },
        })),
        amount: {
          currency_code: "USD",
          value: cart
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2),
          breakdown: {
            item_total: {
              currency_code: "USD",
              value: cart
                .reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2),
            },
          },
        },
      },
    ];

    // Navigate to advance-checkout with purchaseUnits data
    navigate("/advance-checkout", { state: { purchaseUnits } });
  };

  // Calculate total amount
  const totalAmount = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div>
      {" "}
      <Header cartCount={cart.length} toggleCart={toggleCart} />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center my-6">Shopping Cart</h1>
        <ProductList addToCart={addToCart} />

        {isCartOpen && (
          <div className="fixed top-0 right-0 w-1/3 bg-white shadow-lg p-4 max-h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl">Cart Items:</h2>
              <button
                onClick={toggleCart}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="text-center text-gray-500">
                <p className="text-lg">Your cart is empty.</p>
                <p>Please add some products.</p>
              </div>
            ) : (
              <>
                <ul className="space-y-2">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center p-2 border-b"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mr-4"
                        />
                        <span className="text-lg font-medium">
                          {item.name} - ${item.price} x {item.quantity}
                        </span>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="mx-1 bg-green-500 text-white px-2 rounded hover:bg-green-600"
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(0, item.quantity - 1)
                            )
                          }
                          className="mx-1 bg-red-500 text-white px-2 rounded hover:bg-red-600"
                        >
                          -
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <strong className="text-lg">Total: ${totalAmount}</strong>
                </div>
                <button
                  onClick={handleCheckout}
                  className={`mt-4 w-full py-2 rounded ${
                    totalAmount > 0
                      ? "bg-blue-500 hover:bg-blue-600 text-white"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                  disabled={totalAmount <= 0} // Disable button if total amount is <= 0
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
