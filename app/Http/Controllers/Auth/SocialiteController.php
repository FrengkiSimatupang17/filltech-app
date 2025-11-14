<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteController extends Controller
{
    public function redirectToProvider($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback($provider)
    {
        try {
            $socialUser = Socialite::driver($provider)->user();
        } catch (\Exception $e) {
            return redirect('/login')->with('error', 'Gagal melakukan autentikasi dengan Google.');
        }

        // PERBAIKAN DI SINI:
        // Cari user berdasarkan email. Jika tidak ada, baru buat.
        // Jika ada, perbarui data provider-nya.
        $user = User::updateOrCreate([
            'email' => $socialUser->getEmail(),
        ], [
            'provider_name' => $provider,
            'provider_id' => $socialUser->getId(),
            'name' => $socialUser->getName(),
            'email_verified_at' => now(),
        ]);
        
        // Login-kan user
        Auth::login($user);

        // Periksa apakah data alamat sudah lengkap
        if (empty($user->rt) || empty($user->rw)) {
            // Jika belum, arahkan ke halaman untuk melengkapi data
            return redirect()->route('register.complete');
        }

        return redirect('/dashboard');
    }
}

