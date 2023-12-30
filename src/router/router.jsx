import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import TopTenBooks from "../components/Book/TopTenBooks";
import Home from "../pages/Home.page"
import Login from "../pages/Auth/Login.page";
import Register from "../pages/Auth/Register.page";

const router = createBrowserRouter([
  {
    path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element:<TopTenBooks />
        }
    ]
  },
  {
    path: "/books",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;