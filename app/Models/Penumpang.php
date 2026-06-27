<?php

namespace App\Models;

use App\Enums\Role;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Table('penumpang', key: 'id_penumpang')]
#[Fillable(['nama', 'email', 'no_hp', 'password', 'role'])]
#[Hidden(['password'])]
class Penumpang extends Authenticatable
{
    use HasFactory, Notifiable;

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'role' => Role::class,
        ];
    }

    public function tikets(): HasMany
    {
        return $this->hasMany(Tiket::class, 'id_penumpang');
    }
}
