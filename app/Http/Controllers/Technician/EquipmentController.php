<?php

namespace App\Http\Controllers\Technician;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\EquipmentLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class EquipmentController extends Controller
{
    public function index()
    {
        $technicianId = Auth::id();

        return Inertia::render('Technician/Equipment/Index', [
            // Alat yang tersedia untuk dipinjam
            'availableEquipment' => Equipment::where('status', 'available')->get(),
            // Alat yang sedang dipinjam oleh teknisi ini
            'myBorrowedEquipment' => Equipment::where('current_user_id', $technicianId)->get(),
        ]);
    }

    public function borrow(Equipment $equipment)
    {
        if ($equipment->status !== 'available') {
            return redirect()->back()->with('error', 'Alat ini sedang tidak tersedia.');
        }

        DB::transaction(function () use ($equipment) {
            // Update status alat
            $equipment->update([
                'status' => 'in_use',
                'current_user_id' => Auth::id(),
            ]);

            // Catat di log
            EquipmentLog::create([
                'equipment_id' => $equipment->id,
                'user_id' => Auth::id(),
                'action' => 'borrowed',
            ]);
        });

        return redirect()->back()->with('success', "Anda berhasil meminjam {$equipment->name}.");
    }

    public function returnItem(Equipment $equipment)
    {
        if ($equipment->current_user_id !== Auth::id()) {
            return redirect()->back()->with('error', 'Anda tidak sedang meminjam alat ini.');
        }

        DB::transaction(function () use ($equipment) {
            // Update status alat
            $equipment->update([
                'status' => 'available',
                'current_user_id' => null,
            ]);

            // Catat di log
            EquipmentLog::create([
                'equipment_id' => $equipment->id,
                'user_id' => Auth::id(),
                'action' => 'returned',
            ]);
        });

        return redirect()->back()->with('success', "Anda berhasil mengembalikan {$equipment->name}.");
    }
}