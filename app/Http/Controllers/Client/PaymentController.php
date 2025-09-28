<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function store(Request $request, Invoice $invoice)
    {
        // Keamanan: Pastikan invoice ini milik user yang sedang login
        if ($invoice->user_id !== Auth::id()) {
            abort(403, 'AKSES DITOLAK');
        }

        $request->validate([
            'payment_proof' => 'required|image|max:2048', // Wajib gambar, maks 2MB
        ]);

        // Hapus pembayaran lama yang mungkin ditolak
        $invoice->payments()->where('status', 'rejected')->delete();

        $path = $request->file('payment_proof')->store('payments', 'public');

        Payment::create([
            'invoice_id' => $invoice->id,
            'user_id' => Auth::id(),
            'amount' => $invoice->amount, // Asumsi bayar lunas
            'proof_path' => $path,
            'status' => 'pending_verification',
        ]);

        return redirect()->route('dashboard')->with('success', 'Bukti pembayaran berhasil diunggah dan sedang menunggu verifikasi.');
    }
}