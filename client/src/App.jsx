import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./routes/layout/Layout";
import HomePage from "./routes/home/HomePage";
import ListPage from "./routes/listPage/ListPage";
import Login from "./routes/auth/Login";
import { SinglePage } from "./routes/singlePage/SinglePage";
import profilePage from "./routes/profilePage/ProfilePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/list",
          element: <ListPage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/:id",
          element: <SinglePage />,
        },
        {
          path: "/profile",
          element: <profilePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
export default App;
