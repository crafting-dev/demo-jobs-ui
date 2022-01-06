import { useState, useMemo } from 'react';

import { Client } from 'common/backend-client';
import { unauthenticated } from 'common/helpers';
import { Auth } from 'common/types';

import { AuthContext } from './AuthContext';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState(() => {
    const client = new Client();
    const loggedInUser = client.getUserSession();
    return loggedInUser ?? unauthenticated;
  });

  const defaultAuthContext: [Auth, typeof setAuthState] = useMemo(
    () => [authState, setAuthState],
    [authState]
  );

  return (
    <AuthContext.Provider value={defaultAuthContext}>
      {children}
    </AuthContext.Provider>
  );
}
