<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Table('detail_tiket', key: 'id_detail_kursi')]
#[Fillable(['id_tiket', 'id_penumpang', 'nama_kursi', 'harga_satuan'])]
class DetailTiket extends Model
{
    public function tiket(): BelongsTo
    {
        return $this->belongsTo(Tiket::class, 'id_tiket');
    }

    public function penumpang(): BelongsTo
    {
        return $this->belongsTo(Penumpang::class, 'id_penumpang');
    }
}
