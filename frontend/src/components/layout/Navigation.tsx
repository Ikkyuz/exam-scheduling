import React from 'react';
import { Calendar, Home, LayoutDashboard, LogOut, User } from 'lucide-react';
import { User as UserType } from '../../types/user.type';

interface NavigationProps {
  user: UserType;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  user,
  currentPage,
  onNavigate,
  onLogout
}) => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-6 h-6 text-indigo-600" />
              <span className="font-bold text-gray-800">ระบบจัดตารางสอบ</span>
            </div>
            
            <div className="flex gap-1">
              <button
                onClick={() => onNavigate('home')}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  currentPage === 'home'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4" />
                หน้าแรก
              </button>
              
              <button
                onClick={() => onNavigate('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                  currentPage === 'dashboard'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">{user.username}</span>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                user.role === 'admin'
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'ผู้ใช้'}
              </span>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut className="w-4 h-4" />
              ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};