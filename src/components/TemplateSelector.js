import React, { useState } from 'react';

const templates = [
  { id: 1, name: 'Modern Clean', color: 'bg-primary-500' },
  { id: 2, name: 'Professional Corporate', color: 'bg-secondary-500' },
  { id: 3, name: 'Creative Design', color: 'bg-accent-500' },
  { id: 4, name: 'Tech Minimalist', color: 'bg-gray-700' },
  { id: 5, name: 'Compact One-Page', color: 'bg-primary-700' },
  { id: 6, name: 'Academic Research', color: 'bg-secondary-600' },
];

const TemplateSelector = ({ isDarkMode }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  return (
    <div className={`max-w-4xl mx-auto my-8 p-6 rounded-lg shadow-card ${
      isDarkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>Select Your Resume Template</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`
              p-5 rounded-lg cursor-pointer transition-all duration-300 
              ${selectedTemplate?.id === template.id 
                ? isDarkMode
                  ? 'ring-2 ring-primary-400 shadow-card-hover scale-105' 
                  : 'ring-2 ring-primary-500 shadow-card-hover scale-105'
                : isDarkMode
                  ? 'border border-gray-700 hover:shadow-card-hover hover:scale-105'
                  : 'border border-gray-200 hover:shadow-card-hover hover:scale-105'
              }
            `}
            onClick={() => handleSelect(template)}
          >
            <div className={`w-full h-20 mb-3 rounded ${template.color}`}></div>
            <h3 className={`font-medium ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>{template.name}</h3>
          </div>
        ))}
      </div>
      
      {selectedTemplate && (
        <div className="mt-8 flex flex-col items-center">
          <p className={`mb-4 text-lg ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Selected: <span className="font-semibold">{selectedTemplate.name}</span>
          </p>
          <button 
            onClick={handleDownload}
            disabled={isDownloading}
            className={`
              px-6 py-3 rounded-md text-white font-medium transition-all duration-300
              ${isDownloading 
                ? 'bg-secondary-500 opacity-70 cursor-wait' 
                : 'bg-secondary-500 hover:bg-secondary-600 transform hover:-translate-y-1'
              }
            `}
          >
            {isDownloading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              `Download in ${selectedTemplate.name} Format`
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
