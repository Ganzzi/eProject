<?php

namespace App\Http\Controllers\Admin;

use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Models\User;
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

        return response()->json($posts->map(function ($_post) {

            $user = User::find($_post->creator_id);

            $creator_name = $user->name;
            $creator_image = $user->image;

            return [
                "id" => $_post->id,
                "creator_id" => $_post->creator_id,
                'lock' => $_post->lock,
                "description" => $_post->description,
                "image" => $_post->image,
                "created_at" => $_post->created_at,
                "updated_at" => $_post->updated_at,
                'creator_name' => $creator_name,
                'creator_image' => $creator_image,
                "likes" => $_post->likes,
                "comments" => $_post->comments,
            ];
        }));
    }

    /**
     * Display the specified resource.
     *  @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show($post)
    {
        $_post = Post::with('likes', 'comments.likes')->find($post);

        $user = User::find($_post->creator_id);

        $creator_name = $user->name;
        $creator_image = $user->image;

        return response()->json([
            "id" => $_post->id,
            "creator_id" => $_post->creator_id,
            "description" => $_post->description,
            "image" => $_post->image,
            "lock" => $_post->lock,
            "created_at" => $_post->created_at,
            "updated_at" => $_post->updated_at,
            'creator_name' => $creator_name,
            'creator_image' => $creator_image,
            "likes" => $_post->likes,
            "comments" => $_post->comments,
        ]);
    }

    /**
     * Update the specified resource in storage.
     * * @param \App\Http\Requests\Request $request
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        // Retrieve the validated form data from the request
        $data = $request->validate([
            'description' => 'required|string|max:500',
            'lock' => 'required'
        ]);

        $post->update($data);

        return response()->json(['message' => 'Update success'], 202);
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->likes()->delete();

        // Delete chats and associated like chats
        $post->comments()->each(function ($comment) {
            $comment->likes()->delete();
            $comment->delete();
        });


        $post->delete();

        return response()->json(['success' => true, 'message' => 'Post deleted successfully']);
    }
}
