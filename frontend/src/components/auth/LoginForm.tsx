import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';

interface LoginFormProps {
  onLogin: (username: string, password: string) => Promise<void>;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await onLogin(username, password);
    } catch (err) {
      setError('เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="ชื่อผู้ใช้"
        value={username}
        onChange={setUsername}
        placeholder="กรอกชื่อผู้ใช้"
        required
      />

      <Input
        label="รหัสผ่าน"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="กรอกรหัสผ่าน"
        required
      />

      {error && <Alert type="error" message={error} />}

      <Button
        type="submit"
        disabled={loading}
        fullWidth
      >
        {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
      </Button>
    </div>
  );
};