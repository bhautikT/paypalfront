// Added By : Prashant
// Created At: 28-5-2024
// Description: public routes
// Ticket ID: 001
import React from "react";
import { Navigate } from "react-router-dom";
import { Suspense } from "react";

const PublicRoute = ({ children }) => {
  //get access token
  const accessToken = localStorage.getItem("token");

  if (accessToken) {
    return <Navigate to="/dashboard" />;
  }

  return <Suspense fallback="loding">{children}</Suspense>;
};

export default PublicRoute;
