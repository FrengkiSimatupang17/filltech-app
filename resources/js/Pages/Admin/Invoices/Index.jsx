import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Index({ auth, invoices }) {
    const { flash } = usePage().props;
    const { post, processing } = useForm();

    const approve = (paymentId) => {
        if (confirm('Anda yakin ingin menyetujui pembayaran ini?')) {
            post(route('admin.payments.approve', paymentId), {
                preserveScroll: true,
            });
        }
    };

    const reject = (paymentId) => {
        const reason = prompt('Masukkan alasan penolakan (wajib diisi):');
        if (reason) {
            post(route('admin.payments.reject', paymentId), {
                data: { rejection_reason: reason },
                preserveScroll: true,
            });
        }
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Manajemen Tagihan</h2>}
        >
            <Head title="Manajemen Tagihan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash?.success && (
                        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
                            <p>{flash.success}</p>
                        </div>
                    )}
                     {flash?.error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                            <p>{flash.error}</p>
                        </div>
                    )}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                             <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Klien</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {invoices.map((invoice) => {
                                        const pendingPayment = invoice.payments.find(p => p.status === 'pending_verification');
                                        return (
                                            <tr key={invoice.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {/* PERBAIKAN DI SINI */}
                                                    <div className="text-sm font-medium text-gray-900">{invoice.user?.name || 'User Dihapus'}</div>
                                                    <div className="text-sm text-gray-500">{invoice.invoice_number}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(invoice.amount)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                                                        invoice.status === 'paid' ? 'bg-green-50 text-green-700 ring-green-600/20' : 
                                                        pendingPayment ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
                                                        'bg-red-50 text-red-700 ring-red-600/20'
                                                    } ring-1 ring-inset`}>
                                                        {pendingPayment ? 'Menunggu Verifikasi' : invoice.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                                    {pendingPayment && (
                                                        <>
                                                            <a href={`/storage/${pendingPayment.proof_path}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-900">
                                                                Lihat Bukti
                                                            </a>
                                                            <button onClick={() => approve(pendingPayment.id)} className="text-green-600 hover:text-green-900" disabled={processing}>
                                                                Approve
                                                            </button>
                                                            <button onClick={() => reject(pendingPayment.id)} className="text-red-600 hover:text-red-900" disabled={processing}>
                                                                Reject
                                                            </button>
                                                        </>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
