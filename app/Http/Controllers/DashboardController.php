<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Attendance;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     * This single method will direct users to the correct dashboard based on their role.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        // --- Logika untuk Admin & Superuser ---
        if ($user->role === 'admin' || $user->role === 'superuser') {
            // Ambil data statistik & grafik untuk 30 hari terakhir
            $startDate = Carbon::now()->subDays(30);
            $endDate = Carbon::now();

            $query = Invoice::where('status', 'paid')->whereBetween('paid_at', [$startDate, $endDate]);

            // Data untuk Stat Cards
            $totalRevenue = (clone $query)->sum('amount');
            $totalTransactions = (clone $query)->count();

            // Data untuk Grafik Pendapatan Harian
            $dailyRevenue = (clone $query)
                ->groupBy('date')
                ->orderBy('date')
                ->get([
                    DB::raw('DATE(paid_at) as date'),
                    DB::raw('SUM(amount) as total')
                ]);

            return Inertia::render('Admin/Dashboard', [
                'stats' => [
                    'totalRevenue' => $totalRevenue,
                    'totalTransactions' => $totalTransactions,
                ],
                'dailyRevenue' => $dailyRevenue,
            ]);
        }

        // --- Logika untuk Teknisi ---
        if ($user->role === 'technician') {
            $tasks = $user->technicianTasks()->with('client')->where('status', '!=', 'completed')->latest()->get();
            
            // Cari status absensi hari ini
            $todaysAttendance = Attendance::where('user_id', $user->id)
                ->where('date', Carbon::today())
                ->first();

            return Inertia::render('Technician/Dashboard', [
                'tasks' => $tasks,
                'todaysAttendance' => $todaysAttendance,
            ]);
        }

        // --- Logika Default untuk Klien ---
        $activeSubscription = $user->subscriptions()->with('package')->where('status', 'active')->first();
        $invoices = $user->invoices()->with('payments')->latest()->get();

        return Inertia::render('Dashboard', [
            'activeSubscription' => $activeSubscription,
            'invoices' => $invoices,
        ]);
    }
}