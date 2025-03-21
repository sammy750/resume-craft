import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { motion } from "framer-motion";

export default function MainLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Apply dark mode to document
    if (newMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-gray-900', 'text-white');
      document.body.classList.remove('bg-gray-50');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-gray-900', 'text-white');
      document.body.classList.add('bg-gray-50');
    }
  };

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        id="main-content"
      >
        {children}
      </motion.main>
      
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
