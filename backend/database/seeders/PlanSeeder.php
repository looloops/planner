<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::factory()->create([
            'name' => 'free trial',
            'description' => 'free trial',
        ]);
        Plan::factory()->create([
            'name' => 'basic',
            'description' => 'basic plan',
        ]);
        Plan::factory()->create([
            'name' => 'full',
            'description' => 'full plan',
        ]);
    }
}
