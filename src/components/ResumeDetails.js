import React, { useState } from "react";

export default function ResumeDetails({ isDarkMode }) {
  const [activeTab, setActiveTab] = useState("base"); // "base" or "custom"
  const [isEditing, setIsEditing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  // Sample resume data that would come from props in a real app
  const [baseResume] = useState({
    title: "Base Resume",
    content: "Overview of the base resume with key qualifications and experience..."
  });
  
  const [customResume, setCustomResume] = useState({
    title: "Customized Version",
    content: "Overview of the customized version tailored for specific job applications..."
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsEditing(false);
  };

  const handleCompareToggle = () => {
    setShowComparison(!showComparison);
    setActiveTab("base");
  };

  return (
    <section className={`p-4 mt-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} shadow-md rounded-lg transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Resume Details</h2>
        <div className="space-x-2">
          <button 
            onClick={handleEdit}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            {isEditing ? "Save" : "Edit"}
          </button>
          <button 
            onClick={handleCompareToggle}
            className={`px-3 py-1 text-sm ${isDarkMode ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'} rounded transition`}>
            {showComparison ? "Exit Compare" : "Compare Versions"}
          </button>
        </div>
      </div>

      {!showComparison ? (
        <>
          <div className="flex border-b mb-4">
            <button 
              onClick={() => handleTabChange("base")}
              className={`px-4 py-2 ${activeTab === "base" ? "border-b-2 border-blue-500 font-bold" : ""} ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Base Resume
            </button>
            <button 
              onClick={() => handleTabChange("custom")}
              className={`px-4 py-2 ${activeTab === "custom" ? "border-b-2 border-blue-500 font-bold" : ""} ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Customized Version
            </button>
          </div>

          <div className={`p-4 border rounded-lg ${isDarkMode ? 'border-gray-600 bg-gray-700' : ''}`}>
            <h3 className={`mb-2 text-base font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {activeTab === "base" ? baseResume.title : customResume.title}
            </h3>
            {isEditing ? (
              <textarea 
                className={`w-full p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : ''}`}
                rows="5"
                value={activeTab === "base" ? baseResume.content : customResume.content}
                onChange={(e) => {
                  if (activeTab === "custom") {
                    setCustomResume({...customResume, content: e.target.value});
                  }
                }}
              />
            ) : (
              <p className={`text-base ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {activeTab === "base" ? baseResume.content : customResume.content}
              </p>
            )}
          </div>
        </>
      ) : (
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          <article className={`p-4 border rounded-lg ${isDarkMode ? 'border-gray-600 bg-gray-700' : ''}`}>
            <h3 className={`mb-2 text-base font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{baseResume.title}</h3>
            <p className={`text-base ${isDarkMode ? 'text-white' : 'text-black'}`}>{baseResume.content}</p>
          </article>
          <article className={`p-4 border rounded-lg ${isDarkMode ? 'border-gray-600 bg-gray-700' : ''}`}>
            <h3 className={`mb-2 text-base font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>{customResume.title}</h3>
            <p className={`text-base ${isDarkMode ? 'text-white' : 'text-black'}`}>{customResume.content}</p>
          </article>
        </div>
      )}
    </section>
  );
}
