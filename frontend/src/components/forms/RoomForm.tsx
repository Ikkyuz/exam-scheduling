
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { Room } from '../../types/room';

export type RoomFormInputs = Omit<Room, 'id'>;

interface RoomFormProps {
    onSubmit: SubmitHandler<RoomFormInputs>;
    onCancel: () => void;
    initialData?: Room | null;
    isSubmitting: boolean;
}

const RoomForm: React.FC<RoomFormProps> = ({ onSubmit, onCancel, initialData, isSubmitting }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<RoomFormInputs>({
        defaultValues: initialData || { roomNumber: '', building: '', floor: '', capacity: 30 }
    });

    useEffect(() => {
        reset(initialData || { roomNumber: '', building: '', floor: '', capacity: 30 });
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700">Room Number</label>
                <input
                    id="roomNumber"
                    {...register('roomNumber', { required: 'Room number is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.roomNumber && <p className="text-sm text-red-600 mt-1">{errors.roomNumber.message}</p>}
            </div>

            <div>
                <label htmlFor="building" className="block text-sm font-medium text-gray-700">Building</label>
                <input
                    id="building"
                    {...register('building', { required: 'Building is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.building && <p className="text-sm text-red-600 mt-1">{errors.building.message}</p>}
            </div>

            <div>
                <label htmlFor="floor" className="block text-sm font-medium text-gray-700">Floor</label>
                <input
                    id="floor"
                    {...register('floor', { required: 'Floor is required' })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.floor && <p className="text-sm text-red-600 mt-1">{errors.floor.message}</p>}
            </div>

            <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                    id="capacity"
                    type="number"
                    {...register('capacity', { required: 'Capacity is required', valueAsNumber: true, min: { value: 1, message: 'Capacity must be at least 1' } })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.capacity && <p className="text-sm text-red-600 mt-1">{errors.capacity.message}</p>}
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
                    {isSubmitting ? 'Saving...' : 'Save Room'}
                </button>
            </div>
        </form>
    );
};

export default RoomForm;
