<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@example.com'], // Email unique pour l'admin
            [
                'name' => 'Administrateur',
                'password' => 'Admin0123_', 
                'isAdmin' => true,
            ]
        );
    }
}
