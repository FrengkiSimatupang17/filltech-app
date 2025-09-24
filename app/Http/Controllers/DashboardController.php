<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $user = Auth::user();

        if ($user->role === 'admin' || $user->role === 'superuser') {
            // Untuk admin, kita bisa tambahkan data ringkasan di sini nanti
            return Inertia::render('Admin/Dashboard');
        }

        if ($user->role === 'technician') {
            $tasks = $user->technicianTasks()->with('client')->where('status', '!=', 'completed')->latest()->get();
            return Inertia::render('Technician/Dashboard', [
                'tasks' => $tasks
            ]);
        }

        // Default untuk client
        return Inertia::render('Dashboard');
    }
}