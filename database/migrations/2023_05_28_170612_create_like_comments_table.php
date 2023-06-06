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
        Schema::create('like_comments', function (Blueprint $table) {
            $table->unsignedBigInteger('Comment_Id');
            $table->foreign('Comment_Id')->references('Comment_Id')->on('comments');
            $table->unsignedBigInteger('Liker_Id');
            $table->foreign('Liker_Id')->references('id')->on('users');
            $table->timestamps();

            $table->primary(['Comment_Id', 'Liker_Id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('like_comments');
    }
};
