<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Package;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Kosongkan tabel packages terlebih dahulu
        Package::query()->delete();

        // Masukkan data paket baru
        Package::create(['name' => 'Paket Sultan', 'speed' => '50 Mbps', 'price' => 520000]);
        Package::create(['name' => 'Paket Ngebut', 'speed' => '30 Mbps', 'price' => 295000]);
        Package::create(['name' => 'Paket Ramean', 'speed' => '20 Mbps', 'price' => 230000]);
        Package::create(['name' => 'Paket Asik', 'speed' => '15 Mbps', 'price' => 185000]);
        Package::create(['name' => 'Paket Santai', 'speed' => '10 Mbps', 'price' => 150000]);
    }
}