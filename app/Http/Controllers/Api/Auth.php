<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
// use User;

class Auth extends Controller
{

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        // Check if an image was uploaded
        if ($request->hasFile('image')) {
            // Get the uploaded file from the request
            $uploadedFile = $request->file('image');

            // Store the uploaded file in a public storage disk
            $filePath = $uploadedFile->store('public/images');
        } else {
            $filePath = null;
        }

        // Create the user
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'role_id' => 2,
            'image' => basename($filePath)
        ]);

        // Generate token for the user
        $token = $user->createToken('main')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        if (!FacadesAuth::attempt($credentials)) {
            return response()->json([
                'message' => 'incorrect email or password',
            ], 422);
        }

        /** @var \App\Models\User $user */
        $user = FacadesAuth::user();
        $lock = $user->lock;

        if ($lock == 1) {
            return response()->json(['message' => 'This account was locked'], 422);
        }

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

    public function logout(Request  $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }

    public function submitForgetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
        ]);

        $token = Str::random(64);

        // DB::table('password_reset_tokens')->insert([
        //     'email' => $request->email,
        //     'token' => $token,
        //     'created_at' => Carbon::now()
        // ]);

        $message = 'Your password reset token: ' . $token;
        $subject = 'Test Email';

        Mail::raw($message, function ($mail) use ($request, $subject) {
            $mail->to($request->email);
            $mail->subject($subject);
        });

        return response()->json(['message', 'success!']);
    }

    /**
     * Write code on Method
     *
     * @return response()
     */
    public function submitResetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required|string|min:6|confirmed',
            'password_confirmation' => 'required'
        ]);

        $updatePassword = DB::table('password_reset_tokens')
            ->where([
                'email' => $request->email,
                'token' => $request->token
            ])
            ->first();

        if (!$updatePassword) {
            return response('error', 'Invalid token!');
        }

        $user = User::where('email', $request->email)
            ->update(['password' => Hash::make($request->password)]);

        DB::table('password_resets')->where(['email' => $request->email])->delete();

        return response('message', 'Your password has been changed!');
    }
}
