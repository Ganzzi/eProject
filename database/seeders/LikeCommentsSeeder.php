<?php

namespace Database\Seeders;

use App\Models\LikeComment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LikeCommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        LikeComment::create([
            'liker_id' => 1,
            'comment_id' => 1,
            // Add more columns and values as needed...
        ]);

        LikeComment::create([
            'liker_id' => 2,
            'comment_id' => 2,
            // Add more columns and values as needed...
        ]);
    }
}