import React, { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import AuthenticateToken from "../adapters/Authenticate";
import { setUser } from "../adapters/Store";
import { useAuth } from "../contexts/authContext";
import Auth from "../models/Auth";

function Login() {
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await AuthenticateToken(
      "batman@crafting.dev",
      "iambatman"
    );
    const user: Auth = {
      token: response.data.attributes.token,
      id: response.data.id,
      name: response.data.attributes.bearer.name,
      email: response.data.attributes.bearer.email,
      type: response.data.attributes.bearer.type,
      avatarUrl: response.data.attributes.bearer.avatar,
      redirectPath: auth.redirectPath,
      isAuthenticated: true,
    };
    setAuth(user);
    setUser(user);

    history.push("/postings");
  };

  return <button onClick={handleSubmit}>Login</button>;
}

export default Login;
