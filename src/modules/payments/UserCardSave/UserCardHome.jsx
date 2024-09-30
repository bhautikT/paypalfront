import React from 'react';
import { useNavigate } from 'react-router-dom';

function UserCardHome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Manage Your Cards</h2>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/card-form')}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Add New Card
          </button>
          
          <button
            onClick={() => navigate('/cardisplay')}
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Payment with Stored Card
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCardHome;
