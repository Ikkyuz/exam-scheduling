import React from 'react';
import { FileSpreadsheet, Eye, Trash2 } from 'lucide-react';
import { ImportedData, User } from '../../types';
import { formatDate } from '../../utils/validation';

interface DataListProps {
  data: ImportedData[];
  user: User;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}

export const DataList: React.FC<DataListProps> = ({ data, user, onDelete, onView }) => {
  if (data.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-12 text-center">
        <FileSpreadsheet className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">ยังไม่มีข้อมูลที่นำเข้า</p>
        <p className="text-sm text-gray-500 mt-2">กรุณาไปที่หน้า Dashboard เพื่อนำเข้าข้อมูล</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {data.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow p-6 flex items-center justify-between hover:shadow-md transition">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <FileSpreadsheet className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{item.fileName}</h3>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                <span>ประเภท: {item.type.toUpperCase()}</span>
                <span>•</span>
                <span>จำนวน: {item.recordCount} รายการ</span>
                <span>•</span>
                <span>{formatDate(item.uploadDate)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              item.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              {item.status === 'success' ? 'สำเร็จ' : 'ข้อผิดพลาด'}
            </span>
            <button 
              onClick={() => onView(item.id)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <Eye className="w-5 h-5 text-gray-600" />
            </button>
            {user.role === 'admin' && (
              <button
                onClick={() => onDelete(item.id)}
                className="p-2 hover:bg-red-50 rounded-lg transition"
              >
                <Trash2 className="w-5 h-5 text-red-600" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};