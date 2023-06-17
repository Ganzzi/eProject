<?php

use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\ChatRoomController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\FollowController;
use App\Http\Controllers\Api\LikeChatController;
use App\Http\Controllers\Api\LikePostController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\LikeCommentController;
use App\Http\Controllers\Api\Auth;
use App\Http\Controllers\Api\UserController;

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
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
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
    Route::apiResource('/posts', PostController::class);
    Route::get('/posts-profile/{userid}', [PostController::class, 'getPostProfile']);
    Route::get('/user-profile/{user}', [UserController::class, 'show']);
    Route::post('/search-user', [UserController::class, 'searchByName']);
    Route::post('/update-profile/{user}', [UserController::class, 'update']);

    Route::apiResource('/admin/users', AdminUserController::class);
    Route::apiResource('/admin/chatrooms', AdminChatRoomController::class);
    Route::apiResource('/admin/posts', AdminPostController::class);
    Route::post('image', [AdminPostController::class, 'image']);
});

Route::post("/signup", [Auth::class, 'signup']);
Route::post("/login", [Auth::class, 'login']);
Route::post("/reset-password", [Auth::class, 'submitForgetPassword']);
Route::post("/verify-code", [Auth::class, 'submitResetPassword']);
// Route::post('/recover-password', [UserController::class, 'sendResetPassword'])->name('password.email');

Route::get('/images/{filename}', function ($filename) {

    $path = storage_path('app/public/images/' . $filename);

    if (!file_exists($path)) {
        abort(404);
    }

    $file = file_get_contents($path);
    $type = mime_content_type($path);

    return response($file)->header('Content-Type', $type);
});

// Route::get('/videos/{filename}', function ($filename) {
//     $path = storage_path('app/public/videos/' . $filename);

//     if (!file_exists($path)) {
//         abort(404);
//     }

//     $file = file_get_contents($path);
//     $type = mime_content_type($path);

//     return response($file)->header('Content-Type', $type);
// });
