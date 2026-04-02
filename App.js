import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Products from './Products';
import News from './News';
import Contact from './Contact';
import LoginPage from './LoginPage'; // Import LoginPage
import AdminDashboard from './AdminDashboard'; // Import AdminDashboard
import NewsEditor from './NewsEditor'; // Import NewsEditor
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap the entire app with AuthProvider */}
        <div className="App">
          <Navbar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<LoginPage />} /> {/* New Login Route */}
              <Route path="/admin" element={<AdminDashboard />} /> {/* New Admin Dashboard Route */}
              <Route path="/admin/news/new" element={<NewsEditor />} /> {/* New Create News Route */}
              <Route path="/admin/news/edit/:id" element={<NewsEditor />} /> {/* New Edit News Route */}
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