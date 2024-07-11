import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/create-recipe">Create Recipe</Link>
    </footer>
  );
};

export default Footer;
