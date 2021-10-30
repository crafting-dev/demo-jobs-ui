import { useEffect } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
} & RouteProps;

function ProtectedRoute({
  isAuthenticated,
  redirectPath,
  setRedirectPath,
  ...routeProps
}: ProtectedRouteProps) {
  const currentLocation = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectPath(currentLocation.pathname);
    }
  }, [isAuthenticated, setRedirectPath, currentLocation]);

  if (isAuthenticated) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
}

export default ProtectedRoute;
export type { ProtectedRouteProps };
