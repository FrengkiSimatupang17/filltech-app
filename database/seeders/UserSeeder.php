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
        $block_client1 = 'A1';
        $house_number_client1 = '10';
        User::create([
            'name' => 'Budi Klien',
            'email' => 'budi@example.com',
            'password' => Hash::make('password'),
            'phone_number' => '081211112222',
            'role' => 'client',
            'rt' => $rt_client1,
            'rw' => $rw_client1,
            'block' => $block_client1,
            'house_number' => $house_number_client1,
            'unique_id' => "{$date}_{$rt_client1}_{$rw_client1}_{$block_client1}{$house_number_client1}",
            'email_verified_at' => now(),
        ]);

        // 5. Client 2 (Contoh)
        $rt_client2 = '003';
        $rw_client2 = '011';
        $block_client2 = 'B3';
        $house_number_client2 = '6';
        User::create([
            'name' => 'Citra Klienwati',
            'email' => 'citra@example.com',
            'password' => Hash::make('password'),
            'phone_number' => '081233334444',
            'role' => 'client',
            'rt' => $rt_client2,
            'rw' => $rw_client2,
            'block' => $block_client2,
            'house_number' => $house_number_client2,
            'unique_id' => "{$date}_{$rt_client2}_{$rw_client2}_{$block_client2}{$house_number_client2}",
            'email_verified_at' => now(),
        ]);
    }
}