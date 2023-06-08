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
            'image' => 'image1.jpg',
            'user_image' => 'user1.jpg',
            'field' => 'Technology',
            // Add more columns and values as needed...
        ]);

        Post::create([
            'creator_id' => 2,
            'description' => 'Check out this amazing photo',
            'image' => 'image2.jpg',
            'user_image' => 'user2.jpg',
            'field' => 'Photography',
            // Add more columns and values as needed...
        ]);
    }
}