import { withAuthenticator } from "@aws-amplify/ui-react";
import React from "react";
import "./App.css";
import Header from "./Components/Header/Header";
import HomePage from "./Pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default withAuthenticator(App);
