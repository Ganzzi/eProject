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
        Schema::create('posts', function (Blueprint $table) {
            $table->id('Post_Id');
            $table->unsignedBigInteger('Creator_Id');
            $table->foreign('Creator_Id')->references('id')->on('users')->onDelete('cascade');
            $table->string('Description')->nullable();
            $table->string('Image')->nullable();
            $table->string('UserImage')->nullable();
            $table->string('Field')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
