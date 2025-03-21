import React, { useState } from "react";

export default function SearchBar({ isDarkMode }) {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative">
      <div className={`
        flex items-center relative transition-all duration-300
        ${isFocused 
          ? isDarkMode 
            ? 'ring-2 ring-primary-400 rounded-lg' 
            : 'ring-2 ring-primary-500 rounded-lg'
          : ''
        }
      `}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`pl-10 pr-4 py-2 w-full rounded-lg focus:outline-none h-[42px] ${
            isDarkMode 
              ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' 
              : 'bg-white text-gray-700 border border-gray-300'
          }`}
          aria-label="Search"
        />
        {searchTerm && (
          <button 
            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
              isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
            }`}
            onClick={() => setSearchTerm("")}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
