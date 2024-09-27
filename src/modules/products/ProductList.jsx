// ProductList.jsx
import React from "react";
import productsData from "./productsData.json";

const ProductList = ({ addToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {productsData.products?.map((product) => (
        <div key={product.id} className="bg-white p-4 rounded shadow">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-32 object-cover mb-2"
          />
          <h2 className="font-semibold text-lg">{product.name}</h2>
          <p className="text-gray-700">{product.description}</p>
          <p className="font-bold">Price: ${product.price}</p>
          <button
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
