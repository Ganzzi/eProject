<?php

namespace App\Http\Controllers\Api;

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
        /** @var \App\Models\Post $posts */
        $posts = Post::all();

        // $likes = $posts->likes();
        // $comments = $posts->comments();
        // $likes = 'like';
        // $comments = 'cmt';

        // return response()->json([
        //     'post' => $posts,
        //     'like' => $likes,
        //     'cmt' => $comments,
        // ]);
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param \App\Http\Requests\StorePostRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $post = $request->all();

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $ext = $file->getClientOriginalExtension();
            if ($ext != 'jpg' && $ext != 'jpeg' && $ext != 'png') {
                $error = 1;
                return view('admin.posts.posts', compact(error));
            }
            $imageFilename = $file->getClientOriginalName();
            $file->move('images', $imageFilename);
        } else {
            $imageFilename = null;
        }

        
        $post['image'] = $imageFilename;
        $post['slug'] = \Str::slug($request->name);
        
        Post::create($post);
        return redirect()->route('admin.posts.posts');
    }

    /**
     * Display the specified resource.
     *  @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return new PostResource($post);
    }

    /**
     * Update the specified resource in storage.
     * * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\Post                     $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        $post = $request->all();

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $ext = $file->getClientOriginalExtension();
            if ($ext != 'jpg' && $ext != 'jpeg' && $ext != 'png') {
                $error = 1;
                return view('admin.posts.posts', compact(error));
            }
            $imageFilename = $file->getClientOriginalName();
            $file->move('images', $imageFilename);
        } else {
            $imageFilename = $post->image;
        }

        
        $prod['image'] = $imageFilename;
        $prod['slug'] = \Str::slug($request->name);
        //dd($prod);
        $post->update($post);
        return redirect()->route('admin.posts.posts');
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return response("", 204);
    }
}
