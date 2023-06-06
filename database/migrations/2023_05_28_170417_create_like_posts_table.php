<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('like_posts', function (Blueprint $table) {
            $table->unsignedBigInteger('Liker_Id');
            $table->foreign('Liker_Id')->references('id')->on('users');
            $table->unsignedBigInteger('Post_Id');
            $table->foreign('Post_Id')->references('Post_Id')->on('posts');
            $table->timestamps();

            $table->primary(['Liker_Id', 'Post_Id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('like_posts');
    }
};
