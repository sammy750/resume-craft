import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import ResumeUploadPage from './Pages/ResumeUploadPage';
import TemplateSelectorPage from './Pages/TemplateSelectorPage';
import ProfilePage from './Pages/ProfilePage';
import MainLayout from './components/layouts/MainLayout';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <MainLayout>
          <Routes>
            <Route path="/" element={<DashboardLayout />} />
            <Route path="/upload" element={<ResumeUploadPage />} />
            <Route path="/templates" element={<TemplateSelectorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Add more routes as needed */}
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
