<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Models\LikePost;
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

        return response()->json($posts);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param \App\Http\Requests\StorePostRequest $request
     * @return \Illuminate\Http\Response
     */
    // public function store(Request $request)
    // {
      
    // }

    /**
     * Display the specified resource.
     *  @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        $post = Post::with('comments.likes')->find($post);
        return response()->json(['data' => $post]);

       

        return response()->json([
            
            'posts' => $post->admin->posts->map(function ($post) {
                return [
                    'post_id' => $post->id,
                    'creator_id'=>$post->creator_id,
                    'description' => $post->description,
                    'field' => $post->field,
                    'comments' => $post->comments,
                    'image' => $post->image,
                    'updated_at' => $post->updated_at->toISOString(),
                    'likes' => $post->likes->map(function ($like) {
                        return [
                            'liker' => $like->liker_id,
                            'updated_at' => $like->updated_at->toISOString(),
                        ];
                    })
                ];
            }),
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
            'comments'=>"required",
            'image'=>'required',
            'updated_at'=>'required|datetime',
        ]);

        $_post = Post::find($post);

        $_post->update($data);
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        // Find the post by ID
        $post = Post::find($post);

        if (!$post) {
            return response()->json(['success' => false, 'post' => ' post not found'], 404);
        }

        
        $post->post()->detach();

        // Delete chats and associated like chats
        $post->admin->post()->each(function ($post) {
            $post->likePost()->delete();
            $post->delete();
        });

        // Delete the post
        $post->delete();

        return response()->json(['success' => true, 'post' => 'post deleted successfully']);
    }
}
