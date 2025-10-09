<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth()->toDateString());

        $query = Invoice::where('invoices.status', 'paid')
            ->whereBetween('paid_at', [$startDate, Carbon::parse($endDate)->endOfDay()]);

        // 1. Total Pendapatan
        $totalRevenue = (clone $query)->sum('amount');
        // 2. Jumlah Transaksi Lunas
        $totalTransactions = (clone $query)->count();
        // 3. Pendapatan Harian (untuk chart)
        $dailyRevenue = (clone $query)->groupBy('date')->orderBy('date')->get([
            DB::raw('DATE(paid_at) as date'),
            DB::raw('SUM(amount) as total')
        ]);
        // 4. Pendapatan per Paket
        $revenueByPackage = (clone $query)
            ->join('subscriptions', 'invoices.subscription_id', '=', 'subscriptions.id')
            ->join('packages', 'subscriptions.package_id', '=', 'packages.id')
            ->groupBy('packages.name')
            ->select('packages.name', DB::raw('SUM(invoices.amount) as total'))
            ->get();
            
        // 5. QUERY BARU: Pendapatan per Lokasi (RW/RT)
        $revenueByLocation = (clone $query)
            ->join('users', 'invoices.user_id', '=', 'users.id')
            ->whereNotNull('users.rw') // Hanya sertakan user yang punya data RW
            ->groupBy('users.rw', 'users.rt')
            ->orderBy('users.rw')->orderBy('users.rt')
            ->select('users.rw', 'users.rt', DB::raw('SUM(invoices.amount) as total'))
            ->get();
            
        return Inertia::render('Admin/Reports/Index', [
            'reports' => [
                'totalRevenue' => $totalRevenue,
                'totalTransactions' => $totalTransactions,
                'dailyRevenue' => $dailyRevenue,
                'revenueByPackage' => $revenueByPackage,
                'revenueByLocation' => $revenueByLocation, // <-- Kirim data baru ke frontend
            ],
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ]
        ]);
    }
}