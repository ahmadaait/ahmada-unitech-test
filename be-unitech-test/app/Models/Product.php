<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'product_url',
        'stock',
        'price',
        'category_id',
        'statistic_id',
        'image_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function statistic()
    {
        return $this->belongsTo(Statistic::class);
    }

    public function image()
    {
        return $this->belongsTo(Image::class);
    }
}
