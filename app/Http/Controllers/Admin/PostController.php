<?php

namespace App\Http\Controllers\Admin;

use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Models\LikePost;
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
            'creator_id'=>'required',
            'image'=> 'image',
        ]);
       
        if ($request->hasFile('image')) {
            // Get the uploaded file from the request
            $uploadedFile = $request->file('image');

            // Store the uploaded file in a public storage disk
            $filePath = $uploadedFile->store('public/images');
        } else {
            $filePath = null;}
           
        // $_post = Post::find($post);
        // return response()->json($post);
  
        $post->description = $data['description'];
        $post->creator_id = $data['creator_id'];
       $post->image = basename($filePath);
        $post->save();

        return response('Test success success');
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
