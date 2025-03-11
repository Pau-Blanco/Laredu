<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    protected $table = 'assignments';

    protected $fillable = [
        'title',
        'description',
        'due_date',
        'course_id',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
