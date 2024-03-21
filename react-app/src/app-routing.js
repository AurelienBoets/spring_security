import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import { getUserDetails } from "./helpers/user-details";
import Header from "./shared/Header";

const userDetails = getUserDetails();

const isAdmin = () => {
  if (userDetails && userDetails.role === "ROLE_ADMIN") {
    return true;
  } else {
    if (isLoggedIn()) {
      return redirect("/products");
    }
  }
};

const isLoggedIn = () => {
  const user = localStorage.getItem("user");
  if (!!user) {
    return true;
  } else {
    return redirect("/");
  }
};

const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products",
        element: <ProductList />,
        loader: () => isLoggedIn(),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/create-product",
        element: <ProductForm />,
        loader: () => isAdmin(),
      },
      {
        path: "/edit-product",
        element: <ProductForm />,
        loader: () => isAdmin(),
      },
    ],
  },
]);

export default router;
