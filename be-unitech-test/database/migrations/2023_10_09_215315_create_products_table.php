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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->bigInteger("code");
            $table->string("name");
            $table->text("product_url");
            $table->bigInteger("stock");
            $table->bigInteger("price");
            $table->unsignedBigInteger("category_id");
            $table->unsignedBigInteger("image_id");
            $table->unsignedBigInteger("statistic_id");
            $table->timestamps();

            $table->foreign('statistic_id')->references('id')->on('statistics');
            $table->foreign('image_id')->references('id')->on('images');
            $table->foreign('category_id')->references('id')->on('categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
