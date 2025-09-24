<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Tasks/Index', [
            'tasks' => Task::with(['client', 'technician'])->latest()->get(),
            'technicians' => User::where('role', 'technician')->get(['id', 'name']),
        ]);
    }

    public function assign(Request $request, Task $task)
    {
        $request->validate([
            'technician_id' => 'required|exists:users,id',
        ]);
        
        // Pastikan user yang dipilih adalah teknisi
        $technician = User::findOrFail($request->technician_id);
        if ($technician->role !== 'technician') {
            return redirect()->back()->with('error', 'Pengguna yang dipilih bukan teknisi.');
        }

        $task->update([
            'technician_id' => $technician->id,
            'status' => 'assigned',
            'assigned_by' => auth()->id(),
            'assigned_at' => now(),
        ]);

        return redirect()->route('admin.tasks.index')->with('success', 'Tugas berhasil ditugaskan kepada ' . $technician->name);
    }
}