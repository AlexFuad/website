import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Shield, LogOut } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full transition-all duration-300 z-50 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
        : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Logo - Left aligned */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-black text-sm sm:text-base md:text-lg">C</span>
              </div>
              <span className="text-xl sm:text-2xl md:text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-indigo-700 transition-all duration-300">
                CANIEL
              </span>
            </Link>
          </div>

          {/* Desktop Menu - Right aligned */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            >
              About
            </Link>
            <Link
              to="/products"
              className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            >
              Products
            </Link>
            <Link
              to="/news"
              className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            >
              News
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
            >
              Contact
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Admin Dashboard Link (if authenticated) */}
            {isAuthenticated && (
              <Link
                to="/admin"
                className="px-4 py-2 text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Dashboard
              </Link>
            )}

            {/* Login/User Button */}
            {!isAuthenticated ? (
              <Link
                to="/login"
                className="ml-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:from-blue-700 hover:to-purple-700"
              >
                Login
              </Link>
            ) : (
              <div className="ml-2 flex items-center gap-2">
                <div className="px-4 py-2 text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  Hi, {user?.username || 'Admin'}
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Controls - Right aligned */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme Toggle (Mobile) */}
            <div className="block sm:hidden">
              <ThemeToggle />
            </div>
            
            {/* Tablet: Show menu items but hide on mobile */}
            <div className="hidden sm:flex lg:hidden items-center gap-1">
              <Link
                to="/contact"
                className="px-3 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all"
              >
                Contact
              </Link>
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all hover:shadow-md"
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to="/admin"
                    className="px-3 py-2 text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3" />
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 transition-transform duration-200" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-xl">
          <div className="px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto">
            {/* Navigation Links */}
            <div className="space-y-1">
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                Home
              </Link>
              <Link
                to="/about"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                About
              </Link>
              <Link
                to="/products"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                Products
              </Link>
              <Link
                to="/news"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full" />
                News
              </Link>
              <Link
                to="/contact"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all sm:hidden"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-1.5 h-1.5 bg-pink-600 rounded-full" />
                Contact
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-3" />

            {/* Admin Link (if authenticated) */}
            {isAuthenticated && (
              <Link
                to="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <Shield className="w-5 h-5" />
                Admin Dashboard
              </Link>
            )}

            {/* Theme Toggle & Login/Logout */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <ThemeToggle />
              
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="flex-1 ml-4 px-6 py-3 text-base font-bold text-white text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all hover:shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              ) : (
                <div className="flex items-center gap-3 ml-4">
                  <div className="flex-1 px-4 py-3 text-sm font-semibold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    Hi, {user?.username || 'Admin'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
