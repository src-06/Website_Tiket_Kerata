<?php

namespace Database\Factories;

use App\Models\Jadwal;
use App\Models\Kereta;
use App\Models\Stasiun;
use Illuminate\Database\Eloquent\Factories\Factory;

class JadwalFactory extends Factory
{
    protected $model = Jadwal::class;

    public function definition(): array
    {
        $kereta = Kereta::inRandomOrder()->first() ?? Kereta::factory()->create();
        $stasiunIds = Stasiun::inRandomOrder()->pluck('id_stasiun')->take(2)->values();

        while ($stasiunIds->count() < 2) {
            $stasiunIds = Stasiun::inRandomOrder()->pluck('id_stasiun')->take(2)->values();
        }

        return [
            'id_kereta' => $kereta->id_kereta,
            'id_stasiun_asal' => $stasiunIds[0],
            'id_stasiun_tujuan' => $stasiunIds[1],
            'waktu_berangkat' => fake()->dateTimeBetween('now', '+7 days'),
            'durasi_perjalanan' => fake()->numberBetween(60, 480),
            'harga' => fake()->numberBetween(80000, 500000),
        ];
    }
}
