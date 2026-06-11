<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Table('kereta', key: 'id_kereta')]
#[Fillable(['nama_kereta', 'kelas'])]
class Kereta extends Model
{
    use HasFactory;

    public function jadwals()
    {
        return $this->hasMany(Jadwal::class, 'id_kereta');
    }
}
