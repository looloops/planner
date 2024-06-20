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
            'widgets_layout' => json_encode([
                [

                    "lg" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                    ],
                    "md" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                    ],
                    "sm" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                    ],
                    "xs" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                    ],
                    "xxs" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                    ],


                ],
            ]),

        ]);

        User::factory()->create([
            'id' => 2,
            'name' => 'looloops',
            'email' => 'l@l.l',
            'role' => 'guest',
            'password' => 'password',
            'profile_img' => '/storage/profiles/default-profile.jpg',
            'widgets_layout' => json_encode([
                [

                    "lg" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                    ],
                    "md" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                    ],
                    "sm" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                    ],
                    "xs" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                    ],
                    "xxs" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true],
                    ],


                ],
            ]),


        ]);

        User::factory()->create([
            'id' => 3,
            'name' => 'dama',
            'email' => 'd@d.d',
            'role' => 'guest',
            'password' => 'password',
            'profile_img' => '/storage/profiles/default-profile.jpg',
            'widgets_layout' => json_encode([
                [

                    "lg" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                    ],
                    "md" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                    ],
                    "sm" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                    ],
                    "xs" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                    ],
                    "xxs" => [
                        ["i" => "1", "x" => 0, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                        ["i" => "2", "x" => 2, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                        ["i" => "3", "x" => 4, "y" => 0, "w" => 2, "h" => 2, "static" => true,],
                    ],


                ],
            ]),
        ]);


        $this->call([
            PlanSeeder::class,
            WidgetSeeder::class,
            WidgetDetailSeeder::class,
        ]);
    }
}
