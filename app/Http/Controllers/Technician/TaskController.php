<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class TaskController extends Controller
{
    public function updateStatus(Request $request, Task $task)
    {
        if ($task->technician_id !== Auth::id()) {
            abort(403, 'AKSES DITOLAK');
        }

        $request->validate([
            'status' => ['required', Rule::in(['in_progress', 'completed'])],
            // Jika statusnya 'completed' dan tipe 'installation', foto wajib diisi
            'proof_photo' => 'required_if:status,completed,type,installation|nullable|image|max:2048',
        ]);

        try {
            DB::beginTransaction();

            $taskData = ['status' => $request->status];
            
            if ($request->status === 'completed') {
                $taskData['completed_at'] = now();

                // Simpan foto jika ada
                if ($request->hasFile('proof_photo')) {
                    $path = $request->file('proof_photo')->store('proofs/installations', 'public');
                    $taskData['proof_path'] = $path;
                }

                if ($task->type === 'installation' && $task->subscription_id) {
                    $subscription = Subscription::find($task->subscription_id);
                    if ($subscription && $subscription->status === 'pending_installation') {
                        $subscription->update([
                            'status' => 'active',
                            'activated_at' => now(),
                             'next_billing_date' => now()->addMonth(),
                        ]);
                    }
                }
            }

            $task->update($taskData);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Gagal memperbarui status tugas: ' . $e->getMessage());
        }

        return redirect()->route('dashboard')->with('success', 'Status tugas berhasil diperbarui.');
    }
}