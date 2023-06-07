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
        Schema::create('like_chats', function (Blueprint $table) {
            $table->unsignedBigInteger('liker_id');
            $table->foreign('liker_id')->references('user_id')->on('users');
            $table->unsignedBigInteger('chat_id');
            $table->foreign('chat_id')->references('chat_id')->on('chats');
            $table->timestamps();

            $table->primary(['liker_id', 'chat_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('like_chats');
    }
};