<?php

namespace Database\Factories;

use App\Models\Kereta;
use Illuminate\Database\Eloquent\Factories\Factory;

class KeretaFactory extends Factory
{
    protected $model = Kereta::class;

    private static array $daftarKereta = [
        ['Argo Parahyangan', 'Eksekutif'],
        ['Taksaka', 'Eksekutif'],
        ['Bima', 'Bisnis'],
        ['Sancaka', 'Ekonomi'],
        ['Joglokerto', 'Eksekutif'],
        ['Argo Bromo Anggrek', 'Eksekutif'],
        ['Gajayana', 'Bisnis'],
        ['Mutiara Selatan', 'Ekonomi'],
        ['Turangga', 'Eksekutif'],
        ['Logawa', 'Ekonomi'],
    ];

    public function definition(): array
    {
        $data = fake()->randomElement(self::$daftarKereta);

        return [
            'nama_kereta' => $data[0],
            'kelas' => $data[1],
        ];
    }
}
