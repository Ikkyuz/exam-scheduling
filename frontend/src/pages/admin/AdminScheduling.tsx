import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

interface SchedulingFormInputs {
    semester: string;
    academicYear: string;
    examStart: string;
    examEnd: string;
}

type SchedulingStatus = 'idle' | 'processing' | 'success' | 'error';

const AdminScheduling: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<SchedulingFormInputs>();
    const [status, setStatus] = useState<SchedulingStatus>('idle');
    const [result, setResult] = useState<any | null>(null); // This will hold the schedule later

    const onSubmit: SubmitHandler<SchedulingFormInputs> = async (data) => {
        setStatus('processing');
        setResult(null);
        console.log("Scheduling data submitted:", data);

        try {
            // Simulate the AI scheduling process
            await new Promise(resolve => setTimeout(resolve, 3000));

            // Mock result
            const mockSchedule = [
                { className: 'Group A', departmentName: 'IT', courseCode: 'CPE101', courseName: 'Programming', timeStart: '2025-11-10 08:30', timeEnd: '2025-11-10 10:30', duration: 120, roomNumber: '78-101' },
                { className: 'Group B', departmentName: 'Business', courseCode: 'GEN201', courseName: 'Physics', timeStart: '2025-11-10 10:30', timeEnd: '2025-11-10 12:30', duration: 120, roomNumber: '62-305' },
            ];
            setResult(mockSchedule);
            setStatus('success');
        } catch (error) {
            console.error("Scheduling failed", error);
            setStatus('error');
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-gray-800">Run Exam Scheduling</h1>

            {/* Configuration Card */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-gray-700 mb-6">1. Configure Scheduling Period</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="semester" className="block text-sm font-medium text-gray-700">Semester</label>
                            <input id="semester" {...register('semester', { required: 'Semester is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            {errors.semester && <p className="text-sm text-red-600 mt-1">{errors.semester.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="academicYear" className="block text-sm font-medium text-gray-700">Academic Year</label>
                            <input id="academicYear" {...register('academicYear', { required: 'Academic year is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            {errors.academicYear && <p className="text-sm text-red-600 mt-1">{errors.academicYear.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="examStart" className="block text-sm font-medium text-gray-700">Exam Start Date</label>
                            <input id="examStart" type="date" {...register('examStart', { required: 'Start date is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            {errors.examStart && <p className="text-sm text-red-600 mt-1">{errors.examStart.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="examEnd" className="block text-sm font-medium text-gray-700">Exam End Date</label>
                            <input id="examEnd" type="date" {...register('examEnd', { required: 'End date is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                            {errors.examEnd && <p className="text-sm text-red-600 mt-1">{errors.examEnd.message}</p>}
                        </div>
                    </div>
                    <div className="pt-4 text-right">
                        <button type="submit" disabled={status === 'processing'} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400">
                            {status === 'processing' ? 'Generating Schedule...' : 'Generate Exam Schedule'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Status & Results Card */}
            {(status === 'processing' || status === 'success' || status === 'error') && (
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6">2. Scheduling Result</h2>
                    {status === 'processing' && (
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-lg text-gray-600">AI is processing the schedule. This may take a few moments...</p>
                        </div>
                    )}
                    {status === 'success' && (
                        <div>
                            <p className="text-lg text-green-600 font-semibold mb-4">Schedule generated successfully!</p>
                            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
                        </div>
                    )}
                    {status === 'error' && (
                        <p className="text-lg text-red-600 font-semibold">Failed to generate schedule. Please check the configuration and try again.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminScheduling;
