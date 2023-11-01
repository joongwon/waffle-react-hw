import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import ReviewListPage from "./pages/ReviewListPage";
import SnackListPage from "./pages/SnackListPage";
import SnackItemPage from "./pages/SnackItemPage";
import { SnackProvider } from "./contexts/SnackContext";
import NewSnackPage from "./pages/NewSnackPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ReviewListPage />,
      },
      {
        path: "/snacks",
        element: <SnackListPage />,
      },
      {
        path: "/snacks/:id",
        element: <SnackItemPage />,
      },
      {
        path: "/snacks/new",
        element: <NewSnackPage />,
      },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <SnackProvider>
      <RouterProvider router={router} />
    </SnackProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
