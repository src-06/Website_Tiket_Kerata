<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Table('jadwal', key: 'id_jadwal')]
#[Fillable(['id_kereta', 'id_stasiun_asal', 'id_stasiun_tujuan', 'waktu_berangkat', 'waktu_tiba', 'harga'])]
class Jadwal extends Model
{
    use HasFactory;

    protected function casts(): array
    {
        return [
            'waktu_berangkat' => 'datetime',
            'waktu_tiba' => 'datetime',
        ];
    }

    public function kereta()
    {
        return $this->belongsTo(Kereta::class, 'id_kereta');
    }

    public function stasiunAsal()
    {
        return $this->belongsTo(Stasiun::class, 'id_stasiun_asal');
    }

    public function stasiunTujuan()
    {
        return $this->belongsTo(Stasiun::class, 'id_stasiun_tujuan');
    }

    public function tikets()
    {
        return $this->hasMany(Tiket::class, 'id_jadwal');
    }
}
