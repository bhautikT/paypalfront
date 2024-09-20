// Added By : Prashant
// Created At: 28-5-2024
// Description: Private routes
// Ticket ID: 001

import { Suspense } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  //get access token
  const accessToken = localStorage.getItem("token");

  if (!accessToken) {
    return <Navigate to="/" />;
  } else {
    return <Suspense fallback="loding">{children}</Suspense>;
  }
};

export default PrivateRoute;
