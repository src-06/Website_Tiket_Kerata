<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Table('stasiun', key: 'id_stasiun')]
#[Fillable(['nama_stasiun', 'kota'])]
class Stasiun extends Model
{
    use HasFactory;

    public function jadwalAsal()
    {
        return $this->hasMany(Jadwal::class, 'id_stasiun_asal');
    }

    public function jadwalTujuan()
    {
        return $this->hasMany(Jadwal::class, 'id_stasiun_tujuan');
    }
}
