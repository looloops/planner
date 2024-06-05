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
            //serializzazione: tecnica per dare una struttura di stringa. 
            'field_list' => json_encode([
                "posizione-x",
                "posizione-y",
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


