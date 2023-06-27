<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Post;
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

    /**
     * Display specified user and post recource
     * * @param \App\Http\Requests\Request $request
     * @return \Illuminate\Http\Response $users, $posts
     */
    public function searchByName(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $name = $request->input('name');

        $users = User::where('name', 'like', "%$name%")->get();
        $posts = Post::where('description', 'like', "%$name%")->where('lock', '0')->get();


        return response()->json(['users' => $users, 'posts' => $posts]);
    }
}
