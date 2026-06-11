<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stasiun extends Model
{
    protected $table = 'stasiun';
    protected $primaryKey = 'id_stasiun';

    protected $fillable = [
        'nama_stasiun',
        'kota',
    ];

    public function jadwalAsal()
    {
        return $this->hasMany(Jadwal::class, 'id_stasiun_asal');
    }

    public function jadwalTujuan()
    {
        return $this->hasMany(Jadwal::class, 'id_stasiun_tujuan');
    }
}
