import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DataProvider } from "./Context/DataContext";
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
import { BrowserRouter } from "react-router-dom";
Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
