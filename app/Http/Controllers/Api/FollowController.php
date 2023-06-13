<?php

namespace App\Http\Controllers\Api;

use App\Models\Follow;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Lấy danh sách các đối tượng Follow
        $follows = Follow::all();

        return response()->json(['data' => $follows]);
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

        // Tạo mới một đối tượng Follow
        $follow = new Follow;
        $follow->follower_id = $validatedData['follower_id'];
        $follow->following_id = $validatedData['following_id'];
        $follow->follow_at = now();

        $follow->save();

        return response()->json(['data' => $follow]);
    }

    /**
     * Remove the specified resource from storage.
     * @param \App\Models\Follow $follow
     * @return \Illuminate\Http\Response
     */
    public function destroy(Follow $follow)
    {
        $follow->delete();

        return response()->json([
            'message' => 'Follow deleted successfully'
        ]);
    }
}
