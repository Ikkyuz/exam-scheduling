// src/pages/DataImportPage.tsx (Adjusted)

import React, { useState } from 'react';
import { useAuth, API } from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
// **คอมเมนต์:** ไม่จำเป็นต้องใช้ XLSX.read ใน Frontend อีกต่อไป เพราะ Backend จัดการไฟล์เอง

// ... (formSchema และ Type ต่างๆ เหมือนเดิม) ...
type SchoolDataForm = z.infer<typeof formSchema>; // ใช้ Zod Type Inference

const DataImportPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SchoolDataForm>({
    resolver: zodResolver(formSchema),
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ... (handleFileChange เหมือนเดิม) ...

  const onSubmit = async (formData: SchoolDataForm) => {
    if (!file) {
      alert('กรุณาเลือกไฟล์ข้อมูล');
      return;
    }
    
    // **สิ่งที่เปลี่ยนแปลง: ใช้ FormData สำหรับการส่งไฟล์และข้อมูล Form**
    const data = new FormData();
    data.append('file', file);
    data.append('institutionName', formData.institutionName);
    data.append('date', formData.date);
    data.append('semester', formData.semester);
    data.append('academicYear', formData.academicYear);

    try {
      setIsSubmitting(true);
      
      // **คอมเมนต์:** ส่ง FormData ไปที่ Endpoint '/api/upload' โดยไม่ต้องระบุ Content-Type
      // (axios และ FormData จะจัดการ Content-Type: multipart/form-data เอง)
      const response = await API.post('/api/upload', data);

      alert(`ข้อมูลถูกส่งไปยัง AI เพื่อสร้างตารางสอบแล้ว: ${response.data.message}`);
      // คุณอาจจะ navigate('/') หรือทำการ Polling สถานะการสร้างตารางสอบต่อไป

    } catch (error: any) {
      console.error('Error in submission:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'เกิดข้อผิดพลาดในการส่งข้อมูล');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // ... (Return JSX เหมือนเดิม) ...
    {/* **สิ่งที่ต้องทำเพิ่มเติม:** ใส่ input สำหรับ Date, Semester, AcademicYear เพื่อให้ครบตาม formSchema */}
  );
};

export default DataImportPage;