
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { Course } from '../../types/course';

export type CourseFormInputs = Omit<Course, 'id'>;

interface CourseFormProps {
    onSubmit: SubmitHandler<CourseFormInputs>;
    onCancel: () => void;
    initialData?: Course | null;
    isSubmitting: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({ onSubmit, onCancel, initialData, isSubmitting }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<CourseFormInputs>({
        defaultValues: initialData || { code: '', name: '', duration: 60, examType: 'Written' }
    });

    useEffect(() => {
        reset(initialData || { code: '', name: '', duration: 60, examType: 'Written' });
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">Course Code</label>
                <input
                    id="code"
                    {...register('code', { required: 'Course code is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.code && <p className="text-sm text-red-600 mt-1">{errors.code.message}</p>}
            </div>

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Course Name</label>
                <input
                    id="name"
                    {...register('name', { required: 'Course name is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
            </div>

            <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                    id="duration"
                    type="number"
                    {...register('duration', { required: 'Duration is required', valueAsNumber: true, min: { value: 30, message: 'Duration must be at least 30 minutes' } })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.duration && <p className="text-sm text-red-600 mt-1">{errors.duration.message}</p>}
            </div>

            <div>
                <label htmlFor="examType" className="block text-sm font-medium text-gray-700">Exam Type</label>
                <select
                    id="examType"
                    {...register('examType', { required: 'Exam type is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="Written">Written</option>
                    <option value="Practical">Practical</option>
                    <option value="Oral">Oral</option>
                </select>
                {errors.examType && <p className="text-sm text-red-600 mt-1">{errors.examType.message}</p>}
            </div>

            <div className="flex justify-end space-x-4 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                >
                    {isSubmitting ? 'Saving...' : 'Save Course'}
                </button>
            </div>
        </form>
    );
};

export default CourseForm;
