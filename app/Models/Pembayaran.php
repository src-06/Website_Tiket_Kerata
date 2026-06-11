<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;

#[Table('pembayaran', key: 'id_pembayaran')]
#[Fillable(['id_tiket', 'tanggal_bayar', 'metode_bayar', 'jumlah'])]
class Pembayaran extends Model
{
    public function tiket()
    {
        return $this->belongsTo(Tiket::class, 'id_tiket');
    }
}
