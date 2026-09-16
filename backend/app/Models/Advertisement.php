<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Advertisement extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'advertiser',
        'image_url',
        'destination_url',
        'html_code',
        'placement',
        'start_date',
        'end_date',
        'status',
        'priority',
        'device_targeting',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];
}