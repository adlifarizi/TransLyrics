<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Album;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdminAlbumController extends Controller
{
    // Menampilkan semua album
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        // Jika user tidak ditemukan (tidak terautentikasi)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

        $artistId = $request->input('artist_id', null);
        $albumId = $request->input('id', null);

        // Ambil parameter 'sort_by' dari query string, default ke 'title' jika tidak ada
        $sortBy = $request->input('sort_by', 'title');
        // Ambil parameter 'search' untuk pencarian berdasarkan nama album
        $searchTerm = $request->input('search', null);

        // Mulai query untuk mengambil album
        $query = Album::with(['artist', 'songs'])
            ->withCount([
                'songs as translyrics_count' => function ($query) {
                    $query->whereHas('lyrics', function ($query) {
                        $query->where('type', 'translyrics');
                    })->distinct();  // Pastikan setiap song hanya dihitung sekali
                }
            ]);

        // Filter berdasarkan artist_id jika ada
        if ($artistId) {
            $query->where('artist_id', $artistId);
        }

        // Filter berdasarkan id album jika ada
        if ($albumId) {
            // Cari album berdasarkan ID
            $album = $query->where('id', $albumId)->first();

            // Kembalikan response dengan data album yang ditemukan
            return response()->json([
                'success' => true,
                'message' => 'Album retrieved successfully.',
                'data' => $album,
            ], 200);
        }

        // Jika tidak ada album_id, lanjutkan untuk mengambil daftar album
        // Jika ada pencarian berdasarkan nama album, tambahkan kondisi pencarian
        if ($searchTerm) {
            $query->where('title', 'like', '%' . $searchTerm . '%');
        }

        // Pengurutan berdasarkan parameter 'sort_by'
        if ($sortBy == 'views') {
            // Urutkan berdasarkan views secara menurun
            $query->orderBy('views', 'desc');
        } elseif ($sortBy == 'title') {
            // Urutkan berdasarkan nama album (judul)
            $query->orderBy('title', 'asc');
        } elseif ($sortBy == 'release_date') {
            // Urutkan berdasarkan tanggal rilis (misalnya berdasarkan tanggal rilis album)
            $query->orderBy('release_date', 'desc');
        } elseif ($sortBy == 'newest') {
            // Urutkan berdasarkan waktu penambahan terbaru
            $query->orderBy('created_at', 'desc');
        } else {
            // Default pengurutan (misalnya berdasarkan judul jika parameter tidak valid)
            $query->orderBy('title', 'asc');
        }

        // Ambil hasil query untuk daftar album
        $albums = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'All albums retrieved successfully.',
            'data' => $albums,
        ], 200);
    }

    public function listAlbums(Request $request): JsonResponse
    {
        $user = $request->user();

        // Jika user tidak ditemukan (tidak terautentikasi)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

        // Ambil parameter opsional 'artist_id'
        $artistId = $request->input('artist_id', null);

        // Mulai query untuk mengambil album
        $query = Album::select('id', 'artist_id', 'title');

        // Jika artist_id diberikan, tambahkan filter
        if ($artistId) {
            $query->where('artist_id', $artistId);
        }

        // Urutkan berdasarkan judul album secara ascending
        $albums = $query->orderBy('title', 'asc')->get();

        return response()->json([
            'success' => true,
            'message' => 'Albums retrieved successfully.',
            'data' => $albums,
        ], 200);
    }


    // Menambah album baru
    public function store(Request $request): JsonResponse
    {
        $user = $request->user();

        // Jika user tidak ditemukan (tidak terautentikasi)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:albums,slug',
            'original_title' => 'nullable|string|max:255',
            'alternate_title' => 'nullable|string|max:255',
            'artist_id' => 'required|exists:artists,id',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'release_year' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images/albums', 'public');
            $validatedData['image'] = Storage::url($imagePath);
        }

        $album = Album::create($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Album created successfully.',
            'data' => $album,
        ], 201);
    }

    // Mengupdate album berdasarkan ID
    public function update(Request $request, int $id): JsonResponse
    {
        $user = $request->user();

        // Jika user tidak ditemukan (tidak terautentikasi)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

        $album = Album::find($id);

        if (!$album) {
            return response()->json([
                'success' => false,
                'message' => 'Album not found.',
                'data' => null,
            ], 404);
        }

        $validatedData = $request->validate([
            'title' => 'nullable|string|max:255',
            'original_title' => 'nullable|string|max:255',
            'alternate_title' => 'nullable|string|max:255',
            'artist_id' => 'nullable|exists:artists,id',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'release_year' => 'nullable|integer',
        ]);

        if ($request->hasFile('image')) {
            if ($album->image) {
                $oldImagePath = str_replace(Storage::url(''), '', $album->image);
                Storage::disk('public')->delete($oldImagePath);
            }

            $imagePath = $request->file('image')->store('images/albums', 'public');
            $validatedData['image'] = Storage::url($imagePath);
        }

        $album->update($validatedData);

        return response()->json([
            'success' => true,
            'message' => 'Album updated successfully.',
            'data' => $album,
        ], 200);
    }

    // Menghapus album berdasarkan ID
    public function destroy(Request $request, int $id): JsonResponse
    {
        $user = $request->user();

        // Jika user tidak ditemukan (tidak terautentikasi)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

        $album = Album::find($id);

        if (!$album) {
            return response()->json([
                'success' => false,
                'message' => 'Album not found.',
                'data' => null,
            ], 404);
        }

        if ($album->image) {
            $imagePath = str_replace(Storage::url(''), '', $album->image);
            Storage::disk('public')->delete($imagePath);
        }

        $album->delete();

        return response()->json([
            'success' => true,
            'message' => 'Album deleted successfully.',
            'data' => null,
        ], 200);
    }
}
