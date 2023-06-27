<?php

// namespace for user page's controller
use App\Http\Controllers\User\ActivityLogController;
use App\Http\Controllers\User\ChatController;
use App\Http\Controllers\User\ChatRoomController;
use App\Http\Controllers\User\CommentController;
use App\Http\Controllers\User\FollowController;
use App\Http\Controllers\User\LikeChatController;
use App\Http\Controllers\User\LikePostController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\PostController;
use App\Http\Controllers\User\LikeCommentController;
use App\Http\Controllers\User\Auth;
use App\Http\Controllers\User\UserController;

// namespace for admin page's controller
use App\Http\Controllers\Admin\ChatRoomController as AdminChatRoomController;
use App\Http\Controllers\Admin\UserController  as AdminUserController;
use App\Http\Controllers\Admin\PostController  as AdminPostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    // route to get information both user and admin
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    // api routes for user
    Route::post("/logout", [Auth::class, 'logout']);
    Route::apiResource('/activities', ActivityLogController::class);
    Route::apiResource('/chats', ChatController::class);
    Route::apiResource('/chatrooms', ChatRoomController::class);
    Route::apiResource('/comments', CommentController::class);
    Route::apiResource('/follows', FollowController::class);
    Route::apiResource('/likechats', LikeChatController::class);
    Route::apiResource('/likeposts', LikePostController::class);
    Route::apiResource('/likecomments', LikeCommentController::class);
    Route::apiResource('/notifications', NotificationController::class);
    Route::post('/update-notification-state', [NotificationController::class, 'updateNotificationState']);
    Route::apiResource('/posts', PostController::class);
    Route::get('/posts-profile/{userid}', [PostController::class, 'getPostProfile']);
    Route::get('/user-profile/{user}', [UserController::class, 'show']);
    Route::post('/search-user', [UserController::class, 'searchByName']);
    Route::post('/update-profile/{user}', [UserController::class, 'update']);

    // api routes for admin 
    Route::apiResource('/admin/users', AdminUserController::class);
    Route::apiResource('/admin/chatrooms', AdminChatRoomController::class);
    Route::apiResource('/admin/posts', AdminPostController::class);
    Route::post('/admin/posts', [AdminPostController::class, 'store']);
});

// routes for signup, login
Route::post("/signup", [Auth::class, 'signup']);
Route::post("/login", [Auth::class, 'login']);

// routes for get images in storage
Route::get('/images/{filename}', function ($filename) {
    $path = storage_path('app/public/images/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = file_get_contents($path);
    $type = mime_content_type($path);

    return response($file)->header('Content-Type', $type);
});
