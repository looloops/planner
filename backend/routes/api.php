<?php

use App\Models\WidgetDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WidgetController;
use App\Http\Controllers\Api\WidgetDetailController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('user/widgets/{id}', [WidgetController::class, 'show'])->name('api.widget.show');
Route::put('user/widgets/edit/{id}', [WidgetDetailController::class, 'update'])->name('api.widget.update');
Route::get('/widgets', [WidgetDetailController::class, 'index'])->name('api.widgets.index');
Route::get('/users/{id}', [RegisteredUserController::class, 'show'])->name('users.show')->middleware(['auth:sanctum']);