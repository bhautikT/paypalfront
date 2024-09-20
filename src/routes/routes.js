
import { Suspense } from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { useRoutes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import Login from "../modules/auth/Login";
import Dashboard from "../modules/dashboard";
import Layoat from "../modules/layout/Layoat";
import PapPaTopaypal from "../modules/payments/PapPaTopaypal";

const Router = () => {
  // Define public routes
  const publicRoutes = [
    {
      path: "/login",
      element: (
        <Suspense>
          <PublicRoute>
            <Login />
          </PublicRoute>
        </Suspense>
      ),
    },
    {
      path: "/paypal-to-paypal",
      element: (
        <Suspense>
          <PublicRoute>
            <PapPaTopaypal/>
          </PublicRoute>
        </Suspense>
      ),
    },
    // Add more public routes as needed
  ];

  // Define private routes
  const privateRoutes = [
    {
      path: "/", // Layout path
      element: (
        <PrivateRoute>
          <Layoat />
        </PrivateRoute>
      ),
      children: [
        // Child routes within the layout
        {
          path: "/dashboard",
          element: (
            <Suspense fallback="loading">
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            </Suspense>
          ),
        },
        // Add more private routes as needed
      ],
    },
  ];

  // Merge public and private routes
  const routes = useRoutes([
    ...publicRoutes,
    ...privateRoutes,
    {
      path: "*",
      element: (
        <Suspense>
          <PageNotFound />
        </Suspense>
      ),
    },
  ]);

  return routes;
};

export default Router;
