<?php

namespace App\Http\Controllers\Api\Category;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::when(request()->q, function ($categories) {
            $categories = $categories->where('name', 'like', '%' . request()->q . '%');
        })->latest()->paginate(5);

        return new CategoryResource(true, "List data kategori", $categories);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'    => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category = Category::create([
            'name' => $request->name,
        ]);

        if ($category) {
            return new CategoryResource(true, 'Data Kategori Berhasil Disimpan!', $category);
        }

        return new CategoryResource(false, 'Data Kategori Gagal Disimpan!', null);
    }

    public function show($id)
    {
        $category = Category::whereId($id)->first();

        if ($category) {
            return new CategoryResource(true, 'Detail Data Category!', $category);
        }

        return new CategoryResource(false, 'Detail Data Category Tidak DItemukan!', null);
    }

    public function edit(Request $request, $id)
    {
        $category = Category::find($id);

        $validator = Validator::make($request->all(), [
            'name'     => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $category->update([
            'name' => $request->name,
        ]);

        if ($category) {
            return new CategoryResource(true, 'Data Category Berhasil Diupdate!', $category);
        }

        return new CategoryResource(false, 'Data Category Gagal Diupdate!', null);
    }

    public function destroy($id)
    {
        $category = Category::find($id);
        if ($category->delete()) {
            return new CategoryResource(true, 'Data Category Berhasil Dihapus!', null);
        }

        return new CategoryResource(false, 'Data Category Gagal Dihapus!', null);
    }
}
