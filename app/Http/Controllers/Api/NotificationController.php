<?php

namespace App\Http\Controllers\Api;

use App\Models\Notification;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = Auth::user()->id;

        // find all chatrooms belong to a user
        $notifications = Notification::where('receiver_id', $user_id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response($notifications);
    }

    public function store($receiver_id, $type, $text)
    {
        $notification = new Notification();
        $notification->receiver_id = $receiver_id;
        $notification->type = $type;
        $notification->text = $text;
        $notification->save();
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        $user_id = Auth::user()->id;

        if ($user_id != $notification->receiver_id) {
            return response('you are not the receiver');
        }

        $notification->delete();
        return response('deleted');
    }

    public function updateNotificationState(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'notification_id' => 'required|exists:notifications,id',
            'state' => 'required|in:read,unread',
        ]);

        $notification = Notification::findOrFail($request->input('notification_id'));

        // Chỉ cho phép người dùng sở hữu thông báo cập nhật trạng thái
        if ($notification->receiver_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $notification->state = $request->input('state');
        $notification->save();

        return response()->json(['message' => 'Notification state updated successfully']);
    }

}