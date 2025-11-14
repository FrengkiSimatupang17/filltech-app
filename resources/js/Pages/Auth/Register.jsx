import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone_number: '',
        address: '',
        rt: '',
        rw: '',
        block: '',
        house_number: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" />
                    <TextInput id="name" name="name" value={data.name} className="mt-1 block w-full" autoComplete="name" isFocused={true} onChange={(e) => setData('name', e.target.value)} required />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput id="email" type="email" name="email" value={data.email} className="mt-1 block w-full" autoComplete="username" onChange={(e) => setData('email', e.target.value)} required />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone_number" value="Nomor WhatsApp" />
                    <TextInput id="phone_number" type="text" name="phone_number" value={data.phone_number} className="mt-1 block w-full" autoComplete="tel" onChange={(e) => setData('phone_number', e.target.value)} required />
                    <InputError message={errors.phone_number} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="address" value="Alamat Lengkap (Opsional)" />
                    <textarea
                        id="address"
                        name="address"
                        value={data.address}
                        className="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm"
                        onChange={(e) => setData('address', e.target.value)}
                        rows="3"
                    ></textarea>
                    <InputError message={errors.address} className="mt-2" />
                </div>

                <div className="mt-2">
                    <p className="text-sm text-gray-600">Detail Alamat (Wajib untuk ID Pelanggan)</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-2">
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

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput id="password" type="password" name="password" value={data.password} className="mt-1 block w-full" autoComplete="new-password" onChange={(e) => setData('password', e.target.value)} required />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput id="password_confirmation" type="password" name="password_confirmation" value={data.password_confirmation} className="mt-1 block w-full" autoComplete="new-password" onChange={(e) => setData('password_confirmation', e.target.value)} required />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                
                <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                    <p className="text-center font-semibold mx-4 mb-0">Atau</p>
                </div>

                <a href={route('socialite.redirect', 'google')} className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><path fill="#4285F4" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#34A853" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v8.51h12.8c-.57 3.32-2.31 6.12-4.96 7.96l7.98 6.19C45.27 38.91 48 32.16 48 24.55z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#EA4335" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.98-6.19c-2.11 1.45-4.84 2.31-7.91 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path><path fill="none" d="M0 0h48v48H0z"></path></svg>
                    Daftar dengan Google
                </a>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}