import { FC } from "react";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

type AppRoute = {
  path: string;
  component: FC;
  private: boolean;
};

const AppRoutes: AppRoute[] = [
  {
    path: "/",
    component: Home,
    private: false,
  },
  {
    path: "/login",
    component: Login,
    private: false,
  },
  {
    path: "/signup",
    component: Signup,
    private: false,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    private: true,
  },
];

export default AppRoutes;
