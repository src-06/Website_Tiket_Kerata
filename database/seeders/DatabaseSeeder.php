<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\Jadwal;
use App\Models\Kereta;
use App\Models\Penumpang;
use App\Models\Stasiun;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Penumpang::create([
            'nama' => 'Admin',
            'email' => 'admin@example.com',
            'no_hp' => '081234567890',
            'password' => Hash::make('password'),
            'role' => Role::Admin,
        ]);

        Penumpang::create([
            'nama' => 'User',
            'email' => 'user@example.com',
            'no_hp' => '081234567891',
            'password' => Hash::make('password'),
            'role' => Role::User,
        ]);

        Stasiun::factory(10)->create();
        Kereta::factory(10)->create();
        Jadwal::factory(100)->create();
    }
}
