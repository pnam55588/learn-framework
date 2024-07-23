<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Route;



// Route::prefix('/api')->group(function () {
//     Route::prefix('/auth')->group(function () {
//         Route::controller(AuthController::class)->group(function () {
//             Route::get('/register', 'register');
//             Route::get('/login', 'login');
//             Route::get('/test', 'test')->middleware('auth:sanctum');
//         });
//     });
//     Route::prefix('/posts')->group(function () {
//         Route::controller(PostController::class)->group(function () {
//             Route::get('/{id}', 'show')->middleware('auth:sanctum');
//         });
//     });
// });