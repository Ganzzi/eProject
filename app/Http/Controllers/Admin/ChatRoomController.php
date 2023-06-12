<?php

namespace App\Http\Controllers\Admin;

use App\Models\ChatRoom;
use App\Http\Controllers\Controller;

class ChatRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $chatrooms = ChatRoom::with('users', 'chats.likes')->get();

        return response()->json($chatrooms);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($chatRoom)
    {
        // Find the chat room by ID
        $room = ChatRoom::find($chatRoom);

        if (!$room) {
            return response()->json(['success' => false, 'message' => 'Chat room not found'], 404);
        }

        // Detach users from the chat room
        $room->users()->detach();

        // Delete chats and associated like chats
        $room->chats()->each(function ($chat) {
            $chat->likeChats()->delete();
            $chat->delete();
        });

        // Delete the chat room
        $room->delete();

        return response()->json(['success' => true, 'message' => 'Chat room deleted successfully']);
    }
}
