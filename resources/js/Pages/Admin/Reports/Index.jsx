import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, reports, filters }) {
    const [dateRange, setDateRange] = useState({
        start_date: filters.start_date,
        end_date: filters.end_date,
    });

    const handleDateChange = (e) => {
        setDateRange(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const applyFilter = () => {
        router.get(route('admin.reports.index'), dateRange, {
            preserveState: true,
            replace: true,
        });
    };

    const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Laporan Pendapatan</h2>}
        >
            <Head title="Laporan Pendapatan" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Filter Tanggal */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="flex items-center space-x-4">
                            <div>
                                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Tanggal Mulai</label>
                                <input type="date" name="start_date" id="start_date" value={dateRange.start_date} onChange={handleDateChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                            </div>
                            <div>
                                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">Tanggal Akhir</label>
                                <input type="date" name="end_date" id="end_date" value={dateRange.end_date} onChange={handleDateChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"/>
                            </div>
                            <div className="pt-5">
                                <PrimaryButton onClick={applyFilter}>Filter</PrimaryButton>
                            </div>
                        </div>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-sm font-medium text-gray-500">Total Pendapatan</h3>
                            <p className="mt-1 text-3xl font-semibold text-gray-900">{formatCurrency(reports.totalRevenue)}</p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-sm font-medium text-gray-500">Total Transaksi Lunas</h3>
                            <p className="mt-1 text-3xl font-semibold text-gray-900">{reports.totalTransactions}</p>
                        </div>
                    </div>

                    {/* Grid untuk dua tabel */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Tabel Pendapatan per Paket */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Pendapatan per Paket</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Paket</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {reports.revenueByPackage.map((item) => (
                                            <tr key={item.name}>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">{formatCurrency(item.total)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* TABEL BARU: Pendapatan per Lokasi */}
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Pendapatan per Lokasi</h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RW</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RT</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {reports.revenueByLocation.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.rw}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{item.rt}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">{formatCurrency(item.total)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}