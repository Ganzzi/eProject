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
            'Commentor_Id' => 1,
            'Post_Id' => 1,
            'Reply-To' => null,
            // Add more columns and values as needed...
        ]);

        Comment::create([
            'Commentor_Id' => 2,
            'Post_Id' => 2,
            'Reply-To' => null,
            // Add more columns and values as needed...
        ]);
    }
}
