import React, { FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { RevokeToken } from "../adapters/Authenticate";
import { deleteUser } from "../adapters/Store";
import { useAuth } from "../contexts/authContext";
import { unauthenticated } from "../models/Auth";

function Header() {
  const [auth, setAuth] = useAuth();
  const history = useHistory();

  const Logout = async (e: FormEvent) => {
    e.preventDefault();

    RevokeToken(auth.token, auth.id);
    deleteUser();
    setAuth(unauthenticated);
    history.push("/login");
  };

  return (
    <ul>
      <li>
        <a href="/">Home</a>
      </li>

      {auth.isAuthenticated ? (
        <>
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <button onClick={Logout}>Logout</button>
        </>
      ) : (
        <>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Signup</a>
          </li>
        </>
      )}
    </ul>
  );
}

export default Header;
