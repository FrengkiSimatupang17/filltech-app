<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Subscription;
use App\Models\User;
use App\Models\Invoice;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Inertia\Inertia;

class ClientSubscriptionController extends Controller
{
    public function create(User $user)
    {
        if ($user->role !== 'client' || $user->subscriptions()->where('status', '!=', 'cancelled')->exists()) {
            return redirect()->route('admin.users.index')->with('error', 'User ini bukan client atau sudah memiliki langganan aktif.');
        }

        return Inertia::render('Admin/Subscriptions/Create', [
            'client' => $user,
            'packages' => Package::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'package_id' => 'required|exists:packages,id',
        ]);

        $user = User::findOrFail($request->user_id);
        $package = Package::findOrFail($request->package_id);

        if ($user->role !== 'client' || $user->subscriptions()->where('status', '!=', 'cancelled')->exists()) {
             return redirect()->back()->with('error', 'User ini bukan client atau sudah memiliki langganan aktif.');
        }

        try {
            DB::beginTransaction();

            $subscription = Subscription::create([
                'user_id' => $user->id,
                'package_id' => $package->id,
                'status' => 'pending_installation',
            ]);

            Invoice::create([
                'invoice_number' => 'INV/' . Carbon::now()->format('Ymd') . '/' . $user->id . '/INSTALL',
                'user_id' => $user->id,
                'subscription_id' => $subscription->id,
                'amount' => 0,
                'status' => 'paid',
                'type' => 'installation',
                'due_date' => Carbon::now(),
                'paid_at' => now(),
            ]);

            Task::create([
                'title' => 'Pemasangan Baru - ' . $user->name,
                'description' => 'Lakukan pemasangan baru untuk paket ' . $package->name . ' di alamat klien.',
                'type' => 'installation',
                'status' => 'pending',
                'user_id' => $user->id,
                'subscription_id' => $subscription->id,
            ]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            // Kembalikan ke versi aman yang menampilkan notifikasi error
            return redirect()->back()->with('error', 'Gagal membuat langganan: ' . $e->getMessage());
        }

        return redirect()->route('admin.tasks.index')->with('success', 'Langganan berhasil dibuat. Tugas pemasangan telah ditambahkan ke antrian.');
    }
}