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
            'liker_id' => 3,
            'post_id' => 1,
            // Add more columns and values as needed...
        ]);

        LikePost::create([
            'liker_id' => 2,
            'post_id' => 2,
            // Add more columns and values as needed...
        ]);

        LikePost::create([
            'liker_id' => 3,
            'post_id' => 1,
            // Add more columns and values as needed...
        ]);

        LikePost::create([
            'liker_id' => 3,
            'post_id' => 2,
            // Add more columns and values as needed...
        ]);
    }
}
