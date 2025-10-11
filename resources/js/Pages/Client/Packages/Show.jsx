import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Show({ auth, 'package': pkg }) {
    const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Detail Paket</h2>}
        >
            <Head title={`Detail Paket - ${pkg.name}`} />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className="text-2xl font-bold text-green-600">{pkg.name}</h1>
                            <p className="text-5xl font-extrabold my-4">{pkg.speed}</p>
                            <p className="text-gray-600 mb-6">{pkg.description || 'Nikmati koneksi internet super cepat dan stabil untuk semua kebutuhan digital Anda.'}</p>
                            
                            <div className="border-t pt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Biaya Berlangganan</span>
                                    <span className="text-2xl font-bold">{formatCurrency(pkg.price)}/bulan</span>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col items-center">
                                <Link href={route('client.subscriptions.payment', pkg.id)} as="button" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 w-full">
                                    Lanjutkan ke Pembayaran
                                </Link>
                                <Link href={route('dashboard')} className="mt-4 text-sm text-gray-500 hover:underline">
                                    Kembali ke Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}