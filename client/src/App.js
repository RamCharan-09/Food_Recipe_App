import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecipeDetail from "./pages/RecipeDetail";
import Navbar from "./components/Navbar";
import EditRecipe from "./pages/EditReciepe";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token); // add a flag to track login status

  useEffect(() => {
    // Check if token exists and is valid (e.g., not expired)
    setIsLoggedIn(!!token);
  }, [token]);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsLoggedIn(true); // update login status
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id")
    setToken("");
    setIsLoggedIn(false); // update login status
    window.location.reload();
  };

  return (
    <div className="main">
      <Router>
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/create-recipe"
            element={
              isLoggedIn ? (
                <CreateRecipe token={token} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/edit-recipe/:id"
            element={
              isLoggedIn ? (
                <EditRecipe token={token} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login setToken={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
