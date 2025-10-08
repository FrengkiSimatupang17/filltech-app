<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QrCodeController extends Controller
{
    public function show()
    {
        // Membuat token unik harian yang aman
        // Menggunakan tanggal + kunci aplikasi sebagai dasar
        $dailyToken = hash_hmac('sha256', now()->toDateString(), config('app.key'));

        return Inertia::render('Admin/Attendance/ShowQrCode', [
            'dailyToken' => $dailyToken,
        ]);
    }
}