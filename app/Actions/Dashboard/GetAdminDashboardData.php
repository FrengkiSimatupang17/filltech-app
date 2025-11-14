<?php

namespace App\Actions\Dashboard;

use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class GetAdminDashboardData
{
    public function handle(): array
    {
        $startDate = Carbon::now()->subDays(30);
        $endDate = Carbon::now();
        $query = Invoice::where('status', 'paid')->whereBetween('paid_at', [$startDate, $endDate]);

        $totalRevenue = (clone $query)->sum('amount');
        $totalTransactions = (clone $query)->count();
        $pendingTasks = Task::where('status', 'pending')->count();
        $pendingPayments = Payment::where('status', 'pending_verification')->count();

        $dailyRevenue = (clone $query)
            ->groupBy('date')
            ->orderBy('date')
            ->get([
                DB::raw('DATE(paid_at) as date'),
                DB::raw('SUM(amount) as total')
            ]);

        return [
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'totalTransactions' => $totalTransactions,
                'pendingTasks' => $pendingTasks,
                'pendingPayments' => $pendingPayments,
            ],
            'dailyRevenue' => $dailyRevenue,
        ];
    }
}