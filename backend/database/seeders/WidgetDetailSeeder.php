<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Widget;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class WidgetDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $users = User::all()->all();
        // $user_ids = User::all()->pluck('id')->all();
        $widget_ids = Widget::all()->pluck('id')->all();

        // Do not json_encode SETTINGS as your model will handle the conversion

        foreach ($users as $user) {
            foreach ($widget_ids as $widget_id) {
                $user->widgets()->attach($widget_id, [
                    'settings' => [
                        'position_x' => fake()->randomNumber(),
                        'position_y' => fake()->randomNumber(),
                        'title' => fake()->sentence,
                        'description' => fake()->sentence,
                        'start' => fake()->date(),
                        'finish' => fake()->date(),
                        'deadline' => fake()->date(),
                        'priority' => fake()->word,
                    ],
                    'status' => fake()->boolean
                ]);
            }
        }
    }

}




