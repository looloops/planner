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
            //serializzazione: tecnica per dare una struttura di stringa JSON  e viceversa. 
            'field_list' => json_encode([
                "positionX",
                "positionY",
                "title",
                "description",
                "start",
                "finish",
                "deadline",
                "priority"
            ])
        ]);
    }
}


