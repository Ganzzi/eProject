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
            'Creator_Id' => 1,
            'Description' => 'My first post',
            'Image' => 'image1.jpg',
            'UserImage' => 'user1.jpg',
            'Field' => 'Technology',
            // Add more columns and values as needed...
        ]);

        Post::create([
            'Creator_Id' => 2,
            'Description' => 'Check out this amazing photo',
            'Image' => 'image2.jpg',
            'UserImage' => 'user2.jpg',
            'Field' => 'Photography',
            // Add more columns and values as needed...
        ]);
    }
}
