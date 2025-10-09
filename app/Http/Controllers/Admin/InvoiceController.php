<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function index()
    {
        $invoices = Invoice::with(['user', 'payments'])
            ->orderByRaw("CASE WHEN status = 'pending' THEN 1 ELSE 2 END") // Prioritaskan yang pending
            ->latest('created_at')
            ->get();

        return Inertia::render('Admin/Invoices/Index', [
            'invoices' => $invoices
        ]);
    }

    public function approvePayment(Payment $payment)
    {
        try {
            DB::beginTransaction();
            
            $payment->update(['status' => 'verified']);

            $invoice = $payment->invoice;
            $invoice->update([
                'status' => 'paid',
                'paid_at' => now(),
            ]);

            if ($invoice->type === 'installation') {
                $subscription = Subscription::find($invoice->subscription_id);
                if ($subscription) {
                    $subscription->update(['status' => 'pending_installation']);

                    Task::create([
                        'title' => 'Pemasangan Baru - ' . $subscription->user->name,
                        'description' => 'Lakukan pemasangan baru untuk paket ' . $subscription->package->name,
                        'type' => 'installation',
                        'status' => 'pending',
                        'user_id' => $subscription->user_id,
                        'subscription_id' => $subscription->id,
                    ]);
                }
            }
            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal menyetujui pembayaran: ' . $e->getMessage());
        }
        return redirect()->back()->with('success', 'Pembayaran telah diverifikasi.');
    }

    public function rejectPayment(Request $request, Payment $payment)
    {
        $request->validate(['rejection_reason' => 'required|string|max:255']);

        $payment->update([
            'status' => 'rejected',
            'notes' => $request->rejection_reason,
        ]);

        return redirect()->back()->with('success', 'Pembayaran telah ditolak.');
    }
}