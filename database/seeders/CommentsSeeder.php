<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Comment::create([
            'commentor_id' => 1,
            'post_id' => 1,
            'reply_to' => null,
            // Add more columns and values as needed...
        ]);

        Comment::create([
            'commentor_id' => 2,
            'post_id' => 2,
            'reply_to' => null,
            // Add more columns and values as needed...
        ]);
    }
}