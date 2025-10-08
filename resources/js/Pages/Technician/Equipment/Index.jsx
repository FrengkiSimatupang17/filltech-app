import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Index({ auth, availableEquipment, myBorrowedEquipment }) {
    const { flash } = usePage().props;
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Peminjaman Alat</h2>}
        >
            <Head title="Peminjaman Alat" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash?.success && (<div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert"><p>{flash.success}</p></div>)}
                    {flash?.error && (<div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert"><p>{flash.error}</p></div>)}

                    {/* ALAT YANG SAYA PINJAM */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium">Alat yang Sedang Anda Pinjam</h3>
                            <div className="mt-4">
                                {myBorrowedEquipment.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {myBorrowedEquipment.map(item => (
                                            <li key={item.id} className="py-4 flex justify-between items-center">
                                                <div className="flex items-center space-x-4">
                                                    <img src={item.image_path ? `/storage/${item.image_path}` : 'https://via.placeholder.com/150'} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                                    <span>{item.name}</span>
                                                </div>
                                                <Link href={route('technician.equipment.return', item.id)} method="post" as="button" className="text-white bg-blue-600 hover:bg-blue-700 font-bold py-2 px-3 rounded text-sm">Kembalikan</Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p className="text-sm text-gray-500">Anda tidak sedang meminjam alat apapun.</p>}
                            </div>
                        </div>
                    </div>

                    {/* ALAT YANG TERSEDIA */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium">Alat yang Tersedia</h3>
                             <div className="mt-4">
                                {availableEquipment.length > 0 ? (
                                    <ul className="divide-y divide-gray-200">
                                        {availableEquipment.map(item => (
                                            <li key={item.id} className="py-4 flex justify-between items-center">
                                                <div className="flex items-center space-x-4">
                                                    <img src={item.image_path ? `/storage/${item.image_path}` : 'https://via.placeholder.com/150'} alt={item.name} className="w-12 h-12 object-cover rounded" />
                                                    <span>{item.name}</span>
                                                </div>
                                                <Link href={route('technician.equipment.borrow', item.id)} method="post" as="button" className="text-white bg-green-600 hover:bg-green-700 font-bold py-2 px-3 rounded text-sm">Pinjam</Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : <p className="text-sm text-gray-500">Tidak ada alat yang tersedia saat ini.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}