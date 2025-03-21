"use client";
import React from "react";
import TemplateSelector from "../components/TemplateSelector";

export default function TemplateSelectorPage() {
  // Get isDarkMode from context or parent component
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  return (
    <div className="p-4 max-w-6xl mx-auto">
      <TemplateSelector isDarkMode={isDarkMode} />
    </div>
  );
}
