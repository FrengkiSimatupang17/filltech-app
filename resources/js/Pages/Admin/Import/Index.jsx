import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        file: null,
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.import.store'));
    }

    return (
        <AuthenticatedLayout 
            user={auth.user} 
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Import Pelanggan</h2>}
        >
            <Head title="Import Pelanggan" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium mb-2">Unggah File Excel</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Pastikan file Anda memiliki kolom: `name`, `unique_id`, `package_name`, `rt`, `rw`, `block`, `house_number`. (Email & HP opsional).
                            </p>
                            <form onSubmit={submit}>
                                <input 
                                    type="file" 
                                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" 
                                    onChange={e => setData('file', e.target.files[0])} 
                                />
                                <InputError message={errors.file} className="mt-2" />
                                <div className="flex items-center justify-end mt-4">
                                    <PrimaryButton className="ms-4" disabled={processing || !data.file}>
                                        Import
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