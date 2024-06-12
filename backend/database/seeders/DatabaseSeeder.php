<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'id' => 1,
            'name' => 'admin',
            'email' => 'a@a.a',
            'role' => 'admin',
            'password' => 'password',
            'profile_img' => '/storage/profiles/default-profile.jpg',
        ]);

        User::factory()->create([
            'id' => 2,
            'name' => 'looloops',
            'email' => 'l@l.l',
            'role' => 'guest',
            'password' => 'password',
            'profile_img' => '/storage/profiles/default-profile.jpg',
        ]);

        User::factory()->create([
            'id' => 3,
            'name' => 'dama',
            'email' => 'd@d.d',
            'role' => 'guest',
            'password' => 'password',
            'profile_img' => '/storage/profiles/default-profile.jpg',
        ]);


        $this->call([
            PlanSeeder::class,
            WidgetSeeder::class,
            WidgetDetailSeeder::class,
        ]);
    }
}
