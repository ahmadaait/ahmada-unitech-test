<?php

namespace App\Http\Controllers\Api\Statistic;

use App\Http\Controllers\Controller;
use App\Http\Resources\StatisticResource;
use App\Models\Statistic;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    public function index()
    {
        $statistics = Statistic::when(request()->q, function ($statistics) {
            $statistics = $statistics->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return new StatisticResource(true, "List data statistik", $statistics);
    }
}
