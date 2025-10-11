import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Payment({ auth, 'package': pkg, bankDetails }) {
    const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Instruksi Pembayaran</h2>}
        >
            <Head title="Instruksi Pembayaran" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 text-gray-900">
                        <h1 className="text-xl font-bold text-center">Langkah Terakhir: Pembayaran</h1>
                        <p className="text-center text-gray-600 mt-2">Silakan lakukan transfer untuk pembayaran pertama paket <span className="font-bold">{pkg.name}</span>.</p>
                        
                        <div className="mt-6 text-center bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-500">Total Pembayaran</p>
                            <p className="text-4xl font-extrabold text-green-600 tracking-tight">{formatCurrency(pkg.price)}</p>
                        </div>
                        
                        <div className="mt-6 border-t pt-6">
                            <h3 className="font-semibold">Transfer ke Rekening Berikut:</h3>
                            <dl className="mt-2 divide-y divide-gray-200">
                                <div className="py-3 flex justify-between text-sm">
                                    <dt className="text-gray-500">Bank</dt>
                                    <dd className="text-gray-900 font-medium">{bankDetails.bank_name}</dd>
                                </div>
                                <div className="py-3 flex justify-between text-sm">
                                    <dt className="text-gray-500">Nomor Rekening</dt>
                                    <dd className="text-gray-900 font-medium">{bankDetails.account_number}</dd>
                                </div>
                                <div className="py-3 flex justify-between text-sm">
                                    <dt className="text-gray-500">Atas Nama</dt>
                                    <dd className="text-gray-900 font-medium">{bankDetails.account_name}</dd>
                                </div>
                            </dl>
                        </div>

                        <div className="mt-6 text-xs text-gray-500">
                            <p><span className="font-bold">Penting:</span> Setelah melakukan transfer, klik tombol di bawah ini. Tagihan Anda akan muncul di dashboard dan Anda dapat mengunggah bukti transfer di sana.</p>
                        </div>

                        <div className="mt-6">
                            <Link 
                                href={route('client.subscriptions.store')} 
                                method="post" 
                                data={{ package_id: pkg.id }}
                                as="button" 
                                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                                onBefore={() => confirm('Pastikan Anda sudah siap untuk melakukan transfer. Tagihan akan dibuat setelah ini. Lanjutkan?')}
                            >
                                Saya Akan Transfer, Buat Tagihan Saya
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}