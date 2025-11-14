<?php

use App\Models\User;
use function Pest\Laravel\get;
use function Pest\Laravel\actingAs;

/*
|--------------------------------------------------------------------------
| Tes untuk Tamu (Guest)
|--------------------------------------------------------------------------
*/

test('halaman login dapat ditampilkan', function () {
    get(route('login'))->assertStatus(200);
});

test('tamu tidak bisa mengakses dashboard', function () {
    get(route('dashboard'))->assertRedirect(route('login'));
});

test('tamu tidak bisa mengakses halaman admin', function () {
    get(route('admin.tasks.index'))->assertRedirect(route('login'));
});

/*
|--------------------------------------------------------------------------
| Tes untuk Role 'Client'
|--------------------------------------------------------------------------
*/

test('client dapat login dan diarahkan ke dashboard', function () {
    // Buat user baru dengan role 'client' menggunakan factory
    $client = User::factory()->create(['role' => 'client']);

    // Bertindak sebagai user ini dan buka halaman login
    actingAs($client)->get(route('login'))->assertRedirect(route('dashboard'));
});

test('client dapat mengakses dashboard mereka', function () {
    $client = User::factory()->create(['role' => 'client']);

    actingAs($client)
        ->get(route('dashboard'))
        ->assertStatus(200);
});

test('client tidak bisa mengakses halaman admin mana pun', function () {
    $client = User::factory()->create(['role' => 'client']);

    // Coba akses halaman admin
    actingAs($client)->get(route('admin.tasks.index'))->assertRedirect(route('dashboard'));
    actingAs($client)->get(route('admin.users.index'))->assertRedirect(route('dashboard'));
    actingAs($client)->get(route('admin.reports.index'))->assertRedirect(route('dashboard'));
});

/*
|--------------------------------------------------------------------------
| Tes untuk Role 'Technician'
|--------------------------------------------------------------------------
*/

test('teknisi diarahkan ke dashboard saat login', function () {
    $technician = User::factory()->create(['role' => 'technician']);

    actingAs($technician)
        ->get(route('dashboard'))
        ->assertStatus(200); // DashboardController akan memberi mereka halaman teknisi
});

test('teknisi tidak bisa mengakses halaman admin', function () {
    $technician = User::factory()->create(['role' => 'technician']);

    actingAs($technician)
        ->get(route('admin.users.index'))
        ->assertRedirect(route('dashboard')); // Ditolak oleh middleware 'role'
});

/*
|--------------------------------------------------------------------------
| Tes untuk Role 'Admin'
|--------------------------------------------------------------------------
*/

test('admin dapat mengakses halaman admin', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    actingAs($admin)
        ->get(route('admin.tasks.index'))
        ->assertStatus(200);
        
    actingAs($admin)
        ->get(route('admin.users.index'))
        ->assertStatus(200);
});