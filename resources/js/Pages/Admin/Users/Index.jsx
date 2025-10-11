import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, users }) {
    const { flash } = usePage().props;
    const loggedInUser = auth.user;

    return (
        <AuthenticatedLayout
            user={loggedInUser}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Pengguna</h2>}
        >
            <Head title="Manajemen Pengguna" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
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
                                                    <div className="text-sm text-gray-900">{user.email}</div>
                                                    <div className="text-sm text-gray-500">{user.phone_number}</div>
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
                                                        <Link
                                                        href={route('admin.client-subscriptions.create', user.id)}
                                                        className="text-white bg-indigo-600 hover:bg-indigo-700 font-bold py-2 px-4 rounded"
                                                        >
                                                            Buat Langganan
                                                        </Link>
                                                    )}

                                                    {(loggedInUser.role === 'superuser' || user.role !== 'superuser') && (
                                                        <Link
                                                        href={route('admin.users.edit', user.id)}
                                                        className="text-indigo-600 hover:text-indigo-900 ml-4"
                                                        >
                                                            Edit
                                                            </Link>
                                                    )}

                                                    {(loggedInUser.role === 'superuser' || (loggedInUser.role === 'admin' && user.role !== 'admin' && user.role !== 'superuser')) && user.id !== loggedInUser.id && (
                                                        <Link
                                                        href={route('admin.users.destroy', user.id)}
                                                        method="delete"
                                                        as="button"
                                                        onBefore={() => confirm('Anda yakin ingin menghapus pengguna ini?')}
                                                        className="text-red-600 hover:text-red-900 ml-4"
                                                        >
                                                            Hapus
                                                        </Link>
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
        </AuthenticatedLayout>
    );
}