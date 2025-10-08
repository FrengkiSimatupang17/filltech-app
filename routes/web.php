<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Import semua controller yang dibutuhkan
use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ClientSubscriptionController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\EquipmentController;
use App\Http\Controllers\Admin\QrCodeController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Technician\TaskController as TechnicianTaskController;
use App\Http\Controllers\Technician\AttendanceController;
use App\Http\Controllers\Client\PaymentController;
use App\Http\Controllers\Client\ComplaintController;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
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

    // CRUD Routes
    Route::resource('packages', PackageController::class);
    Route::resource('users', UserController::class)->except(['destroy', 'show']);
    Route::resource('equipment', EquipmentController::class);

    // Subscription Routes
    Route::get('users/{user}/subscriptions/create', [ClientSubscriptionController::class, 'create'])->name('client-subscriptions.create');
    Route::post('client-subscriptions', [ClientSubscriptionController::class, 'store'])->name('client-subscriptions.store');

    // Task Routes
    Route::get('tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('tasks/{task}/assign', [TaskController::class, 'assign'])->name('tasks.assign');

    // Invoice & Payment Verification Routes
    Route::get('invoices', [InvoiceController::class, 'index'])->name('invoices.index');
    Route::post('payments/{payment}/approve', [InvoiceController::class, 'approvePayment'])->name('payments.approve');
    Route::post('payments/{payment}/reject', [InvoiceController::class, 'rejectPayment'])->name('payments.reject');

    // Attendance QR Code Route
    Route::get('attendance/qrcode', [QrCodeController::class, 'show'])->name('attendance.qrcode');
});

// TECHNICIAN ROUTES
Route::middleware(['auth', 'role:technician'])->prefix('technician')->name('technician.')->group(function () {
    Route::post('tasks/{task}/update-status', [TechnicianTaskController::class, 'updateStatus'])->name('tasks.update-status');

    // Attendance Routes
    Route::get('attendance/scanner', [AttendanceController::class, 'scanner'])->name('attendance.scanner');
    Route::post('attendance', [AttendanceController::class, 'store'])->name('attendance.store');
});

// CLIENT ROUTES
Route::middleware(['auth', 'role:client'])->prefix('client')->name('client.')->group(function () {
    Route::post('invoices/{invoice}/pay', [PaymentController::class, 'store'])->name('invoices.pay');
    Route::post('complaints', [ComplaintController::class, 'store'])->name('complaints.store');
});


require __DIR__.'/auth.php';