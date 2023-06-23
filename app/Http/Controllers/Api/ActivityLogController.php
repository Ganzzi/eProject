<?php

namespace App\Http\Controllers\Api;

use App\Models\ActivityLog;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivityLogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id = Auth::user()->id;

        // find all activities belong to a user
        $activities = ActivityLog::whereHas('user', function ($query) use ($user_id) {
            $query->where('id', $user_id);
        })
            ->get();

        return response($activities);
    }

    public function store($userId, $type, $describe)
    {
        $activityLog = new ActivityLog();
        $activityLog->user_id = $userId;
        $activityLog->type = $type;
        $activityLog->describe = $describe;
        $activityLog->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($activityLog)
    {
        $user_id = Auth::user()->id;

        $activity = ActivityLog::find($activityLog);

        if ($user_id != $activity->user_id) {
            return response('you are not the receiver');
        }

        $activity->delete();
        return response('deleted');
    }
}