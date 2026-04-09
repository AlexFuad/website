import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import ArticleEditor from './components/blog/ArticleEditor';

const NewsEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Load article if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      const blogs = JSON.parse(localStorage.getItem('digitalita_blogs')) || [];
      const blog = blogs.find(b => b.id === parseInt(id));
      if (blog) {
        setArticle({
          ...blog,
          slug: blog.slug || blog.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''),
          category: blog.category || 'web-development',
          tags: blog.tags || [],
          author: blog.author || 'Digitalita Agency',
          featured: blog.featured || false,
        });
      }
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSave = (savedArticle) => {
    let blogs = JSON.parse(localStorage.getItem('digitalita_blogs')) || [];

    if (id) {
      blogs = blogs.map(b => b.id === parseInt(id) ? savedArticle : b);
      toast.success('Berita berhasil diupdate');
    } else {
      blogs.push(savedArticle);
      toast.success('Berita berhasil dibuat');
    }

    localStorage.setItem('digitalita_blogs', JSON.stringify(blogs));

    setTimeout(() => {
      navigate('/admin');
    }, 500);
  };

  const handleBack = () => {
    navigate('/admin');
  };

  if (!isAuthenticated) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <ArticleEditor
        isOpen={true}
        article={article}
        onSave={handleSave}
        onBack={handleBack}
      />
    </div>
  );
};

export default NewsEditor;