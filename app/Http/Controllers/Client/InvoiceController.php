<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function show(Invoice $invoice)
    {
        // Keamanan: Pastikan invoice milik user yang login
        if ($invoice->user_id !== Auth::id()) {
            abort(403);
        }

        // Eager load relasi yang dibutuhkan di view
        $invoice->load('user', 'subscription.package');
        
        $pdf = Pdf::loadView('invoices.pdf', compact('invoice'));
        
        // PERBAIKAN DI SINI:
        // Ganti karakter '/' dengan '-' untuk nama file yang aman
        $safeFilename = str_replace('/', '-', $invoice->invoice_number);

        // Gunakan nama file yang sudah aman
        return $pdf->stream('invoice-' . $safeFilename . '.pdf');
    }
}