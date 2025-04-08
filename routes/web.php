<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\PackController;
use App\Http\Controllers\DashboardController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', \App\Http\Middleware\IsAdmin::class])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('account', [AccountController::class, 'index'])->name('account');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('reservation', function () {
        return Inertia::render('reservation/reservation');
    })->name('reservation');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/reservation', [ReservationController::class, 'index'])->name('reservation.index');
    Route::post('/reservation', [ReservationController::class, 'store'])->name('reservation.store');
    Route::patch('/reservation/{id}/rendre', [ReservationController::class, 'rendre'])->name('reservation.rendre');
});



Route::get('/packs', [PackController::class, 'index']);

// Accounts / Users
Route::put('/account/{user}', [AccountController::class, 'update'])->name('account.update');
Route::delete('/account/{user}', [AccountController::class, 'destroy'])->name('account.destroy');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
