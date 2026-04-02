import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    const savedBlogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];
    setBlogs(savedBlogs);
  }, [isAuthenticated, navigate, blogs]); // Added blogs to dependency array

  const deleteBlog = (id) => {
    if (window.confirm('Hapus berita ini?')) {
      const updated = blogs.filter(b => b.id !== id);
      localStorage.setItem('caniel_blogs', JSON.stringify(updated));
      setBlogs(updated);
    }
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>News Management</h1>
        <div>
          <Link to="/admin/new" className="action-button edit-button" style={{ marginRight: '10px' }}>+ New Post</Link>
          <button onClick={logout} className="action-button delete-button">Logout</button>
        </div>
      </div>

      <div className="card" style={{ padding: '0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#f8fafc' }}>
              <th style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>Judul</th>
              <th style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>Tanggal</th>
              <th style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>{blog.title}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>{blog.date}</td>
                <td style={{ padding: '15px', borderBottom: '1px solid #e2e8f0' }}>
                  <Link to={`/admin/edit/${blog.id}`} style={{ marginRight: '10px', color: 'var(--primary-color)' }}>Edit</Link>
                  <button 
                    onClick={() => deleteBlog(blog.id)} 
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;