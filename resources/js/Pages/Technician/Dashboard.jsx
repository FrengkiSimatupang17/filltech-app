import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react'; // <-- Tambahkan 'router'
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Dashboard({ auth, tasks }) {
    const { flash } = usePage().props;
    
    // Form ini HANYA untuk aksi "Selesai" yang butuh upload file
    const { data, setData, post: postCompletion, processing: postProcessing, errors } = useForm({
        status: 'completed',
        proof_photo: null,
    });

    const [completingTaskId, setCompletingTaskId] = useState(null);

    // FUNGSI INI KITA PERBAIKI SECARA TOTAL
    const handleStartTask = (task) => {
        // Gunakan router.post secara langsung untuk aksi sederhana
        router.post(route('technician.tasks.update-status', { task: task.id }), {
            status: 'in_progress', // Kirim data status di sini
        }, {
            preserveScroll: true, // Opsi untuk tidak scroll ke atas
        });
    };
    
    const submitCompletion = (e, task) => {
        e.preventDefault();
        postCompletion(route('technician.tasks.update-status', { task: task.id }), {
            onSuccess: () => setCompletingTaskId(null),
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Teknisi</h2>}
        >
            <Head title="Dashboard Teknisi" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                            <p>{flash.success}</p>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium">Daftar Tugas Anda</h3>
                            <div className="mt-4 space-y-4">
                                {tasks.length > 0 ? (
                                    tasks.map((task) => (
                                        <div key={task.id} className="p-4 border rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="font-bold text-lg">{task.title}</p>
                                                    <p className="text-sm text-gray-600">Klien: {task.client.name}</p>
                                                    <p className="text-sm text-gray-600">No. HP: {task.client.phone_number}</p>
                                                    <p className="text-sm text-gray-600">Alamat: RT {task.client.rt}/RW {task.client.rw}, Blok {task.client.block} No. {task.client.house_number}</p>
                                                </div>
                                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 capitalize">
                                                    {task.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                            <div className="mt-4 flex space-x-2 justify-end">
                                                {task.status === 'assigned' && (
                                                    // Kita tidak perlu 'disabled' di sini karena router Inertia punya state loading global
                                                    <PrimaryButton onClick={() => handleStartTask(task)}>
                                                        Mulai Kerjakan
                                                    </PrimaryButton>
                                                )}
                                                {task.status === 'in_progress' && (
                                                    <PrimaryButton onClick={() => setCompletingTaskId(task.id)} className="bg-green-600 hover:bg-green-700">
                                                        Selesai
                                                    </PrimaryButton>
                                                )}
                                            </div>
                                            
                                            {completingTaskId === task.id && (
                                                <form onSubmit={(e) => submitCompletion(e, task)} className="mt-4 border-t pt-4">
                                                    <InputLabel htmlFor="proof_photo" value="Unggah Bukti Foto Pemasangan" />
                                                    <input 
                                                        type="file" 
                                                        className="mt-1 block w-full text-sm"
                                                        onChange={e => setData('proof_photo', e.target.files[0])} 
                                                    />
                                                    <InputError message={errors.proof_photo} className="mt-2" />
                                                    <div className="mt-2 flex justify-end space-x-2">
                                                        <button type="button" onClick={() => setCompletingTaskId(null)} className="text-sm text-gray-600">Batal</button>
                                                        <PrimaryButton disabled={postProcessing}>Kirim & Selesaikan</PrimaryButton>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>Tidak ada tugas yang ditugaskan untuk Anda saat ini.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}