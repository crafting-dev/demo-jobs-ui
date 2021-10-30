import React from "react";
import ReactDOM from "react-dom";
import "./assets/stylesheets/index.css";
import App from "./containers/App";
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
