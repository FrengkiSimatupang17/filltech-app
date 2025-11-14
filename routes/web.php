<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Import semua controller yang dibutuhkan
use App\Http\Controllers\Superuser\ActivityLogController;
use App\Http\Controllers\Superuser\SettingController;
use App\Http\Controllers\Admin\PackageController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\ClientSubscriptionController;
use App\Http\Controllers\Admin\TaskController;
use App\Http\Controllers\Admin\InvoiceController;
use App\Http\Controllers\Admin\ReportController;
use App\Http\Controllers\Admin\EquipmentController;
use App\Http\Controllers\Admin\QrCodeController;
use App\Http\Controllers\Admin\ImportController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Technician\TaskController as TechnicianTaskController;
use App\Http\Controllers\Technician\AttendanceController;
use App\Http\Controllers\Technician\EquipmentController as TechnicianEquipmentController;
use App\Http\Controllers\Client\PaymentController;
use App\Http\Controllers\Client\ComplaintController;
use App\Http\Controllers\Client\InvoiceController as ClientInvoiceController;
use App\Http\Controllers\Client\SubscriptionController as ClientSelfSubscriptionController;
use App\Http\Controllers\Auth\SocialiteController;
use App\Http\Controllers\Auth\CompleteRegistrationController;
use App\Models\Package;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'packages' => Package::all(),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', DashboardController::class)->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    Route::get('/register/complete', [CompleteRegistrationController::class, 'create'])->name('register.complete');
    Route::post('/register/complete', [CompleteRegistrationController::class, 'store']);
});

// Socialite (Google Login) Routes
Route::get('/auth/{provider}/redirect', [SocialiteController::class, 'redirectToProvider'])->name('socialite.redirect');
Route::get('/auth/{provider}/callback', [SocialiteController::class, 'handleProviderCallback'])->name('socialite.callback');


//SUPERUSER ROUTES
Route::middleware(['auth', 'role:superuser'])->prefix('superuser')->name('superuser.')->group(function () {
    Route::get('activity-log', [ActivityLogController::class, 'index'])->name('activity-log.index');
    Route::get('settings', [SettingController::class, 'index'])->name('settings.index');
    Route::put('settings', [SettingController::class, 'update'])->name('settings.update');
});

// ADMIN ROUTES
Route::middleware(['auth', 'role:admin,superuser'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::resource('packages', PackageController::class);
    Route::resource('users', UserController::class)->except(['show']);
    Route::resource('equipment', EquipmentController::class);
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('users/{user}/subscriptions/create', [ClientSubscriptionController::class, 'create'])->name('client-subscriptions.create');
    Route::post('client-subscriptions', [ClientSubscriptionController::class, 'store'])->name('client-subscriptions.store');
    Route::get('tasks', [TaskController::class, 'index'])->name('tasks.index');
    Route::post('tasks/{task}/assign', [TaskController::class, 'assign'])->name('tasks.assign');
    Route::get('invoices', [InvoiceController::class, 'index'])->name('invoices.index');
    Route::post('payments/{payment}/approve', [InvoiceController::class, 'approvePayment'])->name('payments.approve');
    Route::post('payments/{payment}/reject', [InvoiceController::class, 'rejectPayment'])->name('payments.reject');
    Route::get('attendance/qrcode', [QrCodeController::class, 'show'])->name('attendance.qrcode');
    
    // TAMBAHKAN DUA ROUTE INI
    Route::get('import', [ImportController::class, 'index'])->name('import.index');
    Route::post('import', [ImportController::class, 'store'])->name('import.store');
});

// TECHNICIAN ROUTES
Route::middleware(['auth', 'role:technician'])->prefix('technician')->name('technician.')->group(function () {
    Route::post('tasks/{task}/update-status', [TechnicianTaskController::class, 'updateStatus'])->name('tasks.update-status');
    Route::get('tasks/history', [TechnicianTaskController::class, 'history'])->name('tasks.history');
    Route::get('attendance/scanner', [AttendanceController::class, 'scanner'])->name('attendance.scanner');
    Route::post('attendance', [AttendanceController::class, 'store'])->name('attendance.store');
    Route::get('equipment', [TechnicianEquipmentController::class, 'index'])->name('equipment.index');
    Route::post('equipment/{equipment}/borrow', [TechnicianEquipmentController::class, 'borrow'])->name('equipment.borrow');
    Route::post('equipment/{equipment}/return', [TechnicianEquipmentController::class, 'returnItem'])->name('equipment.return');
});

// CLIENT ROUTES
Route::middleware(['auth', 'role:client'])->prefix('client')->name('client.')->group(function () {
    Route::post('invoices/{invoice}/pay', [PaymentController::class, 'store'])->name('invoices.pay');
    Route::post('complaints', [ComplaintController::class, 'store'])->name('complaints.store');
    Route::get('invoices/{invoice}', [ClientInvoiceController::class, 'show'])->name('invoices.show');
    Route::get('packages/{package}', [ClientSelfSubscriptionController::class, 'showPackageDetail'])->name('packages.show');
    Route::get('packages/{package}/payment', [ClientSelfSubscriptionController::class, 'showPaymentInstruction'])->name('subscriptions.payment');
    Route::post('subscriptions', [ClientSelfSubscriptionController::class, 'store'])->name('subscriptions.store');
});


require __DIR__.'/auth.php';