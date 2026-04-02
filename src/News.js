import React from 'react';

const News = () => {
  const blogs = [
    { id: 1, title: 'Peluncuran Website Caniel', date: '24 Mei 2024' },
    { id: 2, title: 'Tips Optimasi SEO 2024', date: '20 Mei 2024' },
    { id: 3, title: 'Pentingnya UI/UX untuk Bisnis', date: '15 Mei 2024' }
  ];

  return (
    <div className="page-container">
      <h1>News & Blogs</h1>
      <div className="grid">
        {blogs.map(post => (
          <div key={post.id} className="card">
            <h3>{post.title}</h3>
            <small>{post.date}</small>
            <p>Klik untuk membaca lebih lanjut...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;