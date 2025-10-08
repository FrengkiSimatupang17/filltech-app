import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, equipment }) {
    const { data, setData, post, processing, errors } = useForm({
        name: equipment.name || '',
        description: equipment.description || '',
        status: equipment.status || 'available',
        image: null,
        _method: 'put',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.equipment.update', equipment.id));
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Alat</h2>}>
            <Head title="Edit Alat" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                             <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Nama Alat" />
                                    <TextInput id="name" value={data.name} className="mt-1 block w-full" onChange={(e) => setData('name', e.target.value)} />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Deskripsi (Opsional)" />
                                    <textarea id="description" value={data.description} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" onChange={(e) => setData('description', e.target.value)} rows="4"></textarea>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="status" value="Status" />
                                    <select id="status" name="status" value={data.status} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" onChange={(e) => setData('status', e.target.value)}>
                                        <option value="available">Tersedia</option>
                                        <option value="in_use">Sedang Dipinjam</option>
                                        <option value="maintenance">Dalam Perbaikan</option>
                                    </select>
                                </div>
                                <div className="mt-4">
                                    <InputLabel htmlFor="image" value="Ganti Gambar (Opsional)" />
                                    {equipment.image_path && <img src={`/storage/${equipment.image_path}`} alt={equipment.name} className="w-32 h-32 object-cover mt-2 mb-2 rounded" />}
                                    <input type="file" className="mt-1 block w-full text-sm" onChange={e => setData('image', e.target.files[0])} />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>Update</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}