import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ isDarkMode, toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const location = useLocation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsProfileOpen(false);
      setIsNotificationOpen(false);
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 ${isDarkMode ? 'bg-gray-800 text-white shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <motion.div 
              className="flex-shrink-0 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/" className="flex items-center group">
                <motion.svg
                  className={`h-8 w-8 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'} transition-transform duration-300 group-hover:scale-110`}
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  whileHover={{ rotate: 5 }}
                >
                  <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
                  <path d="M14 17H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </motion.svg>
                <span className={`ml-2 text-xl font-bold ${isDarkMode ? 'text-white group-hover:text-primary-400' : 'text-gray-900 group-hover:text-primary-600'} transition-colors duration-200`}>
                  ResumeCraft
                </span>
              </Link>
            </motion.div>
            
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {[
                { to: '/', label: 'Dashboard' },
                { to: '/upload', label: 'Upload Resume' },
                { to: '/templates', label: 'Templates' }
              ].map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`${
                    isActive(link.to) 
                      ? isDarkMode 
                        ? 'border-primary-400 text-primary-400' 
                        : 'border-primary-500 text-primary-700'
                      : isDarkMode
                        ? 'border-transparent text-gray-300 hover:border-primary-300 hover:text-primary-400'
                        : 'border-transparent text-gray-500 hover:border-primary-300 hover:text-gray-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-all duration-200`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {/* Dark mode toggle */}
            <button 
              onClick={toggleDarkMode} 
              className={`mr-3 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDarkMode ? 'text-yellow-300 hover:text-yellow-200 focus:ring-yellow-500' : 'text-gray-500 hover:text-gray-900 focus:ring-primary-500'}`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* Notification button */}
            <div className="relative">
              <button 
                className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-white focus:ring-primary-400' 
                    : 'text-gray-400 hover:text-primary-500 focus:ring-primary-500'
                } transition-colors duration-200`}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsProfileOpen(false);
                }}
              >
                <span className="sr-only">View notifications</span>
                <div className="relative">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </div>
              </button>
              
              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div 
                    className={`origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className={`py-1 divide-y ${isDarkMode ? 'divide-gray-600' : 'divide-gray-100'}`}>
                      <div className="px-4 py-3">
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</p>
                      </div>
                      {[1, 2].map((item) => (
                        <div
                          key={item}
                          className={`px-4 py-3 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'} transition-colors duration-150 cursor-pointer`}
                        >
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Resume Updated</p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Your resume was successfully updated</p>
                        </div>
                      ))}
                      <div className="px-4 py-2 text-center">
                        <button className={`text-sm font-medium ${isDarkMode ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-800'}`}>
                          View all notifications
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div>
                <button 
                  className={`rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-primary-400' : 'focus:ring-primary-500'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileOpen(!isProfileOpen);
                    setIsNotificationOpen(false);
                  }}
                >
                  <span className="sr-only">Open user menu</span>
                  <motion.div 
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold ${isDarkMode ? 'bg-primary-400' : 'bg-primary-500'}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    JS
                  </motion.div>
                </button>
              </div>
              
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link to="/profile" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>Your Profile</Link>
                    <Link to="/settings" className={`block px-4 py-2 text-sm ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>Settings</Link>
                    <button className={`w-full text-left px-4 py-2 text-sm ${isDarkMode ? 'text-gray-200 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-100'}`}>Sign out</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            {/* Dark mode toggle for mobile */}
            <button 
              onClick={toggleDarkMode} 
              className={`p-2 rounded-md mr-1 ${isDarkMode ? 'text-yellow-300 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              {isDarkMode ? (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                  : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500'
              }`}
            >
              <span className="sr-only">{isMobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="sm:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`pt-2 pb-3 space-y-1 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {[
                { to: '/', label: 'Dashboard' },
                { to: '/upload', label: 'Upload Resume' },
                { to: '/templates', label: 'Templates' }
              ].map((link) => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`${
                    isActive(link.to) 
                      ? isDarkMode
                        ? 'bg-gray-900 border-primary-400 text-primary-400'
                        : 'bg-primary-50 border-primary-500 text-primary-700'
                      : isDarkMode
                        ? 'border-transparent text-gray-300 hover:bg-gray-700 hover:border-gray-600 hover:text-white'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-150`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className={`pt-4 pb-3 border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold ${isDarkMode ? 'bg-primary-400' : 'bg-primary-500'}`}>
                      JS
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>John Smith</div>
                    <div className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>john@example.com</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link 
                    to="/profile"
                    className={`block px-4 py-2 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <Link 
                    to="/settings"
                    className={`block px-4 py-2 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button className={`w-full text-left block px-4 py-2 text-base font-medium ${isDarkMode ? 'text-gray-300 hover:text-white hover:bg-gray-700' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'}`}>
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
