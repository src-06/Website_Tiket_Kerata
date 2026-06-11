<?php

namespace Database\Seeders;

use App\Models\Jadwal;
use App\Models\Kereta;
use App\Models\Stasiun;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Stasiun::factory(10)->create();
        Kereta::factory(10)->create();
        Jadwal::factory(15)->create();
    }
}
