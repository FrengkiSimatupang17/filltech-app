import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, logs }) {
    const formatDate = (dateString) => new Date(dateString).toLocaleString('id-ID');

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Log Aktivitas Sistem</h2>}
        >
            <Head title="Log Aktivitas" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Waktu</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pengguna</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {logs.data.map((log) => (
                                        <tr key={log.id} className="bg-white border-b">
                                            <td className="px-6 py-4 text-sm text-gray-500">{formatDate(log.created_at)}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">{log.causer?.name || 'Sistem'}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {`User ${log.causer?.name || 'Sistem'} ${log.description} pada ${log.subject_type.split('\\').pop()} #${log.subject_id}`}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Tambahkan Navigasi Paginasi di sini jika diperlukan */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}