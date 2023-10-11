<?php

namespace App\Http\Controllers\Api\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginController extends Controller
{
    /**
     * index
     *
     * @param  mixed $request
     * @return void
     */
    public function index(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');
        if (!$access_token = auth()->guard('api')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email or Password is incorrect'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'user'    => auth()->guard('api')->user(),
            'access_token'   => $access_token
        ], 200);
    }

    /**
     * profile
     *
     * @return void
     */
    public function profile()
    {
        return response()->json([
            'success' => true,
            'user'    => auth()->guard('api')->user()
        ], 200);
    }

    /**
     * refreshToken
     *
     * @param  mixed $request
     * @return void
     */
    public function refreshToken(Request $request)
    {
        $refresh_token = JWTAuth::refresh(JWTAuth::getToken());

        $user = JWTAuth::setToken($refresh_token)->toUser();

        $request->headers->set('Authorization', 'Bearer ' . $refresh_token);

        return response()->json([
            'success' => true,
            'user'    => $user,
            'access_token'   => $refresh_token,
        ], 200);
    }

    /**
     * logout
     *
     * @return void
     */
    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());

        return response()->json([
            'success' => true,
        ], 200);
    }
}
