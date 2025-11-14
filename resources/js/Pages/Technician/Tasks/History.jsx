import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function History({ auth, completedTasks }) {
    const formatDate = (dateString) => new Date(dateString).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Riwayat Tugas Selesai</h2>}
        >
            <Head title="Riwayat Tugas" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Selesai</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Judul Tugas</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Klien</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bukti</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {completedTasks.data.map((task) => (
                                        <tr key={task.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(task.completed_at)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.client?.name || 'N/A'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                {task.proof_path ? (
                                                    <a href={`/storage/${task.proof_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                        Lihat Foto
                                                    </a>
                                                ) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Tambahkan Navigasi Paginasi jika diperlukan */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}