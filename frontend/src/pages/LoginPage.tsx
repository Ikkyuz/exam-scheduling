import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api'; // We will use this later for real API calls

const LoginPage = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', { username, password });
            const { token } = response.data;

            if (!token) {
                throw new Error('Invalid response from server');
            }

            login(token);
            // No need to navigate, the App component will handle the redirect.

        } catch (err: any) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(err.response.data.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            } else if (err.request) {
                // The request was made but no response was received
                setError('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
            } else {
                // Something happened in setting up the request that triggered an Error
                setError(err.message || 'เกิดข้อผิดพลาดที่ไม่คาดคิด');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">เข้าสู่ระบบ</h1>
                    <p className="text-gray-500 mt-2">สำหรับเจ้าหน้าที่และผู้สอน</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-700 block">ชื่อผู้ใช้</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Username"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 block">รหัสผ่าน</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Password"
                            required
                            disabled={loading}
                        />
                    </div>
                    {error && <p className="text-sm text-red-600 text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:bg-blue-300"
                        >
                            {loading ? 'กำลังเข้าสู่ระบบ...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

export default LoginPage;