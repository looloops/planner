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

// DISPLAY ALL DATA FROM 'widget_details' TABLE AND 'widgets' TABLE EXTENDED SPECIFIC TO A SINGLE WIDGET & USER ($widget_id AND $user_id)
Route::get('user/widgets/{id}', [WidgetDetailController::class, 'singleWidgetUser'])->name('api.widget.show');

// DISPLAY DATA FROM ALL 'settings' COLUMNS IN 'widget_details' TABLE WITH A SPECIFIC 'user_id'
Route::get('/user/settings', [WidgetDetailController::class, 'allUserSettings'])->name('api.user.settings');


// ------------ ENDPOINTS FOR SETTINGS OF A SPECIFIC WIDGET OF A SPECIFIC USER  ------------ 

// DISPLAY DATA FROM A SINGLE 'settings' FIELD IN 'widget_details' TABLE USING A SPECIFIC 'widget_id' AND 'user_id'
Route::get('/widgets/settings/{widget_id}', [WidgetDetailController::class, 'singleWidgetSettings'])->name('api.widgets.single.settings');

// UPDATE OR DELETE DATA FROM A SINGLE 'settings' FIELD IN 'widget_details' TABLE USING A SPECIFIC 'widget_id' AND 'user_id'
Route::put('user/widgets/edit/{id}', [WidgetDetailController::class, 'update'])->name('api.widget.update');
