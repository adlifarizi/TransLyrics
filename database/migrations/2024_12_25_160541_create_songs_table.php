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
        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('original_title')->nullable();
            $table->string('alternate_title')->nullable();
            $table->unsignedBigInteger('artist_id');
            $table->unsignedBigInteger('album_id')->nullable();
            $table->string('image')->nullable();
            $table->date('release_date')->nullable();
            $table->string('vocal')->nullable();
            $table->string('music')->nullable();
            $table->string('lyricist')->nullable();
            $table->string('composer')->nullable();
            $table->string('arrangement')->nullable();
            $table->string('youtube_embed')->nullable();
            $table->string('link_youtube_music')->nullable();
            $table->string('link_spotify')->nullable();
            $table->string('link_apple_music')->nullable();
            $table->integer('views')->default(0);
            $table->timestamps();

            $table->foreign('artist_id')->references('id')->on('artists')->onDelete('cascade');
            $table->foreign('album_id')->references('id')->on('albums')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('songs');
    }
};
