<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Carbon\Carbon;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users/Index', [
            'users' => User::with('subscriptions')->orderBy('role')->orderBy('name')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => ['required', Rule::in(['client', 'technician'])],
            'phone_number' => 'required|string|max:15',
            'address' => 'nullable|string|max:1000', // <-- LOGIKA DITAMBAHKAN
            'rt' => 'required_if:role,client|nullable|string|max:3',
            'rw' => 'required_if:role,client|nullable|string|max:3',
            'block' => 'required_if:role,client|nullable|string|max:10',
            'house_number' => 'required_if:role,client|nullable|string|max:10',
        ]);

        $uniqueId = null;
        if ($request->role === 'client') {
            $date = Carbon::now()->format('Ymd');
            $rt = str_pad($request->rt, 3, '0', STR_PAD_LEFT);
            $rw = str_pad($request->rw, 3, '0', STR_PAD_LEFT);
            $blockHouse = $request->block . $request->house_number;
            $uniqueId = "{$date}_{$rt}_{$rw}_{$blockHouse}";
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'phone_number' => $request->phone_number,
            'address' => $request->address, // <-- LOGIKA DITAMBAHKAN
            'rt' => $request->rt,
            'rw' => $request->rw,
            'block' => $request->block,
            'house_number' => $request->house_number,
            'unique_id' => $uniqueId,
            'email_verified_at' => now(),
        ]);

        return redirect()->route('admin.users.index')->with('success', 'Pengguna baru berhasil ditambahkan.');
    }

    public function edit(Request $request, User $user)
    {
        if ($user->role === 'superuser' && $request->user()->role === 'admin') {
            abort(403, 'AKSES DITOLAK: Admin tidak dapat mengedit Superuser.');
        }
        
        // Logika subscription sudah dipindah, jadi method ini bersih
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        if ($user->role === 'superuser' && $request->user()->role === 'admin') {
            abort(403, 'AKSES DITOLAK: Admin tidak dapat mengedit Superuser.');
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => ['required', Rule::in($request->user()->role === 'superuser' ? ['client', 'technician', 'admin', 'superuser'] : ['client', 'technician', 'admin'])],
            'phone_number' => 'required|string|max:15',
            'address' => 'nullable|string|max:1000', // <-- LOGIKA DITAMBAHKAN
            'rt' => 'required_if:role,client|nullable|string|max:3',
            'rw' => 'required_if:role,client|nullable|string|max:3',
            'block' => 'required_if:role,client|nullable|string|max:10',
            'house_number' => 'required_if:role,client|nullable|string|max:10',
        ]);

        $user->update($request->all());

        return redirect()->route('admin.users.index')->with('success', 'Data pengguna berhasil diperbarui.');
    }

    public function destroy(User $user)
    {
        if ($user->role === 'superuser' || ($user->role === 'admin' && auth()->user()->role !== 'superuser')) {
            return redirect()->back()->with('error', 'Anda tidak memiliki izin untuk menghapus pengguna ini.');
        }
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'Anda tidak dapat menghapus akun Anda sendiri.');
        }
        $user->delete();
        return redirect()->route('admin.users.index')->with('success', 'Pengguna berhasil dihapus.');
    }
}
