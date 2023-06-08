<?php

namespace App\Http\Controllers\Api;

use App\Models\Chat;
use App\Models\ChatRoom;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ChatRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     * * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
     
    public function index()
    {
        $chatrooms = ChatRoom::all();

        return response()->json($chatrooms, 200);
    }

    /**
     * Store a newly created resource in storage.
     * * @param \App\Http\Requests\StorechatRoomRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validated();
        $data['text'] = bcrypt($data['text']);
        $Message = chatroom::create($data);

        return response(new chatRoomResource($chatRoom), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(ChatRoom $chatRoom)
    {
        $chatRoom->load('users', 'chats.likes');

        $lastMessage = $chatRoom->chats()->orderByDesc('created_at')->first();

        return response()->json([
            'chat_room_id' => $chatRoom->id,
            'created_at' => $chatRoom->created_at->toISOString(),
            'participants' => $chatRoom->users->map(function ($user) {
                return [
                    'paticipator_id' => $user->id,
                    'name' => $user->name,
                    'image' => $user->image,
                    'join_at' => $user->pivot->join_at->toISOString(),
                ];
            }),
            'chats' => $chatRoom->chats->map(function ($chat) {
                return [
                    'chat_id' => $chat->id,
                    'created_at' => $chat->created_at->toISOString(),
                    'text' => $chat->text,
                    'sender_id' => $chat->sender_id,
                    'likes' => $chat->likes->map(function ($like) {
                        return [
                            'liker' => $like->liker,
                            'created_at' => $like->created_at->toISOString(),
                        ];
                    })
                ];
            }),
            
            'last_message' => $lastMessage ? [
                'chat_id' => $lastMessage->id,
                'created_at' => $lastMessage->created_at->toISOString(),
                'text' => $lastMessage->text,
                'sender_id' => $lastMessage->sender_id,
                'likes' => $lastMessage->likes->map(function ($like) {
                    return [
                        'liker' => $like->user->name,
                        'created_at' => $like->created_at->toISOString(),
                    ];
                })
            ] : null,
        ]);
    }


    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(Request $request, ChatRoom $chatRoom)
    // {
    //     //
    // }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ChatRoom $chatRoom)
    {
        $chatRoom->delete();

        return response("", 204);
    }
}