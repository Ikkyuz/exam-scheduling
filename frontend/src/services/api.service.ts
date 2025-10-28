import type { User } from '../types/user.type';
import type { LoginCredentials } from '../types/auth.type';
import type { SchoolData } from '../types/school.type';
import type { ImportedData } from '../types/importedData.type';

const API_BASE_URL = 'http://localhost:3000/api'; // เปลี่ยนเป็น URL backend ของคุณ

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const user = localStorage.getItem('user');
    if (user) {
      const { token } = JSON.parse(user);
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };
    }
    return { 'Content-Type': 'application/json' };
  }

  // Authentication APIs
  async login(credentials: LoginCredentials): Promise<User> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) throw new Error('Login failed');
      
      const data = await response.json();
      return data;
    } catch {
      throw new Error('เข้าสู่ระบบไม่สำเร็จ');
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      return response.ok;
    } catch {
      return false;
    }
  }

  // File Upload APIs
  async uploadFile(file: File, schoolData: SchoolData): Promise<ImportedData> {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('schoolData', JSON.stringify(schoolData));

      const user = localStorage.getItem('user');
      const token = user ? JSON.parse(user).token : '';

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const data = await response.json();
      return data;
    } catch {
      throw new Error('อัพโหลดไฟล์ไม่สำเร็จ');
    }
  }

  // Data Management APIs
  async getImportedData(): Promise<ImportedData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/data`, {
        headers: this.getAuthHeaders()
      });

      if (!response.ok) throw new Error('Fetch failed');
      
      const data = await response.json();
      return data;
    } catch {
      throw new Error('ดึงข้อมูลไม่สำเร็จ');
    }
  }

  async deleteImportedData(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/data/${id}`, {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) throw new Error('Delete failed');
    } catch {
      throw new Error('ลบข้อมูลไม่สำเร็จ');
    }
  }

  // Exam Schedule APIs
  async generateSchedule(schoolData: SchoolData): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule/generate`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(schoolData)
      });

      if (!response.ok) throw new Error('Generate failed');
      
      const data = await response.json();
      return data;
    } catch {
      throw new Error('สร้างตารางสอบไม่สำเร็จ');
    }
  }
}

export const apiService = new ApiService();