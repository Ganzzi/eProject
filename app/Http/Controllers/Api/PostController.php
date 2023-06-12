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
        $posts =Post::all();

        // $likes = $posts->likes();
        // $comments = $posts->comments();
        // $likes = 'like';
        // $comments = 'cmt';

        // return response()->json([
        //     'posts' => $postss,
        //     'like' => $likes,
        //     'cmt' => $comments,
        // ]);
        return Post::all();
    }

    /**
     * Store a newly created resource in storage.
     * 
     * @param \App\Http\Requests\StorepostRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $posts = $request->all();

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $ext = $file->getClientOriginalExtension();
            if ($ext != 'jpg' && $ext != 'jpeg' && $ext != 'png') {
                $error = 1;
                return view('admin/posts', compact(error));
            }
            $imageFilename = $file->getClientOriginalName();
            $file->move('images', $imageFilename);
        } else {
            $imageFilename = null;
        }

        // thêm 1 phần tử mới vào mảng $prod
        $posts['image'] = $imageFilename;
        $posts['slug'] = \Str::slug($request->name);
        
        Post::create($posts);
        return redirect()->route('admin/posts');
    }

    /**
     * Display the specified resource.
     *  @param \App\Models\Post $posts
     * @return \Illuminate\Http\Response
     */
    public function show(Post $posts)
    {
        $chatRoom->load('posts');
        return response()->json([

            'posts' => $posts->posts->map(function ($posts) {
                return [
                    'creator_id' => $posts->id,
                    'description' => $posts->description,
                    'image' => $posts->image,
                    'userimage' => $posts->userimage,
                    'field' => $posts->field,
                    'created_at' => $chat->created_at->toISOString(),
                    'updated_at' => $chat->updated_at->toISOString(),
                   
                    
                ];
    }),
]);
    }
    public function edit(Post $posts)
    {
        $posts = Post::all();
       return Post::all();
        
    }
    /**
     * Update the specified resource in storage.
     * * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\Post                     $posts
     * @return \Illuminate\Http\Response
     * @param  Illuminate\Support\Facades\Storage;

     */
    public function update(Request $request, Post $postss)
    {
        $posts = $request->all();

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $ext = $file->getClientOriginalExtension();
            if ($ext != 'jpg' && $ext != 'jpeg' && $ext != 'png') {
                $error = 1;
                return view('Admin/posts', compact(error));
            }
            $imageFilename = $file->getClientOriginalName();
            $file->move('images', $imageFilename);
        } else {
            $imageFilename = $posts->image;
        }

        // thêm 1 phần tử mới vào mảng 
        $posts['image'] = $imageFilename;
        $posts['slug'] = \Str::slug($request->name);
    
        $posts->update($posts);
        return redirect()->route('admin/posts');
        
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Post $posts
     * @return \Illuminate\Http\Response
     * @param  Illuminate\Support\Facades\Storage;

     */
    public function destroy(Post $posts)
    {
       //delete
       $posts = Post::find($posts);
       

    // Delete the image from storage
    Storage::delete($posts->image);

    // Delete the posts from the database
    $posts->delete();

    
    return response()->json(['success'=> true, 'posts'=>'Post deleted successfully']);
}
}