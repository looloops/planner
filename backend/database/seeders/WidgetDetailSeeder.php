<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Widget;
use App\Models\WidgetDetail;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class WidgetDetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {


        WidgetDetail::factory(3)->create();

    }

}

    









