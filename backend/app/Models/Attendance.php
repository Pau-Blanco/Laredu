<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendance';

    protected $fillable = [
        'user_id',
        'calendar_event_id',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function calendarEvent()
    {
        return $this->belongsTo(CalendarEvent::class);
    }
}
