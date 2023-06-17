<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show($user)
    {
        return response()->json(User::find($user));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User   $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $user)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'nullable|email|unique:users',
            'image' => 'nullable|image',
            'bio' => 'required',
            'gender' => 'required',
        ]);

        if (isset($data['image'])) {
            $data['image'] =  basename($data['image']->store('public/images'));
        }

        $_user = User::find($user);

        $_user->update($data);

        return response()->json($_user);
    }


    public function searchByName(Request $request)
    {
    }
}
