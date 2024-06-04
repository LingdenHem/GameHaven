import React from "react";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import GenreCollection from "./pages/GenreCollection";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/genrecollection/:genre" element={<GenreCollection />} />
        <Route path="/game/:id" element={<GamePage />} />
      </Routes>
    </>
  );
}

export default App;
