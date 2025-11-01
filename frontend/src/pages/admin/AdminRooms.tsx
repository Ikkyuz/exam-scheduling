import React, { useEffect, useState } from 'react';
import type { Room } from '../../types/room';
import Table from '../../components/ui/Table';
import Modal from '../../components/ui/Modal';
import ConfirmationDialog from '../../components/ui/ConfirmationDialog';
import RoomForm from '../../components/forms/RoomForm';
import type { RoomFormInputs } from '../../components/forms/RoomForm';

const AdminRooms: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
    const [deletingRoom, setDeletingRoom] = useState<Room | null>(null);
    const [isSubmittingDelete, setIsSubmittingDelete] = useState<boolean>(false);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));
                const mockRooms: Room[] = [
                    { id: 1, roomNumber: '78-101', building: 'Building 78', floor: '1', capacity: 50 },
                    { id: 2, roomNumber: '62-305', building: 'Building 62', floor: '3', capacity: 40 },
                    { id: 3, roomNumber: 'Library-A', building: 'Library', floor: '2', capacity: 100 },
                ];
                setRooms(mockRooms);
            } catch (err) {
                setError('Failed to fetch rooms.');
            } finally {
                setLoading(false);
            }
        };
        fetchRooms();
    }, []);

    const handleOpenAddModal = () => {
        setEditingRoom(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (room: Room) => {
        setEditingRoom(room);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingRoom(null);
    };

    const handleSaveRoom = async (data: RoomFormInputs) => {
        setIsSubmitting(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (editingRoom) {
                setRooms(rooms.map(r => r.id === editingRoom.id ? { ...r, ...data } : r));
            } else {
                const newRoom = { ...data, id: Date.now() };
                setRooms([...rooms, newRoom]);
            }
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save room", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpenDeleteModal = (room: Room) => {
        setDeletingRoom(room);
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDeletingRoom(null);
    };

    const handleDeleteConfirm = async () => {
        if (!deletingRoom) return;
        setIsSubmittingDelete(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setRooms(rooms.filter(r => r.id !== deletingRoom.id));
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Failed to delete room", error);
        } finally {
            setIsSubmittingDelete(false);
        }
    };

    const tableHeaders = ['Room Number', 'Building', 'Floor', 'Capacity', 'Actions'];

    if (loading) return <div>Loading rooms...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Rooms</h1>
                <button onClick={handleOpenAddModal} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300">
                    + Add Room
                </button>
            </div>

            <Table headers={tableHeaders}>
                {rooms.map((room) => (
                    <tr key={room.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{room.roomNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.building}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.floor}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{room.capacity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => handleOpenEditModal(room)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                            <button onClick={() => handleOpenDeleteModal(room)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                        </td>
                    </tr>
                ))}
            </Table>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={editingRoom ? 'Edit Room' : 'Add New Room'}>
                <RoomForm 
                    onSubmit={handleSaveRoom} 
                    onCancel={handleCloseModal} 
                    initialData={editingRoom}
                    isSubmitting={isSubmitting}
                />
            </Modal>

            <ConfirmationDialog
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                onConfirm={handleDeleteConfirm}
                title="Delete Room"
                message={`Are you sure you want to delete room "${deletingRoom?.roomNumber}"? This action cannot be undone.`}
                isConfirming={isSubmittingDelete}
            />
        </div>
    );
};

export default AdminRooms;
