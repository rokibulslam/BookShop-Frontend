import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import TopTenBooks from "../components/Book/TopTenBooks";
import Home from "../pages/Home.page"
import Login from "../pages/Auth/Login.page";
import Register from "../pages/Auth/Register.page";
import Books from "../pages/Books.page";
import BookUpdate from "../pages/BookUpdate.page";
import ProtectedRoute from "../pages/Auth/ProtectedRoute";
import AddNewBook from "../pages/AddNewBook.page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TopTenBooks />,
      },
      {
        path: "/updateBook",
        element: (
          <ProtectedRoute>
            <BookUpdate />
          </ProtectedRoute>
        ),
      },
      {
        path: "/addBook",
        element: (
          <ProtectedRoute>
            <AddNewBook />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/books",
    element: <Books />,
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