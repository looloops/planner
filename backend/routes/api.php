<?php

use App\Http\Controllers\Api\WidgetDetailController;
use App\Models\WidgetDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/widgets', [WidgetDetailController::class, 'index'])->name('api.widgets.index');
