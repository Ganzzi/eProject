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
        Schema::create('comments', function (Blueprint $table) {
            $table->id('Comment_Id');
            $table->unsignedBigInteger('Commentor_Id');
            $table->foreign('Commentor_Id')->references('id')->on('users');
            $table->unsignedBigInteger('Post_Id');
            $table->foreign('Post_Id')->references('Post_Id')->on('posts');
            $table->unsignedBigInteger('Reply-To')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
