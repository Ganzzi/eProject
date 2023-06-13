<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Models\LikePost;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
     * Store a newly created resource in storage.
     * 
     * @param \App\Http\Requests\StorePostRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'creator_id' => 'required',
            'image' => 'nullable|image',
            'description' => 'nullable|string|max:100',
            'field' => 'nullable',
        ]);

        $filePath = isset($data['image']) ? basename($data['image']->store('public/images')) : null;

        $post = new Post();
        $post->creator_id = $data['creator_id'];
        $post->image = $filePath;
        $post->description = $data['description'];
        $post->field = $data['field'];

        $post->save();

        return response()->json(['post' => $post], 202);
    }


    /**
     * Display the specified resource.
     *  @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        // return response('hi');
        $_post = Post::with('likes', 'comments.likes')->find($post)->first();
        // return response($_post);

        $user = User::find($_post->creator_id);

        $creator_name = $user->name;
        $creator_image = $user->image;

        return response()->json([
            "id" => $_post->id,
            "creator_id" => $_post->creator_id,
            "description" => $_post->description,
            "image" => $_post->image,
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
        // return response()->json([$post]);

        $user = Auth::user();

        if ($post->creator_id != $user->id) {
            return response()->json(['You are not the creator']);
        }

        $post->description = $data['description'];
        $post->field = $data['field'];

        $post->save();

        return response()->json(['update success', 202]);
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
        $user = Auth::user();

        if ($post->creator_id != $user->id) {
            return response()->json(['You are not the creator']);
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
