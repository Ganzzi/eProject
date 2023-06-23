<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id' => 1,
            'role_id' => 1,
            'name' => 'admin',
            'password' => bcrypt('admin123'),
            'email' => 'admin@gmail.com',
            'image' => '6NUvqmFzwp3Y4L7n3AXbPnptPma2mPxKpFjYEcbB.jpg',
            'bio' => 'Lorem ipsum dolor sit amet.',
            'gender' => 'male',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'id' => 2,
            'role_id' => 2,
            'name' => 'Jane Smith',
            'password' => bcrypt('user123'),
            'email' => 'user1@gmail.com',
            'image' => '6xhXec0Fa3bNmzvCFHS8qOSfHHzGiovkeapRloKe.png',
            'bio' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            'gender' => 'female',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
