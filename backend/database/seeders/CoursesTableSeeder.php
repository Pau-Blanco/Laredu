<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;

class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::create([
            'name' => 'Curso de Laravel',
            'description' => 'Aprendiendo Laravel 11',
        ]);
        Course::create([
            'name' => 'Curso de React',
            'description' => 'Introducción a React 19',
        ]);
        Course::create([
            'name' => 'Curso de PHP Básico',
            'description' => 'Fundamentos de PHP',
        ]);
    }
}
