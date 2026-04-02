import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, Newspaper, Loader2, ArrowRight } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// Helper function to strip HTML for summary display
const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

// Skeleton loader component
const NewsSkeleton = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="card p-8 bg-gray-50 dark:bg-gray-800/50 animate-pulse rounded-2xl border border-gray-200 dark:border-gray-700"
  >
    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 w-3/4"></div>
    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
    <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg mb-6"></div>
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-full w-32"></div>
  </motion.div>
);

const NewsCard = ({ post, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    viewport={{ once: true }}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group cursor-pointer overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500"
  >
    <div className="p-8">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
        {post.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-6">
        {stripHtml(post.content).substring(0, 160)}...
      </p>
      <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold group-hover:text-blue-700 dark:group-hover:text-blue-300">
        Baca Selengkapnya
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  </motion.div>
);

const News = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'recent', 'popular'

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('caniel_blogs')) || [];
    setBlogs(savedBlogs.sort((a, b) => new Date(b.date) - new Date(a.date)));
    setLoading(false);
  }, []);

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         stripHtml(blog.content).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'recent' && blogs.indexOf(blog) < 6) ||
                         (filter === 'popular' && blog.views > 100); // Assuming views field exists
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-container py-20">
      <Toaster />
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
          Latest News & Blogs
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Ikuti perkembangan terbaru dari Caniel, dapatkan insight industri, dan temukan tips bermanfaat seputar dunia digital.
        </p>
      </motion.div>

      {/* Search & Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col lg:flex-row gap-4 mb-16 max-w-2xl mx-auto"
      >
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Cari artikel..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all duration-300 text-lg placeholder-gray-500"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'recent', 'popular'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/50'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {f === 'all' ? 'Semua' : f === 'recent' ? 'Terbaru' : 'Populer'}
            </button>
          ))}
        </div>
      </motion.div>

      {/* News Grid */}
      <AnimatePresence>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <NewsSkeleton key={i} />
            ))}
          </div>
        ) : filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32"
          >
            <Newspaper className="w-24 h-24 text-gray-400 mx-auto mb-8 opacity-50" />
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Tidak ada artikel ditemukan</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Coba ubah kata kunci pencarian atau filter
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post, index) => (
              <NewsCard key={post.id} post={post} index={index} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Load More Button (for future infinite scroll) */}
      {!loading && filteredBlogs.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-3xl font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 flex items-center gap-3 mx-auto">
            <Loader2 className="w-5 h-5 animate-spin group-hover:animate-none" />
            Load More Articles
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default News;
