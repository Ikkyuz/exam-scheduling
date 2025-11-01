import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout: React.FC = () => {
    const { logout } = useAuth();

    const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
        `block px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200'
        }`;

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 flex flex-col bg-white shadow-lg">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-blue-700">Admin Panel</h2>
                </div>
                <nav className="px-4">
                    <NavLink to="/admin/dashboard" className={navLinkClasses} end>Dashboard</NavLink>
                    <NavLink to="/admin/courses" className={navLinkClasses}>Courses</NavLink>
                    <NavLink to="/admin/rooms" className={navLinkClasses}>Rooms</NavLink>
                    <NavLink to="/admin/instructors" className={navLinkClasses}>Instructors</NavLink>
                    <NavLink to="/admin/scheduling" className={navLinkClasses}>Scheduling</NavLink>
                </nav>
                <div className="absolute bottom-0 w-64 p-4">
                    <button
                        onClick={logout}
                        className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
