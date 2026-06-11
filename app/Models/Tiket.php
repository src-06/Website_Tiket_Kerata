<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('tiket', key: 'id_tiket')]
#[Fillable(['id_penumpang', 'id_jadwal', 'kursi', 'harga', 'status_pembayaran'])]
class Tiket extends Model
{
    public function penumpang()
    {
        return $this->belongsTo(Penumpang::class, 'id_penumpang');
    }

    public function jadwal()
    {
        return $this->belongsTo(Jadwal::class, 'id_jadwal');
    }

    public function pembayaran()
    {
        return $this->hasOne(Pembayaran::class, 'id_tiket');
    }
}
