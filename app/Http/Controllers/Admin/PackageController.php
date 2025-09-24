<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Packages/Index', [
            'packages' => Package::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Packages/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'speed' => 'required|string|max:50',
            'description' => 'nullable|string',
        ]);

        Package::create($request->all());

        return redirect()->route('admin.packages.index')->with('success', 'Paket berhasil ditambahkan.');
    }

    public function edit(Package $package)
    {
        return Inertia::render('Admin/Packages/Edit', [
            'package' => $package,
        ]);
    }

    public function update(Request $request, Package $package)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer|min:0',
            'speed' => 'required|string|max:50',
            'description' => 'nullable|string',
        ]);

        $package->update($request->all());

        return redirect()->route('admin.packages.index')->with('success', 'Paket berhasil diperbarui.');
    }

    public function destroy(Package $package)
    {
        $package->delete();

        return redirect()->route('admin.packages.index')->with('success', 'Paket berhasil dihapus.');
    }
}