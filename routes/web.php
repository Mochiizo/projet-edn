<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified', \App\Http\Middleware\IsAdmin::class])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/dashboard');
    })->name('dashboard');

    Route::get('account', function () {
        return Inertia::render('dashboard/account');
    })->name('account');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('reservation', function () {
        return Inertia::render('reservation/reservation');
    })->name('reservation');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
