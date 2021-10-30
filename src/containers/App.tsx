import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "../components/ProtectedRoute";
import { useAuth } from "../contexts/authContext";
import AppRoutes from "../models/Routes";
import CssBaseline from '@mui/material/CssBaseline';

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
      <CssBaseline />

      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
