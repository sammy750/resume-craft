"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Get isDarkMode from parent component through context or props
  const isDarkMode = document.documentElement.classList.contains('dark');

  // Check if mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768);
    checkIfMobile();
    
    const handleResize = () => {
      checkIfMobile();
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true); // Always show sidebar on desktop
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initialize sidebar state based on screen size
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="flex relative">
      {/* Mobile sidebar toggle button */}
      {isMobile && (
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              isDarkMode 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500' 
                : 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
            }`}
            animate={{ rotate: isSidebarOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </motion.div>
      )}
      
      {/* Sidebar with fixed width */}
      <AnimatePresence>
        {(isSidebarOpen || !isMobile) && (
          <>
            {/* Overlay for mobile */}
            {isMobile && (
              <motion.div
                className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsSidebarOpen(false)}
              />
            )}
            
            {/* Sidebar */}
            {/* <motion.div 
              className={`fixed md:static z-30 h-full ${isMobile ? 'w-[280px]' : 'w-64'}`}
              initial={isMobile ? { x: -280 } : { x: 0 }}
              animate={{ x: 0 }}
              exit={isMobile ? { x: -280 } : { x: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
            >
              <Sidebar isDarkMode={isDarkMode} />
            </motion.div> */}
          </>
        )}
      </AnimatePresence>
      
      {/* Main content with proper spacing */}
      <motion.div 
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen && !isMobile ? 'ml-0' : 'ml-0'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="p-1 md:p-1 max-w-8xl mx-auto">
          <MainContent isDarkMode={isDarkMode} />
        </div>
      </motion.div>
    </div>
  );
}
