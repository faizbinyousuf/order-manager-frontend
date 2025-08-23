import "./App.css";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./pages/Layout";
import OrderPage from "./pages/OrderPage";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "orders",
        element: <OrderPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>

      {/* <HomePage></HomePage> */}
      {/* <Toaster position="top-center" /> */}
    </>
  );
}

export default App;
