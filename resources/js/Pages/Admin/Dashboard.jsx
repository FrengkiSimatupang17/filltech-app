import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Daftarkan komponen-komponen Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Komponen kecil untuk kartu statistik agar kode lebih rapi
const StatCard = ({ title, value, link, className = '' }) => (
    <Link href={link} className={`block p-6 bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow duration-200 ${className}`}>
        <h3 className="text-sm font-medium text-gray-500 truncate">{title}</h3>
        <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
    </Link>
);

export default function Dashboard({ auth, stats, dailyRevenue }) {
    const formatCurrency = (amount) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);

    // Siapkan opsi untuk grafik
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'Pendapatan 30 Hari Terakhir' },
        },
    };

    // Siapkan data untuk grafik
    const chartData = {
        labels: dailyRevenue.map(item => new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })),
        datasets: [
            {
                label: 'Pendapatan',
                data: dailyRevenue.map(item => item.total),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
                    {/* Grid untuk Kartu Statistik */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard 
                            title="Pembayaran Menunggu Verifikasi" 
                            value={stats.pendingPayments} 
                            link={route('admin.invoices.index')}
                            className={stats.pendingPayments > 0 ? 'ring-2 ring-yellow-400' : ''}
                        />
                         <StatCard 
                            title="Tugas Menunggu Penugasan" 
                            value={stats.pendingTasks} 
                            link={route('admin.tasks.index')}
                            className={stats.pendingTasks > 0 ? 'ring-2 ring-blue-400' : ''}
                        />
                        <StatCard 
                            title="Pendapatan (30 Hari)" 
                            value={formatCurrency(stats.totalRevenue)} 
                            link={route('admin.reports.index')}
                        />
                        <StatCard 
                            title="Transaksi Lunas (30 Hari)" 
                            value={stats.totalTransactions} 
                            link={route('admin.reports.index')}
                        />
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