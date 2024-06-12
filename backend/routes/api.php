<?php

use App\Models\WidgetDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WidgetController;
use App\Http\Controllers\Api\WidgetDetailController;
use App\Http\Controllers\Auth\RegisteredUserController;


// ROUTES PROTECTED WITH AUTHENTICATION
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// DISPLAY A SINGLE USER DATA
Route::get('/users/{id}', [RegisteredUserController::class, 'show'])->name('users.show')->middleware(['auth:sanctum']);

// DISPLAY ALL DATA FROM 'widget_details' TABLE AND 'widgets' TABLE EXTENDED
Route::get('/widgets', [WidgetDetailController::class, 'index'])->name('api.widgets.index');

// DISPLAY ALL DATA FROM 'widget_details' TABLE AND 'widgets' TABLE EXTENDED FOR A WIDGET WITH A SPECIFIC $widget_id AND $user_id
Route::get('user/widgets/{id}', [WidgetDetailController::class, 'singleWidgetUser'])->name('api.widget.show');

// DISPLAY ALL SETTINGS COLUMNS
Route::get('/widgets/settings', [WidgetDetailController::class, 'settings'])->name('api.widgets.settings');

// DISPLAY DATA FROM A SINGLE 'settings' FIELD IN 'widget_details' TABLE USING A SPECIFIC 'widget_id' e 'user_id'
Route::get('/widgets/settings/{widget_id}', [WidgetDetailController::class, 'singleWidgetSettings'])->name('api.widgets.single.settings');

// UPDATE DATA FROM A SINGLE 'settings' FIELD IN 'widget_details' TABLE USING A SPECIFIC 'widget_id' e 'user_id'
Route::put('user/widgets/edit/{id}', [WidgetDetailController::class, 'update'])->name('api.widget.update');


// DISPLAY DATA FROM ALL 'settings' FIELDS IN 'widget_details' TABLE OF SPECIFIC USER
Route::get('/user/settings', [WidgetDetailController::class, 'userSettings'])->name('api.user.settings');