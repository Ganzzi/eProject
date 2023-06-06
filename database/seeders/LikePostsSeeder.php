<?php

namespace Database\Seeders;

use App\Models\LikePost;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikePostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LikePost::create([
            'Liker_Id' => 1,
            'Post_Id' => 1,
            // Add more columns and values as needed...
        ]);

        LikePost::create([
            'Liker_Id' => 2,
            'Post_Id' => 2,
            // Add more columns and values as needed...
        ]);
    }
}
