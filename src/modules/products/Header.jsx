// Header.jsx
import React from "react";

const Header = ({ cartCount, toggleCart }) => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-2xl">My E-commerce Store</h1>
      <div className="relative cursor-pointer" onClick={toggleCart}>
        <button>
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
              d="M3 3h18M3 3l1.5 18h15l1.5-18H3z"
            />
          </svg>
        </button>
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">
            {cartCount}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
