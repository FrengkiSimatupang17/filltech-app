<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     * This single method will direct users to the correct dashboard based on their role.
     */
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        // Direct Admins and Superusers to the Admin Dashboard
        if ($user->role === 'admin' || $user->role === 'superuser') {
            return Inertia::render('Admin/Dashboard');
        }

        // Direct Technicians to their Task Dashboard
        if ($user->role === 'technician') {
            $tasks = $user->technicianTasks()->with('client')->where('status', '!=', 'completed')->latest()->get();
            return Inertia::render('Technician/Dashboard', [
                'tasks' => $tasks
            ]);
        }

        // Default to the Client Dashboard for any other role (i.e., 'client')
        $activeSubscription = $user->subscriptions()->with('package')->where('status', 'active')->first();
        $invoices = $user->invoices()->with('payments')->latest()->get();

        return Inertia::render('Dashboard', [
            'activeSubscription' => $activeSubscription,
            'invoices' => $invoices,
        ]);
    }
}