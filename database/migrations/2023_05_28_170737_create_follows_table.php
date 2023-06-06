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
        Schema::create('follows', function (Blueprint $table) {

            $table->unsignedBigInteger('Follower_Id');
            $table->foreign('Follower_Id')->references('id')->on('users');
            $table->unsignedBigInteger('Following_Id');
            $table->foreign('Following_Id')->references('id')->on('users');
            $table->datetime('Follow-At');
            $table->timestamps();

            $table->primary(['Follower_Id', 'Following_Id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('follows');
    }
};
