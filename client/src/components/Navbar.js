import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [username, setUsername] = useState('');
  // const [token, setToken] = useState(localStorage.getItem('token'));
  
  // const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUsername(payload.username);
    }
  }, [isLoggedIn]);

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setToken(null);
  //   setUsername('');
  //   navigate('/');
  // };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Food Recipe App</Link>
      </div>
      <div className="navbar-links">
        {isLoggedIn ? (
          <>
            <p>Welcome, {username}!</p>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
