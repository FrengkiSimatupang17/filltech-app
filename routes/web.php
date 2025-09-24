<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ClientSubscriptionController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Technician\TaskController as TechnicianTaskController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ADMIN ROUTES
Route::middleware(['auth', 'role:admin,superuser'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Package Routes
    Route::resource('packages', PackageController::class); 
    // User Routes
    Route::resource('users', UserController::class)->except(['destroy', 'show']);
    Route::post('client-subscriptions', [ClientSubscriptionController::class, 'store'])->name('client-subscriptions.store');
    Route::get('tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('tasks/{task}/assign', [TaskController::class, 'assign'])->name('tasks.assign');
    Route::get('users/{user}/subscriptions/create', [ClientSubscriptionController::class, 'create'])->name('client-subscriptions.create');
    Route::post('client-subscriptions', [ClientSubscriptionController::class, 'store'])->name('client-subscriptions.store');
});

Route::middleware(['auth', 'role:technician'])->prefix('technician')->name('technician.')->group(function () {
    Route::patch('tasks/{task}/update-status', [TechnicianTaskController::class, 'updateStatus'])->name('tasks.update-status');
});

require __DIR__.'/auth.php';