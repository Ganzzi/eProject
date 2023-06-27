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
            'commentor_id' => 2,
            'post_id' => 1,
            'text' => 'Ban that gioi!',
            // Add more columns and values as needed...
        ]);

        Comment::create([
            'commentor_id' => 3,
            'post_id' => 2,
            'text' => 'Technology cyber security.',
            // Add more columns and values as needed...
        ]);

        Comment::create([
            'commentor_id' => 3,
            'post_id' => 3,
            'text' => 'good image',
            // Add more columns and values as needed...
        ]);
    }
}
