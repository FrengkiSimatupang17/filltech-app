    import { Head, useForm } from '@inertiajs/react';
    import GuestLayout from '@/Layouts/GuestLayout';
    import InputError from '@/Components/InputError';
    import InputLabel from '@/Components/InputLabel';
    import PrimaryButton from '@/Components/PrimaryButton';
    import TextInput from '@/Components/TextInput';

    export default function CompleteRegistration() {
        const { data, setData, post, processing, errors } = useForm({
            phone_number: '',
            rt: '',
            rw: '',
            block: '',
            house_number: '',
        });

        const submit = (e) => {
            e.preventDefault();
            post(route('register.complete'));
        };

        return (
            <GuestLayout>
                <Head title="Lengkapi Pendaftaran" />
                <div className="mb-4 text-sm text-gray-600">
                    Selamat datang! Tinggal satu langkah lagi. Mohon lengkapi detail alamat Anda untuk melanjutkan.
                </div>
                <form onSubmit={submit}>
                    <div className="mt-4">
                        <InputLabel htmlFor="phone_number" value="Nomor WhatsApp" />
                        <TextInput id="phone_number" type="text" name="phone_number" value={data.phone_number} className="mt-1 block w-full" onChange={(e) => setData('phone_number', e.target.value)} required />
                        <InputError message={errors.phone_number} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <InputLabel htmlFor="rt" value="RT" />
                            <TextInput id="rt" type="text" name="rt" value={data.rt} className="mt-1 block w-full" onChange={(e) => setData('rt', e.target.value)} required />
                            <InputError message={errors.rt} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="rw" value="RW" />
                            <TextInput id="rw" type="text" name="rw" value={data.rw} className="mt-1 block w-full" onChange={(e) => setData('rw', e.target.value)} required />
                            <InputError message={errors.rw} className="mt-2" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <InputLabel htmlFor="block" value="Blok" />
                            <TextInput id="block" type="text" name="block" value={data.block} className="mt-1 block w-full" onChange={(e) => setData('block', e.target.value)} required />
                            <InputError message={errors.block} className="mt-2" />
                        </div>
                        <div>
                            <InputLabel htmlFor="house_number" value="Nomor Rumah" />
                            <TextInput id="house_number" type="text" name="house_number" value={data.house_number} className="mt-1 block w-full" onChange={(e) => setData('house_number', e.target.value)} required />
                            <InputError message={errors.house_number} className="mt-2" />
                        </div>
                    </div>
                    
                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton disabled={processing}>
                            Simpan & Lanjutkan
                        </PrimaryButton>
                    </div>
                </form>
            </GuestLayout>
        );
    }