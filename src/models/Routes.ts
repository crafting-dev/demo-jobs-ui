import { FC } from "react";
import Dashboard from "../containers/Dashboard";
import Login from "../containers/Login";
import Postings from "../containers/Postings";
import Signup from "../containers/Signup";
import ViewPosting from "../containers/ViewPosting";

type AppRoute = {
  path: string;
  component: FC;
  private: boolean;
};

const AppRoutes: AppRoute[] = [
  {
    path: "/",
    component: Login,
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
  {
    path: "/postings/:id",
    component: ViewPosting,
    private: true,
  },
  {
    path: "/postings",
    component: Postings,
    private: true,
  },
];

export default AppRoutes;
