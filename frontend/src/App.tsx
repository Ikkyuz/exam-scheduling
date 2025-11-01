import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './components/AdminLayout';

// Page Components
import PreLoginWelcomePage from './pages/PreLoginWelcomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import NotFoundPage from './pages/NotFoundPage';
import AdminCourses from './pages/admin/AdminCourses';
import AdminRooms from './pages/admin/AdminRooms';
import AdminInstructors from './pages/admin/AdminInstructors';
import AdminScheduling from './pages/admin/AdminScheduling';


// Route Protection Components
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';

// A component to redirect users based on their role
const RoleBasedRedirect = () => {
    return <Navigate to="/admin/dashboard" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PreLoginWelcomePage />} />
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* Generic authenticated redirect */}
        <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<RoleBasedRedirect />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="courses" element={<AdminCourses />} />
                <Route path="rooms" element={<AdminRooms />} />
                <Route path="instructors" element={<AdminInstructors />} />
                <Route path="scheduling" element={<AdminScheduling />} />
            </Route>
        </Route>
        
        {/* User Routes */}
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/user/dashboard" element={<UserDashboard />} />
        </Route>

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;