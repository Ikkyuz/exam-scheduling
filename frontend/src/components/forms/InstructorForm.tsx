import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { User } from '../../types/user';

// For the form, we can omit fields that are auto-generated or handled separately.
export type InstructorFormInputs = Omit<User, 'id' | 'created_at' | 'updated_at'>;

interface InstructorFormProps {
    onSubmit: SubmitHandler<InstructorFormInputs>;
    onCancel: () => void;
    initialData?: User | null;
    isSubmitting: boolean;
}

const InstructorForm: React.FC<InstructorFormProps> = ({ onSubmit, onCancel, initialData, isSubmitting }) => {
    const isEditing = !!initialData;
    const { register, handleSubmit, formState: { errors }, reset } = useForm<InstructorFormInputs>({
        defaultValues: initialData || {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            role: 'user',
        }
    });

    useEffect(() => {
        if (initialData) {
            // When editing, we don't want to deal with the password
            const { password, ...defaults } = initialData;
            reset(defaults);
        } else {
            reset({
                firstname: '',
                lastname: '',
                username: '',
                email: '',
                password: '',
                role: 'user',
            });
        }
    }, [initialData, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input id="firstname" {...register('firstname', { required: 'First name is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    {errors.firstname && <p className="text-sm text-red-600 mt-1">{errors.firstname.message}</p>}
                </div>
                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input id="lastname" {...register('lastname', { required: 'Last name is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    {errors.lastname && <p className="text-sm text-red-600 mt-1">{errors.lastname.message}</p>}
                </div>
            </div>

            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input id="username" {...register('username', { required: 'Username is required' })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username.message}</p>}
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input id="email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            {!isEditing && (
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input id="password" type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
                </div>
            )}

            <div className="flex justify-end space-x-4 pt-4">
                <button type="button" onClick={onCancel} disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">{isSubmitting ? 'Saving...' : 'Save Instructor'}</button>
            </div>
        </form>
    );
};

export default InstructorForm;