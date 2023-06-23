<?php

namespace App\Http\Controllers\Api;

use App\Models\Follow;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     $user_id = Auth::user()->id;

    //     //    user id: 1 following_id: 1
    //     $followers = Follow::where('following_id', $user_id)->get();

    //     $followings = Follow::where('follower_id', $user_id)->get();

    //     return response()->json([
    //         'followers' => $followers->map(function ($fl) {
    //             $user = User::find($fl->follower_id);
    //             return [
    //                 'image' => $user->image,
    //                 'name' => $user->name,
    //                 'id' => $user->id,
    //             ];
    //         }),
    //         'followings' => $followings->map(function ($fl) {
    //             $user = User::find($fl->following_id);
    //             return [
    //                 'image' => $user->image,
    //                 'name' => $user->name,
    //                 'id' => $user->id,
    //             ];
    //         }),
    //     ]);
    // }

    public function show($follow)
    {
        $user_id = User::find($follow)->id;

        //    user id: 1 following_id: 1
        $followers = Follow::where('following_id', $user_id)->get();

        $followings = Follow::where('follower_id', $user_id)->get();

        return response()->json([
            'followers' => $followers->map(function ($fl) {
                $user = User::find($fl->follower_id);
                return [
                    'image' => $user->image,
                    'name' => $user->name,
                    'id' => $user->id,
                ];
            }),
            'followings' => $followings->map(function ($fl) {
                $user = User::find($fl->following_id);
                return [
                    'image' => $user->image,
                    'name' => $user->name,
                    'id' => $user->id,
                ];
            }),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'follower_id' => 'required|numeric',
            'following_id' => 'required|numeric',
        ]);

        $user = $request->user();
        $followerId = $validatedData['follower_id'];
        $followingId = $validatedData['following_id'];

        if ($validatedData['follower_id'] != $user->id) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $follow = Follow::where('follower_id', $validatedData['follower_id'])
            ->where('following_id', $validatedData['following_id'])
            ->first();

        if ($follow) {
            // If already followed, unfollow
            $follow->delete();
            return response()->json(['message' => 'Unfollowed.']);
        } else {
            $follow = new Follow;
            $follow->follower_id = $followerId;
            $follow->following_id = $followingId;
            $follow->follow_at = now();

            $follow->save();

            $notificationController = new NotificationController();
            $receiverId = $followingId;
            $notificationController->store($receiverId, 'new_follow', 'You have a new follower.');

            return response()->json(['message' => 'followed']);
        }

        // $validatedData = $request->validate([
        //     'follower_id' => 'required|numeric',
        //     'following_id' => 'required|numeric',
        // ]);

        // $user = $request->user();

        // if ($request->input('follower_id') != $user->id) {
        //     return response(404);
        // }

        // // Kiểm tra xem người dùng đã follow chưa
        // $existingFollow = Follow::where('follower_id', $request->input('follower_id'))
        //     ->where('following_id', $request->input('following_id'))
        //     ->first();

        // if ($existingFollow) {
        //     // If already followed, unfollow
        //     $existingFollow->delete();
        //     return response()->json(['message' => 'unfolllowed.']);
        // } else {
        //     $follow = new Follow;
        //     $follow->follower_id = $validatedData['follower_id'];
        //     $follow->following_id = $validatedData['following_id'];
        //     $follow->follow_at = now();

        //     $follow->save();

        //     return response()->json(['message' => 'followed']);
        // }
    }

    // /**
    //  * Remove the specified resource from storage.
    //  * @param \App\Models\Follow $follow
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy(Follow $follow)
    // {
    //     $follow->delete();

    //     return response()->json([
    //         'message' => 'Follow deleted successfully'
    //     ]);
    // }
}
