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
        
        if ($invoice->user_id !== Auth::id()) {
            abort(403);
        }

        
        $invoice->load('user', 'subscription.package');
        
        $pdf = Pdf::loadView('invoices.pdf', compact('invoice'));
        
        
        $safeFilename = str_replace('/', '-', $invoice->invoice_number);

        // Gunakan nama file yang sudah aman
        return $pdf->stream('invoice-' . $safeFilename . '.pdf');
    }
}