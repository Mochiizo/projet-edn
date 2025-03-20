<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Définition des chemins de redirection
        config([
            'redirects.admin' => '/dashboard',
            'redirects.user' => '/reservation',
        ]);
    }
}
