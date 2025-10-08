import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, equipment }) {
    const { flash } = usePage().props;
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Alat</h2>}>
            <Head title="Manajemen Alat" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert"><p>{flash.success}</p></div>)}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end mb-4">
                                <Link href={route('admin.equipment.create')}><PrimaryButton>Tambah Alat</PrimaryButton></Link>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Alat</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {equipment.map((item) => (
                                        <tr key={item.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.image_path ? 
                                                    <img src={`/storage/${item.image_path}`} alt={item.name} className="w-16 h-16 object-cover rounded" /> :
                                                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">No Image</div>
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap align-middle">{item.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap align-middle capitalize">{item.status.replace('_', ' ')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium align-middle">
                                                <Link href={route('admin.equipment.edit', item.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                                <Link href={route('admin.equipment.destroy', item.id)} method="delete" as="button" className="text-red-600 hover:text-red-900">Hapus</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}