<?php

namespace Database\Factories;

use App\Enums\Role;
use App\Models\Penumpang;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Penumpang>
 */
class PenumpangFactory extends Factory
{
    protected $model = Penumpang::class;

    public function definition(): array
    {
        return [
            'nama' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'no_hp' => fake()->numerify('08##########'),
            'password' => 'password',
            'role' => Role::User,
        ];
    }

    public function admin(): static
    {
        return $this->state(fn () => ['role' => Role::Admin]);
    }
}
