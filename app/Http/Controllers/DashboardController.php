<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Actions\Dashboard\GetAdminDashboardData;
use App\Actions\Dashboard\GetTechnicianDashboardData;
use App\Actions\Dashboard\GetClientDashboardData;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        switch ($user->role) {
            case 'admin':
            case 'superuser':
                $data = (new GetAdminDashboardData)->handle();
                return Inertia::render('Admin/Dashboard', $data);

            case 'technician':
                $data = (new GetTechnicianDashboardData)->handle($user);
                return Inertia::render('Technician/Dashboard', $data);

            default: // Client
                $data = (new GetClientDashboardData)->handle($user);
                return Inertia::render('Dashboard', $data);
        }
    }
}