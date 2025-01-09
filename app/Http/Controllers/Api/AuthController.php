<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    // Fungsi untuk mengecek status user berdasarkan token
    public function checkUser(Request $request): JsonResponse
    {
        // Mengambil user yang terautentikasi
        $user = $request->user();

        // Jika user tidak ditemukan (tidak terautentikasi)
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthenticated',
            ], 401);
        }

        // Mengembalikan informasi user dan apakah dia admin
        return response()->json([
            'success' => true,
            'data' => [
                'is_admin' => $user->isAdmin(), // Menggunakan metode isAdmin() untuk mengecek status admin
            ],
        ]);
    }

    // Fungsi untuk login
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if (!$user->isAdmin()) {
            return response()->json([
                'success' => false,
                'message' => 'You are not authorized to access this resource.',
            ], 403);
        }

        // Tentukan waktu kedaluwarsa token (misalnya 24 jam)
        $token = $user->createToken('Admin-Token', ['*'], now()->addHours(24))->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'token' => $token,
            ],
        ], 200);
    }

    // Fungsi untuk signup (pendaftaran)
    public function signup(Request $request): JsonResponse
    {

        if (env('APP_ENV') === 'production') {
            abort(403, 'Signup is disabled in production');
        }

        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'name' => 'required|string|max:255',
        ]);

        // Membuat user baru
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Meng-hash password sebelum disimpan
        ]);

        if ($user->email === env('ADMIN_EMAIL')) {
            $user->is_admin = true;
            $user->save();
        }

        // Jika user berhasil dibuat, buatkan token untuk user
        $token = $user->createToken('Token', ['*'], now()->addHours(24))->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => [
                'token' => $token,
            ],
        ], 201);
    }

    // Fungsi logout
    public function logout(Request $request): JsonResponse
    {
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ], 200);
    }
}
