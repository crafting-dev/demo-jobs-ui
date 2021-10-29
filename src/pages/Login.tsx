import React from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/authContext";

function Login() {
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const handleLogin = () => {
    setAuth({ ...auth, isAuthenticated: true });
    history.push(auth.redirectPath);
  };

  return <button onClick={handleLogin}>Login</button>;
}

export default Login;
