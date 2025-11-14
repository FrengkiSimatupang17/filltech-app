import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import Modal from '@/Components/Modal';
import { useState } from 'react';

export default function Index({ auth, users }) {
    const { flash } = usePage().props;
    const loggedInUser = auth.user;

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const { delete: destroy, processing } = useForm();

    const openDeleteModal = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('admin.users.destroy', userToDelete.id), {
            preserveScroll: true,
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <AuthenticatedLayout
            user={loggedInUser}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Pengguna</h2>}
        >
            <Head title="Manajemen Pengguna" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                            <p>{flash.success}</p>
                        </div>
                    )}
                     {flash?.error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            <p>{flash.error}</p>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end mb-4">
                                <Link href={route('admin.users.create')}>
                                    <PrimaryButton>Tambah Pengguna</PrimaryButton>
                                </Link>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kontak</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status Langganan</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map((user) => {
                                        const hasActiveSubscription = user.subscriptions && user.subscriptions.some(sub => sub.status !== 'cancelled');
                                        
                                        return (
                                            <tr key={user.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{user.email || user.unique_id}</div>
                                                    <div className="text-sm text-gray-500">{user.phone_number || 'No HP'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {user.role === 'client' ? (
                                                        hasActiveSubscription ? (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                                Berlangganan
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                                Belum Berlangganan
                                                            </span>
                                                        )
                                                    ) : (
                                                        <span className="font-medium capitalize">{user.role}</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    {user.role === 'client' && !hasActiveSubscription && (
                                                        <Link href={route('admin.client-subscriptions.create', user.id)} className="text-white bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded">
                                                            Buat Langganan
                                                        </Link>
                                                    )}

                                                    {(loggedInUser.role === 'superuser' || user.role !== 'superuser') && (
                                                        <Link href={route('admin.users.edit', user.id)} className="text-indigo-600 hover:text-indigo-900 ml-4">
                                                            Edit
                                                        </Link>
                                                    )}

                                                    {(loggedInUser.role === 'superuser' || (loggedInUser.role === 'admin' && user.role !== 'admin' && user.role !== 'superuser')) && user.id !== loggedInUser.id && (
                                                        <button 
                                                            onClick={() => openDeleteModal(user)}
                                                            className="text-red-600 hover:text-red-900 ml-4"
                                                            disabled={processing}
                                                        >
                                                            Hapus
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={showDeleteModal} onClose={closeDeleteModal} maxWidth="sm">
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Yakin ingin menghapus pengguna ini?
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Anda akan menghapus: <span className="font-medium">{userToDelete?.name}</span>.
                        Aksi ini akan menyembunyikan data pengguna (Soft Delete) namun tidak menghapus riwayat tagihan terkait.
                    </p>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeDeleteModal}>Batal</SecondaryButton>
                        <PrimaryButton className="ms-3 bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:ring-red-500" disabled={processing}>
                            Ya, Hapus Pengguna
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>

        </AuthenticatedLayout>
    );
}