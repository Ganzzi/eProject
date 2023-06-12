<?php

namespace App\Http\Controllers\Admin;

use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Models\LikePost;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     * * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $posts = Post::with('likes', 'comments.likes')->get();

        return response()->json($posts);
    }

    /**
     * Display the specified resource.
     *  @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        // return response('hi');
        $_post = Post::with('likes', 'comments.likes')->find($post);

        return response()->json($_post);
    }

    /**
     * Update the specified resource in storage.
     * * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\Post                     $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'description' => 'required|string|max:100',
            'field' => 'required',
        ]);

        // $_post = Post::find($post);
        // return response()->json($post);

        $post->description = $data['description'];
        $post->field = $data['field'];

        $post->save();

        return response('success');
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        if (!$post) {
            return response()->json(['success' => false, 'message' => 'not found'], 404);
        }

        $post->likes()->delete();

        // Delete chats and associated like chats
        $post->comments()->each(function ($comment) {
            $comment->likes()->delete();
            $comment->delete();
        });

        // Delete the chat room
        $post->delete();

        return response()->json(['success' => true, 'message' => 'Chat room deleted successfully']);
    }
}
