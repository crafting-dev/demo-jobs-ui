import { Box, CssBaseline } from '@mui/material';
import { Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from 'common/hooks';
import { ProtectedRoute, ProtectedRouteProps } from 'components/ProtectedRoute';
import { Footer } from 'footer';
import { Header } from 'header';
import { routes } from 'routes';

function Page() {
  const [auth, setAuth] = useAuth();

  const setRedirectPath = (path: string) => {
    setAuth({ ...auth, redirectPath: path });
  };

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!auth.isAuthenticated,
    redirectPath: auth.redirectPath,
    setRedirectPath,
  };

  return (
    <Switch>
      {routes.map((route) => {
        if (route.protected) {
          return (
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              path={route.path}
              key={route.path}
            >
              <route.page />
            </ProtectedRoute>
          );
        }

        return (
          <Route exact path={route.path} key={route.path}>
            <route.page />
          </Route>
        );
      })}

      <Redirect from="*" to={auth.isAuthenticated ? '/' : '/login'} />
    </Switch>
  );
}

export function App() {
  return (
    <Box>
      <CssBaseline />
      <Header />
      <Box sx={{ minHeight: 'calc(100vh - 100px)' }}>
        <Page />
      </Box>
      <Footer />
    </Box>
  );
}
