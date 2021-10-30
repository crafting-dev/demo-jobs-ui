import { createContext, FC, useContext, useState } from "react";
import getUser from "../adapters/Store";
import Auth, { unauthenticated } from "../models/Auth";

const authContext = createContext<[Auth, (auth: Auth) => void]>([
  unauthenticated,
  () => {},
]);

const useAuth = () => useContext(authContext);

const ProvideAuth: FC = (props) => {
  const [authState, setAuthState] = useState(() => {
    const loggedInUser = getUser();
    return loggedInUser ? loggedInUser : unauthenticated;
  });
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
