<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
// Hapus 'use App\Models\Subscription;' dan 'use App\Models\Task;' jika tidak digunakan di method lain
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    // ... method index() dan rejectPayment() tetap sama ...

    public function approvePayment(Payment $payment)
    {
        try {
            DB::beginTransaction();

            // Update status pembayaran
            $payment->update(['status' => 'verified']);

            // Update status invoice
            $payment->invoice()->update([
                'status' => 'paid',
                'paid_at' => now(),
            ]);
            
            // LOGIKA PEMBUATAN TUGAS SUDAH DIHAPUS DARI SINI

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal menyetujui pembayaran: ' . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Pembayaran telah berhasil diverifikasi dan tagihan diperbarui.');
    }
}