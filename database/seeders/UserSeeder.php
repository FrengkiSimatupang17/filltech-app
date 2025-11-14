<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Superuser
        User::create([
            'name' => 'Super User',
            'email' => 'superuser@filltech.com',
            'password' => Hash::make('password'),
            'phone_number' => '081200000001',
            'role' => 'superuser',
            'email_verified_at' => now(),
        ]);

        // 2. Admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@filltech.com',
            'password' => Hash::make('password'),
            'phone_number' => '081200000002',
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);

        // 3. Technician
        User::create([
            'name' => 'Teknisi Handal',
            'email' => 'teknisi@filltech.com',
            'password' => Hash::make('password'),
            'phone_number' => '081200000003',
            'role' => 'technician',
            'email_verified_at' => now(),
        ]);

        // 4. Client (Contoh)
        $date = Carbon::now()->format('Ymd');
        $rt_client1 = '001';
        $rw_client1 = '005';
        $block_client1 = 'C';
        $house_number_client1 = '42';
        User::create([
            'name' => 'Frengki',
            'email' => 'simatupangfrengki2@gmail.com',
            'password' => Hash::make('password'),
            'phone_number' => '081908792750',
            'role' => 'client',
            'rt' => $rt_client1,
            'rw' => $rw_client1,
            'block' => $block_client1,
            'house_number' => $house_number_client1,
            'unique_id' => "{$date}_{$rt_client1}_{$rw_client1}_{$block_client1}{$house_number_client1}",
            'email_verified_at' => now(),
        ]);

        
    }
}