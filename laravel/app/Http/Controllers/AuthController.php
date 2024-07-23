<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function test(){
        return response()->json([
            'message' => 'Hello World',
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:10',
            'email' => 'required|string|email|max:20|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'id' => 'USR_' . time(),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            
        ]);

        $accessToken = $user->createToken('authToken')->plainTextToken;
        $refreshToken = $user->createToken('refreshToken')->plainTextToken;

        return response()->json(['user' => $user]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['profile' => $user, 'token'=>$token]);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out',
        ]);
    }
}
