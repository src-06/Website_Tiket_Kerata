<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Penumpang extends Model
{
    protected $table = 'penumpang';
    protected $primaryKey = 'id_penumpang';

    protected $fillable = [
        'nama',
        'email',
        'no_hp',
    ];

    public function tikets()
    {
        return $this->hasMany(Tiket::class, 'id_penumpang');
    }
}
