import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, packages }) {
    // We get the flash object from props. It might not exist on every page load.
    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Paket</h2>}
        >
            <Head title="Manajemen Paket" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* THE FIX IS HERE: Use optional chaining 'flash?.success'
                                This safely checks for the success message without crashing.
                            */}
                            {flash?.success && (
                                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                                    <p>{flash.success}</p>
                                </div>
                            )}
                            <div className="flex justify-end mb-4">
                                <Link href={route('admin.packages.create')}>
                                    <PrimaryButton>Tambah Paket</PrimaryButton>
                                </Link>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Paket</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kecepatan</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {packages.map((pkg) => (
                                        <tr key={pkg.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{pkg.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{pkg.speed}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">Rp {Number(pkg.price).toLocaleString('id-ID')}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={route('admin.packages.edit', pkg.id)} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                                <Link href={route('admin.packages.destroy', pkg.id)} method="delete" as="button" className="text-red-600 hover:text-red-900">Hapus</Link>
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