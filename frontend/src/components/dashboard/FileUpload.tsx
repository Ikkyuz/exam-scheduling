import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Trash2, Plus } from 'lucide-react';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { validateFileType, formatFileSize } from '../../utils/validation';

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!validateFileType(file)) {
        setError('ประเภทไฟล์ไม่ถูกต้อง กรุณาเลือกไฟล์ CSV, Excel หรือ JSON');
        return;
      }

      setSelectedFile(file);
      setUploadSuccess(false);
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('กรุณาเลือกไฟล์');
      return;
    }

    setUploading(true);
    setError('');
    
    try {
      await onUpload(selectedFile);
      setUploadSuccess(true);
      setSelectedFile(null);
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการอัพโหลด');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Upload className="w-5 h-5" />
        นำเข้าข้อมูล
      </h2>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-500 transition">
        <input
          type="file"
          accept=".csv,.xlsx,.xls,.json"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center">
            <Upload className="w-12 h-12 text-gray-400 mb-3" />
            <p className="text-gray-700 font-medium mb-1">
              {selectedFile ? selectedFile.name : 'คลิกเพื่อเลือกไฟล์'}
            </p>
            <p className="text-sm text-gray-500">รองรับไฟล์ CSV, Excel, JSON</p>
          </div>
        </label>
      </div>

      {selectedFile && (
        <div className="mt-4 flex items-center justify-between bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
            <div>
              <p className="font-medium text-gray-800">{selectedFile.name}</p>
              <p className="text-sm text-gray-600">{formatFileSize(selectedFile.size)}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedFile(null)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      )}

      {error && <div className="mt-4"><Alert type="error" message={error} /></div>}
      {uploadSuccess && <div className="mt-4"><Alert type="success" message="นำเข้าข้อมูลสำเร็จ!" /></div>}

      <Button
        onClick={handleUpload}
        disabled={uploading || !selectedFile}
        fullWidth
        icon={<Plus className="w-5 h-5" />}
      >
        {uploading ? 'กำลังนำเข้าข้อมูล...' : 'นำเข้าข้อมูลและสร้างตารางสอบ'}
      </Button>
    </div>
  );
};