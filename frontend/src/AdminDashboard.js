import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {
  Plus, Edit2, Trash2, LogOut, FileText, Calendar, Eye,
  TrendingUp, BarChart, Database, Settings, Share2, Clock,
  ChevronLeft, Search, MoreHorizontal, Trello, Check,
  Package, Users
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import ArticleEditor from './components/blog/ArticleEditor';
import DeleteConfirmation from './components/blog/DeleteConfirmation';
import ProductEditor from './components/products/ProductEditor';
import UserManagement from './components/admin/UserManagement';

const AdminDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDashboard, setShowDashboard] = useState(true);
  const [selectedCollection, setSelectedCollection] = useState('blog');
  const [isProductEditorOpen, setIsProductEditorOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const { isAuthenticated, user, logout, users, addUser, updateUser, deleteUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadBlogs();
    loadProducts();
  }, [isAuthenticated, navigate]);

  const loadBlogs = () => {
    const savedBlogs = JSON.parse(localStorage.getItem('digitalita_blogs')) || [];
    setBlogs(savedBlogs);
  };

  const loadProducts = () => {
    const savedProducts = JSON.parse(localStorage.getItem('digitalita_products')) || [];
    setProducts(savedProducts);
  };

  // Calculate dashboard statistics
  const stats = {
    totalPosts: blogs.length,
    thisMonth: blogs.filter(p => {
      const postDate = new Date(p.date);
      const now = new Date();
      return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
    }).length,
    featuredPosts: blogs.filter(p => p.featured).length,
    totalViews: blogs.reduce((sum, blog) => sum + (blog.views || 0), 0)
  };

  const recentPosts = [...blogs].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  ).slice(0, 5);

  const filteredPosts = blogs.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveArticle = (article) => {
    let updatedBlogs;
    const existingPost = blogs.find(b => b.id === article.id);

    if (existingPost) {
      updatedBlogs = blogs.map(b => b.id === article.id ? { ...article, updatedAt: new Date().toISOString() } : b);
      toast.success('Artikel berhasil diupdate!');
    } else {
      const newPost = { ...article, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), views: 0 };
      updatedBlogs = [newPost, ...blogs];
      toast.success('Artikel berhasil dibuat!');
    }

    localStorage.setItem('digitalita_blogs', JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
    setIsEditing(false);
    setCurrentArticle(null);
  };

  const handleSaveProduct = (product) => {
    let updatedProducts;
    const existingProduct = products.find(p => p.id === product.id);

    if (existingProduct) {
      updatedProducts = products.map(p => p.id === product.id ? { ...product, updatedAt: new Date().toISOString() } : p);
      toast.success('Produk berhasil diupdate!');
    } else {
      const newProduct = { ...product, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
      updatedProducts = [newProduct, ...products];
      toast.success('Produk berhasil dibuat!');
    }

    localStorage.setItem('digitalita_products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setIsProductEditorOpen(false);
    setCurrentProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Yakin ingin menghapus produk ini?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      localStorage.setItem('digitalita_products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      toast.success('Produk berhasil dihapus.');
    }
  };

  const handleDeleteArticle = () => {
    const updatedBlogs = blogs.filter(b => b.id !== articleToDelete.id);
    localStorage.setItem('digitalita_blogs', JSON.stringify(updatedBlogs));
    setBlogs(updatedBlogs);
    setIsDeleteConfirmOpen(false);
    setArticleToDelete(null);
    toast.success('Artikel berhasil dihapus.');
  };

  const openEditor = (article = null) => {
    setCurrentArticle(article);
    setIsEditing(true);
    setShowDashboard(false);
  };

  const openProductEditor = (product = null) => {
    setCurrentProduct(product);
    setIsProductEditorOpen(true);
  };

  const openDeleteConfirm = (article) => {
    setArticleToDelete(article);
    setIsDeleteConfirmOpen(true);
  };

  const handleLogout = () => {
    logout();
    toast.success('Berhasil logout');
    navigate('/');
  };

  const isValidDate = (date) => {
    return date && !isNaN(new Date(date));
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <DeleteConfirmation
        isOpen={isDeleteConfirmOpen}
        onOpenChange={setIsDeleteConfirmOpen}
        onConfirm={handleDeleteArticle}
      />

      <ProductEditor
        isOpen={isProductEditorOpen}
        setIsOpen={setIsProductEditorOpen}
        product={currentProduct}
        onSave={handleSaveProduct}
        onBack={() => { setIsProductEditorOpen(false); setCurrentProduct(null); }}
      />

      <UserManagement
        isOpen={isUserManagementOpen}
        onClose={() => setIsUserManagementOpen(false)}
        users={users}
        addUser={addUser}
        updateUser={updateUser}
        deleteUser={deleteUser}
        currentUser={user}
      />

      <div className="flex h-screen bg-[#1A1A1A] text-gray-300 font-sans">
        {!isEditing && (
          <aside className="w-64 bg-[#141414] p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-8">
                <button onClick={() => navigate('/')} className="p-1 rounded hover:bg-gray-700">
                  <ChevronLeft size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <Trello size={20} className="text-white"/>
                  <span className="font-bold text-white text-lg">CMS</span>
                </div>
                <div/>
              </div>

              <button
                onClick={() => setShowDashboard(true)}
                className={`w-full flex items-center justify-between mb-4 rounded px-3 py-2 transition-colors ${showDashboard ? 'bg-blue-600/30 text-blue-400 border border-blue-600/50' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
              >
                <div className="flex items-center gap-2">
                  <BarChart size={16} />
                  <span>Dashboard</span>
                </div>
              </button>

              <h2 className="text-sm font-semibold text-gray-400 mb-2 px-2">Collections</h2>
              <nav className="space-y-1">
                <button
                  onClick={() => { setSelectedCollection('blog'); setShowDashboard(false); }}
                  className={`flex items-center justify-between rounded px-3 py-2 transition-colors ${selectedCollection === 'blog' && !showDashboard ? 'bg-gray-700/50 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Database size={16} />
                    <span>Blog</span>
                  </div>
                  <span className="text-xs bg-gray-600 px-1.5 py-0.5 rounded-full">{blogs.length}</span>
                </button>
                <button
                  onClick={() => { setSelectedCollection('products'); setShowDashboard(false); }}
                  className={`flex items-center justify-between rounded px-3 py-2 transition-colors ${selectedCollection === 'products' && !showDashboard ? 'bg-gray-700/50 text-white' : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'}`}
                >
                  <div className="flex items-center gap-2">
                    <Package size={16} />
                    <span>Products</span>
                  </div>
                  <span className="text-xs bg-gray-600 px-1.5 py-0.5 rounded-full">{products.length}</span>
                </button>
                {user?.permissions?.canManageUsers && (
                  <button
                    onClick={() => setIsUserManagementOpen(true)}
                    className="flex items-center justify-between w-full text-gray-400 hover:bg-gray-700/50 hover:text-white rounded px-3 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>Users</span>
                    </div>
                    <span className="text-xs bg-gray-600 px-1.5 py-0.5 rounded-full">{users.length}</span>
                  </button>
                )}
                <button onClick={() => toast.success('Add collection feature coming soon!')} className="flex items-center gap-2 text-gray-400 hover:text-white w-full text-left rounded px-3 py-2">
                  <Plus size={16} />
                  <span>Add...</span>
                </button>
              </nav>
            </div>
          </aside>
        )}

        <main className="flex-1 flex flex-col">
          {isEditing ? (
            <ArticleEditor
              isOpen={isEditing}
              setIsOpen={setIsEditing}
              article={currentArticle}
              onSave={handleSaveArticle}
              onBack={() => { setIsEditing(false); setCurrentArticle(null); }}
            />
          ) : showDashboard ? (
            <>
              {/* Dashboard Header */}
              <header className="flex items-center justify-between border-b border-gray-700 px-6 py-4 bg-[#141414]">
                <div>
                  <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                  <p className="text-sm text-gray-400 mt-1">Selamat datang di panel Admin CMS</p>
                </div>
                <div className="flex items-center gap-3">
                  {user?.permissions?.canManageBlogs && (
                    <button
                      onClick={() => { openEditor(null); setShowDashboard(false); }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Plus size={16}/> Buat Artikel Baru
                    </button>
                  )}
                  {user?.permissions?.canManageProducts && (
                    <button
                      onClick={() => { openProductEditor(null); setSelectedCollection('products'); setShowDashboard(false); }}
                      className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Package size={16}/> Tambah Produk
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="border border-red-600 text-red-500 hover:bg-red-600/10 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <LogOut size={16}/> Logout
                  </button>
                </div>
              </header>

              {/* Dashboard Content */}
              <div className="p-6 flex-1 overflow-y-auto bg-[#1A1A1A]">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border border-blue-600/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-600/30 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-blue-400" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-gray-400 text-sm mb-1">Total Artikel</h3>
                    <p className="text-3xl font-bold text-white">{stats.totalPosts}</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-600/20 to-green-800/20 border border-green-600/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-600/30 rounded-lg flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-green-400" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-gray-400 text-sm mb-1">Bulan Ini</h3>
                    <p className="text-3xl font-bold text-white">{stats.thisMonth}</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border border-purple-600/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-600/30 rounded-lg flex items-center justify-center">
                        <Eye className="h-6 w-6 text-purple-400" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-gray-400 text-sm mb-1">Total Views</h3>
                    <p className="text-3xl font-bold text-white">{stats.totalViews.toLocaleString()}</p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 border border-orange-600/30 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-orange-600/30 rounded-lg flex items-center justify-center">
                        <BarChart className="h-6 w-6 text-orange-400" />
                      </div>
                      <TrendingUp className="h-5 w-5 text-green-400" />
                    </div>
                    <h3 className="text-gray-400 text-sm mb-1">Unggulan</h3>
                    <p className="text-3xl font-bold text-white">{stats.featuredPosts}</p>
                  </div>
                </div>

                {/* Recent Activity & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Posts */}
                  <div className="bg-[#141414] border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-400" />
                        Aktivitas Terbaru
                      </h2>
                      <button
                        onClick={() => setShowDashboard(false)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        Lihat Semua
                      </button>
                    </div>
                    <div className="space-y-3">
                      {recentPosts.length > 0 ? (
                        recentPosts.map((post, index) => (
                          <div key={post.id} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => openEditor(post)}>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium text-white truncate">{post.title}</h4>
                              <p className="text-xs text-gray-400 mt-1">
                                {post.date ? format(new Date(post.date), 'dd MMM yyyy') : 'N/A'}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <button
                                onClick={(e) => { e.stopPropagation(); openEditor(post); }}
                                className="text-gray-400 hover:text-white p-2 rounded hover:bg-gray-700"
                              >
                                <Edit2 size={14} />
                              </button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-400">
                          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>Belum ada artikel</p>
                          <button
                            onClick={() => openEditor(null)}
                            className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm"
                          >
                            Buat Artikel Pertama
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-[#141414] border border-gray-700 rounded-xl p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-purple-400" />
                      Aksi Cepat
                    </h2>
                    <div className="space-y-3">
                      <button
                        onClick={() => { openEditor(null); setShowDashboard(false); }}
                        className="w-full justify-start bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-lg flex items-center gap-2"
                      >
                        <Plus size={18} />
                        Artikel Baru
                      </button>
                      <button
                        onClick={() => setShowDashboard(false)}
                        className="w-full justify-start border border-gray-600 hover:bg-gray-700 text-gray-300 px-4 py-3 rounded-lg flex items-center gap-2"
                      >
                        <Database size={18} />
                        Kelola Semua Artikel
                      </button>
                      <button
                        onClick={() => toast.success('Import/Export feature coming soon!')}
                        className="w-full justify-start border border-gray-600 hover:bg-gray-700 text-gray-300 px-4 py-3 rounded-lg flex items-center gap-2"
                      >
                        <Share2 size={18} />
                        Import/Export
                      </button>
                      <button
                        onClick={() => toast.success('Settings feature coming soon!')}
                        className="w-full justify-start border border-gray-600 hover:bg-gray-700 text-gray-300 px-4 py-3 rounded-lg flex items-center gap-2"
                      >
                        <Settings size={18} />
                        Pengaturan CMS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : selectedCollection === 'products' ? (
            <>
              <header className="flex items-center justify-between border-b border-gray-700 px-6 py-3 bg-[#141414]">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => openProductEditor(null)} 
                    className="bg-white text-black hover:bg-gray-200 h-8 px-3 rounded flex items-center gap-2"
                  >
                    <Plus size={16}/> New Product
                  </button>
                  <button onClick={() => toast.success('Select feature coming soon!')} className="border border-gray-600 hover:bg-gray-700 h-8 px-3 rounded flex items-center gap-2">
                    <Check size={16}/>Select
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => toast.success('Settings coming soon!')} className="text-gray-400 hover:text-white">
                    <Settings size={18}/>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="border border-red-600 text-red-500 hover:bg-red-600/10 h-8 px-3 rounded"
                  >
                    Logout
                  </button>
                </div>
              </header>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-full max-w-xs">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#222] border border-gray-600 pl-10 h-9 rounded px-3 text-sm text-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button onClick={() => toast.success('More options coming soon!')} className="text-gray-400 hover:bg-gray-700 p-2 rounded">
                    <MoreHorizontal size={20}/>
                  </button>
                </div>

                <div className="border border-gray-700 rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-800/20">
                      <tr>
                        <th scope="col" className="px-6 py-3 w-2/5">Name</th>
                        <th scope="col" className="px-6 py-3 w-1/5">Category</th>
                        <th scope="col" className="px-6 py-3">Status</th>
                        <th scope="col" className="px-6 py-3 w-1/5">Updated</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.filter(p => 
                        p.name.toLowerCase().includes(searchTerm.toLowerCase())
                      ).length > 0 ? (
                        products
                          .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
                          .map(product => (
                            <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-800/40">
                              <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{product.name}</td>
                              <td className="px-6 py-4 text-gray-400">{product.category || '-'}</td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  product.status === 'published' 
                                    ? 'bg-green-600/20 text-green-400' 
                                    : product.status === 'archived'
                                    ? 'bg-gray-600/20 text-gray-400'
                                    : 'bg-yellow-600/20 text-yellow-400'
                                }`}>
                                  {product.status || 'draft'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-gray-400">
                                {product.updatedAt ? format(new Date(product.updatedAt), 'dd/MM/yyyy') : 'N/A'}
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <button 
                                    onClick={() => openProductEditor(product)} 
                                    className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded"
                                  >
                                    <Edit2 size={16}/>
                                  </button>
                                  <button 
                                    onClick={() => handleDeleteProduct(product.id)} 
                                    className="text-red-500 hover:text-red-400 hover:bg-gray-700 p-2 rounded"
                                  >
                                    <Trash2 size={16}/>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                            <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>Belum ada produk</p>
                            <button
                              onClick={() => openProductEditor(null)}
                              className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm"
                            >
                              Tambah Produk Pertama
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <>
              <header className="flex items-center justify-between border-b border-gray-700 px-6 py-3 bg-[#141414]">
                <div className="flex items-center gap-2">
                  {user?.permissions?.canManageBlogs && (
                    <button onClick={() => openEditor(null)} className="bg-white text-black hover:bg-gray-200 h-8 px-3 rounded flex items-center gap-2">
                      <Plus size={16}/> New Item
                    </button>
                  )}
                  <button onClick={() => toast.success('Select feature coming soon!')} className="border border-gray-600 hover:bg-gray-700 h-8 px-3 rounded flex items-center gap-2"><Check size={16}/>Select</button>
                  <button onClick={() => toast.success('Edit Fields feature coming soon!')} className="border border-gray-600 hover:bg-gray-700 h-8 px-3 rounded flex items-center gap-2"><Share2 size={16}/>Edit Fields</button>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={() => toast.success('Settings coming soon!')} className="text-gray-400 hover:text-white"><Settings size={18}/></button>
                  <button
                    onClick={handleLogout}
                    className="border border-red-600 text-red-500 hover:bg-red-600/10 h-8 px-3 rounded"
                  >
                    Logout
                  </button>
                </div>
              </header>

              <div className="p-6 flex-1 overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="relative w-full max-w-xs">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-[#222] border border-gray-600 pl-10 h-9 rounded px-3 text-sm text-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button onClick={() => toast.success('More options coming soon!')} className="text-gray-400 hover:bg-gray-700 p-2 rounded"><MoreHorizontal size={20}/></button>
                </div>

                <div className="border border-gray-700 rounded-lg">
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-800/20">
                      <tr>
                        <th scope="col" className="px-6 py-3 w-2/5">Title</th>
                        <th scope="col" className="px-6 py-3 w-1/5">Date</th>
                        <th scope="col" className="px-6 py-3">Views</th>
                        <th scope="col" className="px-6 py-3">Featured</th>
                        <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                          <tr key={post.id} className="border-b border-gray-700 hover:bg-gray-800/40">
                            <td className="px-6 py-4 font-medium text-white whitespace-nowrap">{post.title}</td>
                            <td className="px-6 py-4 text-gray-400">{isValidDate(post.date) ? format(new Date(post.date), 'dd/MM/yyyy') : 'N/A'}</td>
                            <td className="px-6 py-4 text-gray-400">{post.views || 0}</td>
                            <td className="px-6 py-4">
                              {post.featured ? (
                                <span className="text-yellow-500">★ Featured</span>
                              ) : (
                                <span className="text-gray-500">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                {user?.permissions?.canEditBlogs && (
                                  <button onClick={() => openEditor(post)} className="text-gray-400 hover:text-white hover:bg-gray-700 p-2 rounded">
                                    <Edit2 size={16}/>
                                  </button>
                                )}
                                {user?.permissions?.canDeleteBlogs && (
                                  <button onClick={() => openDeleteConfirm(post)} className="text-red-500 hover:text-red-400 hover:bg-gray-700 p-2 rounded">
                                    <Trash2 size={16}/>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                            <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p>Belum ada artikel</p>
                            <button
                              onClick={() => openEditor(null)}
                              className="mt-3 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white text-sm"
                            >
                              Buat Artikel Pertama
                            </button>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;