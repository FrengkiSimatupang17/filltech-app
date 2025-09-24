import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, user }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'client',
        phone_number: user.phone_number || '',
        rt: user.rt || '',
        rw: user.rw || '',
        block: user.block || '',
        house_number: user.house_number || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.users.update', user.id));
    };

    const isSuperuser = auth.user.role === 'superuser';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Pengguna: {user.name}</h2>}
        >
            <Head title={`Edit Pengguna - ${user.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                               <div>
                                    <InputLabel htmlFor="name" value="Nama" />
                                    <TextInput id="name" name="name" value={data.name} className="mt-1 block w-full" onChange={(e) => setData('name', e.target.value)} />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput id="email" type="email" name="email" value={data.email} className="mt-1 block w-full" onChange={(e) => setData('email', e.target.value)} />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="phone_number" value="Nomor WhatsApp" />
                                    <TextInput id="phone_number" type="text" name="phone_number" value={data.phone_number} className="mt-1 block w-full" onChange={(e) => setData('phone_number', e.target.value)} />
                                    <InputError message={errors.phone_number} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="role" value="Role" />
                                    <select id="role" name="role" value={data.role} className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm" onChange={(e) => setData('role', e.target.value)}>
                                        <option value="client">Client</option>
                                        <option value="technician">Technician</option>
                                        <option value="admin">Admin</option>
                                        {isSuperuser && <option value="superuser">Superuser</option>}
                                    </select>
                                    <InputError message={errors.role} className="mt-2" />
                                </div>
                                
                                {data.role === 'client' && (
                                     <>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <InputLabel htmlFor="rt" value="RT" />
                                                <TextInput id="rt" type="text" name="rt" value={data.rt} className="mt-1 block w-full" onChange={(e) => setData('rt', e.target.value)} />
                                                <InputError message={errors.rt} className="mt-2" />
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="rw" value="RW" />
                                                <TextInput id="rw" type="text" name="rw" value={data.rw} className="mt-1 block w-full" onChange={(e) => setData('rw', e.target.value)} />
                                                <InputError message={errors.rw} className="mt-2" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <InputLabel htmlFor="block" value="Blok" />
                                                <TextInput id="block" type="text" name="block" value={data.block} className="mt-1 block w-full" onChange={(e) => setData('block', e.target.value)} />
                                                <InputError message={errors.block} className="mt-2" />
                                            </div>
                                            <div>
                                                <InputLabel htmlFor="house_number" value="Nomor Rumah" />
                                                <TextInput id="house_number" type="text" name="house_number" value={data.house_number} className="mt-1 block w-full" onChange={(e) => setData('house_number', e.target.value)} />
                                                <InputError message={errors.house_number} className="mt-2" />
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="flex items-center justify-end mt-4">
                                     <Link href={route('admin.users.index')} className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Batal
                                    </Link>
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