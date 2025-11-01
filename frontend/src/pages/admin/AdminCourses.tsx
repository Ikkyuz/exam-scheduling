import React, { useEffect, useState } from 'react';
import type { Course } from '../../types/course';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import CourseForm from '../../components/forms/CourseForm';
import type { CourseFormInputs } from '../../components/forms/CourseForm';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';

const AdminCourses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [deletingCourse, setDeletingCourse] = useState<Course | null>(null);
    const [isSubmittingDelete, setIsSubmittingDelete] = useState<boolean>(false);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const mockCourses: Course[] = [
                    { id: 1, code: 'CPE101', name: 'Computer Programming', duration: 120, examType: 'Written' },
                    { id: 2, code: 'GEN201', name: 'General Physics', duration: 180, examType: 'Written' },
                    { id: 3, code: 'MTH301', name: 'Calculus III', duration: 120, examType: 'Written' },
                ];
                setCourses(mockCourses);
            } catch (err) {
                setError('Failed to fetch courses.');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleOpenAddModal = () => {
        setEditingCourse(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (course: Course) => {
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCourse(null);
    };

    const handleSaveCourse = async (data: CourseFormInputs) => {
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (editingCourse) {
                setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...data } : c));
            } else {
                const newCourse = { ...data, id: Date.now() };
                setCourses([...courses, newCourse]);
            }
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save course", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenDeleteModal = (course: Course) => {
        setDeletingCourse(course);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingCourse(null);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingCourse) return;
        setIsSubmittingDelete(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            // In a real app: await api.delete(`/courses/${deletingCourse.id}`);
            setCourses(courses.filter(c => c.id !== deletingCourse.id));
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Failed to delete course", error);
        } finally {
            setIsSubmittingDelete(false);
        }
    };

    const tableHeaders = ['Course Code', 'Course Name', 'Duration (Mins)', 'Exam Type', 'Actions'];

    if (loading) return <div>Loading courses...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Courses</h1>
                <button onClick={handleOpenAddModal} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                    + Add Course
                </button>
            </div>

            <Table headers={tableHeaders}>
                {courses.map((course) => (
                    <tr key={course.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.duration}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.examType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handleOpenEditModal(course)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                            <button onClick={() => handleOpenDeleteModal(course)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                        </td>
                    </tr>
                ))}
            </Table>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingCourse ? 'Edit Course' : 'Add New Course'}>
                <CourseForm 
                    onSubmit={handleSaveCourse} 
                    onCancel={handleCloseModal} 
                    initialData={editingCourse}
                    isSubmitting={isSubmitting}
                />
            </Modal>

            <ConfirmationDialog
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteConfirm}
                title="Delete Course"
                message={`Are you sure you want to delete the course "${deletingCourse?.name}"? This action cannot be undone.`}
                isConfirming={isSubmittingDelete}
            />
        </div>
    );
};

export default AdminCourses;
