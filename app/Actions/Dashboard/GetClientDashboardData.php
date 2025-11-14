<?php

namespace App\Actions\Dashboard;

use App\Models\User;
use App\Models\Package;

class GetClientDashboardData
{
    public function handle(User $user): array
    {
        $activeSubscription = $user->subscriptions()->with('package')->where('status', 'active')->first();
        $invoices = $user->invoices()->with('payments')->latest()->get();
        $packages = Package::all();

        return [
            'activeSubscription' => $activeSubscription,
            'invoices' => $invoices,
            'packages' => $packages,
        ];
    }
}