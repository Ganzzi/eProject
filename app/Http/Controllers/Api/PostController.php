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
                "comments" => $_post->comments->map(function ($cmt) {
                    $_commentor = User::find($cmt->commentor_id);

                    return [
                        'commentor_id' =>  $cmt->commentor_id,
                        'created_at' => $cmt->created_at,
                        'id' => $cmt->id,
                        'id' => $cmt->id,
                        'post_id' => $cmt->post_id,
                        'reply_to' => $cmt->reply_to,
                        'text' => $cmt->text,
                        'likes' => $cmt->likes,
                        'user_image' => $_commentor->image,
                        'user_name' => $_commentor->name,
                    ];
                }),
            ];
        }));
    }

    public function getPostProfile($userid)
    {
        // return response()->json('dmm');

        $posts = Post::with('likes', 'comments.likes')->where('creator_id', $userid)->get();

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
                "comments" => $_post->comments->map(function ($cmt) {
                    $_commentor = User::find($cmt->commentor_id);

                    return [
                        'commentor_id' =>  $cmt->commentor_id,
                        'created_at' => $cmt->created_at,
                        'id' => $cmt->id,
                        'id' => $cmt->id,
                        'post_id' => $cmt->post_id,
                        'reply_to' => $cmt->reply_to,
                        'text' => $cmt->text,
                        'likes' => $cmt->likes,
                        'user_image' => $_commentor->image,
                        'user_name' => $_commentor->name,
                    ];
                }),
            ];
        }));

        // return response()->json(['posts' => $posts]);
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
        ]);

        $filePath = isset($data['image']) ? basename($data['image']->store('public/images')) : null;

        $post = new Post();
        $post->creator_id = $data['creator_id'];
        $post->image = $filePath;
        $post->description = $data['description'];

        $post->save();

        return response()->json(['post' => $post], 202);
    }

    /**
     * Update the specified resource in storage.
     * * @param \App\Http\Requests\Request $request
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            // 'image' => 'nullable|image',
            'description' => 'nullable|string|max:100',
        ]);

        $user = Auth::user();

        if ($post->creator_id != $user->id) {
            return response()->json(['message' => 'You are not the creator'], 403);
        }

        if (isset($data['description'])) {
            $post->description = $data['description'];
        }

        // $filePath = isset($data['image']) ? basename($data['image']->store('public/images')) : null;

        //  $post->image = $filePath;

        $post->save();

        return response()->json(['message' => 'Update success'], 202);
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        // lam lai
        $post->delete();

        return response("", 204);
    }
}
