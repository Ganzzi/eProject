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
        $chatRooms = ChatRoom::all();

        return response()->json($chatRooms, 200);
    }

    /**
     * Store a newly created resource in storage.
     * * @param \App\Http\Requests\StorechatRoomRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required',
            'user_id2' => 'required'
        ]);
        
        $userId1 = $validatedData['user_id'];
        $userId2 = $validatedData['user_id2'];
        
        $chatRoom = ChatRoom::create();

        // return response(['message' => 'Chat room created successfully', 'id: ' => $userId1 . $userId2]);

        
        $chatRoom->users()->attach([
            $userId1 => ['join_at' => now()],
            $userId2 => ['join_at' => now()]
        ]);
        
        return response(['message' => 'Chat room created successfully']);
    }

    /**
     * Display the specified resource.
     */
    public function show( ChatRoom $chatRoom)
    {
        $chatRoomId = 1; // ID của chat room bạn muốn tìm

    $chatRoom = ChatRoom::where('chat_room_id', $chatRoomId)->firstOrFail();
        // $cr = $chatRoom->findOrFail();
    
        

        // $user = $chatRoom->users();

        
        $ui=$chatRoom->load('users', 'chats');
        return response(['mess' => $ui]);
        
        $lastMessage = $chatRoom->chats()->orderByDesc('created_at')->first();

        return response()->json([
            'chat_room_id' => $chatRoom->chat_room_id,
            'created_at' => $chatRoom->created_at->toISOString(),
            'participants' => $chatRoom->users->map(function ($user) {
                return [
                    'paticipator_id' => $user->user_id,
                    'name' => $user->name,
                    'image' => $user->image,
                    'join_at' => $user->pivot->join_at->toISOString(),
                ];
            }),
            'chats' => $chatRoom->chats->map(function ($chat) {
                return [
                    'chat_id' => $chat->chat_id,
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