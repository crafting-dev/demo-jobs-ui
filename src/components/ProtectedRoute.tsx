import { useEffect } from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router";

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

  if (isAuthenticated && redirectPath === currentLocation.pathname) {
    return <Route {...routeProps} />;
  } else {
    return (
      <Redirect to={{ pathname: isAuthenticated ? redirectPath : "/login" }} />
    );
  }
}

export default ProtectedRoute;
export type { ProtectedRouteProps };
