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
            $table->id();
            $table->unsignedBigInteger('liker_id');
            $table->foreign('liker_id')->references('id')->on('users');
            $table->unsignedBigInteger('post_id');
            $table->foreign('post_id')->references('id')->on('posts');
            $table->timestamps();

            // $table->primary(['liker_id', 'post_id']);
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