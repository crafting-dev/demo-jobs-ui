import { createContext } from 'react';

import { unauthenticated } from 'common/helpers';
import { Auth } from 'common/types';

export const AuthContext = createContext<[Auth, (auth: Auth) => void]>([
  unauthenticated,
  () => undefined,
]);
