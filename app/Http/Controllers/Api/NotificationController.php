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
            ->get();

        return response($notifications);
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
        $receiverId = auth()->user()->id;

        // Update notifications where receiver_id matches the authenticated user's ID
        Notification::where('receiver_id', $receiverId)
            ->where('state', 'new')
            ->update(['state' => 'old']);

        // Check the number of updated notifications
        return response()->json(['message' => 'Notifications state updated successfully'], 202);
    }
}
