import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Daftarkan komponen-komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({ auth, stats, dailyRevenue }) {
    const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    // Siapkan data untuk grafik
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Pendapatan 30 Hari Terakhir' },
        },
    };

    const chartData = {
        labels: dailyRevenue.map(item => new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })),
        datasets: [
            {
                label: 'Pendapatan',
                data: dailyRevenue.map(item => item.total),
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-sm font-medium text-gray-500">Total Pendapatan (30 Hari)</h3>
                            <p className="mt-1 text-3xl font-semibold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                        </div>
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-sm font-medium text-gray-500">Transaksi Lunas (30 Hari)</h3>
                            <p className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalTransactions}</p>
                        </div>
                    </div>
                    
                    {/* Grafik Pendapatan Harian */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                             <Bar options={chartOptions} data={chartData} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}