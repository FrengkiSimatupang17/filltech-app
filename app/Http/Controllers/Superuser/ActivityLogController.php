<?php

namespace App\Http\Controllers\Superuser;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class ActivityLogController extends Controller
{
    public function index()
    {
        $logs = Activity::with('causer', 'subject') // Ambil data user & model terkait
            ->latest()
            ->paginate(20);

        return Inertia::render('Superuser/ActivityLog/Index', [
            'logs' => $logs,
        ]);
    }
}