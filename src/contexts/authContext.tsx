import { createContext, FC, useContext, useState } from "react";
import Auth, { unauthenticated } from "../models/auth";

const authContext = createContext<[Auth, (auth: Auth) => void]>([
  unauthenticated,
  () => {},
]);

const useAuth = () => useContext(authContext);

const ProvideAuth: FC = (props) => {
  const [authState, setAuthState] = useState(unauthenticated);
  const defaultAuthContext: [Auth, typeof setAuthState] = [
    authState,
    setAuthState,
  ];

  return (
    <authContext.Provider value={defaultAuthContext}>
      {props.children}
    </authContext.Provider>
  );
};

export default ProvideAuth;
export { useAuth };
