import Layout from "../components/layout";
import HomePage from "../pages/Home";
import LoginPage from "../pages/auth/Login";
import { createBrowserRouter } from "react-router";
import CreatePostPage from "../pages/post/createPost";
import ProfilePage from "../pages/user/Profile";
import SettingPage from "../pages/user/Setting";
import RegisterPage from "../pages/auth/Register";
import PostDetail from "../pages/post/PostDeatil";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
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
        element: <CreatePostPage />,
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
