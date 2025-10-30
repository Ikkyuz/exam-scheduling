import React from 'react';

// Interfaces และ Type ที่จำเป็น (ต้องมีในไฟล์ App.tsx)
interface PreLoginWelcomePageProps {
    onStartLogin: () => void;
}

// Icon สำหรับแสดงพลัง AI (ZapIcon)
const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
// Icon สำหรับประหยัดเวลา (ClockIcon)
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
// Icon สำหรับความถูกต้องแม่นยำ (CheckCircleIcon)
const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
);
// Icon สำหรับจัดการง่าย (UserIcon)
const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);
// Icon สำหรับปุ่มไปหน้า Login (ArrowRightIcon)
const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
);


// -------------------------------------------------------------------------
// Component หลัก: PreLoginWelcomePage
// -------------------------------------------------------------------------

const PreLoginWelcomePage: React.FC<PreLoginWelcomePageProps> = ({ onStartLogin }) => {
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
                    <button
                        onClick={onStartLogin}
                        className="group relative inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-xl font-bold text-white shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-blue-700 active:bg-blue-800 ring-4 ring-blue-300/50"
                    >
                        <span className="relative z-10">เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน</span>
                        <ArrowRightIcon className="ml-3 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PreLoginWelcomePage;
