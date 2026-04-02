import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Products from './Products';
import News from './News';
import Contact from './Contact';
import LoginPage from './LoginPage';
import AdminDashboard from './AdminDashboard';
import NewsEditor from './NewsEditor';
import './App.css';

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
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/new" element={<NewsEditor />} />
              <Route path="/admin/edit/:id" element={<NewsEditor />} />
            </Routes>
          </main>
          <footer>
            <p>&copy; 2023 caniel.my.id. All rights reserved.</p>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;