<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('article_revisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained('articles')->onDelete('cascade');
            $table->integer('revision_number');
            $table->longText('content');
            $table->json('metadata')->nullable();
            $table->foreignId('changed_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();

            $table->index('article_id');
            $table->index('created_at');
            $table->unique(['article_id', 'revision_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('article_revisions');
    }
};