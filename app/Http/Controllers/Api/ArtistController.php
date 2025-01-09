<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Artist;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ArtistController extends Controller
{
    public function index(Request $request): JsonResponse
    {

        $artistId = $request->input('id', null);
        $artistSlug = $request->input('slug', null);

        // Ambil parameter 'sort_by' dari query string, default ke 'name' jika tidak ada
        $sortBy = $request->input('sort_by', 'name');
        $searchTerm = $request->input('search', null);  // Untuk pencarian berdasarkan nama artis

        // Mulai query untuk mengambil artis
        $query = Artist::with(['albums', 'songs'])
            ->withCount([
                'songs as translyrics_count' => function ($query) {
                    $query->whereHas('lyrics', function ($query) {
                        $query->where('type', 'translyrics');
                    })->distinct();  // Pastikan setiap song hanya dihitung sekali
                }
            ]);

        // Filter berdasarkan id jika ada
        if ($artistId) {
            // Cari album berdasarkan ID
            $artist = $query->where('id', $artistId)->first();

            // Jika album ditemukan, lakukan increment pada views
            if ($artist) {
                $artist->increment('views');
            }

            // Kembalikan response dengan data album yang ditemukan
            return response()->json([
                'success' => true,
                'message' => 'Artist retrieved successfully.',
                'data' => $artist,
            ], 200);
        }

        // Filter berdasarkan slug jika ada
        if ($artistSlug) {
            // Cari album berdasarkan ID
            $artist = $query->where('slug', $artistSlug)->first();

            // Jika album ditemukan, lakukan increment pada views
            if ($artist) {
                $artist->increment('views');
            }

            // Kembalikan response dengan data album yang ditemukan
            return response()->json([
                'success' => true,
                'message' => 'Artist retrieved successfully.',
                'data' => $artist,
            ], 200);
        }


        // Jika ada pencarian berdasarkan nama, tambahkan kondisi pencarian
        if ($searchTerm) {
            $query->where('name', 'like', '%' . $searchTerm . '%');
        }

        // Pengurutan berdasarkan parameter 'sort_by'
        if ($sortBy == 'views') {
            // Urutkan berdasarkan views (misalnya berdasarkan jumlah views yang sudah terhitung)
            $query->orderBy('views', 'desc');
        } elseif ($sortBy == 'name') {
            // Urutkan berdasarkan nama artis
            $query->orderBy('name', 'asc');
        } elseif ($sortBy == 'newest') {
            // Urutkan berdasarkan waktu penambahan terbaru
            $query->orderBy('created_at', 'desc');
        } else {
            // Default pengurutan (misalnya berdasarkan views jika parameter tidak valid)
            $query->orderBy('name', 'asc');
        }

        // Ambil hasil query
        $artists = $query->get();

        return response()->json([
            'success' => true,
            'message' => 'All artists retrieved successfully.',
            'data' => $artists,
        ], 200);
    }
}
