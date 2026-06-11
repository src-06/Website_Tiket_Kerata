<?php

namespace Database\Seeders;

use App\Models\Stasiun;
use App\Models\Kereta;
use App\Models\Jadwal;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $gambir = Stasiun::create(['nama_stasiun' => 'Gambir', 'kota' => 'Jakarta']);
        $bandung = Stasiun::create(['nama_stasiun' => 'Bandung', 'kota' => 'Bandung']);
        $surabaya = Stasiun::create(['nama_stasiun' => 'Surabaya Gubeng', 'kota' => 'Surabaya']);
        $yogyakarta = Stasiun::create(['nama_stasiun' => 'Yogyakarta', 'kota' => 'Yogyakarta']);
        $semarang = Stasiun::create(['nama_stasiun' => 'Semarang Tawang', 'kota' => 'Semarang']);
        $malang = Stasiun::create(['nama_stasiun' => 'Malang', 'kota' => 'Malang']);

        $argoParahyangan = Kereta::create(['nama_kereta' => 'Argo Parahyangan', 'kelas' => 'Eksekutif']);
        $taksaka = Kereta::create(['nama_kereta' => 'Taksaka', 'kelas' => 'Eksekutif']);
        $bima = Kereta::create(['nama_kereta' => 'Bima', 'kelas' => 'Bisnis']);
        $sancaka = Kereta::create(['nama_kereta' => 'Sancaka', 'kelas' => 'Ekonomi']);
        $joglokerto = Kereta::create(['nama_kereta' => 'Joglokerto', 'kelas' => 'Eksekutif']);

        Jadwal::create([
            'id_kereta' => $argoParahyangan->id_kereta,
            'id_stasiun_asal' => $gambir->id_stasiun,
            'id_stasiun_tujuan' => $bandung->id_stasiun,
            'waktu_berangkat' => '2026-06-15 07:00:00',
            'waktu_tiba' => '2026-06-15 10:30:00',
            'harga' => 200000,
        ]);

        Jadwal::create([
            'id_kereta' => $taksaka->id_kereta,
            'id_stasiun_asal' => $gambir->id_stasiun,
            'id_stasiun_tujuan' => $yogyakarta->id_stasiun,
            'waktu_berangkat' => '2026-06-15 08:00:00',
            'waktu_tiba' => '2026-06-15 14:00:00',
            'harga' => 350000,
        ]);

        Jadwal::create([
            'id_kereta' => $bima->id_kereta,
            'id_stasiun_asal' => $surabaya->id_stasiun,
            'id_stasiun_tujuan' => $malang->id_stasiun,
            'waktu_berangkat' => '2026-06-15 09:00:00',
            'waktu_tiba' => '2026-06-15 11:30:00',
            'harga' => 120000,
        ]);

        Jadwal::create([
            'id_kereta' => $sancaka->id_kereta,
            'id_stasiun_asal' => $yogyakarta->id_stasiun,
            'id_stasiun_tujuan' => $surabaya->id_stasiun,
            'waktu_berangkat' => '2026-06-15 10:00:00',
            'waktu_tiba' => '2026-06-15 15:00:00',
            'harga' => 180000,
        ]);

        Jadwal::create([
            'id_kereta' => $joglokerto->id_kereta,
            'id_stasiun_asal' => $semarang->id_stasiun,
            'id_stasiun_tujuan' => $yogyakarta->id_stasiun,
            'waktu_berangkat' => '2026-06-15 11:00:00',
            'waktu_tiba' => '2026-06-15 13:00:00',
            'harga' => 150000,
        ]);

        Jadwal::create([
            'id_kereta' => $argoParahyangan->id_kereta,
            'id_stasiun_asal' => $bandung->id_stasiun,
            'id_stasiun_tujuan' => $gambir->id_stasiun,
            'waktu_berangkat' => '2026-06-15 14:00:00',
            'waktu_tiba' => '2026-06-15 17:30:00',
            'harga' => 200000,
        ]);

        Jadwal::create([
            'id_kereta' => $taksaka->id_kereta,
            'id_stasiun_asal' => $yogyakarta->id_stasiun,
            'id_stasiun_tujuan' => $gambir->id_stasiun,
            'waktu_berangkat' => '2026-06-16 08:00:00',
            'waktu_tiba' => '2026-06-16 14:00:00',
            'harga' => 350000,
        ]);
    }
}
