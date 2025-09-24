<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'rt' => 'required|string|max:3',
            'rw' => 'required|string|max:3',
            'block' => 'required|string|max:10',
            'house_number' => 'required|string|max:10',
            'phone_number' => 'required|string|max:15',
        ]);

        // Membuat ID Unik
        $date = Carbon::now()->format('Ymd');
        $rt = str_pad($request->rt, 3, '0', STR_PAD_LEFT);
        $rw = str_pad($request->rw, 3, '0', STR_PAD_LEFT);
        $blockHouse = $request->block . $request->house_number;
        $uniqueId = "{$date}_{$rt}_{$rw}_{$blockHouse}";

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'rt' => $request->rt,
            'rw' => $request->rw,
            'block' => $request->block,
            'house_number' => $request->house_number,
            'phone_number' => $request->phone_number,
            'unique_id' => $uniqueId,
            // Role default adalah 'client' sesuai skema database
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}