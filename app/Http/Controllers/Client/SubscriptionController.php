<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Subscription;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    public function showPackageDetail(Package $package)
    {
        return Inertia::render('Client/Packages/Show', [
            'package' => $package,
        ]);
    }

    public function showPaymentInstruction(Package $package)
    {
        return Inertia::render('Client/Subscriptions/Payment', [
            'package' => $package,
            'bankDetails' => config('services.payment'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'package_id' => 'required|exists:packages,id',
        ]);

        $user = Auth::user();
        $package = Package::findOrFail($request->package_id);

        if ($user->role !== 'client' || $user->subscriptions()->where('status', '!=', 'cancelled')->exists()) {
            return redirect()->route('dashboard')->with('error', 'Anda sudah memiliki langganan aktif.');
        }

        try {
            DB::beginTransaction();

            $subscription = Subscription::create([
                'user_id' => $user->id,
                'package_id' => $package->id,
                'status' => 'pending_payment',
            ]);

            Invoice::create([
                'invoice_number' => 'INV/' . Carbon::now()->format('Ymd') . '/' . $user->id . '/INSTALL',
                'user_id' => $user->id,
                'subscription_id' => $subscription->id,
                'amount' => $package->price,
                'status' => 'pending',
                'type' => 'installation',
                'due_date' => Carbon::now()->addDays(3),
            ]);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('dashboard')->with('error', 'Gagal membuat langganan: ' . $e->getMessage());
        }

        return redirect()->route('dashboard')->with('success', 'Permintaan langganan berhasil dibuat. Silakan lakukan pembayaran untuk tagihan pertama Anda.');
    }
}