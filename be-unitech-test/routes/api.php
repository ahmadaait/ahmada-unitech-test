<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'v1'], function () {
    Route::post('/login', [App\Http\Controllers\Api\Auth\LoginController::class, 'index']);

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('/refresh', [App\Http\Controllers\Api\Auth\LoginController::class, 'refreshToken']);
        Route::get('/profile', [App\Http\Controllers\Api\Auth\LoginController::class, 'profile']);
        Route::post('/logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);

        Route::get('/categories', [App\Http\Controllers\Api\Category\CategoryController::class, 'index']);
        Route::get('/categories/{id}', [App\Http\Controllers\Api\Category\CategoryController::class, 'show']);
        Route::post('/categories', [App\Http\Controllers\Api\Category\CategoryController::class, 'store']);
        Route::put('/categories/{id}', [App\Http\Controllers\Api\Category\CategoryController::class, 'edit']);
        Route::delete('/categories/{id}', [App\Http\Controllers\Api\Category\CategoryController::class, 'destroy']);

        Route::get('/images', [App\Http\Controllers\Api\Image\ImageController::class, 'index']);
        Route::get('/images/{id}', [App\Http\Controllers\Api\Image\ImageController::class, 'show']);
        Route::post('/images', [App\Http\Controllers\Api\Image\ImageController::class, 'store']);
        Route::post('/images/{id}', [App\Http\Controllers\Api\Image\ImageController::class, 'edit']);
        Route::delete('/images/{id}', [App\Http\Controllers\Api\Image\ImageController::class, 'destroy']);

        Route::get('/products', [App\Http\Controllers\Api\Product\ProductController::class, 'index']);
        Route::get('/products/{id}', [App\Http\Controllers\Api\Product\ProductController::class, 'show']);
        Route::post('/products', [App\Http\Controllers\Api\Product\ProductController::class, 'store']);
        Route::put('/products/{id}', [App\Http\Controllers\Api\Product\ProductController::class, 'edit']);
        Route::delete('/products/{id}', [App\Http\Controllers\Api\Product\ProductController::class, 'destroy']);

        Route::get('/statistics', [App\Http\Controllers\Api\Statistic\StatisticController::class, 'index']);
    });
});
