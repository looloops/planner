<?php

namespace Database\Seeders;

use App\Models\Widget;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class WidgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Widget::factory()->create([
            'name' => "agenda",
            'description' => "your appointments",
            'field_list' => json_encode([
                "title",
                "description",
                "start",
                "finish",
                "deadline",
                "priority"
            ])
        ]);

        Widget::factory()->create([
            'name' => "goals",
            'description' => "the goals you aim towards",
            'field_list' => json_encode([
                "title",
                "description",
                "priority"
            ])
        ]);

        Widget::factory()->create([
            'name' => "media",
            'description' => "your favourite media",
            'field_list' => json_encode([
                "title",
                "description",
                "start",
                "finish",
                "deadline",
                "priority"
            ])
        ]);


        Widget::factory()->create([
            'name' => "recipes",
            'description' => "your favourite recipes",
            'field_list' => json_encode([
                "img",
                "type",
                "title",
                "description",
            ])
        ]);


        Widget::factory()->create([
            'name' => "journal",
            'description' => "your favourite memories",
            'field_list' => json_encode([
                "date",
                "title",
                "content",
            ])
        ]);

        Widget::factory()->create([
            'name' => "todos",
            'description' => "your to-dos list",
            'field_list' => json_encode([
                "title",
                "description",
                "priority",
                "status",
            ])
        ]);


        Widget::factory()->create([
            'name' => "daily_schedule",
            'description' => "your schedule for the day",
            'field_list' => json_encode([
                "title",
                "description",
                "priority",
                "status",
            ])
        ]);

        Widget::factory()->create([
            'name' => "habit_tracker",
            'description' => "keeping track of your habits",
            'field_list' => json_encode([
                "title",
                "description",
                "type",
                "status",
            ])
        ]);

        Widget::factory()->create([
            'name' => "mood_tracker",
            'description' => "keeping track of your feelings",
            'field_list' => json_encode([
                "title",
                "description",
                "type",
                "status",
            ])
        ]);
    }
}
