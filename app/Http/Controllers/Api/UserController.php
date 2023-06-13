<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Password;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function searchByName(Request $request)
    {
    }
}
