import { Suspense } from "react";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { useRoutes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import Dashboard from "../modules/dashboard";
import Layoat from "../modules/layout/Layoat";
import PapPaTopaypal from "../modules/payments/PaypalTopaypal/PapPaTopaypal";
import ReturnUrl from "../modules/payments/PaypalTopaypal/ReturnPage";
import HomePage from "../modules/payments/commonComponents/Home";
import PayPalCheckout from "../modules/payments/advanceCheckout/PayPalCheckout";
import SucccessPage from "../modules/payments/advanceCheckout/SucccessPage";
import PayPalButton from "../modules/payments/Fastlane-by-PayPal/FastlanePayPal";
import PaypalSave from "../modules/payments/savemethods/PayPalSave";
import CardForm from "../modules/payments/UserCardSave/CardForm";
import StoredCards from "../modules/payments/UserCardSave/userCardSaveMethods";
import CartPage from "../modules/products/Cart";
import UserCardHome from "../modules/payments/UserCardSave/UserCardHome";

const Router = () => {
  // Define public routes
  const publicRoutes = [
    {
      path: "/cart",
      element: (
        <Suspense>
          <PublicRoute>
            <CartPage />
          </PublicRoute>
        </Suspense>
      ),
    },
    {
      path: "/paypal-to-paypal",
      element: (
        <Suspense>
          <PublicRoute>
            <PapPaTopaypal />
          </PublicRoute>
        </Suspense>
      ),
    },
    {
      path: "/advance-checkout",
      element: (
        <Suspense>
          <PublicRoute>
            <PayPalCheckout />
          </PublicRoute>
        </Suspense>
      ),
    },
    {
      path: "/returnUrl",
      element: (
        <Suspense>
          <PublicRoute>
            <ReturnUrl />
          </PublicRoute>
        </Suspense>
      ),
    },
    {
      path: "/successPage",
      element: (
        <Suspense>
          <PublicRoute>
            <SucccessPage />
          </PublicRoute>
        </Suspense>
      ),
    },
    {
      path: "/fastlane-by-paypal",
      element: (
        <Suspense>
          <PublicRoute>
            <PayPalButton />
          </PublicRoute>
        </Suspense>
      ),
    },
    {
      path: "/save",
      element: (
        <Suspense>
          <PublicRoute>
            <PaypalSave />
          </PublicRoute>
        </Suspense>
      ),
    },
    {
      path: "/card-form",
      element: (
        <Suspense>
          <PublicRoute>
            <CardForm />
          </PublicRoute>
        </Suspense>
      ),
    },
    {
      path: "/cardisplay",
      element: (
        <Suspense>
          <PublicRoute>
            <StoredCards />
          </PublicRoute>
        </Suspense>
      ),
    },
    {
      path: "/user-card",
      element: (
        <Suspense>
          <PublicRoute>
            <UserCardHome/>
          </PublicRoute>
        </Suspense>
      ),
    },
    {
      path: "/",
      element: (
        <Suspense>
          <PublicRoute>
            <HomePage />
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
