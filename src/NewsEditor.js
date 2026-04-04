import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';
import { Save, X, FileText, Calendar, Type } from 'lucide-react';
import toast from 'react-hot-toast';

const NewsEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ title: '', date: '', content: '' });
  const [loading, setLoading] = useState(false);

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Quill modules for toolbar
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
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
        setFormData({
          id: blog.id,
          title: blog.title,
          date: blog.date,
          content: blog.content || ''
        });
      }
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let blogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];

    if (id) {
      blogs = blogs.map(b => b.id === parseInt(id) ? { ...formData } : b);
      toast.success('Berita berhasil diupdate');
    } else {
      const newBlog = { 
        ...formData, 
        id: Date.now(),
        views: 0
      };
      blogs.push(newBlog);
      toast.success('Berita berhasil dibuat');
    }

    localStorage.setItem('caniel_blogs', JSON.stringify(blogs));
    setLoading(false);
    
    setTimeout(() => {
      navigate('/admin');
    }, 500);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {id ? 'Edit Berita' : 'Buat Berita Baru'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {id ? 'Update konten berita Anda' : 'Tulis dan publikasikan berita baru'}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <form onSubmit={handleSubmit}>
            <div className="p-8 space-y-6">
              {/* Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Type className="w-4 h-4" />
                  Judul Berita
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all duration-300 text-lg font-medium bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Masukkan judul berita..."
                  required
                />
              </div>

              {/* Date */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="w-4 h-4" />
                  Tanggal Publikasi
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all duration-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>

              {/* Content */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  <FileText className="w-4 h-4" />
                  Konten Berita
                </label>
                <div className="rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(value) => setFormData({...formData, content: value})}
                    modules={modules}
                    formats={formats}
                    className="bg-white dark:bg-gray-900"
                    style={{ minHeight: '300px' }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Save className="w-5 h-5" />
                {loading ? 'Menyimpan...' : 'Simpan Berita'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/admin')}
                className="flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                <X className="w-5 h-5" />
                Batal
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default NewsEditor;