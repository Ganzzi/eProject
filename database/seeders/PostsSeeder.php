<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Post::create([
            'creator_id' => 1,
            'description' => 'My first post',
            'image' => '8s3jbyA7dJxauXusZRcCENn8Akr4cjtw922NCPR7.png',
        ]);

        Post::create([
            'creator_id' => 2,
            'description' => 'Check out this amazing photo',
            'image' => 'A8nXni3kSIYKJ6o6iANtCxzPyGJLrV3ZqSGPxXeS.png',
        ]);
    }
}
