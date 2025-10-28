// src/App.tsx (ปรับปรุงการนำเข้า)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './services/auth.service'; // **เปลี่ยนการนำเข้า**

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Modules/Pages
import LoginPage from './modules/auth/LoginPage';
import DashboardPage from './modules/schedule/DashboardPage';
import DataImportPage from './modules/schedule/DataImportPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* ... (Nav Bar) ... */}
        
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/data-import" element={<DataImportPage />} />
            {/* ... */}
          </Route>
          
          <Route path="*" element={<h1>404: Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;