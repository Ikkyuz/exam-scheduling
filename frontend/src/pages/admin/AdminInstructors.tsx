import React, { useEffect, useState } from 'react';
import type { User } from '../../types/user';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import InstructorForm from '../../components/forms/InstructorForm';

const AdminInstructors: React.FC = () => {
    const [instructors, setInstructors] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingInstructor, setEditingInstructor] = useState<User | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [deletingInstructor, setDeletingInstructor] = useState<User | null>(null);
    const [isSubmittingDelete, setIsSubmittingDelete] = useState<boolean>(false);

    useEffect(() => {
        const fetchInstructors = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const mockInstructors: User[] = [
                    { id: '2', firstname: 'John', lastname: 'Doe', username: 'johndoe', email: 'john.d@example.com', role: 'user', password: '' },
                    { id: '3', firstname: 'Jane', lastname: 'Smith', username: 'janesmith', email: 'jane.s@example.com', role: 'user', password: '' },
                ];
                setInstructors(mockInstructors);
            } catch (err) {
                setError('Failed to fetch instructors.');
            } finally {
                setLoading(false);
            }
        };
        fetchInstructors();
    }, []);

    const handleOpenAddModal = () => {
        setEditingInstructor(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (instructor: User) => {
        setEditingInstructor(instructor);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingInstructor(null);
    };

    const handleSaveInstructor = async (data: any) => {
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (editingInstructor) {
                setInstructors(instructors.map(i => i.id === editingInstructor.id ? { ...i, ...data } : i));
            } else {
                const newInstructor = { ...data, id: Date.now().toString() };
                setInstructors([...instructors, newInstructor]);
            }
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save instructor", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenDeleteModal = (instructor: User) => {
        setDeletingInstructor(instructor);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingInstructor(null);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingInstructor) return;
        setIsSubmittingDelete(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setInstructors(instructors.filter(i => i.id !== deletingInstructor.id));
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Failed to delete instructor", error);
        } finally {
            setIsSubmittingDelete(false);
        }
    };

    const tableHeaders = ['Name', 'Username', 'Email', 'Role', 'Actions'];

    if (loading) return <div>Loading instructors...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Instructors</h1>
                <button onClick={handleOpenAddModal} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                    + Add Instructor
                </button>
            </div>

            <Table headers={tableHeaders}>
                {instructors.map((instructor) => (
                    <tr key={instructor.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{`${instructor.firstname} ${instructor.lastname}`}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{instructor.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{instructor.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{instructor.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handleOpenEditModal(instructor)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                            <button onClick={() => handleOpenDeleteModal(instructor)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                        </td>
                    </tr>
                ))}
            </Table>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}>
                <InstructorForm 
                    onSubmit={handleSaveInstructor} 
                    onCancel={handleCloseModal} 
                    initialData={editingInstructor}
                    isSubmitting={isSubmitting}
                />
            </Modal>

            <ConfirmationDialog
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteConfirm}
                title="Delete Instructor"
                message={`Are you sure you want to delete the instructor "${deletingInstructor?.firstname} ${deletingInstructor?.lastname}"? This action cannot be undone.`}
                isConfirming={isSubmittingDelete}
            />
        </div>
    );
};

export default AdminInstructors;
