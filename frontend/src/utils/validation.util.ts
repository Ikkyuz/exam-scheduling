import type { SchoolData } from '../types/school.type';

export const validateSchoolData = (data: SchoolData): string | null => {
  if (!data.schoolName.trim()) {
    return 'กรุณากรอกชื่อสถานศึกษา';
  }

  if (!data.examStartDate) {
    return 'กรุณาเลือกวันที่เริ่มสอบ';
  }

  if (!data.examEndDate) {
    return 'กรุณาเลือกวันที่สิ้นสุดการสอบ';
  }

  const startDate = new Date(data.examStartDate);
  const endDate = new Date(data.examEndDate);

  if (endDate < startDate) {
    return 'วันที่สิ้นสุดต้องมาหลังวันที่เริ่มสอบ';
  }

  return null;
};

export const validateFileType = (file: File): boolean => {
  const allowedExtensions = ['.csv', '.xlsx', '.xls', '.json'];
  const fileName = file.name.toLowerCase();
  return allowedExtensions.some(ext => fileName.endsWith(ext));
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};