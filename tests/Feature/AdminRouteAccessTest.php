<?php

namespace Tests\Feature;

use App\Models\Penumpang;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminRouteAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_admin_dashboard(): void
    {
        $this->get(route('admin.dashboard'))
            ->assertRedirect(route('login'));
    }

    public function test_regular_user_cannot_access_admin_dashboard(): void
    {
        $user = Penumpang::factory()->create();

        $this->actingAs($user)
            ->get(route('admin.dashboard'))
            ->assertForbidden();
    }

    public function test_admin_can_access_admin_dashboard(): void
    {
        $admin = Penumpang::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.dashboard'))
            ->assertOk();
    }

    public function test_guest_cannot_access_admin_crud_routes(): void
    {
        $this->get(route('admin.stasiun'))
            ->assertRedirect(route('login'));

        $this->get(route('admin.kereta'))
            ->assertRedirect(route('login'));
    }

    public function test_regular_user_cannot_mutate_admin_resources(): void
    {
        $user = Penumpang::factory()->create();

        $this->actingAs($user)
            ->post(route('admin.stasiun.store'), [
                'nama_stasiun' => 'Test',
                'kota' => 'Test',
            ])
            ->assertForbidden();
    }
}
