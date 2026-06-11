<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('penumpang', key: 'id_penumpang')]
#[Fillable(['nama', 'email', 'no_hp'])]
class Penumpang extends Model
{
    public function tikets()
    {
        return $this->hasMany(Tiket::class, 'id_penumpang');
    }
}
