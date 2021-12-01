import React from "react";
import Header from "../../Components/Header/Header";
import HomePage from "../../Pages/HomePage/HomePage";
import { Route, Routes } from "react-router-dom";
import ProfilePage from "../../Pages/ProfilePage/ProfilePage";

function Router() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default Router;
