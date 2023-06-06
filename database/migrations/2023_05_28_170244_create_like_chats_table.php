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
            $table->unsignedBigInteger('Liker_Id');
            $table->foreign('Liker_Id')->references('id')->on('users');
            $table->unsignedBigInteger('Chat_Id');
            $table->foreign('Chat_Id')->references('Chat_Id')->on('chats');
            $table->timestamps();

            $table->primary(['Liker_Id', 'Chat_Id']);
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
