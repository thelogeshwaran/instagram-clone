import { withAuthenticator } from "@aws-amplify/ui-react";
import React from "react";
import "./App.css";
import Router from "./Components/Routes/Router";

function App() {
  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default withAuthenticator(App);
