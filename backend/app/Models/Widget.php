<?php

namespace App\Models;

use App\Models\WidgetDetail;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Widget extends Model
{
    use HasFactory;

    public function users(): HasMany
    {
        return $this->hasMany(WidgetDetail::class);
    }

  /*   public function user(): BelongsToMany
    {
        return $this->belongsToMany(User::class)->withPivot('status', 'settings');
    } */
}
