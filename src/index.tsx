import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./pages/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import ProvideAuth from "./contexts/authContext";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
