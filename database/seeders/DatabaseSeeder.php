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

        $stasiuns = Stasiun::all();
        $keretas = Kereta::all();

        // Helper: generate waktu berangkat unik untuk setiap jadwal
        $generateWaktu = function () {
            return now()->addDays(rand(0, 14))->addHours(rand(0, 23))->addMinutes(rand(0, 59));
        };

        foreach ($stasiuns as $asal) {
            foreach ($stasiuns as $tujuan) {
                if ($asal->id_stasiun === $tujuan->id_stasiun) {
                    continue;
                }

                // 1-3 jadwal per rute secara acak
                $jumlahJadwal = rand(1, 3);

                for ($i = 0; $i < $jumlahJadwal; $i++) {
                    Jadwal::create([
                        'id_kereta' => $keretas->random()->id_kereta,
                        'id_stasiun_asal' => $asal->id_stasiun,
                        'id_stasiun_tujuan' => $tujuan->id_stasiun,
                        'waktu_berangkat' => $generateWaktu(),
                        'durasi_perjalanan' => rand(60, 720),
                        'harga' => rand(80000, 600000),
                    ]);
                }
            }
        }

        $ruteTambahan = [
            [0, 1],
            [0, 2],
            [1, 3],
            [2, 4],
            [3, 5],
            [4, 6],
            [5, 7],
            [6, 8],
            [7, 9],
            [8, 0],
            [0, 5],
            [1, 6],
            [2, 7],
            [3, 8],
            [4, 9],
            [0, 3],
            [2, 9],
            [4, 3],
            [6, 9],
        ];

        foreach ($ruteTambahan as [$idxAsal, $idxTujuan]) {
            // 2 jadwal per rute tambahan, waktu berbeda
            for ($i = 0; $i < 2; $i++) {
                Jadwal::create([
                    'id_kereta' => $keretas->random()->id_kereta,
                    'id_stasiun_asal' => $stasiuns[$idxAsal]->id_stasiun,
                    'id_stasiun_tujuan' => $stasiuns[$idxTujuan]->id_stasiun,
                    'waktu_berangkat' => $generateWaktu(),
                    'durasi_perjalanan' => rand(60, 720),
                    'harga' => rand(80000, 600000),
                ]);
            }
        }
    }
}
