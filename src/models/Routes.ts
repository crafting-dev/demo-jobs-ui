import { FC } from "react";
import Dashboard from "../containers/Dashboard";
import Login from "../containers/Login";
import Postings from "../containers/Postings";
import Signup from "../containers/Signup";
import ViewPosting from "../containers/ViewPosting";
import Apply from "../containers/Apply";
import Applications from "../containers/Applications";
import ViewApplication from "../containers/ViewApplication";
import Create from "../containers/Create";

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
    path: "/create/posting",
    component: Create,
    private: true,
  },
  {
    path: "/postings/:id/apply",
    component: Apply,
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
  {
    path: "/applications/:id",
    component: ViewApplication,
    private: true,
  },
  {
    path: "/applications",
    component: Applications,
    private: true,
  },
];

export default AppRoutes;
