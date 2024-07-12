import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = ({ setToken }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://recipe-server-red.vercel.app/api/login",
        credentials
      );
      const token = response.data.token;
      localStorage.setItem("token", token); // Store token in localStorage
      localStorage.setItem("id", response.data.id);
      setToken(token); // Set token in component state or context
      setSuccess(true);
      console.log("Logged in:", response);
      navigate("/"); // Redirect to home page
    } catch (error) {
      setError(error.response.data.message);
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {/* {success && <p style={{ color: 'green' }}>Logged in successfully!</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
