<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Jadwal extends Model
{
    protected $table = 'jadwal';
    protected $primaryKey = 'id_jadwal';

    protected $fillable = [
        'id_kereta',
        'id_stasiun_asal',
        'id_stasiun_tujuan',
        'waktu_berangkat',
        'waktu_tiba',
        'harga',
    ];

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
