import React from 'react';
import { Settings } from 'lucide-react';
import { SchoolData } from '../../types';
import { Input } from '../common/Input';

interface SchoolDataFormProps {
  data: SchoolData;
  onChange: (data: SchoolData) => void;
}

export const SchoolDataForm: React.FC<SchoolDataFormProps> = ({ data, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Settings className="w-5 h-5" />
        ข้อมูลสถานศึกษา
      </h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <Input
          label="ชื่อสถานศึกษา"
          value={data.schoolName}
          onChange={(value) => onChange({ ...data, schoolName: value })}
          placeholder="เช่น โรงเรียนตัวอย่าง"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ภาคเรียน
          </label>
          <select
            value={data.semester}
            onChange={(e) => onChange({ ...data, semester: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          >
            <option value="1">ภาคเรียนที่ 1</option>
            <option value="2">ภาคเรียนที่ 2</option>
          </select>
        </div>

        <Input
          label="ปีการศึกษา"
          value={data.academicYear}
          onChange={(value) => onChange({ ...data, academicYear: value })}
          placeholder="2568"
          required
        />

        <Input
          label="วันที่เริ่มสอบ"
          type="date"
          value={data.examStartDate}
          onChange={(value) => onChange({ ...data, examStartDate: value })}
          required
        />

        <Input
          label="วันที่สิ้นสุดการสอบ"
          type="date"
          value={data.examEndDate}
          onChange={(value) => onChange({ ...data, examEndDate: value })}
          required
        />
      </div>
    </div>
  );
};