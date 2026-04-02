import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Username atau password salah (admin/admin123)');
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '400px', margin: 'auto' }}>
      <div className="card">
        <h1 style={{ textAlign: 'center' }}>Admin Login</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <div style={{ marginBottom: '15px' }}>
            <label>Username</label>
            <input type="text" className="form-input" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Password</label>
            <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: '0.8rem' }}>{error}</p>}
          <button type="submit" className="form-button" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;