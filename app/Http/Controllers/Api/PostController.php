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
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'description' => 'nullable|string',
            'image' => 'nullable|string',
        ]);

        $user = Auth::user();

        $post = new Post();
        $post->description = $validatedData['description'];
        $post->image = $validatedData['image'];
        $post->creator_id = $user->id;

        $post->save();
        
        return response()->json(['message' => 'Post created successfully']);

    }

    /**
     * Display the specified resource.
     *  @param \App\Models\Post $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        $room = ChatRoom::with('users', 'chats.likes')->find($chatRoom);
        // return response()->json(['data' => $room]);

        $lastMessage = $room->chats()->orderByDesc('created_at')->first();

        // Lấy tất cả các tin nhắn reply của tin nhắn gốc
        $replyToId = $lastMessage->id; // Thay thế $lastMessage->id bằng ID của tin nhắn gốc cụ thể
        $replies = Chat::where('reply_to', $replyToId)->get();

        return response()->json([
            'chat_room_id' => $room->id,
            'created_at' => $room->created_at->toISOString(),
            'participants' => $room->users->map(function ($user) {
                return [
                    'paticipator_id' => $user->id,
                    'name' => $user->name,
                    'image' => $user->image,
                    'created_at' => $user->pivot->created_at,
                ];
            }),

            'chats' => $room->chats->map(function ($chat) {
                return [
                    'chat_id' => $chat->id,
                    'created_at' => $chat->created_at->toISOString(),
                    'text' => $chat->text,
                    'sender_id' => $chat->sender_id,
                    'likes' => $chat->likes->map(function ($like) {
                        return [
                            'liker' => $like->liker_id,
                            'created_at' => $like->created_at->toISOString(),
                        ];
                    })
                ];
            }),

            'replies' => $replies->map(function ($reply) {
                return [
                    'reply_id' => $reply->id,
                    'created_at' => $reply->created_at->toISOString(),
                    'text' => $reply->text,
                    'sender_id' => $reply->sender_id,
                    'likes' => $reply->likes->map(function ($like) {
                        $username = User::find($like->liker_id)->name;
                        return [
                            'liker' => $username,
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
        // lam lai
        $post->delete();

        return response("", 204);
    }
}