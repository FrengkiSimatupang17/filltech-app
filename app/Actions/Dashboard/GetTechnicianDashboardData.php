<?php

namespace App\Actions\Dashboard;

use App\Models\User;
use App\Models\Attendance;
use Carbon\Carbon;

class GetTechnicianDashboardData
{
    public function handle(User $user): array
    {
        $tasks = $user->technicianTasks()->with('client')->where('status', '!=', 'completed')->latest()->get();
        
        $todaysAttendance = Attendance::where('user_id', $user->id)
            ->where('date', Carbon::today())
            ->first();

        return [
            'tasks' => $tasks,
            'todaysAttendance' => $todaysAttendance,
        ];
    }
}