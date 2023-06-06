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
        Schema::create('chats', function (Blueprint $table) {
            $table->id('Chat_Id');
            $table->unsignedBigInteger('Chat_Room_ID');
            $table->foreign('Chat_Room_ID')->references('Chat_Room_ID')->on('chat_rooms');
            $table->string('Text');
            $table->unsignedBigInteger('Sender_Id');
            $table->foreign('Sender_Id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
