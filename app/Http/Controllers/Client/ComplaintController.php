<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComplaintController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'description' => 'required|string|min:10|max:1000',
        ]);

        $user = Auth::user();

        // Cek apakah user sudah punya aduan perbaikan yang masih pending/assigned
        $existingComplaint = Task::where('user_id', $user->id)
            ->where('type', 'repair')
            ->whereIn('status', ['pending', 'assigned', 'in_progress'])
            ->exists();

        if ($existingComplaint) {
            return redirect()->back()->with('error', 'Anda sudah memiliki aduan perbaikan yang sedang diproses.');
        }

        Task::create([
            'title' => 'Aduan Perbaikan - ' . $user->name,
            'description' => $request->description,
            'type' => 'repair',
            'status' => 'pending',
            'user_id' => $user->id,
        ]);

        return redirect()->route('dashboard')->with('success', 'Aduan Anda telah berhasil dikirim dan akan segera diproses.');
    }
}