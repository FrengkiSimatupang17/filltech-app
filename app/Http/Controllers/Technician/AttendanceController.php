<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Inertia\Inertia; 

class AttendanceController extends Controller
{
    /**
     * Menampilkan halaman scanner QR Code.
     */
    public function scanner()
    {
        return Inertia::render('Technician/Attendance/Scanner');
    }

    /**
     * Memproses Clock-In atau Clock-Out berdasarkan token QR.
     */
    public function store(Request $request)
    {
        $technician = Auth::user();
        $today = Carbon::today();

        $attendance = Attendance::where('user_id', $technician->id)
            ->where('date', $today)
            ->whereNull('clock_out')
            ->first();

        // Validasi QR Code untuk Clock-In dan Clock-Out
        $request->validate(['qr_token' => 'required|string']);

        $expectedToken = hash_hmac('sha256', now()->toDateString(), config('app.key'));

        if ($request->qr_token !== $expectedToken) {
            return redirect()->route('dashboard')->with('error', 'QR Code tidak valid atau sudah kedaluwarsa.');
        }

        if ($attendance) {
            // Aksi CLOCK-OUT
            $attendance->update(['clock_out' => now()]);
            return redirect()->route('dashboard')->with('success', 'Berhasil melakukan Clock-Out.');
        } else {
            // Aksi CLOCK-IN
            Attendance::create([
                'user_id' => $technician->id,
                'date' => $today,
                'clock_in' => now(),
            ]);
            return redirect()->route('dashboard')->with('success', 'Berhasil melakukan Clock-In.');
        }
    }
}