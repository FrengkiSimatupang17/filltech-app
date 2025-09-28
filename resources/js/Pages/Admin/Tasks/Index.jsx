import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, tasks, technicians }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        technician_id: '',
    });

    const assignTask = (e, taskId) => {
        e.preventDefault();
        post(route('admin.tasks.assign', taskId), {
            onSuccess: () => reset('technician_id'),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Tugas</h2>}
        >
            <Head title="Manajemen Tugas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                            <p>{flash.success}</p>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                             <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul & Tipe Tugas</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Klien</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teknisi & Bukti</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tasks.map((task) => (
                                        <tr key={task.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                                <div className="text-sm text-gray-500">
                                                    {task.type === 'installation' ? 'Pemasangan Baru' : 'Perbaikan'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{task.client.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800 capitalize">
                                                    {task.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {task.technician?.name || '-'}
                                                {task.proof_path && (
                                                    <a
                                                        href={`/storage/${task.proof_path}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="ml-2 text-sm text-blue-600 hover:underline"
                                                    >
                                                        (Lihat Bukti)
                                                    </a>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {task.status === 'pending' && (
                                                    <form onSubmit={(e) => assignTask(e, task.id)} className="flex items-center space-x-2 justify-center">
                                                        <select
                                                            className="block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm text-sm"
                                                            onChange={(e) => setData('technician_id', e.target.value)}
                                                            defaultValue=""
                                                        >
                                                            <option value="" disabled>Pilih Teknisi</option>
                                                            {technicians.map(tech => (
                                                                <option key={tech.id} value={tech.id}>{tech.name}</option>
                                                            ))}
                                                        </select>
                                                        <PrimaryButton disabled={processing || !data.technician_id}>Assign</PrimaryButton>
                                                    </form>
                                                )}
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