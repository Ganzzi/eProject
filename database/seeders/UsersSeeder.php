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
            'id' => 2,
            'Role_Id' => 2,
            'name' => 'Jane Smith',
            'password' => bcrypt('user123'),
            'email' => 'user1@gmail.com',
            'image' => 'user2.jpg',
            'bio' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
            'gender' => 'female',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        User::create([
            'id' => 1,
            'Role_Id' => 1,
            'name' => 'admin',
            'password' => bcrypt('admin123'),
            'email' => 'admin@gmail.com',
            'image' => 'user1.jpg',
            'bio' => 'Lorem ipsum dolor sit amet.',
            'gender' => 'male',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
