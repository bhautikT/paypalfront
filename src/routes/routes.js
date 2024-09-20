
import { Suspense } from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { useRoutes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import Login from "../modules/auth/Login";
import Dashboard from "../modules/dashboard";
import Layoat from "../modules/layout/Layoat";
import PapPaTopaypal from "../modules/payments/PaypalTopaypal/PapPaTopaypal";
import ReturnUrl from "../modules/payments/PaypalTopaypal/ReturnPage";
import HomePage from "../modules/payments/commonComponents/Home";

const Router = () => {
  // Define public routes
  const publicRoutes = [
    {
      path: "/",
      element: (
        <Suspense>
          <PublicRoute>
            <HomePage/>
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
    {
      path: "/returnUrl",
      element: (
        <Suspense>
          <PublicRoute>
            <ReturnUrl/>
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
