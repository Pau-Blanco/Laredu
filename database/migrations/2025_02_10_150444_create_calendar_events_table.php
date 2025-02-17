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
        Schema::create('calendar_events', function (Blueprint $table) {
            $table->id();
            $table->string('title'); //Nombre del evento
            $table->text('description')->nullable(); //Descripción del evento
            $table->dateTime('start'); //Fecha de inicio
            $table->dateTime('end'); //Fecha de finalización
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); //Relación con el usuario
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('calendar_events');
    }
};
