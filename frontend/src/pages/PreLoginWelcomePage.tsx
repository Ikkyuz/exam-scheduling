import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ZapIcon from '../components/icons/ZapIcon';
import ClockIcon from '../components/icons/ClockIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import UserIcon from '../components/icons/UserIcon';
import ArrowRightIcon from '../components/icons/ArrowRightIcon';

const PreLoginWelcomePage: React.FC = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center transform transition-all duration-500 scale-95 hover:scale-100">
                
                <ZapIcon className="mx-auto h-20 w-20 text-blue-600 animate-bounce" />
                
                <h1 className="mt-6 text-5xl font-extrabold text-gray-900 tracking-tight">
                    ระบบจัดตารางสอบอัจฉริยะด้วย AI
                </h1>
                
                <p className="mt-4 text-xl text-gray-500 max-w-3xl mx-auto">
                    ยกระดับการจัดการตารางสอบของคุณด้วยพลังของปัญญาประดิษฐ์ ลดข้อผิดพลาด ประหยัดเวลา
                    และเพิ่มประสิทธิภาพในการจัดตารางสอบและกรรมการคุมสอบได้อย่างไร้รอยต่อ
                </p>

                {/* Key Features Section */}
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="flex flex-col items-center p-4">
                        <ClockIcon className="h-10 w-10 text-green-500 mb-3" />
                        <h3 className="text-xl font-bold text-gray-700">ประหยัดเวลา</h3>
                        <p className="text-gray-500 text-sm mt-1">AI จัดตารางให้เสร็จภายในไม่กี่นาที</p>
                    </div>
                    <div className="flex flex-col items-center p-4">
                        <CheckCircleIcon className="h-10 w-10 text-blue-500 mb-3" />
                        <h3 className="text-xl font-bold text-gray-700">ความถูกต้องแม่นยำ</h3>
                        <p className="text-gray-500 text-sm mt-1">ลดข้อขัดแย้งและข้อผิดพลาดในการจัด</p>
                    </div>
                    <div className="flex flex-col items-center p-4">
                        <UserIcon className="h-10 w-10 text-yellow-500 mb-3" />
                        <h3 className="text-xl font-bold text-gray-700">จัดการง่าย</h3>
                        <p className="text-gray-500 text-sm mt-1">แยกบทบาท (Admin/User) ชัดเจน</p>
                    </div>
                </div>

                {/* Call to Action Button */}
                <div className="mt-12">
                    {isAuthenticated ? (
                        <Link
                            to="/dashboard"
                            className="group relative inline-flex items-center justify-center rounded-full bg-green-600 px-10 py-4 text-xl font-bold text-white shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-green-700 active:bg-green-800 ring-4 ring-green-300/50"
                        >
                            <span className="relative z-10">ไปยัง Dashboard</span>
                            <ArrowRightIcon className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    ) : (
                        <Link
                            to="/login"
                            className="group relative inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-xl font-bold text-white shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 active:bg-blue-800 ring-4 ring-blue-300/50"
                        >
                            <span className="relative z-10">เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน</span>
                            <ArrowRightIcon className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PreLoginWelcomePage;
