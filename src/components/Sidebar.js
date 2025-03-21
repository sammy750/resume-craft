import React from "react";
import SidebarHeader from "./SidebarHeader";
import SearchBar from "./SearchBar";
import NavigationMenu from "./NavigationMenu";

export default function Sidebar({ isDarkMode }) {
  return (
    <aside className={`flex flex-col gap-4 p-4 h-full w-full ${
      isDarkMode 
        ? 'bg-gray-800 text-white shadow-md' 
        : 'bg-white shadow-md'
    }`} style={{height: 'calc(100vh - 4rem)'}}>
      <SidebarHeader isDarkMode={isDarkMode} />
      <SearchBar isDarkMode={isDarkMode} />
      <div className="flex justify-between items-center h-[30px]">
        <button 
          aria-label="Notifications" 
          className={`p-2 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <svg
            width="16"
            height="30"
            viewBox="0 0 16 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-300 hover:scale-110"
          >
            <path
              d="M8.00001 30C9.10376 30 9.99907 28.3213 9.99907 26.25H6.00094C6.00094 28.3213 6.89626 30 8.00001 30ZM14.7309 21.2279C14.1272 20.0115 12.9975 18.1816 12.9975 12.1875C12.9975 7.63477 11.295 3.99023 8.99938 3.09609V1.875C8.99938 0.839648 8.55188 0 8.00001 0C7.44813 0 7.00063 0.839648 7.00063 1.875V3.09609C4.70501 3.99023 3.00251 7.63477 3.00251 12.1875C3.00251 18.1816 1.87282 20.0115 1.26907 21.2279C1.08157 21.6059 0.998444 22.0576 1.00001 22.5C1.00344 23.4609 1.40563 24.375 2.00313 24.375H13.9969C14.5944 24.375 14.9969 23.4609 15 22.5C15.0016 22.0576 14.9184 21.6053 14.7309 21.2279Z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button 
          aria-label="Profile" 
          className="p-2 transition-transform duration-300 hover:scale-110"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}>
            <span className="text-sm font-semibold">JS</span>
          </div>
        </button>
      </div>
      <NavigationMenu isDarkMode={isDarkMode} />
    </aside>
  );
}
