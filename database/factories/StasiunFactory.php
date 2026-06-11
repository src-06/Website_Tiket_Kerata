<?php

namespace Database\Factories;

use App\Models\Stasiun;
use Illuminate\Database\Eloquent\Factories\Factory;

class StasiunFactory extends Factory
{
    protected $model = Stasiun::class;

    public function definition(): array
    {
        static $index = 0;

        $daftar = [
            ['Gambir', 'Jakarta'],
            ['Bandung', 'Bandung'],
            ['Surabaya Gubeng', 'Surabaya'],
            ['Yogyakarta', 'Yogyakarta'],
            ['Semarang Tawang', 'Semarang'],
            ['Malang', 'Malang'],
            ['Pasar Senen', 'Jakarta'],
            ['Purwokerto', 'Purwokerto'],
            ['Solo Balapan', 'Solo'],
            ['Medan', 'Medan'],
        ];

        $data = $daftar[$index % count($daftar)];
        $index++;

        return [
            'nama_stasiun' => $data[0],
            'kota' => $data[1],
        ];
    }
}
