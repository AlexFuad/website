import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Helper function to strip HTML for summary display
const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const News = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];
    // Sort by ID (or date) to ensure consistent order
    setBlogs(savedBlogs.sort((a, b) => b.id - a.id)); 
  }, []);

  return (
    <div className="page-container">
      <h1>Latest News & Blogs</h1>
      <p>Ikuti perkembangan terbaru dari Caniel, dapatkan insight industri, dan temukan tips bermanfaat seputar dunia digital.</p>
      <div className="grid" style={{ marginTop: '40px' }}>
        {blogs.map(post => (
          <div key={post.id} className="card">
            <h3>{post.title}</h3>
            <small style={{ color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>{post.date}</small>
            {/* Display a stripped version of content for summary */}
            <p>{stripHtml(post.content).substring(0, 150)}...</p> 
            {/* Link to a detailed news page (you'd create /news/:id route and component later) */}
            <Link to={`/news/${post.id}`} className="action-button edit-button" style={{ marginTop: '15px', display: 'inline-block' }}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;