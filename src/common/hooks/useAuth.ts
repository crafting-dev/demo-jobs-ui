import { useContext } from 'react';

import { Auth } from 'common/types';
import { AuthContext } from 'components/AuthProvider';

export const useAuth = () =>
  useContext<[Auth, (auth: Auth) => void]>(AuthContext);
