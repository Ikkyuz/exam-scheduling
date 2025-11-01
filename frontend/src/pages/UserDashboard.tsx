import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import type { Course } from '../types/course';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import CourseForm from '../components/forms/CourseForm';
import type { CourseFormInputs } from '../components/forms/CourseForm';

const UserDashboard = () => {
    const { user, logout } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserCourses = async () => {
            if (!user) return;
            try {
                // In a real app: const response = await api.get(`/users/${user.id}/courses`);
                // setCourses(response.data);
                await new Promise(resolve => setTimeout(resolve, 1000));
                const mockCourses: Course[] = [
                    { id: 1, code: 'CPE101', name: 'Computer Programming', duration: 120, examType: 'Written' },
                    { id: 4, code: 'ENG202', name: 'English Communication', duration: 90, examType: 'Oral' },
                ];
                setCourses(mockCourses);
            } catch (err) {
                setError('Failed to fetch your courses.');
            } finally {
                setLoading(false);
            }
        };
        fetchUserCourses();
    }, [user]);

    const handleOpenEditModal = (course: Course) => {
        setEditingCourse(course);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingCourse(null);
    };

    const handleSaveChanges = async (data: CourseFormInputs) => {
        if (!editingCourse) return;
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            // In a real app: await api.put(`/courses/${editingCourse.id}`, data);
            setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...data } : c));
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save changes", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const tableHeaders = ['Course Code', 'Course Name', 'Duration (Mins)', 'Exam Type', 'Actions'];

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Instructor Dashboard</h1>
                    <button 
                        onClick={logout}
                        className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold">Welcome, {user?.firstname || user?.username}!</h2>
                    <p className="mt-2 text-gray-600">Here you can manage your assigned courses and view the final exam schedule.</p>
                </div>

                {/* My Courses Section */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-700 mb-6">My Courses</h3>
                    {loading ? (
                        <p>Loading your courses...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
                        <Table headers={tableHeaders}>
                            {courses.map((course) => (
                                <tr key={course.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.code}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.duration}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.examType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => handleOpenEditModal(course)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    )}
                </div>
            </main>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Edit Course Details">
                <CourseForm 
                    onSubmit={handleSaveChanges} 
                    onCancel={handleCloseModal} 
                    initialData={editingCourse}
                    isSubmitting={isSubmitting}
                />
            </Modal>
        </div>
    );
};

export default UserDashboard;
