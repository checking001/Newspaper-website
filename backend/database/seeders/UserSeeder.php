<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Super Admin
        User::create([
            'name' => 'সুপার অ্যাডমিন',
            'email' => 'superadmin@newspaper.local',
            'password' => Hash::make('password123'),
            'role_id' => 2, // super_admin
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Admin 1
        User::create([
            'name' => 'আব্দুর রহিম',
            'email' => 'admin1@newspaper.local',
            'password' => Hash::make('password123'),
            'role_id' => 1, // admin
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Admin 2
        User::create([
            'name' => 'ফাতিমা আক্তার',
            'email' => 'admin2@newspaper.local',
            'password' => Hash::make('password123'),
            'role_id' => 1, // admin
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
    }
}