import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Dashboard({ auth, tasks }) {
    const { flash } = usePage().props;
    const { patch, processing: patchProcessing } = useForm();
    
    // Form baru untuk handle upload file
    const { data, setData, post, processing: postProcessing, errors } = useForm({
        status: 'completed',
        proof_photo: null,
    });

    const [completingTaskId, setCompletingTaskId] = useState(null);

    const handleStartTask = (task) => {
        patch(route('technician.tasks.update-status', { task: task.id, status: 'in_progress' }), {
            preserveScroll: true,
        });
    };
    
    const submitCompletion = (e, task) => {
        e.preventDefault();
        // Gunakan 'post' karena kita mengirim file
        post(route('technician.tasks.update-status', { task: task.id }), {
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
                                            {/* ... Detail tugas tetap sama ... */}
                                            <div className="mt-4 flex space-x-2 justify-end">
                                                {task.status === 'assigned' && (
                                                    <PrimaryButton onClick={() => handleStartTask(task)} disabled={patchProcessing}>
                                                        Mulai Kerjakan
                                                    </PrimaryButton>
                                                )}
                                                {task.status === 'in_progress' && (
                                                    <PrimaryButton onClick={() => setCompletingTaskId(task.id)} className="bg-green-600 hover:bg-green-700">
                                                        Selesai
                                                    </PrimaryButton>
                                                )}
                                            </div>
                                            
                                            {/* FORM UPLOAD MUNCUL DI SINI */}
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