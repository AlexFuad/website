import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NewsEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', date: '', summary: '' });

  useEffect(() => {
    if (id) {
      const blogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];
      const blog = blogs.find(b => b.id === parseInt(id));
      if (blog) setFormData(blog);
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let blogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];
    
    if (id) {
      blogs = blogs.map(b => b.id === parseInt(id) ? { ...formData } : b);
    } else {
      const newBlog = { ...formData, id: Date.now() };
      blogs.push(newBlog);
    }
    
    localStorage.setItem('caniel_blogs', JSON.stringify(blogs));
    navigate('/admin');
  };

  return (
    <div className="page-container" style={{ maxWidth: '800px' }}>
      <h1>{id ? 'Edit News' : 'Create News'}</h1>
      <div className="card">
        <form onSubmit={handleSubmit} className="contact-form">
          <div style={{ marginBottom: '15px' }}>
            <label>Judul Berita</label>
            <input 
              type="text" className="form-input" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})} 
              required 
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Tanggal</label>
            <input 
              type="text" className="form-input" 
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})} 
              placeholder="Contoh: 25 Mei 2024"
              required 
            />
          </div>
          <textarea 
            className="form-textarea" rows="5" 
            value={formData.summary}
            onChange={(e) => setFormData({...formData, summary: e.target.value})}
            placeholder="Isi summary berita..."
            required
          ></textarea>
          <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
            <button type="submit" className="form-button">Simpan</button>
            <button type="button" onClick={() => navigate('/admin')} className="action-button" style={{ background: '#e2e8f0', color: '#475569' }}>Batal</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsEditor;