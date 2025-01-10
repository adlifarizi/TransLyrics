<?php

use App\Http\Controllers\Api\AdminAlbumController;
use App\Http\Controllers\Api\AdminArtistController;
use App\Http\Controllers\Api\AdminCommentController;
use App\Http\Controllers\Api\AdminLyricsController;
use App\Http\Controllers\Api\AdminSongController;
use App\Http\Controllers\Api\AlbumController;
use App\Http\Controllers\Api\ArtistController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\LyricsController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\SongController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route untuk Testing
Route::get('/test', function () {
    return response()->json([
        'message' => 'Test API Ver 1.0',
        'status' => 200
    ]);
});

// Route Admin
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/user', [AuthController::class, 'checkUser'])->middleware('auth:sanctum');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::prefix('/admin/artists')->group(function () {
    Route::get('/', [AdminArtistController::class, 'index'])->middleware('auth:sanctum');
    Route::get('/list', [AdminArtistController::class, 'listArtists'])->middleware('auth:sanctum');
    Route::post('/', [AdminArtistController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/{id}', [AdminArtistController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [AdminArtistController::class, 'destroy'])->middleware('auth:sanctum');
});

Route::prefix('/admin/albums')->group(function () {
    Route::get('/', [AdminAlbumController::class, 'index'])->middleware('auth:sanctum');
    Route::get('/list', [AdminAlbumController::class, 'listAlbums'])->middleware('auth:sanctum');
    Route::post('/', [AdminAlbumController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/{id}', [AdminAlbumController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [AdminAlbumController::class, 'destroy'])->middleware('auth:sanctum');
});

Route::prefix('/admin/songs')->group(function () {
    Route::get('/', [AdminSongController::class, 'index'])->middleware('auth:sanctum');
    Route::post('/', [AdminSongController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/{id}', [AdminSongController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [AdminSongController::class, 'destroy'])->middleware('auth:sanctum');
});

Route::prefix('/admin/lyrics')->group(callback: function () {
    Route::post('/', [AdminLyricsController::class, 'store'])->middleware('auth:sanctum');
    Route::put('/{id}', [AdminLyricsController::class, 'update'])->middleware('auth:sanctum');
    Route::delete('/{id}', [AdminLyricsController::class, 'destroy'])->middleware('auth:sanctum');
});

Route::prefix('/admin/comments')->group(function () {
    Route::get('/', [AdminCommentController::class, 'index'])->middleware('auth:sanctum');
    Route::delete('/{id}', [AdminCommentController::class, 'destroy'])->middleware('auth:sanctum');
});

// Route User
Route::get('/search', [SearchController::class, 'search']);

Route::prefix('artists')->group(function () {
    Route::get('/', [ArtistController::class, 'index']); // Mengambil semua artis
});

Route::prefix('albums')->group(function () {
    Route::get('/', [AlbumController::class, 'index']); // Mengambil semua lagu
});

Route::prefix('songs')->group(function () {
    Route::get('/', [SongController::class, 'index']); // Mengambil semua lagu
    Route::post('/', [SongController::class, 'store']); // Menambah lagu baru
    Route::put('/{id}', [SongController::class, 'update']); // Mengupdate lagu
    Route::delete('/{id}', [SongController::class, 'destroy']); // Menghapus lagu
});

Route::prefix('lyrics')->group(callback: function () {
    Route::get('/', [LyricsController::class, 'index']); // Mengambil semua lirik
});

Route::prefix('comments')->group(callback: function () {
    Route::post('/', [CommentController::class, 'store']); // Menambah lirik baru
});

