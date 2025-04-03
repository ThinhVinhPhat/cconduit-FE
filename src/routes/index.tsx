import Layout from "../components/layout";
import HomePage from "../pages/Home";
import LoginPage from "../pages/auth/Login";
import { createBrowserRouter } from "react-router";
import ProfilePage from "../pages/user/Profile";
import SettingPage from "../pages/user/Setting";
import RegisterPage from "../pages/auth/Register";
import PostDetail from "../pages/post/PostDetail";
import PostFormPage from "../pages/post/PostForm";
import PublicRoute from "../pages/auth/PublicRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <PublicRoute><LoginPage /></PublicRoute>,
      },
      {
        path: "/register",
        element: <PublicRoute><RegisterPage /></PublicRoute>,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/settings",
        element: <SettingPage />,
      },
      {
        path: "/post/create",
        element: <PostFormPage />,
      },
      {
        path: "/post/update/:slug",
        element: <PostFormPage />,
      },
      {
        path: "/profile/:name",
        element: <ProfilePage />,
      },
      {
        path: "/article/:slug",
        element: <PostDetail />,
      },
    ],
  },
]);
