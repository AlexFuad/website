import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const NewsDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('digitalita_blogs')) || [];
    const foundBlog = savedBlogs.find(b => b.id === parseInt(id));

    if (foundBlog) {
      // Increment views
      foundBlog.views = (foundBlog.views || 0) + 1;
      localStorage.setItem('digitalita_blogs', JSON.stringify(savedBlogs));
      setBlog(foundBlog);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
              Artikel Tidak Ditemukan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Maaf, artikel yang Anda cari tidak ada.
            </p>
            <Link
              to="/news"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke News
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Blog Content Styles */}
      <style>{`
        .blog-content {
          font-size: 1.125rem;
          line-height: 1.8;
        }

        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          font-weight: 700;
          margin-top: 2em;
          margin-bottom: 0.5em;
        }

        .blog-content h1 { font-size: 2.5em; }
        .blog-content h2 { font-size: 2em; }
        .blog-content h3 { font-size: 1.5em; }
        .blog-content h4 { font-size: 1.25em; }

        .blog-content p {
          margin-bottom: 1.5em;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 2em 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          display: block;
        }

        .blog-content iframe {
          max-width: 100%;
          border-radius: 12px;
          margin: 2em 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          display: block;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2em 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .blog-content table th {
          font-weight: 700;
          padding: 12px;
          text-align: left;
          border-bottom: 2px solid currentColor;
        }

        .blog-content table td {
          padding: 12px;
          border-bottom: 1px solid currentColor;
        }

        .blog-content table tr:nth-child(even) {
          background-color: transparent;
        }

        .blog-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5em;
          margin: 2em 0;
          font-style: italic;
          padding: 1em 1.5em;
          border-radius: 0 8px 8px 0;
        }

        .blog-content pre,
        .blog-content code {
          border-radius: 6px;
          padding: 1em;
          font-family: 'Courier New', monospace;
          color: #10b981;
          overflow-x: auto;
          margin: 1.5em 0;
        }

        .blog-content code {
          padding: 0.2em 0.5em;
          font-size: 0.9em;
        }

        .blog-content ul,
        .blog-content ol {
          padding-left: 2em;
          margin: 1.5em 0;
        }

        .blog-content li {
          margin-bottom: 0.5em;
        }

        .blog-content a {
          color: #3b82f6;
          text-decoration: underline;
        }

        .blog-content a:hover {
          color: #2563eb;
        }

        /* Light mode */
        :root:not(.dark) .blog-content h1,
        :root:not(.dark) .blog-content h2,
        :root:not(.dark) .blog-content h3,
        :root:not(.dark) .blog-content h4,
        :root:not(.dark) .blog-content h5,
        :root:not(.dark) .blog-content h6 {
          color: #111827;
        }

        :root:not(.dark) .blog-content p {
          color: #374151;
        }

        :root:not(.dark) .blog-content table th {
          background-color: #f3f4f6;
          border-color: #e5e7eb;
          color: #111827;
        }

        :root:not(.dark) .blog-content table td {
          border-color: #e5e7eb;
          color: #374151;
        }

        :root:not(.dark) .blog-content table tr:nth-child(even) {
          background-color: #f9fafb;
        }

        :root:not(.dark) .blog-content blockquote {
          color: #6b7280;
          background-color: #f3f4f6;
        }

        :root:not(.dark) .blog-content pre,
        :root:not(.dark) .blog-content code {
          background-color: #1f2937;
        }

        /* Dark mode */
        .dark .blog-content h1,
        .dark .blog-content h2,
        .dark .blog-content h3,
        .dark .blog-content h4,
        .dark .blog-content h5,
        .dark .blog-content h6 {
          color: #ffffff;
        }

        .dark .blog-content p {
          color: #d1d5db;
        }

        .dark .blog-content table th {
          background-color: #374151;
          border-color: #4b5563;
          color: #ffffff;
        }

        .dark .blog-content table td {
          border-color: #374151;
          color: #d1d5db;
        }

        .dark .blog-content table tr:nth-child(even) {
          background-color: #1f2937;
        }

        .dark .blog-content blockquote {
          color: #9ca3af;
          background-color: #1f2937;
        }

        .dark .blog-content pre,
        .dark .blog-content code {
          background-color: #111827;
        }
      `}</style>

      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden pt-24">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-6 text-sm"
            >
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                {new Date(blog.date).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="w-4 h-4" />
                {blog.views || 0} views
              </div>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {blog.title}
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-none"
          >
            {/* Blog Content */}
            <div
              className="blog-content text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </motion.article>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Share2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  Bagikan artikel ini:
                </span>
              </div>
              <div className="flex gap-3">
                <button className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <Link
              to="/news"
              className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke News
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;
