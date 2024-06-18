<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Widget;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\WidgetDetail>
 */
class WidgetDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $users = User::all()->all();
        $user_ids = User::all()->pluck('id')->all();
        $widget_ids = Widget::all()->pluck('id')->all();

        return [

            'user_id' => fake()->randomElement($user_ids),
            'widget_id' => fake()->randomElement($widget_ids),
            'settings' => json_encode([
                'id' => 1,
                'title' => fake()->sentence,
                'description' => fake()->sentence,
                'start' => fake()->date(),
                'finish' => fake()->date(),
                'deadline' => fake()->date(),
                'priority' => fake()->word,
            ]),



        ];


    }
}





