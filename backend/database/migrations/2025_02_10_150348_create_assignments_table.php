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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->string('title'); //Titulo de la tarea
            $table->text('description')->nullable(); //Descripción de la tarea
            $table->dateTime('due_date'); //Fecha de entrega
            $table->foreignId('course_id')->constrained()->onDelete('cascade'); //Curso al que pertenece la tarea
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};
