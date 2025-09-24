import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, 'package': pkg }) {
    const { data, setData, put, processing, errors } = useForm({
        name: pkg.name || '',
        price: pkg.price || '',
        speed: pkg.speed || '',
        description: pkg.description || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.packages.update', pkg.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Paket</h2>}
        >
            <Head title="Edit Paket" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="name" value="Nama Paket" />
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="price" value="Harga (Rp)" />
                                    <TextInput
                                        id="price"
                                        type="number"
                                        name="price"
                                        value={data.price}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('price', e.target.value)}
                                    />
                                    <InputError message={errors.price} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="speed" value="Kecepatan (Contoh: 20 Mbps)" />
                                    <TextInput
                                        id="speed"
                                        name="speed"
                                        value={data.speed}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('speed', e.target.value)}
                                    />
                                    <InputError message={errors.speed} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="description" value="Deskripsi (Opsional)" />
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows="4"
                                    ></textarea>
                                    <InputError message={errors.description} className="mt-2" />
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing}>
                                        Update
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}