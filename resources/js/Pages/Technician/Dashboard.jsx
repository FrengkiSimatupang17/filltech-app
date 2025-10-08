import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router, Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

export default function Dashboard({ auth, tasks, todaysAttendance }) {
    const { flash } = usePage().props;
    
    // Form ini untuk aksi "Selesai" yang butuh upload file
    const { data, setData, post: postCompletion, processing: postProcessing, errors } = useForm({
        status: 'completed',
        proof_photo: null,
    });

    const [completingTaskId, setCompletingTaskId] = useState(null);

    const handleStartTask = (task) => {
        router.post(route('technician.tasks.update-status', { task: task.id }), {
            status: 'in_progress',
        }, {
            preserveScroll: true,
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
                    {flash?.error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            <p>{flash.error}</p>
                        </div>
                    )}

                    {/* KARTU ABSENSI DENGAN QR CODE */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
                        <div className="p-6 text-gray-900 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-medium">Absensi Hari Ini</h3>
                                <p className="text-sm text-gray-500">
                                    {todaysAttendance && todaysAttendance.clock_in ? 
                                     `Anda Clock-In pada: ${new Date(todaysAttendance.clock_in).toLocaleTimeString('id-ID')}` : 
                                     'Anda belum melakukan Clock-In hari ini.'}
                                </p>
                                {todaysAttendance && todaysAttendance.clock_out && (
                                    <p className="text-sm text-green-600">
                                        Anda sudah Clock-Out hari ini pada: {new Date(todaysAttendance.clock_out).toLocaleTimeString('id-ID')}
                                    </p>
                                )}
                            </div>
                            <div>
                                {!todaysAttendance && (
                                    <Link href={route('technician.attendance.scanner')} as="button" className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                        Clock In
                                    </Link>
                                )}
                                {todaysAttendance && !todaysAttendance.clock_out && (
                                    <Link href={route('technician.attendance.scanner')} as="button" className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150">
                                        Clock Out
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

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