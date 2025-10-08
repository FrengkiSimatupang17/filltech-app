<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class EquipmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Equipment/Index', [
            'equipment' => Equipment::latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Equipment/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $path = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('equipment', 'public');
        }

        Equipment::create([
            'name' => $request->name,
            'description' => $request->description,
            'image_path' => $path,
        ]);

        return redirect()->route('admin.equipment.index')->with('success', 'Alat berhasil ditambahkan.');
    }

    public function edit(Equipment $equipment)
    {
        return Inertia::render('Admin/Equipment/Edit', ['equipment' => $equipment]);
    }

    public function update(Request $request, Equipment $equipment)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:available,in_use,maintenance',
            'image' => 'nullable|image|max:2048',
        ]);

        $path = $equipment->image_path;
        if ($request->hasFile('image')) {
            if ($equipment->image_path) {
                Storage::disk('public')->delete($equipment->image_path);
            }
            $path = $request->file('image')->store('equipment', 'public');
        }

        $equipment->update([
            'name' => $request->name,
            'description' => $request->description,
            'status' => $request->status,
            'image_path' => $path,
        ]);
        
        return redirect()->route('admin.equipment.index')->with('success', 'Alat berhasil diperbarui.');
    }

    public function destroy(Equipment $equipment)
    {
        if ($equipment->image_path) {
            Storage::disk('public')->delete($equipment->image_path);
        }
        $equipment->delete();
        return redirect()->route('admin.equipment.index')->with('success', 'Alat berhasil dihapus.');
    }
}