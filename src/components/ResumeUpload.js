import React, { useState, useRef } from 'react';

const ResumeUpload = ({ isDarkMode }) => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus('');
      setUploadProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus('Please select a file first');
      return;
    }
    
    setIsUploading(true);
    setUploadStatus('Uploading...');

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + Math.random() * 20;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 500);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      clearInterval(interval);
      setUploadProgress(100);
      setUploadStatus('Upload successful!');
      setIsUploading(false);
      
      // Reset after success
      setTimeout(() => {
        setFile(null);
        setUploadProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }, 2000);
      
    } catch (error) {
      clearInterval(interval);
      setUploadStatus('Error uploading file.');
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`max-w-xl mx-auto my-8 p-6 rounded-lg shadow-card ${
      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'
    }`}>
      <h2 className={`text-2xl font-bold mb-6 ${
        isDarkMode ? 'text-white' : 'text-gray-800'
      }`}>Upload Your Resume</h2>
      
      <div className="mb-6">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${
            isDarkMode 
              ? 'border-gray-600 hover:border-primary-400' 
              : 'border-gray-300 hover:border-primary-500'
          }`}
          onClick={triggerFileInput}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange} 
            className="hidden" 
            accept=".pdf,.doc,.docx"
          />
          
          <svg className={`mx-auto h-12 w-12 ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`} stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8m36-12h-4m-24 0H8m36-12h-4m-24 0H8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          
          <p className={`mt-2 text-sm ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {file ? file.name : 'Click to select a PDF or Word document'}
          </p>
          <p className={`mt-1 text-xs ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Maximum file size: 5MB
          </p>
        </div>
      </div>
      
      {uploadProgress > 0 && (
        <div className="mb-4">
          <div className={`w-full rounded-full h-2.5 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div 
              className="bg-primary-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className={`text-xs mt-1 text-right ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>{Math.round(uploadProgress)}%</p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button 
          onClick={handleUpload} 
          disabled={isUploading || !file}
          className={`
            px-4 py-2 rounded-md font-medium transition-all duration-300
            ${isUploading || !file 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : isDarkMode
                ? 'bg-primary-600 text-white hover:bg-primary-700 transform hover:-translate-y-0.5 hover:shadow-md'
                : 'bg-primary-500 text-white hover:bg-primary-600 transform hover:-translate-y-0.5 hover:shadow-md'
            }
          `}
        >
          {isUploading ? 'Uploading...' : 'Upload Resume'}
        </button>
        
        {file && (
          <button 
            onClick={() => {
              setFile(null);
              setUploadStatus('');
              setUploadProgress(0);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
            className={`px-4 py-2 rounded-md font-medium transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Cancel
          </button>
        )}
      </div>
      
      {uploadStatus && (
        <p className={`mt-4 text-center text-sm ${
          uploadStatus.includes('successful') 
            ? 'text-secondary-500' 
            : uploadStatus.includes('Error') 
              ? 'text-red-500' 
              : isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {uploadStatus}
        </p>
      )}
    </div>
  );
};

export default ResumeUpload;
