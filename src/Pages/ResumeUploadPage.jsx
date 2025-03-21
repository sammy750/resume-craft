"use client";
import React from "react";
import ResumeUpload from "../components/ResumeUpload";

export default function ResumeUploadPage() {
  // Get isDarkMode from context or parent component
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <ResumeUpload isDarkMode={isDarkMode} />
    </div>
  );
}
