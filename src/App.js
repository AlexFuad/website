import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Products from './Products';
import News from './News';
import NewsDetail from './NewsDetail';
import Contact from './Contact';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';
import NewsEditor from './NewsEditor';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/new" element={<NewsEditor />} />
              <Route path="/admin/edit/:id" element={<NewsEditor />} />
            </Routes>
          </main>
          <Toaster />
          <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  CANIEL
                </h3>
                <p className="text-gray-400">
                  Transforming visions into digital reality
                </p>
              </div>
              <div className="border-t border-gray-700 pt-6">
                <p className="text-gray-500 text-sm">
                  &copy; {new Date().getFullYear()} caniel.my.id. All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;