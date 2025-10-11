import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';

// Komponen untuk form pembayaran (tidak berubah)
const PaymentForm = ({ invoice, closeModal }) => {
    const { data, setData, post, processing, errors } = useForm({
        payment_proof: null,
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('client.invoices.pay', invoice.id), {
            onSuccess: () => closeModal(),
        });
    };
    return (
        <div className="mt-4 border-t pt-4">
            <form onSubmit={submit}>
                <InputLabel htmlFor="payment_proof" value="Unggah Bukti Transfer (JPG, PNG)" />
                <input
                    type="file"
                    className="mt-1 block w-full text-sm"
                    onChange={(e) => setData('payment_proof', e.target.files[0])}
                />
                <InputError message={errors.payment_proof} className="mt-2" />
                <div className="mt-4 flex justify-end space-x-2">
                    <button type="button" onClick={closeModal} className="text-sm text-gray-600">Batal</button>
                    <PrimaryButton disabled={processing || !data.payment_proof}>Kirim Bukti</PrimaryButton>
                </div>
            </form>
        </div>
    );
};

// Komponen untuk form aduan (tidak berubah)
const ComplaintForm = () => {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        description: '',
    });
    const submit = (e) => {
        e.preventDefault();
        post(route('client.complaints.store'), {
            preserveScroll: true,
            onSuccess: () => setData('description', ''),
        });
    };
    return (
        <section>
            <header>
                <h3 className="text-lg font-medium text-gray-900">Laporkan Kendala</h3>
                <p className="mt-1 text-sm text-gray-600">
                    Jika Anda mengalami gangguan koneksi atau kendala lainnya, silakan jelaskan di bawah ini.
                </p>
            </header>
            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="description" value="Deskripsi Kendala" />
                    <textarea
                        id="description"
                        className="mt-1 block w-full border-gray-300 focus:border-green-500 focus:ring-green-500 rounded-md shadow-sm"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        rows="4"
                    ></textarea>
                    <InputError message={errors.description} className="mt-2" />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Kirim Aduan</PrimaryButton>
                    {recentlySuccessful && <p className="text-sm text-gray-600">Aduan terkirim.</p>}
                </div>
            </form>
        </section>
    );
};

// PERUBAHAN DI SINI: Komponen daftar paket dibuat lebih ringkas
const PackageList = ({ packages, activeSubscription }) => {
    const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
                <h3 className="text-lg font-medium text-gray-900">Paket WiFi Tersedia</h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {packages.map(pkg => (
                        <div key={pkg.id} className="border rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow duration-200">
                            <h4 className="font-bold text-green-600">{pkg.name}</h4>
                            <p className="text-3xl font-bold my-2 text-gray-800">{pkg.speed}</p>
                            <div className="flex justify-between items-center mt-auto pt-4 border-t">
                                <p className="text-xl font-semibold text-gray-800">{formatCurrency(pkg.price)}<span className="text-sm font-normal text-gray-500">/bln</span></p>
                                {!activeSubscription && (
                                    <Link 
                                        href={route('client.packages.show', pkg.id)} 
                                        className="inline-flex items-center px-3 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                                    >
                                        Lihat Detail
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Komponen Utama Dashboard Klien
export default function Dashboard({ auth, activeSubscription, invoices = [], packages = [] }) {
    const { flash } = usePage().props;
    const [payingInvoiceId, setPayingInvoiceId] = useState(null);

    const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard Klien</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {flash?.success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
                            <p>{flash.success}</p>
                        </div>
                    )}
                     {flash?.error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                            <p>{flash.error}</p>
                        </div>
                    )}
                    
                    {activeSubscription ? (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900">Paket Aktif Anda</h3>
                            <p className="mt-1 text-2xl font-bold text-green-600">{activeSubscription.package.name}</p>
                            <p className="text-gray-600">{activeSubscription.package.speed}</p>
                        </div>
                    ) : (
                         <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900">Anda belum memiliki paket aktif.</h3>
                         </div>
                    )}

                    <PackageList packages={packages} activeSubscription={activeSubscription} />

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-medium text-gray-900">Riwayat Tagihan</h3>
                            <div className="mt-4 flow-root">
                                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                        <table className="min-w-full divide-y divide-gray-300">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nomor Tagihan</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Jumlah</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Jatuh Tempo</th>
                                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0"><span className="sr-only">Aksi</span></th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {invoices.map((invoice) => {
                                                    const hasPendingPayment = invoice.payments.some(p => p.status === 'pending_verification');
                                                    return (
                                                        <tr key={invoice.id}>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{invoice.invoice_number}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatCurrency(invoice.amount)}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(invoice.due_date)}</td>
                                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                                                    invoice.status === 'paid' ? 'bg-green-50 text-green-700 ring-green-600/20' : 
                                                                    hasPendingPayment ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
                                                                    'bg-red-50 text-red-700 ring-red-600/20'
                                                                } ring-1 ring-inset`}>
                                                                    {hasPendingPayment ? 'Menunggu Verifikasi' : invoice.status}
                                                                </span>
                                                            </td>
                                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                                <a href={route('client.invoices.show', invoice.id)} target="_blank" className="text-gray-600 hover:text-gray-900 mr-4">
                                                                    Download
                                                                </a>
                                                                {invoice.status === 'pending' && !hasPendingPayment && (
                                                                    <button onClick={() => setPayingInvoiceId(invoice.id)} className="text-green-600 hover:text-green-900">
                                                                        Bayar
                                                                    </button>
                                                                )}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>

                                        {invoices.find(inv => inv.id === payingInvoiceId) && (
                                            <PaymentForm 
                                                invoice={invoices.find(inv => inv.id === payingInvoiceId)} 
                                                closeModal={() => setPayingInvoiceId(null)}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                     <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ComplaintForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

