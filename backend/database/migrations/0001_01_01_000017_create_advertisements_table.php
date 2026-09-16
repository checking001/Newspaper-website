<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('advertisements', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('advertiser')->nullable();
            $table->string('image_url')->nullable();
            $table->string('destination_url')->nullable();
            $table->longText('html_code')->nullable();
            $table->string('placement');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('status')->default('active');
            $table->integer('priority')->default(0);
            $table->string('device_targeting')->default('all');
            $table->timestamps();
            $table->softDeletes();

            $table->index('placement');
            $table->index('status');
            $table->index('start_date');
            $table->index('end_date');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('advertisements');
    }
};