import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS

const NewsEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', date: '', content: '' }); // Changed summary to content

  // Quill modules for toolbar
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'], // Added image and video
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  useEffect(() => {
    if (id) {
      const blogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];
      const blog = blogs.find(b => b.id === parseInt(id));
      if (blog) {
        // Ensure content is not undefined, default to empty string
        setFormData({
          id: blog.id,
          title: blog.title,
          date: blog.date,
          content: blog.content || '' // Use content, default to empty string
        });
      }
      
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let blogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];
    
    if (id) {
      blogs = blogs.map(b => b.id === parseInt(id) ? { ...formData } : b);
    } else { // For new posts
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
        <form onSubmit={handleSubmit} className="admin-form"> {/* Changed class to admin-form for specific styling */}
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
              type="date" className="form-input" // Changed type to date for better UX
              value={formData.date} 
              onChange={(e) => setFormData({...formData, date: e.target.value})} 
              placeholder="YYYY-MM-DD"
              required 
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label>Konten Berita</label>
            <ReactQuill 
              theme="snow" 
              value={formData.content} 
              onChange={(value) => setFormData({...formData, content: value})} 
              modules={modules}
              formats={formats}
              style={{ height: '300px', marginBottom: '50px' }} // Adjust height and margin for Quill
            />
          </div>
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