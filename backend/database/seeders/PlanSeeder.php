<?php

namespace Database\Seeders;

use App\Models\Plan;
use App\Models\User;
use App\Models\Widget;
use Illuminate\Support\Carbon;
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

$users = User::all()->all();
$user_ids = User::all()->pluck('id')->all();
 $plan_ids = Plan::all()->pluck('id')->all();
 $startPlan = Carbon::now();
 $endPlan = $startPlan->copy()->addDays(30);




       foreach ($users as $user) {
            foreach ($plan_ids as $plan_id) {
                $user->plans()->attach($plan_id, ['start_plan' => $startPlan, 'end_plan' =>  $endPlan] );
            }
        } 

    }
}
