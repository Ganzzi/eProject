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
            'image' => 'SORmHJeqvaJn2j1xUZhTK6w7V4zsNovsdb11tMyE.png',
            'field' => 'Tech',
        ]);

        Post::create([
            'creator_id' => 2,
            'description' => 'Check out this amazing photo',
            'image' => 'SORmHJeqvaJn2j1xUZhTK6w7V4zsNovsdb11tMyE.png',
            'field' => 'Bio',
        ]);
    }
}
