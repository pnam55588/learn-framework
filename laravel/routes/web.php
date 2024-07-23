<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});
// 

Route::prefix('/api')->group(function () {
    Route::prefix('/auth')->group(function () {
        Route::controller(AuthController::class)->group(function () {
            Route::get('/register', 'register');
            Route::get('/login', 'login');
            Route::get('/test', 'test')->middleware('auth:sanctum');
        });
    });
    Route::prefix('/posts')->group(function () {
        Route::controller(PostController::class)->group(function () {
            Route::get('/{id}', 'show')->middleware('auth:sanctum');
            Route::post('/', 'store')->middleware('auth:sanctum');
        });
    });
});