import { useEffect } from 'react';

import { Redirect, Route, useLocation, RouteProps } from 'react-router-dom';

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
} & RouteProps;

export function ProtectedRoute({
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
  }
  return <Redirect to={{ pathname: redirectPath }} />;
}
