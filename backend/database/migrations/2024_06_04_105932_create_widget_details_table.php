<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('widget_details', function (Blueprint $table) {
            $table->id();
            $table->json('settings'); //oggetto convertito in json 
            $table->foreignId('user_id')->constrained(); // onDelete('cascade') farlo con il detach
            $table->foreignId('widget_id')->constrained(); // onDelete('cascade') farlo con il detach
            $table->timestamps();//non necessario
        });
    }



    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('widget_details');
    }
};