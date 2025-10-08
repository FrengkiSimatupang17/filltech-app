import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        image: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.equipment.store'));
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Alat Baru</h2>}>
            <Head title="Tambah Alat" />
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
                                    <InputLabel htmlFor="image" value="Gambar Alat" />
                                    <input type="file" className="mt-1 block w-full text-sm" onChange={e => setData('image', e.target.files[0])} />
                                    <InputError message={errors.image} className="mt-2" />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>Simpan</PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}