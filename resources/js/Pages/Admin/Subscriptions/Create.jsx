import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Create({ auth, client, packages }) {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        user_id: client.id,
        package_id: '',
    });

    // --- BARIS DEBUGGING DIMULAI DI SINI ---
    console.log("PROPS PACKAGES YANG DITERIMA:", packages);
    console.log("STATE FORM SAAT INI:", data);
    // --- BARIS DEBUGGING SELESAI ---

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.client-subscriptions.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Langganan untuk: {client.name}</h2>}
        >
            <Head title="Buat Langganan" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    {flash?.error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            <p className="font-bold">Terjadi Kesalahan</p>
                            <p>{flash.error}</p>
                        </div>
                    )}

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="package_id" value="Pilih Paket WiFi" />
                                    <select
                                        id="package_id"
                                        name="package_id"
                                        value={data.package_id}
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        onChange={(e) => setData('package_id', e.target.value)}
                                    >
                                        <option value="">-- Pilih Paket --</option>
                                        {packages.map(pkg => (
                                            <option key={pkg.id} value={pkg.id}>
                                                {pkg.name} ({pkg.speed})
                                            </option>
                                        ))}
                                    </select>
                                    <InputError message={errors.package_id} className="mt-2" />
                                </div>
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing || !data.package_id}>
                                        Buat Langganan & Tugas
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