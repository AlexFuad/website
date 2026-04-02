import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="logo">CANIEL</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/products">Product & Services</Link></li>
        <li><Link to="/news">News</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isAuthenticated ? (
          <li><Link to="/admin" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>Dashboard</Link></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;