import React from "react";
import { Redirect, Route, Switch } from "react-router";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "../components/ProtectedRoute";
import { useAuth } from "../contexts/authContext";
import AppRoutes from "../models/routes";

function App() {
  const [auth, setAuth] = useAuth();

  const setRedirectPath = (path: string) => {
    setAuth({ ...auth, redirectPath: path });
  };

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!auth.isAuthenticated,
    redirectPath: auth.redirectPath,
    setRedirectPath: setRedirectPath,
  };

  return (
    <div>
      <Switch>
        {AppRoutes.map((route) => {
          if (route.private) {
            return (
              <ProtectedRoute
                {...defaultProtectedRouteProps}
                path={route.path}
                component={route.component}
                key={route.path}
              />
            );
          } else {
            return (
              <Route
                exact
                path={route.path}
                component={route.component}
                key={route.path}
              />
            );
          }
        })}
        <Redirect from="*" to="/" />
      </Switch>
    </div>
  );
}

export default App;
